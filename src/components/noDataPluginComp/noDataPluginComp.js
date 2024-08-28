import Image from 'next/image';
import styles from './noDataPluginComp.module.scss';
import { useState } from 'react';
export default function NoDataPluginComp({ plugin, mode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        useCase: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async () => {
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
            if (data?.success) {
            }
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <div style={{ backgroundColor: `${plugin[0]?.brandcolor}` }} className="py-12 min-h-dvh">
                <div className={`container flex flex-col md:gap-12 gap-6 `}>
                    <div
                        className={`${styles.plugin_name} border md:px-8 md:p-3 py-1 px-4 rounded-md  flex items-center gap-8 w-fit`}
                    >
                        {plugin.map((plug, index) => {
                            return (
                                <div key={index} className="flex items-center gap-3  w-fit">
                                    {index > 0 && <span className="text-3xl mx-4"> + </span>}
                                    {plug?.iconurl && (
                                        <Image
                                            src={plug.iconurl}
                                            width={40}
                                            height={40}
                                            className="h-auto w-[30px] md:w-[36px]"
                                            alt="notion"
                                        />
                                    )}
                                    <div className="flex flex-col">
                                        {plug?.name && <p className="md:text-2xl text-lg font-bold">{plug?.name}</p>}
                                        {plug?.category && (
                                            <p className="text-[14px] font-semibold  uppercase text-gray-500">
                                                {plug?.category}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex flex-col gap-8 flex-grow justify-center mt-12 ">
                        <h2
                            className={`lg:text-3xl md:text-2xl text-xl  font-semibold ${mode === 'dark' ? 'text-white' : 'text-black'}`}
                        >
                            The app you are looking for is in beta, and we are awaiting verification from the app
                            builders before making it accessible to end users. This process may take 15 to 30 days.
                        </h2>
                        <h2
                            className={`lg:text-3xl md:text-2xl text-xl  font-semibold ${mode === 'dark' ? 'text-white' : 'text-black'}`}
                        >
                            If you can’t wait, we can add the beta version to your viaSocket workspace within 24 hours.
                        </h2>
                        <div className="flex gap-3">
                            <button
                                className={`btn btn-semibold ${mode === 'dark' ? 'btn-light' : 'btn-primary'}`}
                                onClick={() => document.getElementById('beta_request').showModal()}
                            >
                                Request Beta Access
                            </button>
                            {/* <button
                                className={`btn btn-link font-semibold  ${mode === 'dark' ? 'btn-light' : 'btn-primary'}`}
                            >
                                Get Help
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
            <dialog id="beta_request" className="modal">
                <div className="modal-box">
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
                        <div className="flex gap-3 flex-col">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Name:</span>
                                </div>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="input input-bordered w-full max-w-xs"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Email:</span>
                                </div>
                                <input
                                    required
                                    type="text"
                                    name="email"
                                    placeholder="Enter your Email"
                                    className="input input-bordered w-full max-w-xs"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Use Case:</span>
                                </div>
                                <textarea
                                    required
                                    name="useCase"
                                    className="textarea textarea-bordered"
                                    placeholder="Please describe your usecase"
                                    value={formData.useCase}
                                    onChange={handleInputChange}
                                ></textarea>
                            </label>
                            <div className="flex gap-3">
                                <button disabled={isLoading} className="btn btn-md btn-primary" onClick={handleSubmit}>
                                    {isLoading ? 'Submiting...' : 'Submit'}
                                </button>
                                <button className="btn btn-md btn-link">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}
