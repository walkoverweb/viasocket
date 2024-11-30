import searchApps from '@/utils/searchApps';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdAdd, MdExpandMore, MdKeyboardArrowDown } from 'react-icons/md';
import categories from '@/assets/data/categories.json';
import Autocomplete from 'react-autocomplete';
import style from './integrationsApps.module.scss';
import fetchApps from '@/utils/getApps';
import { useRouter } from 'next/router';

export default function IntegrationsApps({ pluginData, showCategories }) {
    const router = useRouter();
    const [visibleCategories, setVisibleCategories] = useState(30);
    const [offset, setOffset] = useState(0);
    const [apps, setApps] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [catSearchTerm, setCatSearchTerm] = useState('');
    const [debounceValue, setDebounceValue] = useState('');
    const [showMore, setShowMore] = useState(true);
    const [filteredCategories, setFilteredCategories] = useState(categories?.categories);
    const [qurey, setQurey] = useState({
        category: router?.query?.category || '',
        offset: offset,
    });
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        const loadApps = async () => {
            const fetchedApps = await fetchApps(qurey);
            setApps(fetchedApps || []);
        };
        loadApps();
    }, [qurey]);

    useEffect(() => {
        if (debounceValue) {
            const filteredCategories = categories?.categories?.filter((category) =>
                category.toLowerCase().includes(debounceValue.toLowerCase())
            );
            setFilteredCategories(filteredCategories);
            const loadApps = async () => {
                const fetchedApps = await searchApps(debounceValue);
                setApps(fetchedApps || []);
            };
            loadApps();
        } else {
            setFilteredCategories(categories?.categories);
            const loadApps = async () => {
                const fetchedApps = await fetchApps(qurey);
                setApps(fetchedApps || []);
            };
            loadApps();
        }
    }, [debounceValue]);

    const handleLoadMore = async () => {
        setVisibleCategories(visibleCategories + 30);
        setOffset(offset + 100);
        const fetchedApps = await fetchApps({
            category: router?.query?.category || '',
            offset: offset + 100,
        });
        setApps((prevApps) => [...prevApps, ...fetchedApps]);
    };

    const handleCategorySelect = (category) => {
        setSearchTerm('');
        setQurey({ category: category || '', offset: 0 });
        setOffset(0);
        setVisibleCategories(30);
        const newUrl = {
            pathname: decodeURIComponent(router.pathname),
            query: { category: decodeURIComponent(category) },
        };
        router.replace(newUrl, undefined, { shallow: true });
    };

    return (
        <>
            <div className="container flex-col gap-4 my-12">
                {pluginData?.length && (
                    <>
                        <h2 className="lg:text-3xl text-2xl md:text-3xl font-semibold">
                            Integrate with specific service
                        </h2>
                        <div className="flex gap-2 justify-center items-center bg-white border py-4 px-6  w-fit">
                            <Image
                                className="w-[26px] h-[26px]"
                                src={pluginData[0]?.iconurl || 'https://placehold.co/40x40'}
                                width={40}
                                height={40}
                                alt={pluginData[0]?.name}
                            />
                            <h6 className="text-2xl font-bold capitalize">{pluginData[0]?.name}</h6>
                        </div>
                        <div className="px-8">
                            <MdAdd fontSize={46} />
                        </div>
                    </>
                )}{' '}
                <div className="w-full">
                    <div className="lg:w-[400px] md:w-[400px] w-[250px]">
                        <label
                            className={`${style.input} input  text-white flex items-center gap-2 bg-black focus:outline-none focus:border-0 `}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                type="text"
                                className={`${style.input} grow`}
                                placeholder="Search your favoirts tools "
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="flex h-fit min-h-[600px]   md:flex-row flex-col gap-8 border border-black ">
                        <div
                            tabIndex={0}
                            className="md:hidden  dropdown-content menu bg-base-100  z-[1] p-0 max-w-[320px] industry-autocomplete"
                        >
                            <Autocomplete
                                getItemValue={(item) => item.label}
                                items={filteredCategories.map((cat) => ({
                                    label: 'cat',
                                }))}
                                renderItem={(item) => (
                                    <span
                                        className={`uppercase  tracking-wider cursor-pointer text-sm ${qurey?.category === item ? 'font-bold' : ''}`}
                                        onClick={() => handleCategorySelect(item)}
                                    >
                                        {item}
                                    </span>
                                )}
                                value={catSearchTerm}
                                onChange={(e) => filterCategory(e.target.value)}
                                onSelect={(val) => setCatSearchTerm(val)}
                                menuStyle={{
                                    position: 'absolute',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'auto',
                                    maxHeight: '400px',
                                    background: 'white',
                                }}
                                inputProps={{ placeholder: 'Select Category', id: 'categoryAutoComplete' }}
                            />
                        </div>

                        {showCategories && (
                            <ul className="max-w-[280px] min-w-[280px]  max-h-full overflow-hidden flex flex-col border-r border-black gap-2 p-6">
                                {filteredCategories?.slice(0, visibleCategories)?.map((category, index) => {
                                    return (
                                        <li key={index}>
                                            <span
                                                className={`uppercase  tracking-wider cursor-pointer text-sm ${qurey?.category === category ? 'font-bold' : ''}`}
                                                onClick={() => handleCategorySelect(category)}
                                            >
                                                {category}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        <div className="flex flex-wrap gap-4 h-fit p-6 items-start ">
                            {apps?.length > 0 &&
                                apps.map((app, index) => (
                                    <a
                                        className="flex gap-2 h-[48px] items-center border px-6 overflow-hidden"
                                        key={index}
                                        rel="noopener noreferrer"
                                        aria-label="apps"
                                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations${pluginData?.length && pluginData[0]?.appslugname ? '/' + pluginData[0]?.appslugname : ''}/${app?.appslugname}`}
                                    >
                                        {app?.iconurl && (
                                            <Image
                                                className="h-fit"
                                                src={app?.iconurl ? app?.iconurl : 'https://placehold.co/24x24'}
                                                alt={app?.name}
                                                height={24}
                                                width={24}
                                            />
                                        )}
                                        <span className="text-base font-medium">{app?.name}</span>
                                    </a>
                                ))}
                        </div>
                    </div>
                    {apps?.length >= offset + 100 && (
                        <div className="w-full flex justify-end">
                            <button
                                onClick={() => {
                                    handleLoadMore();
                                }}
                                className="btn btn-primary btn-outline border-t-0"
                            >
                                Load more <MdExpandMore fontSize={26} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
