import React from 'react';

const CustomComponent = ({ useCases = [] }) => {
    if (!Array.isArray(useCases)) {
        console.error('Invalid useCases prop: Expected an array.');
        return <p>Error: Invalid data format.</p>;
    }

    return (
        <>
            {useCases.length > 0 ? (
                useCases.map((item, index) => (
                    <div className="container mx-auto p-4 bg-white flex flex-col md:flex-row" key={index}>
                        {/* Content Section */}
                        <div className="w-full md:w-1/2 p-2">
                            <div className="bg-white">
                                <div className="p-4 pb-2">
                                    <h1 className="text-xl font-bold pb-2">
                                        {item.usecase || 'Use Case Title Missing'}
                                    </h1>
                                    <p>{item.description || 'Description not available'}</p>
                                </div>
                                <div className="m-4">
                                    {item?.embedusecase?.features?.length > 0 ? (
                                        item.embedusecase.features.map((item2, index2) => (
                                            <div key={index2} className="p-4 mb-2 bg-[#F6F4EE]">
                                                <h2 className="text-lg font-semibold p-2">
                                                    {item2.title || 'Feature Title Missing'}
                                                </h2>
                                                <p className="p-2">
                                                    {item2.description || 'Feature description not available'}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No features available.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 p-2 flex justify-center items-center">
                            <img
                                src="/assets/img/embedfeature/whatsapphealthcare.png"
                                alt={item.usecase || 'Default Image'}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                ))
            ) : (
                <p>No use cases available.</p>
            )}
        </>
    );
};

export default CustomComponent;
