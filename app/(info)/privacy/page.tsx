import React from 'react'
import Title from '../../../src/components/Title/Title'
import c from './Privacy.module.scss'
import Image from 'next/image'


const page: React.FC = () => {
    return <main>
        <article className={`${c.top} filtered_image_container`}>
            <Image quality={100} fill priority src='/assets/privacy-yacht.webp' alt='Yacht' />
            <Title className={c.title}>Terms og Use<br /> And<br /> Privacy Policy</Title>
        </article>
        <article className={`${c.texts} container`}>
            <div className={c.first}>
                <b>Terms of Use - Yachtease</b><br /><br />

                Last Updated: 26 September 2023<br/>
                Welcome to Yachtease! By accessing and using our website, you agree to abide by the following terms and conditions. Please read these terms carefully before proceeding:<br /><br />

                <Text num={1}>Acceptance of Terms: When you access and use our website, you acknowledge and accept these Terms of Use. If you disagree with any part of these terms, please refrain from using our website.</Text>
                <Text num={2}>Rental Agreements: Yachtease serves as a platform that connects yacht owners/operators with individuals seeking to rent yachts ("Users"). Any rental agreements or contracts between Users and yacht owners/operators are solely between those parties. Yachtease is not a party to any rental agreement or contract and assumes no responsibility or liability for any disputes, damages, or issues arising from such agreements.</Text>
                <Text num={3}>Eligibility: To use our website, you must be 18 years of age or older and have the legal capacity to enter into binding agreements. By using our website, you represent that you meet these criteria.</Text>
                <Text num={4}>User Conduct: You agree to use our website for lawful purposes and in compliance with all applicable laws and regulations. You shall not engage in any activities that disrupt or interfere with the proper functioning of our website or infringe upon the rights of others.</Text>
                <Text num={5}>Intellectual Property: All content and materials on our website, including text, images, graphics, logos, and trademarks, are the intellectual property of Yachtease or its licensors. You agree not to reproduce, distribute, modify, or exploit any content from our website without prior written permission from Yachtease.</Text>
                <Text num={6}>Third-Party Websites: Our website may contain links to third-party websites for your convenience. Yachtease does not endorse or assume any responsibility for the content, products, or services provided by these third-party websites. Accessing and using these third-party websites is done at your own risk.</Text>
                <Text num={7}> Limitation of Liability: Yachtease shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use our website or any content or services provided therein. Yachtease does not guarantee the accuracy, completeness, or timeliness of any information or content on our website.</Text>
                <Text num={8}>Modification and Termination: Yachtease reserves the right to modify, suspend, or terminate our website or any part thereof at any time without prior notice. We may also modify these Terms of Use periodically, with such modifications becoming effective upon posting on the website. Your continued use of our website after any modifications constitutes your acceptance of the updated terms.</Text>
            </div>
            <div>
                <b>Privacy Policy</b><br /><br />

                We take your privacy seriously at Yachtease. This Privacy Policy outlines how we collect, use, and protect your information as you use our platform designed to simplify yachting operations and enhance efficiency. By using the Yachtease website ("the Site"), you consent to the practices described below:<br /><br />

                <Text num={1}>Information Collection: We may collect personal information, such as your name, contact details, and payment information when you register an account, make reservations, or communicate with us through the Site. We may also collect non-personal information, including but not limited to your IP address, browser type, and device information.</Text>
                <Text num={2}>Use of Information: We use the collected information to facilitate yacht rentals, process payments, respond to inquiries, provide customer support, and improve the Site's functionality. We may also use aggregated, non-identifiable information for analytical and statistical purposes.</Text>
                <Text num={3}>Data Sharing: Yachtease may share your personal information with yacht owners/operators to facilitate reservations and fulfill rental agreements. We may also share information with trusted service providers who assist us in operating the Site and delivering our services. We do not sell or rent your personal information to third parties for marketing purposes.</Text>
                <Text num={4}>Data Security: We employ industry-standard security measures to protect your information from unauthorized access, disclosure, or alteration. However, please note that no data transmission over the internet or electronic storage method can guarantee absolute security.</Text>
                <Text num={5}>Cookies and Tracking Technologies: The Site may use cookies and similar tracking technologies to enhance your browsing experience and collect information about how you interact with the Site. You can modify your browser settings to reject cookies, but this may limit certain functionalities of the Site.</Text>
                <Text num={6}>Third-Party Links: The Site may contain links to third-party websites. Yachtease is not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of those websites before providing any personal information.</Text>
                <Text num={7}>Children's Privacy: The Site is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware of any personal information collected from a child, we will take appropriate steps to remove that information from our records.</Text>
                <Text num={8}>Changes to the Privacy Policy: Yachtease reserves the right to update.</Text>
            </div>
        </article>
    </main>
}

const Text: React.FC<{ num: number, children: string }> = ({ num, children }) => {
    return <div className={c.text}>
        <div className={c.number}>{num}.</div>{children}<br />
    </div>
}

export default page