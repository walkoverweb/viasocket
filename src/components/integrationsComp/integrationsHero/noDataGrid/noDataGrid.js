import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './noDataGrid.module.scss';

export default function NoDataGrid({ plugin, mode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        useCase: '',
        url: '',
    });
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        setFormData((prevState) => ({
            ...prevState,
            url: window.location.href,
        }));
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === 'email') {
            validateEmail(value);
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async () => {
        if (emailError) {
            console.error('Invalid email address');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('https://flow.sokt.io/func/scrioitLgnvb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data?.data?.success) {
                document.getElementById('beta_request').close();
            }
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div style={{ backgroundColor: `${plugin[0]?.brandcolor}` }} className="py-12 ">
                <div className={`container flex flex-col md:gap-12 gap-6 `}>
                    <div className="flex flex-col gap-8 flex-grow justify-center  ">
                        <h2
                            className={`lg:text-3xl md:text-2xl text-xl  font-semibold ${mode === 'dark' ? 'text-white' : 'text-black'}`}
                        >
                            The app you are looking for is in beta, and we are awaiting verification from the app
                            builders before making it accessible to end users. This process may take 15 to 30 days.
                        </h2>
                        <h2
                            className={`lg:text-3xl md:text-2xl text-xl font-semibold ${mode === 'dark' ? 'text-white' : 'text-black'}`}
                        >
                            {plugin.length === 1
                                ? 'If you can’t wait, we can add the beta version to your viaSocket workspace within 24 hours.'
                                : ' If you can’t wait, we can add the beta version to your viaSocket workspace within 24 hours.'}
                        </h2>
                        {plugin?.length <= 1 ? (
                            <div className="flex gap-3">
                                <button
                                    className={`btn  ${mode === 'dark' ? 'btn-white' : 'btn-outline btn-primary'} `}
                                    onClick={() => document.getElementById('beta_request').showModal()}
                                >
                                    Request Beta Access
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <button
                                    className={`btn  ${mode === 'dark' ? 'btn-white' : 'btn-outline btn-primary'} `}
                                    onClick={() => document.getElementById('beta_request').showModal()}
                                >
                                    Request Combination
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <dialog id="beta_request" className="  modal w-full h-full ">
                <div className="modal-box rounded">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="flex flex-col gap-4">
                        <Image
                            src="/assets/brand/logo.svg"
                            width={1080}
                            height={1080}
                            alt="viasocket"
                            className="h-[36px] w-fit"
                        />
                        <h3 className="font-bold text-lg">Please fill the following details</h3>
                        <div className="flex gap-3 flex-col ">
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Name:</span>
                                </div>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="input input-bordered w-full  bg-white rounded"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Email:</span>
                                </div>
                                <input
                                    required
                                    type="text"
                                    name="email"
                                    placeholder="Enter your Email"
                                    className="input input-bordered w-full  bg-white rounded"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                {emailError && <p className="text-red-500">{emailError}</p>}
                            </label>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Use Case:</span>
                                </div>
                                <textarea
                                    required
                                    name="useCase"
                                    className="textarea textarea-bordered bg-white rounded   min-h-[200px] max-h-[350px] h-fit"
                                    placeholder="Please describe your use case"
                                    value={formData.useCase}
                                    onChange={handleInputChange}
                                ></textarea>
                            </label>
                            <div className="flex gap-3">
                                <button disabled={isLoading} className="btn btn-md btn-primary" onClick={handleSubmit}>
                                    {isLoading ? 'Submitting...' : 'Submit'}
                                </button>
                                <button
                                    className="btn btn-md btn-link"
                                    onClick={() => document.getElementById('beta_request').close()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}
