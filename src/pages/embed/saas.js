import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';

const UpgradeSaas = () => {
    return (
        <div className="container  mx-auto ">
            <div className="bg-white rounded-lg  p-4">
                <h1 className="text-3xl font-bold m-4">Upgrade your SaaS today, 100% free </h1>
                <p className="text-gray-700 mb-6">
                    Start using viaSocket Embed lifetime free for any 5 apps of your choice. We will begin charging{' '}
                    <br />
                    once you've found the tool beneficial and wish to extend its use to additional apps
                </p>

                <div className="flex space-x-2 mb-6">
                    <button className="bg-gray-500 text-white py-2 px-2 rounded flex items-center">
                        Talk to Us
                        <MdArrowForward className="ml-2" />
                    </button>
                    <button className="bg-white text-gray-500 border border-gray-500 py-2 px-2 rounded flex items-center">
                        SignUp & Get Started
                        <MdArrowForward className="ml-2" />
                    </button>
                    <Link href="/faq" className="text-blue-500 flex items-center">
                        FAQ <MdArrowForward className="ml-2 text-gray-500" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UpgradeSaas;
