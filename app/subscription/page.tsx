'use client'
import { type FC, useLayoutEffect } from 'react'
import Title from '../../src/components/Title/Title'
import c from './Subsciption.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import { useMutation } from '@apollo/client'
import { BUY_LINK } from '../../src/graphql/buy'
import { errorAlert } from '../../src/utils/alerts'
import useAuthStore from '../../src/stores/useAuthStore'
import { useRouter } from 'next/navigation'
import { RootURLsEnum } from '../../src/config/constants'
import { CANCEL_SUB } from '../../src/graphql/cancelSub'
import Swal from 'sweetalert2'

const layout: FC = () => {
    const setUserData = useAuthStore((state) => state.setUserData)
    const formatTimestamp = (timestamp: string): string => {
        const date = new Date(timestamp)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const formattedDate = `${day}.${month} - ${year}`
    
        return formattedDate
    }
    const [buy] = useMutation(BUY_LINK)
    const [cancel] = useMutation(CANCEL_SUB, {
        onCompleted: async (data) => {
            await setUserData(data.cancelSubscription)
            Swal.fire({
                icon: 'success',
                title: 'Success!',
            })
        },
        onError(error) {
            Swal.fire({
                icon: 'error',
                title: `${error}`,
            })
        },
    }
        )
    const isLogined = useAuthStore((state) => state.isLogined)
    const userData = useAuthStore((state) => state.userData)
    const { push, replace } = useRouter()

    const getLink = (priceKey: string) => {

        if (!isLogined) return push(RootURLsEnum.login)

        buy({
            variables: {
                paymentCheckoutInput: {
                    priceKey
                }
            }
        }).then(({ data, errors }) => {
            if (errors) return errorAlert()
            location.href = data.paymentCheckout.url
        }).catch(errorAlert)
    }

    useLayoutEffect(() => {
        if(!isLogined) replace(RootURLsEnum.registerChoose)
    }, [replace, isLogined])

    return <main className={c.main}>
        <section>
            <Title className={c.title}>{userData?.subscription?.status == "complete" ? "Congratulations" : (!isLogined || userData.role === 'SUPPLIER' ? 'Supplier Subscription Options' : 'Yacht Subscription Options')}</Title>
            <h2>One Step Away from Simplifying Your Job</h2>
            <div className='container'>
                {userData?.subscription?.status == "complete" ? <h3>You’re all set! The package details you have selected are below.</h3> : (!isLogined || userData.role === 'SUPPLIER'
                ? <h3>Discover the time-saving benefits of Yachtease. Simplify your yachting operations, connect effortlessly with suppliers, and streamline your planning. Join us to make the most of your time on the water.</h3>
                : <h3>Suppliers, join Yachtease to elevate your business. Connect with yachts effortlessly, offer seamless services, and expand your reach. Discover how Yachtease can boost your efficiency and growth in the yachting industry.</h3>)}
                </div>
        </section>
        {userData?.subscription?.status == "complete" ?
                <section className={classNames('container', c.packages)}>
                <>
                <article className={classNames('block', c.package)}>
                    <Image src='/assets/completeSub.jpg' width={90} height={90} alt='Package 2' />
                    <br /> 
                    <h5>{userData?.subscription?.name}</h5>
                    <h6>Start Date: {formatTimestamp(userData?.subscription?.startDate)}</h6>
                    <h6>End Date: {formatTimestamp(userData?.subscription?.endDate)}</h6>
                    <span className={c.tabl_title}>Features:</span>
                    <p>
                    Full Platform Access
                    </p>
                    <span className={c.tabl_title}>Payment:</span>
                    <p>
                    This package will auto renew unless cancelled
                    </p>
                    <div className={c.bottomFixed}>
                    <button className={c.buy} onClick={() => 
                        cancel()
                    }>Cancel</button>
                    </div>
                </article>
                </>
            </section>
        : 
        <section className={classNames('container', c.packages)}>
        {!isLogined || userData.role === 'SUPPLIER' ? <>
        <article className={classNames('block', c.package)}>
            <Image src='/assets/package1.jpg' width={90} height={90} alt='Package 1' />
            <br /> 
            <div className={c.top}>
                <h5>No-Commitment Free Trial</h5>
                <h6>Duration: 1 Month</h6>
            </div>
            <span className={c.tabl_title}>Features:</span>
            <p>
            Full Platform Access
            </p>
            <span className={c.tabl_title}>After the Trial:</span>
            <p>
                At the end of the one-month trial period, you have the option to sign up for the paid version.
            </p>
            <p>
                Monthly subscription fee of $10 USD.
            </p>
            <p>
                No obligation, no strings attached during the trial. Try it out, and if it works for you, we're here to support your yachting business.
            </p>
            <div className={c.bottomFixed}>
            <span className={c.price}>FREE</span>
            <button className={c.buy} onClick={() => {
                getLink(process.env.NEXT_PUBLIC_SUPPLIER_SUB_1)
            }}>FREE TRIAL</button>
            </div>
        </article>
        <article className={classNames('block', c.package)}>
            <Image src='/assets/package2.jpg' width={90} height={90} alt='Package 2' />
            <br /> 
            <div className={c.top}>
                <h5>Six-Month Package with 3 Months Free:</h5>
                <h6>Duration: 6 Months (Paid upfront at $30 USD)</h6>
            </div>
            <span className={c.tabl_title}>Features:</span>
            <p>
            Full Platform Access
            </p>
            <span className={c.tabl_title}>Payment:</span>
            <p>
                One-time payment of $30 USD, covering six months (equivalent to 3 months free).
            </p>
            <p>
                No recurring monthly charges during the 6-month period.
            </p>
            <p>
                Stay ahead with extended access to our platform and benefit from continuous improvements and innovations.
            </p>
            <div className={c.bottomFixed}>
            <span className={c.price}>30$</span>
            <button className={c.buy} onClick={() => {
                getLink(process.env.NEXT_PUBLIC_SUPPLIER_SUB_2)
            }}>Buy Now</button>
            </div>
        </article>
        <article className={classNames('block', c.package)}>
            <Image src='/assets/package3.jpg' width={90} height={90} alt='Package 3' />
            <br />
            <div className={c.top}>
                <h5>One-Year Subscription with 55% Discount</h5>
                <h6>Duration: 12 Months (Paid upfront at $54 USD)</h6>
            </div>
            <span className={c.tabl_title}>Features:</span>
            <p>
            Full Platform Access
            </p>
            <span className={c.tabl_title}>Payment:</span>
            <p>
                One-time payment of $54 USD, covering a full year (equivalent to more than 6 months free).
            </p>
            <p>
                No recurring monthly charges during the 12-month period.
            </p>
            <p>
                Secure your place in the Yachtease community and experience uninterrupted benefits while saving significantly with this annual subscription.
            </p>
            <div className={c.bottomFixed}>
            <span className={c.price}>54$</span>
            <button className={c.buy} onClick={() => {
                getLink(process.env.NEXT_PUBLIC_SUPPLIER_SUB_3)
            }}>Buy Now</button>
            </div>
        </article>
        </> : <>
        <article className={classNames('block', c.package)}>
            <Image src='/assets/package1.jpg' width={90} height={90} alt='Package 1' />
            <br />
            <div className={c.top}>
                <h5>No-Commitment Free Trial</h5>
                <h6>Duration: 1 Month</h6>
            </div>
            <span className={c.tabl_title}>Features:</span>
            <p>
                    Full Platform Access
                    </p>
            <span className={c.tabl_title}>After the Trial:</span>
            <p>
                At the end of the one-month trial period, you have the option to sign up for the paid version.
            </p>
            <p>
                Monthly subscription fee of $25 USD after the free trail.
            </p>
            <p>
                No obligation, no strings attached during the trial. Try it out, and if it works for you, we`re here to assist your yachting journey.
            </p>
            <div className={c.bottomFixed}>
            <span className={c.price}>FREE</span>
            <button className={c.buy} onClick={() => {
                getLink(process.env.NEXT_PUBLIC_YACTH_SUB_1)
            }}>FREE TRIAL</button>
            </div>
        </article>
        <article className={classNames('block', c.package)}>
            <Image src='/assets/package2.jpg' width={90} height={90} alt='Package 2' />
            <br />
            <div className={c.top}>
                <h5>Six-Month Package with 3 Months Free:</h5>
                <h6>Duration: 6 Months (Paid upfront at $75 USD)</h6>
            </div>
            <span className={c.tabl_title}>Features:</span>
            <p>
                    Full Platform Access
                    </p>
            <span className={c.tabl_title}>Payment:</span>
            <p>
                One-time payment of $75 USD, covering six months (equivalent to 3 months free).
            </p>
            <p>
                No recurring monthly charges during the 6-month period
            </p>
            <p>
                Make the most of your yachting journey with extended access to our platform and benefit from continuous improvements and innovations.
            </p>
            <div className={c.bottomFixed}>
            <span className={c.price}>75$</span>
            <button className={c.buy} onClick={() => {
                getLink(process.env.NEXT_PUBLIC_YACTH_SUB_2)
            }}>Buy Now</button>
            </div>
        </article>
        <article className={classNames('block', c.package)}>
            <Image src='/assets/package3.jpg' width={90} height={90} alt='Package 3' />
            <br />
            <div className={c.top}>
                <h5>One-Year Subscription with 55% Discount</h5>
                <h6>Duration: 12 Months (Paid upfront at $135 USD)</h6>
            </div>
            <span className={c.tabl_title}>Features:</span>
            <p>
                    Full Platform Access
                    </p>
            <span className={c.tabl_title}>Payment:</span>
            <p>
                One-time payment of $135 USD, covering a full year (equivalent to more than 6 months free).
            </p>
            <p>
                No recurring monthly charges during the 12-month period.
            </p>
            <p>
                Elevate your yachting journey with extended access to our platform and benefit from significant savings with this annual subscription.
            </p>
            <div className={c.bottomFixed}>
            <span className={c.price}>135$</span>
            <button className={c.buy} onClick={() => {
                getLink(process.env.NEXT_PUBLIC_YACTH_SUB_1)
            }}>Buy Now</button>
            </div>
        </article>
        </>}
    </section>
        }
        <section className={classNames(c.descr, 'container')}>
            <p>
                If you sign up for any of our packages, you will have access to the following:<br /><br />

                Create Your Unique Platform: Tailor your platform to your needs and preferences.<br />
                Team Collaboration: Yachts can add teammates, allowing different departments to share the same yacht profile.<br />
                Efficient Planning: Plan ahead with favorite suppliers for different locations.<br />
                Route Planner: Share locations and times privately with your teammates using our route planner.<br />
                Direct Messaging: Connect directly with suppliers through our unique messaging platform.<br />
                Quote Requests: Suppliers can send quotes directly through our platform.<br />
                Competitive Quotes: Receive competitive quotes from multiple suppliers with just a few clicks.<br />
                Geo-location Map: Easily find suppliers and the areas they service using our map feature.<br />
                Privacy Control: Hide certain information from other users with a simple click.<br />
                Experience these and more functionalities with Yachtease.<br /><br />

                Unlocking Progress through Contribution<br />
                At Yachtease, we're dedicated to providing you with the best possible platform for simplifying yachting operations. To achieve this, we've embarked on an exciting journey, and we invite you to join us on this path of innovation and excellence.<br />
                While we initially offered our platform for free during our early stages, we're now introducing a paid subscription model. We want to be transparent about why this change is happening and how it benefits everyone involved.<br />
                Your subscription fees play a pivotal role in our ability to grow and develop rapidly. Here's how:<br />
                Faster Enhancements: Your support allows us to invest in more resources, which translates to quicker updates and improvements. We can roll out new features and enhancements at a pace that ensures we're always one step ahead in meeting your needs.<br />
                Enhanced Services: With your contributions, we can expand our service offerings and provide you with a more comprehensive and valuable platform. This includes adding new tools, improving existing ones, and enhancing overall user experience.<br />
                Dedicated Support: We can maintain a responsive and knowledgeable support team to assist you promptly. Your questions, feedback, and concerns will receive the attention they deserve, ensuring a smoother journey for all users.<br />
                Sustainability: Sustainable growth is vital for the long-term success of any platform. Your subscriptions enable us to build a sustainable business model, ensuring Yachtease remains a reliable and evolving resource for the yachting community.<br />
                By choosing to subscribe and support Yachtease, you're not just a user; you're a valued contributor to our growth and development. <br /><br />

                Thank you, <br />
                The Yachtease Team
            </p>
        </section>
    </main>
}

export default layout