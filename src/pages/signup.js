import { useLayoutEffect } from 'react';
import Image from 'next/image';
import TrustedBy from '@/components/trustedBy/trustedBy';
import Link from 'next/link';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFooterData, getMetaData, getNavData, getTestimonialData, getTrustedByData } from '@/utils/getData';
import {
    FOOTER_FIELDS,
    METADATA_FIELDS,
    NAVIGATION_FIELDS,
    TESTIMONIALS_FIELDS,
    TRUSTEDBY_FIELDS,
} from '@/const/fields';

export async function getServerSideProps(context) {
    const { redirect_to } = context.query;
    const { utm_source } = context?.query;
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/signup'`);
    const trustedBy = await getTrustedByData(TRUSTEDBY_FIELDS);
    const testimonials = await getTestimonialData(TESTIMONIALS_FIELDS);
    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            metaData: metaData[0] || {},
            redirect_to: redirect_to || '',
            utm_source: utm_source || 'website',
            trustedBy: trustedBy || [],
            testimonials: testimonials || [],
        },
    };
}

const Login = ({ metaData, testimonials, trustedBy, pathArray, redirect_to, utm_source }) => {
    useLayoutEffect(() => {
        const configuration = {
            referenceId: process.env.NEXT_PUBLIC_REFERENCE_ID,
            success: (data) => {
                console.log('success response', data);
            },
            failure: (error) => {
                console.log('failure reason', error);
            },
        };
        if (redirect_to) {
            configuration.addInfo = {};
            configuration.addInfo = {
                redirect_path: redirect_to,
            };
        }
        configuration.state = JSON.stringify({
            utm_source: utm_source,
        });

        if (typeof window.initVerification === 'function') {
            window.initVerification(configuration);
        } else {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js';

            const handleLoad = () => {
                if (typeof window.initVerification === 'function') {
                    window.initVerification(configuration);
                } else {
                    console.error('initVerification function not found');
                }
            };

            script.addEventListener('load', handleLoad);

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
                script.removeEventListener('load', handleLoad);
            };
        }
    }, []);

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/signup'} pathArray={pathArray} />

            <div className="flex w-screen md:h-screen flex-col-reverse md:flex-row">
                <div className="md:py-10 md:pl-10 py-4 pl-3 md:pr-0 pr-3 flex flex-col md:w-3/5 w-full overflow-x-hidden overflow-y-scroll gap-6 bg-[#EDE8DE] ">
                    <a href="/" aria-label="brand logo">
                        <Image
                            className="hidden md:block"
                            src="/assets/brand/logo.svg"
                            width={158.6}
                            height={40}
                            alt="viasocket"
                        />
                    </a>

                    <h2 className=" text-2xl">Upgrade yout team with powerful automation tool</h2>
                    <div>
                        <p className="text-xl font-bold">We’ll help you get started, with our</p>
                        <p className="text-xl ">24x7 Chat Support</p>
                    </div>

                    <TrustedBy trustedBy={trustedBy} />

                    <div className="flex md:flex-row flex-col gap-4 w-full mt-8">
                        {testimonials?.length > 0 &&
                            testimonials.map((testimonial, index) => {
                                return (
                                    <div
                                        className="flex flex-col  md:min-w-[380px] min-w-full p-4 md:p-8 gap-8 bg-[#F6F4EE] "
                                        key={index}
                                    >
                                        <p className="font-inter text-lg font-normal leading-[32px] tracking-normal text-left ">
                                            " {testimonial?.testimonial}"
                                        </p>
                                        <div className="flex items-center gap-2 mt-auto">
                                            <Image
                                                className="rounded-full"
                                                src={testimonial?.client_img[0]}
                                                width={36}
                                                height={36}
                                                alt={testimonial?.given_by}
                                            />
                                            <div>
                                                <p className="font-inter font-semibold leading-4 tracking-normal text-left">
                                                    {testimonial?.given_by}
                                                </p>
                                                <p className="font-inter text-sm font-normal leading-4 tracking-normal text-left pt-1 text-gray-400">
                                                    {testimonial?.giver_title}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <div className="md:w-2/5 w-full bg-white  py-6 px-3 md:p-10 flex flex-col gap-6 ">
                    <a href="/" className="md:hidden block" aria-label="brand logo">
                        <Image
                            className="md:hidden block"
                            src="/assets/brand/logo.svg"
                            width={158.6}
                            height={40}
                            alt="viasocket"
                        />
                    </a>
                    <h2 className="text-2xl font-bold">Create an account</h2>
                    <div id={process.env.NEXT_PUBLIC_REFERENCE_ID} className="loginBtn_google" />
                    <div className="flex ">
                        <span className="text-sm">If you already have an account,</span>
                        <Link href="/login" className="ms-1 text-sm text-sky-700">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Login;
