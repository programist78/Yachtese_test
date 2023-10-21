'use client'
import React, { useEffect } from 'react'
import c from './Home.module.scss'
import Button from '../src/components/Button/Button'
import Title from '../src/components/Title/Title'
import { RootURLsEnum } from '../src/config/constants'
import Footer from '../src/components/Footer/Footer'
import Image from 'next/image'
import useAuthStore from '../src/stores/useAuthStore'
import { useRouter } from 'next/navigation'


const page: React.FC = () => {

    const isLogined = useAuthStore((state) => state.isLogined)
    const userData = useAuthStore((state) => state.userData)
    const router = useRouter()

    useEffect(() => {
        if (isLogined && (userData.role === 'YACHT' || userData.role === 'YACHT_BUSINESS' || userData.role === 'YACHT_TEAMMATE')) router.replace(RootURLsEnum.subscription)
    }, [router, isLogined, userData])

    return <><div className='main'>
        <main className={c.main}>
            <article className={`${c.top} filtered_image_container`}>
                <Image quality={100} fill priority src='/assets/yacht.webp' alt='Yacht' />
                <div className={c.top_texts}>
                    <Title text='Welcome' />
                    <p className={c.text}>
                        Welcome to Yachtease, where the era of simplified yachting begins with phase one of our groundbreaking journey. We are thrilled to announce our official launch, and our sole objective is crystal clear: simplified. But hold on tight because this is just the beginning. We have an exciting array of innovations still coming your way.
                    </p>
                    <Button text='Sign Up' className={c.btn} href={RootURLsEnum.registerChoose} />
                </div>
            </article>
            <article className={`container ${c.about}`}>
                <Title text='About Us' />
                <div className={c.about_info}>
                    <p>Our main goal is to help you!  We've been in the yachting industry for a long time, and one big problem we've seen is that people are always short on time. There's often not enough crew, and everyone is rushed. We've seen Pursers struggling to keep up with all their tasks. This got us thinking: How can we make their lives easier? What can we do to save them time, and what jobs can we take off their hands?<br />
                        Our platform is all about making things simpler for the people who work on yachts and the suppliers who help with yacht operations.<br />
                        We want to invite you to sign up and join us on this journey. You can help us make the platform just right for you.<br />
                        We really value your feedback, and we have a chat feature where you can easily talk to us and share your thoughts, suggestions, and ideas for making things better.<br />
                        We're excited about the chance to make your yachting experience easier with Yachtease. Let's work together to make a big difference!</p>
                    <Image src='/assets/y1.webp' alt='Yacht' width={344} height={280} />
                    <div className={c.specialization}>
                        <h2>Our Approach</h2>

                        <div>
                            <Image src="/assets/icon1.png" alt="Geo-Location Suppliers" height={35} width={35} />
                            <p>Geo-Location Suppliers</p>
                        </div>
                        <div>
                            <Image src="/assets/icon2.png" alt="PursersPal | Coming Soon!" height={35} width={35} />
                            <p>Competitive Supplier Quotes</p>
                        </div>
                        <div>
                            <Image src="/assets/icon3.png" alt="Quoting System" height={35} width={35} />
                            <p>Direct Messaging System</p>
                        </div>
                        <div>
                            <Image src="/assets/icon4.png" alt="Quoting System" height={35} width={35} />
                            <p>Purserspal Coming Soon</p>
                        </div>
                    </div>
                </div>
                <Button text='Sign Up' className={c.register} href={RootURLsEnum.registerChoose} />
            </article>
            <article className={`${c.features_container} container`}>
                <Title className={c.features_title}>Features</Title>
                <div className={c.features}>
                    <div className={c.feature}>
                        <div className={c.feature_image}>
                            <Image src='/assets/chat.png' alt='Feature 1' fill />
                        </div>
                        <div className={c.feature_texts}>
                            <h3>CHAT TO US</h3>
                            <p>Your feedback shapes our platform! We&#39;re committed to providing the best platform for you, and your input is crucial in making it exceptional. Use our Tawk chat feature to share feedback, report glitches, and suggest features that cater to your specific needs as a yacht, yacht crew or as a supplier. Let&#39;s collaborate to create a seamless and tailored experience. Your thoughts matter, and we&#39;re eager to hear from you on our instant chat.</p>
                        </div>
                    </div>
                    <div className={c.feature}>
                        <div className={c.feature_image}>
                            <Image src='/assets/map.png' alt='Feature 2' fill />
                        </div>
                        <div className={c.feature_texts}>
                            <h3>GEO-LOCATION SUPPLIERS</h3>
                            <p>Our cutting-edge geo location platform, connecting yachts with suppliers seamlessly. Say farewell to time-consuming searches and embrace the convenience of finding everything you need, right in your area. Our user-friendly design allows yachts to quickly discover reputable suppliers for premium provisions, top-notch maintenance, and exclusive shore excursions nearby. Moreover, with our time-saving features, planning ahead for peak seasons ensuring a smooth and stress-free experience..</p>
                        </div>
                    </div>
                    <div className={c.feature}>
                        <div className={c.feature_image}>
                            <Image src='/assets/table.jpeg' alt='Feature 3' fill />
                        </div>
                        <div className={c.feature_texts}>
                            <h3>SUPPLIERS & EXPOSURE</h3>
                            <p>Seize the Benefits as a Supplier! Join our platform to discover a steady stream of new clients within the yachting industry, reach a wide and engaged target audience, and seize the opportunity to offer competitive quotes directly through our platform. Simplify your journey towards success by signing up as a supplier today and unlock a world of growth and possibilities in the yachting market.</p>
                        </div>
                    </div>
                    <div className={c.feature}>
                        <div className={c.feature_image}>
                            <Image src='/assets/calc.jpeg' alt='Feature 4' fill />
                        </div>
                        <div className={c.feature_texts}>
                            <h3>MESSAGING PLATFORM</h3>
                            <p>Our messaging platform, right on the website, makes it super easy to communicate with a wide range of suppliers. You'll find it's a breeze to request competitive price quotes with just a few clicks. Suppliers, on the other hand, can directly connect with yachts and tap into a vast network of potential new clients. Consider this platform as the efficient and modern way to communicate in the evolving world of yachting.</p>
                        </div>
                    </div>
                    <div className={c.feature}>
                        <div className={c.feature_image}>
                            <Image src='/assets/yacht-feature.jpeg' alt='Feature 5' fill />
                        </div>
                        <div className={c.feature_texts}>
                            <h3>TEAM MANAGEMENT</h3>
                            <p>Take full control of your yachting journey with our platform's team management feature. Easily coordinate and communicate with your team members regarding pick up point, suppliers and planning ahead to ensuring smooth operations on board. <br/>
                            Additionally, you can add preferred suppliers to your yacht profile, streamlining the process of sourcing essential services and products.<br/>
                            Plan Ahead with Precision. Our platform lets you map out future locations, allowing for proactive planning and smooth logistics. Prepare for upcoming destinations by logging preferred suppliers for each location, ensuring a hassle-free experience and securing the best services ahead of time. Prepare for upcoming destinations by logging preferred suppliers for each location, ensuring a hassle-free experience and securing the best services ahead of time.</p>
                        </div>
                    </div>
                </div>
            </article>
            <article className={`${c.signup} container`}>
                <Title className={c.centered_text}>Sign Up</Title>
                <h3>
                    If you sign up for any of our packages, you will have access to the following:<br/><br/>
                    - Create Your Unique Platform: Tailor your platform to your needs and preferences.<br/>
                    - Team Collaboration: Yachts can add teammates, allowing different departments to share the same yacht profile.<br/>
                    - Efficient Planning: Plan ahead with favorite suppliers for different locations.<br/>
                    - Route Planner: Share locations and times privately with your teammates using our route planner.<br/>
                    - Direct Messaging: Connect directly with suppliers through our unique messaging platform.<br/>
                    - Quote Requests: Suppliers can send quotes directly through our platform.<br/>
                    - Competitive Quotes: Receive competitive quotes from multiple suppliers with just a few clicks.<br/>
                    - Geo-location Map: Easily find suppliers and the areas they service using our map feature.<br/>
                    - Privacy Control: Hide certain information from other users with a simple click.<br/>
                    - Experience these and more functionalities with Yachtease
                </h3>
                <Button text='Sign Up' className={c.signup_btn} href={RootURLsEnum.registerChoose} />
            </article>
        </main>
        <Footer />
    </div>
    </>

}

export default page