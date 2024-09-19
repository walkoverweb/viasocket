import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import { useRouter } from 'next/router'; // Import useRouter for navigation
import { useState, useEffect } from 'react'; // Import useState and useEffect to manage state and side effects
import { getDbdashData } from '../api';
import Footer from '@/components/footer/footer';
import AZComp from '@/components/findComboComp/a-zComp/a-zComp';
import AppCard from '@/components/findComboComp/a-zComp/AppCard'; // Import AppCard component

export default function FindCombinations({ navData, footerData, metaData }) {
    const router = useRouter();
    const { slug } = router.query; // Get the slugs from the URL

    const [step, setStep] = useState(1);
    const [firstApp, setFirstApp] = useState(''); // State for the first app slug
    const [secondApp, setSecondApp] = useState(''); // State for the second app slug
    const [appsForFirstChar, setAppsForFirstChar] = useState([]);
    const [appsForSecondChar, setAppsForSecondChar] = useState([]);
    const [firstAppData, setFirstAppData] = useState(null); // Hold first app data
    const [secondAppData, setSecondAppData] = useState(null); // Hold second app data

    // UseEffect to fetch the app data when URL slugs are available
    useEffect(() => {
        if (slug && slug.length >= 2) {
            // If the URL contains two slugs, fetch both apps and display
            fetchAppData(slug[0], true); // Fetch first app
            fetchAppData(slug[1], false); // Fetch second app
            setStep(4); // Set to step 4 as both slugs are available
        } else if (slug && slug.length === 1) {
            // If only one slug is present, fetch just the first app
            fetchAppData(slug[0], true);
        }
    }, [slug]);

    // Function to fetch the app data for each slug
    const fetchAppData = async (appSlug, isFirstApp) => {
        let fetchUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/${process.env.NEXT_PUBLIC_DB_ID_AZ}/tblwegm8v?filter=appslugname='${appSlug}'`;

        const apiHeaders = {
            headers: {
                'auth-key': process.env.NEXT_PUBLIC_DB_KEY_AZ,
            },
        };

        try {
            const response = await fetch(fetchUrl, apiHeaders);
            const responseData = await response.json();
            const appData = responseData?.data?.rows?.[0]; // Get the first app data

            if (isFirstApp) {
                setFirstAppData(appData); // Set first app data
                setFirstApp(appData?.appslugname); // Set first app slug
            } else {
                setSecondAppData(appData); // Set second app data
                setSecondApp(appData?.appslugname); // Set second app slug
            }
        } catch (error) {
            console.error('Error fetching app data:', error);
        }
    };

    // Fetch the apps for the selected character
    const fetchAppsByCharacter = async (char, isFirstApp) => {
        let fetchUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/${process.env.NEXT_PUBLIC_DB_ID_AZ}/tblwegm8v?filter=audience='Public' and status ='published' and name like '${char}%'`;

        const apiHeaders = {
            headers: {
                'auth-key': process.env.NEXT_PUBLIC_DB_KEY_AZ,
            },
        };

        try {
            const response = await fetch(fetchUrl, apiHeaders);
            const responseData = await response.json();
            const apps = responseData?.data?.rows;

            if (isFirstApp) {
                setAppsForFirstChar(apps);
            } else {
                setAppsForSecondChar(apps);
            }
        } catch (error) {
            console.error('Error fetching apps:', error);
        }
    };

    // Handle the selection of the first app's character
    const handleFirstAppCharSelect = (char) => {
        fetchAppsByCharacter(char, true); // Fetch apps starting with the selected character
        setStep(2); // Move to the next step (first app selection)
    };

    // Handle the selection of the second app's character
    const handleSecondAppCharSelect = (char) => {
        fetchAppsByCharacter(char, false); // Fetch apps starting with the selected character
        setStep(4); // Move to the next step (second app selection)
    };

    // Handle the selection of the first app
    const handleFirstAppChoose = (app) => {
        setFirstApp(app.appslugname); // Set selected first app
        setStep(3); // Move to the next step (second app character selection)
    };

    // Handle the selection of the second app
    const handleSecondAppChoose = (app) => {
        setSecondApp(app.appslugname); // Set selected second app

        // Construct the URL with both firstApp and secondApp
        const newUrl = `/find-combinations/${firstApp}/${app.appslugname}`;
        router.push(newUrl); // Navigate to the new URL
    };

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/support'} />

            <Navbar navData={navData} />

            <div className="container py-20 flex flex-col gap-20 items-center justify-center">
                {/* If slugs exist in the URL, show both app cards */}
                {firstAppData && secondAppData ? (
                    <>
                        <AppCard appName={firstAppData.name} appSlug={firstAppData.appslugname} />{' '}
                        {/* Show first app card */}
                        <AppCard appName={secondAppData.name} appSlug={secondAppData.appslugname} />{' '}
                        {/* Show second app card */}
                    </>
                ) : (
                    <>
                        {step === 1 && (
                            <div className="border p-16 rounded flex flex-col gap-6 items-center justify-center">
                                <h2 className="text-2xl font-semibold">Select a Character for the First App</h2>
                                <AZComp onAppSelect={handleFirstAppCharSelect} /> {/* Select first character */}
                            </div>
                        )}

                        {step === 2 && (
                            <>
                                <div className="grid grid-cols-5 gap-3">
                                    {appsForFirstChar.map((app) => (
                                        <button
                                            key={app.appslugname}
                                            className="text-link"
                                            onClick={() => handleFirstAppChoose(app)}
                                        >
                                            {app.name}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                {firstApp && <AppCard appName={firstApp} />} {/* Show the first app card */}
                                <div className="border p-16 rounded flex flex-col gap-6 items-center justify-center">
                                    <h2 className="text-2xl font-semibold">Select a Character for the Second App</h2>
                                    <AZComp onAppSelect={handleSecondAppCharSelect} /> {/* Select second character */}
                                </div>
                            </>
                        )}

                        {step === 4 && (
                            <>
                                <div className="grid grid-cols-5 gap-3">
                                    {appsForSecondChar.map((app) => (
                                        <button
                                            key={app.appslugname}
                                            className="text-link"
                                            onClick={() => handleSecondAppChoose(app)}
                                        >
                                            {app.name}
                                        </button>
                                    ))}
                                </div>
                                {secondApp && (
                                    <>
                                        <AppCard appName={firstApp} /> {/* Show the first app card */}
                                        <AppCard appName={secondApp} /> {/* Show the second app card */}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>

            <Footer footerData={footerData} />
        </>
    );
}

export async function getStaticProps() {
    const IDs = [
        'tbl7lj8ev', // navData: results[0]
        'tbl6u2cba', // footerData: results[1]
        'tbl2bk656', // metaData: results[2]
    ];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            navData: results[0]?.data?.rows,
            footerData: results[1]?.data?.rows,
            metaData: results[2]?.data?.rows,
        },
    };
}
