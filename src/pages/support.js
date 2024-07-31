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
    const [issubmit, setisSubmit] = useState(false);
    const [isSend, setisSend] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setisSend(true);

        try {
            const response = await fetch(`https://flow.sokt.io/func/scrir501xRzP`, {
                method: 'POST',
                headers: {},
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                setisSubmit(true);
                setisSend(false);
                console.log('Form submitted successfully:', data);
            } else {
                console.log('erroor');
                setisSend(false);
            }
        } catch (error) {
            setisSend(false);
            console.log(error, 'eror');
        }
    };
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/support'} />
            <div>
                <div className="flex flex-col text-center items-center gap-2 py-12">
                    <h1 className="text-4xl font-bold">Contact Us</h1>
                    <p className="text-lg font-medium md:w-1/2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s,
                    </p>
                </div>
                <div className="py-12">
                    <div className="container flex flex-col items-center gap-8 mx-auto sm:flex sm:flex-row  ">
                        <div className="flex flex-col gap-10 w-1/2 sm:flex items-center justify-center ">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-3xl font-semibold">Get In Touch</h2>
                                <p className="fext-lg font-medium md:w-2/3">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard
                                </p>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex align-center gap-3">
                                    <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#EDE8DE]">
                                        <MdCall color="primary" fontSize={22} />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="font-bold text-lg">Phone Number</h3>
                                        <p>+919876543210</p>
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
                            <div className="flex  gap-3">
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

                        <div className="flex flex-col items-center gap-5 w-[85%] bg-[#EDE8DE] p-12 rounded sm:w-[50%]">
                            {issubmit ? (
                                <div className="flex flex-col items-center">
                                    <Image
                                        className="h-1/3 w-1/3"
                                        src={`/assets/img/check.png`}
                                        width={100}
                                        height={100}
                                        alt={'img'}
                                    />
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>{' '}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 ">
                                    <h2 className="text-3xl font-semibold">Send a message</h2>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input bg-white w-full  outline-none focus:outline-none"
                                    />
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input bg-white w-full outline-none focus:outline-none"
                                    />
                                    <textarea
                                        required
                                        name="message"
                                        placeholder="Message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="input bg-white w-full min-h-[170px] outline-none focus:outline-none"
                                    />
                                    <button className="btn btn-accent rounded-md " onClick={handleSubmit}>
                                        {isSend ? <p>Sending </p> : <p> Send Message </p>}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
