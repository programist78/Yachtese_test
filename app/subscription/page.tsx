'use client'
import type { FC } from 'react'
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

const layout: FC = () => {
    const [buy] = useMutation(BUY_LINK)
    const isLogined = useAuthStore((state) => state.isLogined)
    const userData = useAuthStore((state) => state.userData)
    const { push } = useRouter()

    const getLink = (productId: string, priceKey: string) => {

        if (!isLogined) return push(RootURLsEnum.homepage)

        buy({
            variables: {
                paymentCheckoutInput: {
                    productId,
                    priceKey
                }
            }
        }).then(({ data, errors }) => {
            if (errors) return errorAlert()
            location.href = data.paymentCheckout.url
        }).catch(errorAlert)
    }

    return <main className={c.main}>
        <section>
            <Title className={c.title}>{!isLogined || userData.role === 'SUPPLIER' ? 'Supplier Subscription Options' : 'Yacht Subscription Options'}</Title>
            <h2>One Step Away from Simplifying Your Job</h2>
            <div className='container'>
                {!isLogined || userData.role === 'SUPPLIER'
                ? <h3>Discover the time-saving benefits of Yachtease. Simplify your yachting operations, connect effortlessly with suppliers, and streamline your planning. Join us to make the most of your time on the water.</h3>
                : <h3>Suppliers, join Yachtease to elevate your business. Connect with yachts effortlessly, offer seamless services, and expand your reach. Discover how Yachtease can boost your efficiency and growth in the yachting industry.</h3>}
                </div>
        </section>
        <section className={classNames('container', c.packages)}>
            {!isLogined || userData.role === 'SUPPLIER' ? <>
            <article className={classNames('block', c.package)}>
                <Image src='/assets/package1.svg' width={90} height={90} alt='Package 1' />
                <h5>No-Commitment Free Trial</h5>
                <h6>Duration: 1 Month</h6>
                <span className={c.tabl_title}>Features:</span>
                <p>
                    Full access to all platform features for one month.
                </p>
                <p>
                    Connect with yachts, offer services, and expand your reach.
                </p>
                <p>
                    Experience the power of Yachtease with no commitment.
                </p>
                <p>
                    Gain insights into how our platform can boost your efficiency in the yachting industry.
                </p>
                <p>
                    Access to our support team for assistance and guidance during your trial.
                </p>
                <p>
                    Provide valuable feedback to help us improve the platform based on your needs.
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
                <span className={c.price}>FREE</span>
                <button className={c.buy} onClick={() => {
                    getLink('prod_OlZ0IMmmQ8qwfq', 'price_1Ny1sGJjsA7WDmLer0ZD5CCW')
                }}>FREE TRIAL</button>
            </article>
            <article className={classNames('block', c.package)}>
                <Image src='/assets/package2.svg' width={90} height={90} alt='Package 2' />
                <h5>Six-Month Package with 3 Months Free:</h5>
                <h6>Duration: 6 Months (Paid upfront at $30 USD)</h6>
                <span className={c.tabl_title}>Features:</span>
                <p>
                    Full access to all platform features for six months.
                </p>
                <p>
                    Connect with yachts, offer services, and expand your reach.
                </p>
                <p>
                    Experience the power of Yachtease with a generous 3-month discount.
                </p>
                <p>
                    Gain insights into how our platform can boost your efficiency in the yachting industry.
                </p>
                <p>
                    Access to our support team for assistance and guidance during your subscription.
                </p>
                <p>
                    Provide valuable feedback to help us improve the platform based on your needs.
                </p>
                <p>
                    Enjoy access to any updates or new features introduced during your subscription period.
                </p>
                <p>
                    Free cancellation within the first 7 days if you decide Yachtease isn't the right fit for your business.
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
                <span className={c.price}>30$</span>
                <button className={c.buy}>Buy Now</button>
            </article>
            <article className={classNames('block', c.package)}>
                <Image src='/assets/package3.svg' width={90} height={90} alt='Package 3' />
                <h5>One-Year Subscription with 55% Discount</h5>
                <h6>Duration: 12 Months (Paid upfront at $54 USD)</h6>
                <span className={c.tabl_title}>Features:</span>
                <p>
                    Full access to all platform features for one year.
                </p>
                <p>
                    Connect with yachts, offer services, and expand your reach.
                </p>
                <p>
                    Enjoy an incredible 55% discount with our one-year subscription.
                </p>
                <p>
                    Gain insights into how our platform can boost your efficiency in the yachting industry.
                </p>
                <p>
                    Access to our support team for assistance and guidance throughout your subscription.
                </p>
                <p>
                    Provide valuable feedback to help us improve the platform based on your needs.
                </p>
                <p>
                    Stay up-to-date with access to any updates or new features introduced during your subscription period.
                </p>
                <p>
                    Free cancellation within the first 7 days if you decide Yachtease isn't the right fit for your business.
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
                <span className={c.price}>54$</span>
                <button className={c.buy}>Buy Now</button>
            </article>
            </> : <>
            <article className={classNames('block', c.package)}>
                <Image src='/assets/package1.svg' width={90} height={90} alt='Package 1' />
                <h5>No-Commitment Free Trial</h5>
                <h6>Duration: 1 Month</h6>
                <span className={c.tabl_title}>Features:</span>
                <p>
                    Full access to all platform features for one month.
                </p>
                <p>
                    Connect with suppliers, plan routes, and streamline operations.
                </p>
                <p>
                    Experience the power of Yachtease with no commitment.
                </p>
                <p>
                    Gain insights into how our platform can simplify your yachting.
                </p>
                <p>
                    Access to our support team for assistance and guidance during your trial.
                </p>
                <p>
                    Provide valuable feedback to help us improve the platform based on your needs.
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
                <span className={c.price}>FREE</span>
                <button className={c.buy} onClick={() => {
                    getLink('prod_OlZ0IMmmQ8qwfq', 'price_1Ny1sGJjsA7WDmLer0ZD5CCW')
                }}>FREE TRIAL</button>
            </article>
            <article className={classNames('block', c.package)}>
                <Image src='/assets/package2.svg' width={90} height={90} alt='Package 2' />
                <h5>Six-Month Package with 3 Months Free:</h5>
                <h6>Duration: 6 Months (Paid upfront at $75 USD)</h6>
                <span className={c.tabl_title}>Features:</span>
                <p>
                    Full access to all platform features for six months.
                </p>
                <p>
                    Connect with suppliers, plan routes, and streamline operations.
                </p>
                <p>
                    Experience the power of Yachtease with a generous 3-month discount.
                </p>
                <p>
                    Gain insights into how our platform can simplify your yachting experience.
                </p>
                <p>
                    Access to our support team for assistance and guidance during your subscription.
                </p>
                <p>
                    Provide valuable feedback to help us improve the platform based on your needs.
                </p>
                <p>
                    Enjoy access to any updates or new features introduced during your subscription period.
                </p>
                <p>
                    Free cancellation within the first 7 days if you decide Yachtease isn't the right fit for your yacht.
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
                <span className={c.price}>75$</span>
                <button className={c.buy}>Buy Now</button>
            </article>
            <article className={classNames('block', c.package)}>
                <Image src='/assets/package3.svg' width={90} height={90} alt='Package 3' />
                <h5>One-Year Subscription with 55% Discount</h5>
                <h6>Duration: 12 Months (Paid upfront at $135 USD)</h6>
                <span className={c.tabl_title}>Features:</span>
                <p>
                    Full access to all platform features for one year.
                </p>
                <p>
                    Connect with suppliers, plan routes, and streamline operations.
                </p>
                <p>
                    Enjoy an incredible 55% discount with our one-year subscription.
                </p>
                <p>
                    Gain insights into how our platform can simplify your yachting experience.
                </p>
                <p>
                    Access to our support team for assistance and guidance throughout your subscription.
                </p>
                <p>
                    Provide valuable feedback to help us improve the platform based on your needs.
                </p>
                <p>
                    Stay up-to-date with access to any updates or new features introduced during your subscription period.
                </p>
                <p>
                    Free cancellation within the first 7 days if you decide Yachtease isn't the right fit for your yacht.
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
                <span className={c.price}>135$</span>
                <button className={c.buy}>Buy Now</button>
            </article>
            </>}
        </section>
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