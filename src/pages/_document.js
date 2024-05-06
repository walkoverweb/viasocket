import { Html, Head, Main, NextScript } from 'next/document';

export default function Document({ pagesData }) {
    return (
        <Html lang="en" data-theme="light">
            <Head></Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
