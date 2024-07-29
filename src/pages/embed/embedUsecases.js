// import React from 'react';

const CustomComponent = ({ useCases }) => {
    return (
        useCases &&
        useCases.map((item, index) => (
            <div className="flex p-4 bg-white" key={index}>
                <div className="w-1/2 pr-2">
                    <div className="border p-4">
                        <div className="bg-F6F4EE">
                            <h1 className="text-xl font-bold">{item.usecase}</h1>
                            <p>{item.description}</p>
                        </div>
                        <div className="mt-4">
                            {item?.embedusecase?.features?.map((item2, index2) => (
                                <div key={index2} className="border p-2 mb-2">
                                    <h2 className="text-lg font-semibold">{item2.title}</h2>
                                    <p>{item2.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-1/2 pl-2">
                    <img
                        src="/public/assets/img/embedfeature/embedheroImage.png"
                        alt="Icon"
                        className="w-full h-auto border"
                    />
                </div>
            </div>
        ))
    );
};

export default CustomComponent;
