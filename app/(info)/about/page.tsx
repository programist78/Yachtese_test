import React from 'react'
import c from './About.module.scss'
import classNames from 'classnames'
import Title from '../../../src/components/Title/Title'
import Image from 'next/image'


const page: React.FC = () => {
    return <main className={c.main}>
        <article className={classNames(c.top, 'filtered_image_container')}>
            <Image quality={100} fill priority src='/assets/about-yacht.webp' alt='Yacht' />
            <Title text='Yachting Simplified' className={c.title} />
        </article>
        <article className={classNames('container', c.texts)}>
            <Title text='AbouT Us' />
            <p>
                Discover a Yachting Revolution
            </p>
            <p>
                Welcome to Yachtease, where we're on a mission to redefine your yachting experience, inspired by the challenges faced in the high-octane world of fast-paced yachts. As an ex-head of service who knows the demands of balancing guest interactions with meticulous planning and provisioning, I saw the potential for a groundbreaking platform that could streamline the backstage work, liberating more time for the hands-on tasks that small teams often grapple with.
            </p>
            <p>
                <b>Your Journey, Our Commitment:</b><br />Drawing from firsthand experience, we understand the relentless pace of yachting life, where every minute counts. Our platform is meticulously crafted to be your ally in the quest for efficiency. Imagine a tool that effortlessly cuts down the time and effort spent on finding suppliers, initiating contact, obtaining competitive quotes, and strategising for those dynamic seasons when your location changes daily.
            </p>
            <p>
                <b>Your Trusted Partners, Always Within Reach: </b><br />Imagine having a favorite suppliers list that transcends departments, a list that can be curated by the purser or captain, ensuring that every head of department can access and rely on trusted partners. Yachtease is more than a platform; it's your dedicated support system.
            </p>
            <p>
                <b>Your Voice Shapes Our Odyssey:</b><br />At Yachtease, we value your insight and perspective. As someone who's walked the deck and knows the ropes, your feedback is instrumental in shaping our journey. Share your ideas, suggestions, or concerns with ease through our convenient tawk chat feature or send us an email on hello@yachtease.co, and watch as your insights steer our platform towards perfection.
            </p>
            <p>
                <b>Embark on a Voyage of Efficiency:</b><br />Join Yachtease today, and step into a future where you can finally dedicate more of your precious time to what truly matters - delivering excellence to your guests and ensuring smooth sailing for your crew. Let's revolutionize the yachting world together, making efficiency and collaboration our guiding stars.
            </p>
            <p>
                Thank you for being part of this thrilling adventure!<br/>
                Set Sail for Success,<br/>
                Yachtease<br/>
            </p>
        </article>
        <article className={classNames(c.sea, 'filtered_image_container')}>
            <Image quality={100} fill priority src='/assets/about-bottom.webp' alt='Sea'/>
        </article>
    </main>
}

export default page