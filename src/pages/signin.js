import { useLayoutEffect } from 'react';
import Image from 'next/image';
import { MdArrowForward } from 'react-icons/md';
import Link from 'next/link';
import { getDbdashData } from './api';

export async function getServerSideProps() {
    const { redirect_to } = context.query;
    const { utm_source } = context?.query;
    const IDs = ['tblvo36my'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            features: results[0].data.rows,
            redirect_to,
            utm_source: utm_source || 'website',
        },
    };
}

const Login = ({ features, redirect_to }) => {
    let featuresArrOne = [];
    let featuresArrTwo = [];
    features.map((feature) => {
        if (feature?.block_type !== 'R2C2' && feature?.onlogin) {
            featuresArrOne.push(feature);
        }
        if (feature?.block_type === 'R2C2' && feature?.onlogin) {
            featuresArrTwo.push(feature);
        }
    });
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
            <div className="flex w-screen md:h-screen flex-col-reverse md:flex-row">
                <div className="md:w-3/5 w-full p-6 py-12 md:px-10">
                    <a href="/">
                        <Image
                            className="hidden md:block"
                            src="/assets/brand/logo.svg"
                            width={158.6}
                            height={40}
                            alt="viasocket"
                        />
                    </a>

                    <div className="my-6">Latest updates</div>
                    <div className=" grid  grid-cols-2 gap-4">
                        {featuresArrTwo.length > 0 &&
                            featuresArrTwo.map((feature) => {
                                {
                                    return (
                                        <div className="signup_img my-6 w-full relative col-span-2">
                                            <Image
                                                className=""
                                                src={
                                                    feature?.image[1]
                                                        ? feature.image[1]
                                                        : 'https://placehold.co/1200x400'
                                                }
                                                width={1000}
                                                height={800}
                                                alt="viasocket"
                                            />
                                            <p className="absolute bottom-6 left-6 font-medium text-black text-xl">
                                                {feature?.name}
                                            </p>
                                        </div>
                                    );
                                }
                            })}
                        {featuresArrOne.length > 0 &&
                            featuresArrOne.map((feature) => {
                                {
                                    return (
                                        <div className="w-auto md:col-span-1 col-span-2">
                                            <Image
                                                src={
                                                    feature?.icon[0] ? feature?.icon[0] : '/assets/img/feature_ico.svg '
                                                }
                                                width={36}
                                                height={36}
                                                alt="feature_ico"
                                            />
                                            <div className="text-xl font-semibold my-3">{feature?.name}</div>
                                            <p>{feature?.description}</p>
                                        </div>
                                    );
                                }
                            })}
                    </div>

                    {/* <p className="font-medium flex items-center justify-end mt-6">
                        Read all latest release <MdArrowForward />
                    </p> */}
                </div>

                <div className="md:w-2/5 w-full bg-white py-10 px-6 md:px-10 flex flex-col gap-4">
                    <a href="/">
                        <Image
                            className="md:hidden block"
                            src="/assets/brand/logo.svg"
                            width={158.6}
                            height={40}
                            alt="viasocket"
                        />
                    </a>

                    <div className="text-2xl font-bold">Login</div>
                    <div className="text-sm ">Sign up with</div>
                    <div id={process.env.NEXT_PUBLIC_REFERENCE_ID} />
                    <div className="flex ">
                        <span className="text-sm">Create a new Account,</span>
                        <Link href="/signup" className="ms-1 text-sm text-sky-700">
                            SignUp
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Login;
