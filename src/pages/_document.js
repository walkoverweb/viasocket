import { Html, Head, Main, NextScript } from 'next/document';

export default function Document({ pagesData }) {
    return (
        <Html lang="en" data-theme="light">
            <head>
                <script
                    id="gtm-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-THTCRSLN');`,
                    }}
                ></script>
            </head>
            <Head>
                <script
                    id="chatbot-main-script"
                    embedToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfaWQiOiIxMjc3IiwiY2hhdGJvdF9pZCI6IjY2NTA2MjhhZDQ4ZTIwZTYxY2Y3MDFhMCIsInVzZXJfaWQiOiJxYXp3c3hlZGNyZiIsImlhdCI6MTczMjAxNDcyMn0._38nKpNX9oNkRPldK8FonqWTe6eBHTWzFJWJ2PkSnew"
                    src="https://chatbot-embed.viasocket.com/chatbot-prod.js"
                ></script>
            </Head>
            <body>
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-THTCRSLN"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
