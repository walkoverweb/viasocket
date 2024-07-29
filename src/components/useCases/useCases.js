import React, { useState } from 'react';
import axios from 'axios';

export default function UseCase({ usecases }) {
    const [selectedUsecase, setSelectedUsecase] = useState(0);
    const handleUsecaseClick = (index) => {
        setSelectedUsecase(index);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row">
                <div className="p-4 rounded-md w-full md:w-1/2">
                    <h1 className="text-5xl font-bold mb-4">Use Cases</h1>
                    <ul className="list-disc pl-4">
                        {usecases?.map((usecase, index) => (
                            <div
                                key={index}
                                className="border-b-4 border-black-400 border-opacity-100 border-color:black;"
                            >
                                <li
                                    className={`cursor-pointer flex justify-between items-center px-4 py-6 ${selectedUsecase === index ? 'bg-gray-200' : ''}`}
                                    onClick={() => handleUsecaseClick(index)}
                                >
                                    {usecase.heading}
                                    {selectedUsecase === index && (
                                        <span className="ml-2 w-3 h-3 rounded-full bg-black"></span>
                                    )}
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
                {selectedUsecase !== null && usecases[selectedUsecase] && (
                    <div className="bg-gray p-4 rounded-md w-full md:w-1/2 ml-5 mx-auto content-center">
                        <h2 className="text-4xl font-bold mb-2">{usecases[selectedUsecase].heading}</h2>
                        <ul className="list-disc pl-4">
                            {usecases[selectedUsecase].content.map((content, index) => (
                                <li key={index}>{content}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
