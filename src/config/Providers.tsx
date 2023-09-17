'use client'
import React from 'react'
import { ApolloLink, HttpLink, split } from '@apollo/client'
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { setContext } from '@apollo/client/link/context'
import Cookies from 'js-cookie'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const makeClient = () => {
    const authLink = setContext(async (_, { headers }) => {
        const token = await Cookies.get('token')

        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        }
    })

    const wsLink = new GraphQLWsLink(createClient({
        url: process.env.NEXT_PUBLIC_GRAPHQL_URL_WS,
        connectionParams: {
            Authorization: Cookies.get('token') ? `Bearer ${Cookies.get('token')}` : ''
        }
    }))

    const link = new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
        fetchOptions: { cache: 'no-store' },
    })

    const Link = split(
        ({ query }) => {
            const definition = getMainDefinition(query)

            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            )
        },
        wsLink,
        authLink.concat(link),
    )

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                      new SSRMultipartLink({ stripDefer: true }),
                      Link,
                  ])
                : Link,
    })
}

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    )
}

export default Providers
