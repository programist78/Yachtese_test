import React from 'react'
import Title from '../../../src/components/Title/Title'
import c from './Privacy.module.scss'
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'


const page: React.FC = () => {
    return <main>
        <article className={`${c.top} filtered_image_container`}>
            <Image quality={100} fill priority src='/assets/privacy-yacht.webp' alt='Yacht' />
            <Title className={c.title}>Terms og Use<br /> And<br /> Privacy Policy</Title>
        </article>
        <article className={`${c.texts} container`}>
            <div className={c.first}>
                <b>Terms of Use - Yachtease</b><br /><br />

                Last Updated: 26 September 2023<br />
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
        <article className={`${c.texts} container`}>
            <h1>Privacy Policy</h1>
            <p>Last updated: October 09, 2023</p>
            <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
            <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <Link href="https://www.freeprivacypolicy.com/free-privacy-policy-generator/" target="_blank">Free Privacy Policy Generator</Link>.</p>
            <h2>Interpretation and Definitions</h2>
            <h3>Interpretation</h3>
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            <h3>Definitions</h3>
            <p>For the purposes of this Privacy Policy:</p>
            <ul className={c.text}>
                <li>
                    <p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
                </li>
                <li>
                    <p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
                </li>
                <li>
                    <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Yachtease LTD, 12 Kingfisher road, Sunridge, Cape Town 7441.</p>
                </li>
                <li>
                    <p><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</p>
                </li>
                <li>
                    <p><strong>Country</strong> refers to: South Africa</p>
                </li>
                <li>
                    <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
                </li>
                <li>
                    <p><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
                </li>
                <li>
                    <p><strong>Service</strong> refers to the Website.</p>
                </li>
                <li>
                    <p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p>
                </li>
                <li>
                    <p><strong>Third-party Social Media Service</strong> refers to any website or any social network website through which a User can log in or create an account to use the Service.</p>
                </li>
                <li>
                    <p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
                </li>
                <li>
                    <p><strong>Website</strong> refers to Yachtease, accessible from <Link href="https://yachtease.co/" rel="external nofollow noopener" target="_blank">https://yachtease.co/</Link></p>
                </li>
                <li>
                    <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
                </li>
            </ul>
            <h2>Collecting and Using Your Personal Data</h2>
            <h3>Types of Data Collected</h3>
            <h4>Personal Data</h4>
            <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
            <ul className={c.text}>
                <li>
                    <p>Email address</p>
                </li>
                <li>
                    <p>First name and last name</p>
                </li>
                <li>
                    <p>Phone number</p>
                </li>
                <li>
                    <p>Address, State, Province, ZIP/Postal code, City</p>
                </li>
                <li>
                    <p>Usage Data</p>
                </li>
            </ul>
            <h4>Usage Data</h4>
            <p>Usage Data is collected automatically when using the Service.</p>
            <p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
            <p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
            <p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
            <h4>Information from Third-Party Social Media Services</h4>
            <p>The Company allows You to create an account and log in to use the Service through the following Third-party Social Media Services:</p>
            <ul className={c.text}>
                <li>Google</li>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>LinkedIn</li>
            </ul>
            <p>If You decide to register through or otherwise grant us access to a Third-Party Social Media Service, We may collect Personal data that is already associated with Your Third-Party Social Media Service's account, such as Your name, Your email address, Your activities or Your contact list associated with that account.</p>
            <p>You may also have the option of sharing additional information with the Company through Your Third-Party Social Media Service's account. If You choose to provide such information and Personal Data, during registration or otherwise, You are giving the Company permission to use, share, and store it in a manner consistent with this Privacy Policy.</p>
            <h4>Tracking Technologies and Cookies</h4>
            <p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</p>
            <ul className={c.text}>
                <li><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</li>
                <li><strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</li>
            </ul>
            <p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. Learn more about cookies on the <Link href="https://www.freeprivacypolicy.com/blog/sample-privacy-policy-template/#Use_Of_Cookies_And_Tracking" target="_blank">Free Privacy Policy website</Link> article.</p>
            <p>We use both Session and Persistent Cookies for the purposes set out below:</p>
            <ul className={c.text}>
                <li>
                    <p><strong>Necessary / Essential Cookies</strong></p>
                    <p>Type: Session Cookies</p>
                    <p>Administered by: Us</p>
                    <p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
                </li>
                <li>
                    <p><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
                    <p>Type: Persistent Cookies</p>
                    <p>Administered by: Us</p>
                    <p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
                </li>
                <li>
                    <p><strong>Functionality Cookies</strong></p>
                    <p>Type: Persistent Cookies</p>
                    <p>Administered by: Us</p>
                    <p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
                </li>
            </ul>
            <p>For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.</p>
            <h3>Use of Your Personal Data</h3>
            <p>The Company may use Personal Data for the following purposes:</p>
            <ul className={c.text}>
                <li>
                    <p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
                </li>
                <li>
                    <p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
                </li>
                <li>
                    <p><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</p>
                </li>
                <li>
                    <p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
                </li>
                <li>
                    <p><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</p>
                </li>
                <li>
                    <p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
                </li>
                <li>
                    <p><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</p>
                </li>
                <li>
                    <p><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</p>
                </li>
            </ul>
            <p>We may share Your personal information in the following situations:</p>
            <ul className={c.text}>
                <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</li>
                <li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
                <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
                <li><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
                <li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.</li>
                <li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</li>
            </ul>
            <h3>Retention of Your Personal Data</h3>
            <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
            <p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
            <h3>Transfer of Your Personal Data</h3>
            <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
            <p>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
            <p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
            <h3>Delete Your Personal Data</h3>
            <p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
            <p>Our Service may give You the ability to delete certain information about You from within the Service.</p>
            <p>You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.</p>
            <p>Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.</p>
            <h3>Disclosure of Your Personal Data</h3>
            <h4>Business Transactions</h4>
            <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
            <h4>Law enforcement</h4>
            <p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
            <h4>Other legal requirements</h4>
            <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
            <ul className={c.text}>
                <li>Comply with a legal obligation</li>
                <li>Protect and defend the rights or property of the Company</li>
                <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>Protect the personal safety of Users of the Service or the public</li>
                <li>Protect against legal liability</li>
            </ul>
            <h3>Security of Your Personal Data</h3>
            <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
            <h2>Children's Privacy</h2>
            <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</p>
            <p>If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</p>
            <h2>Links to Other Websites</h2>
            <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
            <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
            <h2>Changes to this Privacy Policy</h2>
            <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
            <p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
            <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, You can contact us:</p>
            <ul className={c.text}>
                <li>
                    <p>By email: <Link href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="a6cec3cacac9e6dfc7c5ced2c3c7d5c388c5c9">[email&#160;protected]</Link></p>
                </li>
                <li>
                    <p>By visiting this page on our website: <Link href="https://yachtease.co/" rel="external nofollow noopener" target="_blank">https://yachtease.co/</Link></p>
                </li>
                <li>
                    <p>By phone number: +27822212598</p>
                </li>
            </ul><Script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></Script>
        </article>
    </main>
}

const Text: React.FC<{ num: number, children: string }> = ({ num, children }) => {
    return <div className={c.text}>
        <div className={c.number}>{num}.</div>{children}<br />
    </div>
}

export default page