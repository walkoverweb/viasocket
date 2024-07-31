import Link from 'next/link';
import { useState } from 'react';
import { MdCall, MdMail } from 'react-icons/md';
import { getDbdashData } from './api';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Image from 'next/image';

export async function getServerSideProps() {
    const IDs = ['tbl2bk656'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            metaData: results[0].data.rows,
        },
    };
}

export default function Support({ metaData }) {
    const [issubmit, setIsSubmit] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({
        name: false,
        email: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false,
        }));
    };

    const handleSubmit = async () => {
        const newErrors = {
            name: !formData.name,
            email: !formData.email,
        };

        if (newErrors.name || newErrors.email) {
            setErrors(newErrors);
            return;
        }

        setIsSend(true);

        try {
            const response = await fetch(`https://flow.sokt.io/func/scrir501xRzP`, {
                method: 'POST',
                headers: {},
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setIsSubmit(true);
                setIsSend(false);
            } else {
                console.log('error');
                setIsSend(false);
            }
        } catch (error) {
            setIsSend(false);
            console.log(error, 'error');
        }
    };
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/support'} />
            <div className="container flex flex-col justify-center items-center md:gap-16 gap-4 my-12 md:my-24">
                <div className="flex flex-col gap-3 md:text-center text-start md:items-center md:w-full sm:w-1/2 w-full min-w-[300px}">
                    <h1 className="md:text-5xl text-4xl font-semibold">ViaSocket Support</h1>
                    <p className="md:text-xl text-lg font-medium md:w-2/3">
                        We are here to assist you with any questions, concerns, or feedback you may have. Whether you're
                        seeking support, have a business inquiry, or simply want to connect with us, we are eager to
                        hear from you.
                    </p>
                </div>
                <div className=" flex flex-col justify-center items-center gap-16 mx-auto  md:flex-row  my-4 ">
                    <div className="flex flex-col gap-10 md:w-full sm:w-1/2 w-full min-w-[300px}  ">
                        <div className="flex flex-col gap-2">
                            <h2 className="md:text-3xl text-2xl font-semibold">Get In Touch</h2>
                            <p className="fext-lg font-medium md:w-2/3">
                                Our team is available 24/7 to assist you. Get in touch via email, phone, or live chat
                                and experience seamless support and integration!
                            </p>
                        </div>
                        <div className="flex flex-col gap-6 w-full">
                            <div className="flex align-center gap-3">
                                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#EDE8DE]">
                                    <MdCall color="primary" fontSize={22} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-bold text-lg">Phone Number</h3>
                                    <p>+918889578616</p>
                                </div>
                            </div>
                            <div className="flex align-center gap-3">
                                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#EDE8DE]">
                                    <MdMail color="primary" fontSize={22} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-bold text-lg">For setting up workflows </h3>
                                    <p>support@viasocket.com</p>
                                </div>
                            </div>
                            <div className="flex align-center gap-3">
                                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#EDE8DE]">
                                    <MdMail color="primary" fontSize={22} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-bold text-lg">For queries/request related to plugins</h3>
                                    <p>plug@viasocket.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full gap-3">
                            <button className="btn btn-accent" onClick={() => window.chatWidget.open()}>
                                Live Chat
                            </button>
                            <Link href="https://calendly.com/rpaliwal71/15-mins?month=2024-07" target="_blank">
                                <button className="btn btn-accent btn-outline">Book a Meeting</button>
                            </Link>
                            <Link href="https://viasocket.com/faq" target="_blank">
                                <button className="btn btn-accent btn-outline">Help Doc</button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-5 w-full md:w-full sm:w-1/2 md:max-w-[400px] bg-[#EDE8DE] lg:p-12 md:p-8 sm:p-12 p-4 rounded  h-[500px]">
                        {issubmit ? (
                            <div className="flex flex-col items-center gap-4">
                                <Image
                                    className="h-[140px] w-[140px]"
                                    src={`/assets/img/check.png`}
                                    width={100}
                                    height={100}
                                    alt={'img'}
                                />
                                <p className="max-w-[430px]">
                                    Stay tuned, you will receive a response within the next 24 hours.
                                </p>{' '}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 w-full  max-w-[400px] ">
                                <h2 className="md:text-3xl text-2xl font-semibold">Send a message</h2>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`input bg-white w-full outline-none focus:outline-none rounded ${errors.name ? 'border-red-500' : ''}`}
                                />
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`input bg-white w-full outline-none focus:outline-none rounded ${errors.email ? 'border-red-500' : ''}`}
                                />
                                <textarea
                                    required
                                    name="message"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="input bg-white w-full min-h-[170px] outline-none focus:outline-none rounded"
                                />
                                <button className="btn btn-accent rounded-md " onClick={handleSubmit}>
                                    {isSend ? <p>Sending </p> : <p> Send us message </p>}
                                </button>
                            </div>
                        )}
                    </div>
                </div>{' '}
            </div>
        </>
    );
}
