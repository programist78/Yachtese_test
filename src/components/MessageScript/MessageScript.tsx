'use client'

import Script from 'next/script'

const MessageScript: React.FC = () => {
    return <Script id="tawk" strategy="lazyOnload" >
    {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/64dcb7a294cf5d49dc6ab7e7/1h7v2qlio';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
    `}
</Script>
  }

export default MessageScript
