import '@/scss/global.scss';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

    const [showSkeleton, setShowSkeleton] = useState(false);
    useEffect(() => {
        const handleLinkClick = (event) => {
            let target = event.target;

            while (target && target.tagName !== 'A') {
                target = target.parentElement;
            }

            if (target && target.tagName === 'A') {
                event.preventDefault();
                setShowSkeleton(true);
                window.location.href = target.href;
            }
        };

        document.addEventListener('click', handleLinkClick);

        return () => {
            document.removeEventListener('click', handleLinkClick);
        };
    }, []);

    useEffect(() => {
        const helloConfig = {
            widgetToken: 'a13cc',
            show_close_button: false,
            hide_launcher: true,
        };

        const script = document.createElement('script');
        script.src = 'https://control.msg91.com/app/assets/widget/chat-widget.js';
        script.onload = () => initChatWidget(helloConfig, 50);

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);
    return (
        <>
            <HeadComp />
            <ChatWidget />
            <Skeleton />
            {showSkeleton ? (
                <Skeleton />
            ) : (
                <Component {...pageProps} pathArray={pathArray} rawpathArray={rawpathArray} />
            )}
        </>
    );
}

export function Skeleton() {
    return (
        <div className="h-dvh w-dvw container cont cont__py ">
            <div className="h-30 w-100 skeleton bg-gray-100 rounded-none">ffd</div>
        </div>
    );
}
