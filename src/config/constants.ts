export enum RootURLsEnum {
    registerChoose = '/choose',
    homepage = '/',
    regiserYacht = '/register/yacht',
    regiserSupplier = '/register/supplier',
    about = '/about',
    privacy = '/privacy',
    instructions = '/instructions',
    profile = '/profile',
    messages = '/messages',
    explore = '/explore',
    contacts = '/contacts',
    help = '/help',
    login = '/login',
    blog = '/blog',
    admin = '/admin',
    yacht = '/yacht',
    forgot = '/forgot',
    supplier = '/supplier',
    search = '/search'
}

export enum UserRoles {
    ADMIN = 'ADMIN',
    SUPPLIER = 'SUPPLIER',
    YACHT_BUSINESS = 'YACHT_BUSINESS',
    YACHT = 'YACHT',
    YACHT_TEAMMATE = 'YACHT_TEAMMATE'
}



export type UserRolesType = 'ADMIN' | 'SUPPLIER' | 'YACHT_BUSINESS' | 'YACHT' | 'YACHT_TEAMMATE'

export const YACHT_REGISTER_VARIANTS = ['Captain', 'Purser', 'Engineer', 'Chef', 'Interior', 'Deck']

export const mapProps = {
    mapStyle: 'mapbox://styles/mapbox/navigation-night-v1',
    mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN
}