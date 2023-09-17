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
                <b>Terms of Use</b><br /><br />

                By accessing and using the Yachtease website, you agree to comply with the following terms and conditions of use. Please read these terms carefully before proceeding:<br /><br />

                <Text num={1}>Acceptance of Terms: By accessing and using the Site, you acknowledge and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please refrain from using the Site.</Text>
                <Text num={2}>Rental Agreements: Yachtease acts as an intermediary platform connecting yacht owners/operators with individuals seeking to rent yachts (&#34;Users&#34;). Any rental agreements or contracts entered into between Users and yacht owners/operators are solely between the parties involved. Yachtease is not a party to any rental agreement or contract and assumes no responsibility or liability for any disputes, damages, or issues arising from such agreements.</Text>
                <Text num={3}>Eligibility: You must be 18 years or older to use the Site. By using the Site, you represent that you are at least 18 years of age and have the legal capacity to enter into binding agreements.</Text>
                <Text num={4}>User Conduct: You agree to use the Site for lawful purposes and in compliance with all applicable laws and regulations. You shall not engage in any activity that may disrupt or interfere with the proper functioning of the Site or infringe upon the rights of others.</Text>
                <Text num={5}>Intellectual Property: All content and materials on the Site, including but not limited to text, images, graphics, logos, and trademarks, are the intellectual property of Yachtease or its licensors. You agree not to reproduce, distribute, modify, or exploit any content from the Site without prior written permission from Yachtease.</Text>
                <Text num={6}>Third-Party Websites: The Site may contain links to third-party websites for your convenience. Yachtease does not endorse or assume any responsibility for the content, products, or services provided by these third-party websites. Accessing and using these third-party websites is done at your own risk.</Text>
                <Text num={7}>Limitation of Liability: Yachtease shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use the Site or any content or services provided therein. Yachtease does not guarantee the accuracy, completeness, or timeliness of any information or content on the Site.</Text>
                <Text num={8}>Modification and Termination: Yachtease reserves the right to modify, suspend, or terminate the Site or any part thereof at any time without prior notice. Yachtease may also modify these Terms of Use from time to time, and such modifications shall be effective upon posting on the Site. Your continued use of the Site after any modifications constitutes your acceptance of the updated terms.</Text>
            </div>
            <div>
                <b>Privacy Policy</b><br /><br />

                At Yachtease, we are committed to protecting the privacy and confidentiality of our users. This Privacy Policy outlines the information we collect, how we use it, and the safeguards we have in place to ensure its security. By using the Yachtease website (&#34;the Site&#34;), you consent to the practices described below:<br /><br />

                <Text num={1}>Information Collection: We may collect personal information, such as your name, contact details, and payment information, when you register an account, make reservations, or communicate with us through the Site. We may also collect non-personal information, including but not limited to your IP address, browser type, and device information.</Text>
                <Text num={2}>Use of Information: We use the collected information to facilitate yacht rentals, process payments, respond to inquiries, provide customer support, and improve the Site&#39;s functionality. We may also use aggregated, non-identifiable information for analytical and statistical purposes.</Text>
                <Text num={3}>Data Sharing: Yachtease may share your personal information with yacht owners/operators to facilitate reservations and fulfill rental agreements. We may also share information with trusted service providers who assist us in operating the Site and delivering our services. We do not sell or rent your personal information to third parties for marketing purposes.</Text>
                <Text num={4}>Data Security: We employ industry-standard security measures to protect your information from unauthorized access, disclosure, or alteration. However, please note that no data transmission over the internet or electronic storage method can guarantee absolute security.</Text>
                <Text num={5}>Cookies and Tracking Technologies: The Site may use cookies and similar tracking technologies to enhance your browsing experience and collect information about how you interact with the Site. You can modify your browser settings to reject cookies, but this may limit certain functionalities of the Site.</Text>
                <Text num={6}>Third-Party Links: The Site may contain links to third-party websites. Yachtease is not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of those websites before providing any personal information.</Text>
                <Text num={7}>Children&#39;s Privacy: The Site is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware of any personal information collected from a child, we will take appropriate steps to remove that information from our records.</Text>
                <Text num={8}>Changes to the Privacy Policy: Yachtease reserves the right to update this Privacy Policy at any time. We will post any modifications on the Site, and the updated policy will be effective immediately upon posting. Your continued use of the Site after any changes constitutes your acceptance of the revised Privacy Policy.</Text>
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