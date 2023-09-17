import classNames from 'classnames'
import React from 'react'
import Title from '../../../src/components/Title/Title'
import c from './Instructions.module.scss'
import Image from 'next/image'


const page: React.FC = () => {
    return <main>
        <article className={`${c.top} filtered_image_container`}>
            <Image quality={100} fill priority src='/assets/instructions-yacht.png' alt='Yacht' />
            <div className={c.top_texts}>
                <Title className={c.title}>How to Use<br />Yachtease</Title>
                <span>Before you start using our site, you should familiarize yourself with the instructions for using our site so that it will be convenient and easy for you in the future!</span>
            </div>
        </article>
        <article className={`${c.texts} container`}>
            <div className={c.block}>
                <h2>Step 1: Registration</h2>
                <div>
                    To begin using Yachtease, visit our website at www.yachtease.com. Click on the &quot;Register&quot; or &quot;Sign Up&quot; button to create an account. Provide the required information, including your name, email address, and password. Read and accept the terms of use and privacy policy. Once registered, you can access all the features and services available on the site.
                </div>
            </div>
            <div className={c.block}>
                <h2>Step 2: Browsing and Searching</h2>
                <div>
                    Once logged in, you can start browsing and searching for available yachts. Use the search bar or filters to narrow down your options based on destination, yacht type, dates, and other preferences. Explore the yacht profiles to view detailed information, including specifications, amenities, and photos.
                </div>
            </div>
            <div className={c.block}>
                <h2>Step 3: Selecting a Yacht </h2>
                <div>
                    When you find a yacht that meets your requirements, click on it to access more details. Review the rental terms, pricing, and availability calendar. If the yacht suits your needs, proceed to the booking process.
                </div>
            </div>
            <div className={c.block}>
                <h2>Step 4: Booking Process</h2>
                <div>
                    Click on the &quot;Book Now&quot; or &quot;Request to Book&quot; button on the yacht&#39;s profile. Fill in the required booking details, such as the desired dates, the number of guests, and any additional services or requests. Review the booking summary and total cost. If you agree, proceed to the payment process.
                </div>
            </div>
            <div className={c.block}>
                <h2>Step 5: Payment</h2>
                <div>
                    Yachtease offers secure online payment options. Choose your preferred payment method (credit card, bank transfer, etc.) and follow the prompts to complete the transaction. Ensure that you provide accurate billing information and review the payment details before confirming your reservation.
                </div>
            </div>
            <div className={c.block}>
                <h2>Step 6: Confirmation and Communication</h2>
                <div>
                    After a successful booking, you will receive a confirmation email with the relevant details of your reservation. You can also access your booking information and communicate with the yacht owner/operator through your Yachtease account. Any additional arrangements or special requests can be discussed and coordinated directly with the yacht provider.
                </div>
            </div>
            <div className={c.block}>
                <h2>Step 7: Preparing for the Journey</h2>
                <div>
                    Before your trip, make sure to familiarize yourself with the yacht&#39;s specific instructions and policies provided by the owner/operator. Pack accordingly, considering the destination&#39;s climate and any recommended items. Stay in touch with the yacht provider to address any last-minute queries or updates.
                </div>
            </div>
            <div className={c.block}>
                <h2>Step 8: Enjoy Your Yacht Ride</h2>
                <div>
                    On the day of your reservation, arrive at the designated marina or meeting point. Meet the yacht owner/operator or designated crew members who will welcome you on board. Enjoy your yacht ride, follow safety instructions, and embrace the experience of cruising the stunning waters of your chosen destination.
                </div>
            </div>
            <div className={c.block}>
                <h2>Step 9: Post-Trip Feedback</h2>
                <div>
                    After your journey, we value your feedback. Share your experience by leaving a review on the Yachtease platform. Your feedback helps us maintain the quality of our services and assists future users in their decision-making process.
                </div>
            </div>
            <div className={c.block}>
                <h2>Step 10: Assistance and Support</h2>
                <div>
                    If you have any questions, concerns, or need assistance at any point during the process, feel free to contact our customer support team. We are available via email or phone to address your inquiries and provide guidance throughout your Yachtease experience.
                </div>
            </div>
        </article>
        <article className={`${c.top} filtered_image_container`}>
            <Image quality={100} fill priority src='/assets/instructions-yacht-second.png' alt='Yacht' />
            <Title className={c.second_title}>Yachting Simplified</Title>
        </article>
    </main>
}

export default page
