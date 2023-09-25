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
import Script from 'next/script'


const page: React.FC = () => {

    const isLogined = useAuthStore((state) => state.isLogined)
    const userData = useAuthStore((state) => state.userData)
    const router = useRouter()

    useEffect(() => {
        if (isLogined && (userData.role === 'YACHT' || userData.role === 'YACHT_BUSINESS' || userData.role === 'YACHT_TEAMMATE')) router.replace(RootURLsEnum.search)
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
                    <Button text='Order Services' className={c.btn} href={RootURLsEnum.registerChoose} />
                </div>
            </article>
            <article className={`container ${c.about}`}>
                <Title text='About Us' />
                <div className={c.about_info}>
                    <p>We are  your ultimate destination for luxury yacht rentals and unforgettable journeys across the globe! With Yachtease, you can explore stunning destinations and experience the thrill of sailing on a private yacht. Our site offers a wide selection of meticulously curated yachts to cater to your unique preferences. Discover the beauty of the world&#39;s oceans and create memories that will last a lifetime with Yachtease!</p>
                    <Image src='/assets/y1.png' alt='Yacht' width={344} height={280} />
                    <div className={c.specialization}>
                        <h2>Our specialization</h2>

                        <div>
                            <Image src="/assets/icon1.svg" alt="Geo-Location Suppliers" height={35} width={35} />
                            <p>Geo-Location Suppliers</p>
                        </div>
                        <div>
                            <Image src="/assets/icon2.svg" alt="PursersPal | Coming Soon!" height={35} width={35} />
                            <p>PursersPal | Coming Soon!</p>
                        </div>
                        <div>
                            <Image src="/assets/icon3.svg" alt="Quoting System" height={35} width={35} />
                            <p>Quoting System</p>
                        </div>
                    </div>
                </div>
                <Button text='Register' className={c.register} href={RootURLsEnum.registerChoose} />
            </article>
            <article className={`${c.features_container} container`}>
                <Title className={c.features_title}>Features</Title>
                <div className={c.features}>
                    <div className={c.feature}>
                        <div className={c.feature_image}>
                            <Image src='/assets/feature1.webp' alt='Feature 1' fill />
                        </div>
                        <div className={c.feature_texts}>
                            <h3>CHAT TO US</h3>
                            <p>Your feedback shapes our platform! We&#39;re committed to providing the best platform for you, and your input is crucial in making it exceptional. Use our Tawk chat feature to share feedback, report glitches, and suggest features that cater to your specific needs as a yacht, yacht crew or as a supplier. Let&#39;s collaborate to create a seamless and tailored experience. Your thoughts matter, and we&#39;re eager to hear from you on our instant chat.</p>
                        </div>
                    </div>
                    <div className={c.feature}>
                        <div className={c.feature_image}>
                            <Image src='/assets/feature2.webp' alt='Feature 2' fill />
                        </div>
                        <div className={c.feature_texts}>
                            <h3>GEO-LOCATION SUPPLIERS</h3>
                            <p>Our cutting-edge geo location platform, connecting yachts with suppliers seamlessly. Say farewell to time-consuming searches and embrace the convenience of finding everything you need, right in your area. Our user-friendly design allows yachts to quickly discover reputable suppliers for premium provisions, top-notch maintenance, and exclusive shore excursions nearby. Moreover, with our time-saving features, planning ahead for peak seasons ensuring a smooth and stress-free experience..</p>
                        </div>
                    </div>
                    <div className={c.feature}>
                        <div className={c.feature_image}>
                            <Image src='/assets/feature3.webp' alt='Feature 3' fill />
                        </div>
                        <div className={c.feature_texts}>
                            <h3>SUPPLIERS & EXPOSURE</h3>
                            <p>Seize the Benefits as a Supplier! Join our platform to discover a steady stream of new clients within the yachting industry, reach a wide and engaged target audience, and seize the opportunity to offer competitive quotes directly through our platform. Simplify your journey towards success by signing up as a supplier today and unlock a world of growth and possibilities in the yachting market.</p>
                        </div>
                    </div>
                    <div className={c.feature}>
                        <div className={c.feature_image}>
                            <Image src='/assets/feature4.webp' alt='Feature 4' fill />
                        </div>
                        <div className={c.feature_texts}>
                            <h3>Create new routes</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis, nulla quis aliquet tincidunt, augue turpis semper leo, vel egestas risus augue quis purus. Etiam a tempus mauris.</p>
                        </div>
                    </div>
                    <div className={c.feature}>
                        <div className={c.feature_image}>
                            <Image src='/assets/feature5.webp' alt='Feature 5' fill />
                        </div>
                        <div className={c.feature_texts}>
                            <h3>TEAM MANAGEMENT</h3>
                            <p>Take full control with our platform&#39;s team management feature. Easily coordinate and communicate with your team members regarding pick up point, suppliers and planning ahead to ensuring smooth operations on board. Additionally, you can add preferred suppliers to your yachts profile, streamlining the process of sourcing essential services and products. Plan Ahead with Precision.Our platform lets you map out future locations, allowing for proactive planning and smooth logistics. Prepare for upcoming destinations by logging preferred suppliers for each location, ensuring a hassle-free experience and securing the best services ahead of time.</p>
                        </div>
                    </div>
                </div>
            </article>
            <article className={`${c.signup} container`}>
                <Title className={c.centered_text}>Sign Up</Title>
                <h3>Register on our website and learn all the advantages of our<br /> services!</h3>
                <Button text='Sign Up' className={c.signup_btn} href={RootURLsEnum.registerChoose} />
            </article>
        </main>
        <Footer />
    </div>
    </>

}

export default page