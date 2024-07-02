import React, { useState } from 'react';

export default function UseCase() {
    const usecases = [
        {
            'heading': 'Automate CI/CD workflows',
            'content': [
                'Integrate Docker with GitHub  to automatically build and deploy Docker containers when new code is pushed to a GitHub repository',
                'Integrate Docker with Bitbucket  to trigger Docker container builds and deployments whenever new commits are made in Bitbucket.',
            ],
        },
        {
            'heading': 'Set up automated testing environments',
            'content': [
                'Integrate Docker with Jenkins  to automatically set up Docker-based testing environments for continuous integration processes.',
                'Integrate Docker with CircleCI  to create and manage Docker containers for automated testing environments as part of the CI workflow.',
            ],
        },
        {
            'heading': 'Process data automatically',
            'content': [
                'Integrate Docker with Google Sheets  to deploy Docker containers that process and update data entries in Google Sheets',
                'Integrate Docker with Airtable  to launch Docker containers for processing records and automating workflows in Airtable',
            ],
        },
        {
            'heading': 'Scale web applications dynamically',
            'content': [
                'Integrate Docker with Azure Functions  to dynamically manage and scale Docker containers based on Azure Functions events',
                'Integrate Docker with AWS Lambda  to automatically scale Dockerized web applications using AWS Lambda triggers.',
            ],
        },
        {
            'heading': 'Scale web applications dynamically',
            'content': [
                'Integrate Docker with Azure Functions  to dynamically manage and scale Docker containers based on Azure Functions events',
                'Integrate Docker with AWS Lambda  to automatically scale Dockerized web applications using AWS Lambda triggers.',
            ],
        },
        {
            'heading': 'Scale web applications dynamically',
            'content': [
                'Integrate Docker with Azure Functions  to dynamically manage and scale Docker containers based on Azure Functions events',
                'Integrate Docker with AWS Lambda  to automatically scale Dockerized web applications using AWS Lambda triggers.',
            ],
        },
    ];

    const [selectedUsecase, setSelectedUsecase] = useState(0);

    const handleUsecaseClick = (index) => {
        setSelectedUsecase(index);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-row">
                <div className=" p-4 rounded-md w-1/2">
                    <h1 className="text-5xl font-bold mb-4">Use Cases for App Name</h1>

                    <ul className="list-disc pl-4 ">
                        {usecases.map((usecase, index) => (
                            <div className="border-b-4 border-black-400  border-opacity-100 border-color:black;">
                                <ul
                                    key={usecase?.index}
                                    className={`cursor-pointer hover:bg-gray-200  px-4 py-6 ${index === 0 ? 'bg-gray-100' : ''}`}
                                    onClick={() => handleUsecaseClick(index)}
                                >
                                    {usecase?.heading}
                                </ul>
                            </div>
                        ))}
                    </ul>
                </div>
                {selectedUsecase !== null && (
                    <div className="bg-gray p-4 rounded-md w-1/2 ml-5 mx-auto content-center ">
                        <h2 className="text-4xl font-bold mb-2 ">{usecases[selectedUsecase].heading}</h2>
                        <ul className="list-disc pl-4">
                            {usecases[selectedUsecase].content.map((description, index) => (
                                <li key={index}>{description}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
