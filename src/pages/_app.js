import '@/scss/global.scss';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import HeadComp from '@/components/headComp/headComp';
import ChatWidget from '@/components/chat-widget/chat-wdget';

export default function MyApp({ Component, pageProps, pagesData }) {
    const router = useRouter();
    var browserPath = router.asPath;
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js';

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            script.removeEventListener('load', handleLoad);
        };
    }, []);
    const rawpathArray = browserPath.split(/[?#]/);
    const pathArray = rawpathArray[0].split('/');
    var showNavbar = false;
    if (
        !browserPath.includes('/integrations/') &&
        !browserPath.includes('/signup') &&
        !browserPath.includes('/login')
    ) {
        showNavbar = true;
    }

    // useEffect(() => {
    //     const helloConfig = {
    //         widgetToken: 'a13cc',
    //         show_close_button: false,
    //         hide_launcher: true,
    //     };

    //     const script = document.createElement('script');
    //     script.src = 'https://control.msg91.com/app/assets/widget/chat-widget.js';
    //     script.onload = () => initChatWidget(helloConfig, 50);

    //     document.head.appendChild(script);

    //     return () => {
    //         document.head.removeChild(script);
    //     };
    // }, []);

    return (
        <>
            <HeadComp />
            <ChatWidget />
            <Component {...pageProps} pathArray={pathArray} rawpathArray={rawpathArray} />
        </>
    );
}
