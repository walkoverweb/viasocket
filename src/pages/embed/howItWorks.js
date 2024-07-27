// components/TwoSectionsWithCards.js

const HowItWorks = () => {
    return (
        <div className="container bg-white mx-auto ">
            <h1 className="text-3xl font-bold mb-4">How it Works</h1>
            <p className="text-gray-700 mb-8 py-4">
                20 Years in SaaS Taught Us: Integrations Are Vital & Often Tough <br />
                With Embed, We Made Them Simple.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-500 text-white rounded-full mb-4">
                        1
                    </div>
                    <h2 className="text-xl font-bold mb-2">Implement our code</h2>
                    <p className="text-gray-700">
                        Set up triggers for app events or specific times to fetch data across your app stack Set up
                        triggers for app events or specific times to fetch data across your app stack Set up triggers
                        for app events or specific times to fetch data across your app stack{' '}
                    </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-500 text-white rounded-full mb-4">
                        2
                    </div>
                    <h2 className="text-xl font-bold mb-2">Style it to match your product's branding</h2>
                    <p className="text-gray-700">
                        Override our design system styles without forking the codebase Override our design system styles
                        without forking the codebase Override our design system styles without forking the codebase
                        Override our design system styles without forking the codebase .
                    </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-500 text-white rounded-full mb-4">
                        3
                    </div>
                    <h2 className="text-xl font-bold mb-2">Allow your users to create automated workflows</h2>
                    <p className="text-gray-700">
                        Set up triggers for app events or specific times to fetch data across your app stack Set up
                        triggers for app events or specific times to fetch data across your app stack Set up triggers
                        for app events or specific times to fetch data across your app stack{' '}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
