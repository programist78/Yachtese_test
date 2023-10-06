import React from 'react'
import Title from '../../../src/components/Title/Title'
import c from './Instructions.module.scss'
import Image from 'next/image'


const page: React.FC = () => {
    return <main>
        <article className={`${c.top} filtered_image_container`}>
            <Image quality={100} fill priority src='/assets/instructions.webp' alt='Yacht' />
            <div className={c.top_texts}>
                <Title className={c.title}>How to Use<br />Yachtease</Title>
                <span>Before you start using our site, you should familiarize yourself with the instructions for using our site so that it will be convenient and easy for you in the future!</span>
            </div>
        </article>
        <article className={`${c.texts} container`}>
            <div className={c.block}>
                <h2>Step 1: Register on Yachtease</h2>
                <div>
                    Click on any of the "Sign Up" buttons. You will then be redirected to a page with two distinct options:<br/>
                    1. Supplier: If you are a supplier offering services to yachts, select this option to register your business.<br/>
                    2. Yacht: If you are a yacht captain or part of the yacht's crew, choose this option to sign up and access Yachtease's resources for yachts and their crew.
                </div>
            </div>
            <div className={c.block}>
                <h2>Step 2: Registration Form</h2>
                <div>
                    Yachts or Suppliers<br/>
                    Whether you're a yacht or a supplier, please complete the registration form with your company or yacht information. Here's a suggestion for yachts:<br/><br/>
                    For Yachts:<br/>
                    We recommend that the Purser or Captain initiates the first profile for the yacht. They can then invite Heads of Departments to sign up as teammates, granting them access to the same yacht profile information.<br/>
                    This collaborative approach ensures that all relevant parties have access to and can contribute to the yacht's profile on Yachtease.<br/>
                </div>
            </div>
            <div className={c.block}>
                <h2>Step 3: Creating Your Unique Profile</h2>
                <div>
                    Whether you're a supplier or a yacht, it's time to build your profile. Here's how:<br/><br/>
                    For Suppliers:<br/>
                    - Add vital contact information to facilitate easy communication.<br/>
                    - Specify your location and the service radius to help yachts find you efficiently.<br/>
                    - Enhance your profile with captivating images showcasing your offerings.<br/>
                    - Craft an informative description detailing what your company provides and what makes you stand out from the rest.<br/>
                    - In the bottom left, select your display information preferences to determine what is visible on your profile.<br/><br/>
                    For Yachts:<br/>
                    - Setting up a yacht profile is simple and requires less information.<br/>
                    - Include basic contact details for smooth communication.<br/>
                    - Yachts have the option to upload a profile image to showcase their vessel.<br/>
                    - In the bottom left, select your display information preferences to control what is visible on your profile.<br/>
                    - Note that a yacht profile only becomes visible to a supplier once contact has been established with a supplier.<br/>
                </div>
            </div>
            <div className={c.block}>
                <h2>Step 4: Explore and Enjoy Our Platform</h2>
                <div>
                    Congratulations, you're all set to make the most of our platform!<br/><br/>
                    Feel free to:<br/>
                    - Explore the platform's features and functionalities.<br/>
                    - Connect with other users, whether you're a yacht or a supplier by using our messaging platform.<br/>
                    - Use our chat icon for any questions, suggestions, or if you need assistance along the way.<br/>
                    - Search our map for supplier.<br/><br/>
                    We're here to make your yachting experience exceptional, so don't hesitate to reach out. Happy exploring! 
                </div>
            </div>
            <div className={c.block}>
                <h2>Step 5: Share the Yachtease Experience</h2>
                <div>
                    Spread the word and share the Yachtease platform with your industry friends! The more people we have on board, the better the platform becomes for everyone involved. Your support and referrals are invaluable in making the yachting community thrive. Thank you for being a part of our journey to enhance the yachting industry together!
                </div>
            </div>
        </article>
        <article className={`${c.top} filtered_image_container`}>
            <Image quality={100} fill priority src='/assets/instructions-yacht-second.jpeg' alt='Yacht' />
            <Title className={c.second_title}>Yachting Simplified</Title>
        </article>
    </main>
}

export default page
