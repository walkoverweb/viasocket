const HowItWorks = () => {
    const steps = [
        {
            number: 1,
            title: 'Implement our code',
            description: 'Set up triggers for app events or specific times to fetch data across your app stack.',
        },
        {
            number: 2,
            title: "Style it to match your product's branding",
            description: 'Override our design system styles without forking the codebase.',
        },
        {
            number: 3,
            title: 'Allow your users to create automated workflows',
            description: 'Set up triggers for app events or specific times to fetch data across your app stack.',
        },
    ];

    return (
        <div className=" bg-white mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">How it Works</h1>
            <p className="text-gray-700 mb-8 py-4">
                20 Years in SaaS Taught Us: Integrations Are Vital & Often Tough <br />
                With Embed, We Made Them Simple.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                        <div className="flex items-center justify-center w-12 h-12 bg-gray-500 text-white rounded-full mb-4">
                            {step.number}
                        </div>
                        <h2 className="text-xl font-bold mb-2">{step.title}</h2>
                        <p className="text-gray-700">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;
