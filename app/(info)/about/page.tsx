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
                Welcome to Yachtease, the premier online platform that offers an extraordinary collection of luxury yachts for rent, allowing you to embark on remarkable journeys to diverse destinations across the globe. Whether you are a seasoned sailor or a first-time adventurer, our site provides an unparalleled selection of meticulously curated yachts and personalized itineraries to fulfill your dreams of a perfect yacht vacation.
            </p>
            <p>
                <b>Luxury Yachts for Every Occasion:</b><br />At Yachtease, we understand that every journey is unique, and we strive to provide an extensive range of luxury yachts to suit various preferences and group sizes. From sleek motor yachts to elegant sailing vessels, our fleet comprises the finest collection of well-maintained and opulent yachts that offer exceptional comfort, style, and performance. We partner with renowned yacht owners and operators worldwide to ensure that you have access to the most prestigious and awe-inspiring vessels.
            </p>
            <p>
                <b>Explore the World&#39;s Most Exquisite Destinations:</b><br />Indulge in unforgettable voyages to some of the world&#39;s most captivating destinations. Yachtease offers an impressive selection of regions to explore, ranging from the azure waters of the Mediterranean to the idyllic islands of the Caribbean, the exotic allure of Southeast Asia, the untamed beauty of the South Pacific, and beyond. Whether you crave vibrant cosmopolitan cities, secluded tropical hideaways, or breathtaking natural landscapes, our tailored itineraries cover a wide array of destinations to satisfy your wanderlust.
            </p>
            <p>
                <b>Tailored Itineraries for Unparalleled Experiences:</b><br />At Yachtease, we believe in delivering personalized experiences that surpass expectations. Our team of experienced travel experts collaborates closely with you to create bespoke itineraries tailored to your specific desires. Whether you envision a thrilling adventure along the French Riviera, a romantic escape to the Greek Islands, an exploration of remote Caribbean islands, or a cultural journey through Southeast Asia, we meticulously plan every detail to ensure a seamless and unforgettable voyage. From onboard activities and water sports to curated shore excursions, we strive to craft an itinerary that reflects your unique preferences.
            </p>
            <p>
                <b>Effortless Booking Process:</b><br />Booking your dream yacht charter has never been easier. Our user-friendly website provides a seamless and intuitive booking process, allowing you to browse available yachts, compare features and prices, and make secure reservations with just a few clicks. Our dedicated customer support team is available around the clock to assist you at every step, providing guidance, answering your queries, and offering valuable recommendations to enhance your experience.
            </p>
        </article>
        <article className={classNames(c.sea, 'filtered_image_container')}>
            <Image quality={100} fill priority src='/assets/about-bottom.webp' alt='Sea'/>
        </article>
    </main>
}

export default page