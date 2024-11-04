import fetchSearchResults from '@/utils/searchIntegrationApps';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdAdd, MdChevronLeft, MdChevronRight, MdKeyboardArrowDown } from 'react-icons/md';
import categories from '@/assets/data/categories.json';
import Autocomplete from 'react-autocomplete';

export default function IntegrationsApps({ apps, query, pluginData, showCategories }) {
    console.log(query, 'quer');

    const [searchTerm, setSearchTerm] = useState('');
    const [catSearchTerm, setCatSearchTerm] = useState(query?.currentcategory);
    const [searchedApps, setSearchedApps] = useState([]);
    const [debounceValue, setDebounceValue] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [visibleCategories, setVisibleCategories] = useState('20');
    const [filteredCategories, setFilteredCategories] = useState(categories?.categories);

    useEffect(() => {
        if (searchTerm) {
            const handler = setTimeout(() => {
                setDebounceValue(searchTerm);
            }, 300);

            return () => {
                clearTimeout(handler);
            };
        }
    }, [searchTerm]);

    useEffect(() => {
        if (debounceValue) {
            setSearchLoading(true);
            async function loadApps() {
                const filteredApps = await searchApps(debounceValue);
                setSearchedApps(filteredApps);
                setSearchLoading(false);
            }
            loadApps();
        }
    }, [debounceValue]);

    const searchApps = async (debounceValue) => {
        try {
            const result = await fetchSearchResults(debounceValue);
            return result;
        } catch (error) {
            console.log(error.message);
        }
    };
    const filterCategory = async (search) => {
        setCatSearchTerm(search);
        const filteredCategories = categories?.categories?.filter((category) =>
            category.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCategories(filteredCategories);
    };

    const handleCategorySelect = (category) => {
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/integrations?category=${category}`;
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
                )}

                <div className="flex md:flex-row flex-col gap-4 my-12">
                    <div
                        tabIndex={0}
                        className="md:hidden  dropdown-content menu bg-base-100  z-[1] p-0 max-w-[320px] industry-autocomplete"
                    >
                        <Autocomplete
                            getItemValue={(item) => item.label}
                            items={filteredCategories.map((cat) => ({
                                label: cat,
                            }))}
                            renderItem={(item) => (
                                <Link
                                    className="px-2 py-1 cursor-pointer hover:bg-secondary"
                                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations?category=${item.label}`}
                                >
                                    {item.label}
                                </Link>
                            )}
                            value={catSearchTerm}
                            onChange={(e) => filterCategory(e.target.value)}
                            onSelect={(val) => handleCategorySelect(val)}
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
                        <ul className=" md:flex hidden min-w-[300px] md:flex-col gap-3">
                            {categories?.categories.map((category, index) => {
                                return (
                                    <li key={index} className={visibleCategories > index ? '' : 'hidden'}>
                                        <Link
                                            className={query?.currentcategory === category ? 'font-bold' : ''}
                                            href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations?category=${category}`}
                                        >
                                            {category}
                                        </Link>
                                    </li>
                                );
                            })}
                            <li
                                onClick={() => {
                                    setVisibleCategories(Number(visibleCategories) + 10);
                                }}
                                className={`flex text-link underline items-center gap-2 cursor-pointer ${visibleCategories > categories?.categories.length ? 'hidden' : 'flex'}`}
                            >
                                Load More <MdKeyboardArrowDown fontSize={20} />
                            </li>
                        </ul>
                    )}

                    <div className="flex-col gap-8">
                        <div className="lg:w-[500px] md:w-[400px] w-[250px]">
                            <label className="input border-[#CCCCCC] flex items-center gap-2 bg-white ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Search integrations"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </label>
                        </div>

                        {searchTerm || searchLoading ? (
                            <div className="flex flex-wrap gap-4">
                                {searchLoading
                                    ? Array.from({ length: 20 }).map((_, index) => (
                                          <div
                                              key={index}
                                              className="flex flex-row justify-center items-center gap-2 px-5 py-3  border border-[#CCCCCC] bg-white animate-pulse"
                                          >
                                              <div className="h-6 w-6 bg-gray-300 "></div>
                                              <div className="h-4 w-24 bg-gray-300 "></div>
                                          </div>
                                      ))
                                    : searchedApps?.length > 0 &&
                                      searchedApps.map((app, index) => (
                                          <a
                                              key={index}
                                              rel="noopener noreferrer"
                                              aria-label="apps"
                                              href={`/integrations${pluginData?.length && pluginData[0]?.appslugname ? '/' + pluginData[0]?.appslugname : ''}/${app?.appslugname}`}
                                          >
                                              <div className="flex flex-row justify-center items-center gap-2 px-5 py-3  border border-[#CCCCCC] bg-white">
                                                  {app?.iconurl && (
                                                      <Image
                                                          src={
                                                              app?.iconurl ? app?.iconurl : 'https://placehold.co/24x24'
                                                          }
                                                          alt={app?.name}
                                                          height={24}
                                                          width={24}
                                                      />
                                                  )}
                                                  <span className="text-base font-medium">{app?.name}</span>
                                              </div>
                                          </a>
                                      ))}
                            </div>
                        ) : apps?.length > 0 ? (
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-wrap gap-4">
                                    {apps.map((app, index) => (
                                        <a
                                            key={index}
                                            rel="noopener noreferrer"
                                            aria-label="apps"
                                            href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations${pluginData?.length && pluginData[0]?.appslugname ? '/' + pluginData[0]?.appslugname : ''}/${app?.appslugname}`}
                                        >
                                            <div className="flex flex-row justify-center items-center gap-2 px-5 py-3  border border-[#CCCCCC] bg-white">
                                                {app?.iconurl && (
                                                    <Image
                                                        src={app?.iconurl ? app?.iconurl : 'https://placehold.co/24x24'}
                                                        alt={app?.name}
                                                        height={24}
                                                        width={24}
                                                    />
                                                )}
                                                <span className="text-base font-medium">{app?.name}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                                <div className="flex gap-4 justify-center">
                                    {query?.page !== 1 && query?.page !== '1' && (
                                        <>
                                            {' '}
                                            <Link
                                                href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations${pluginData?.length && pluginData[0]?.appslugname ? '/' + pluginData[0]?.appslugname : ''}?category=${query?.currentcategory}&page=${Number(query?.page) - 1}`}
                                            >
                                                <button className="btn btn-primary btn-outline btn-sm ">
                                                    <MdChevronLeft /> Previous Page{' '}
                                                </button>
                                            </Link>
                                            <Link
                                                href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations${pluginData?.length && pluginData[0]?.appslugname ? '/' + pluginData[0]?.appslugname : ''}?category=${query?.currentcategory}&page=${Number(query?.page) - 1}`}
                                            >
                                                <button className="btn btn-primary btn-outline btn-sm ">
                                                    {Number(query?.page) - 1}
                                                </button>{' '}
                                            </Link>
                                        </>
                                    )}

                                    <button className="btn btn-primary  btn-sm ">{query?.page}</button>
                                    {apps?.length >= 100 && (
                                        <>
                                            <Link
                                                href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations${pluginData?.length && pluginData[0]?.appslugname ? '/' + pluginData[0]?.appslugname : ''}?category=${query?.currentcategory}&page=${Number(query?.page) + 1}`}
                                            >
                                                <button className="btn btn-primary btn-outline btn-sm ">
                                                    {Number(query?.page) + 1}
                                                </button>
                                            </Link>
                                            <Link
                                                href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations${pluginData?.length && pluginData[0]?.appslugname ? '/' + pluginData[0]?.appslugname : ''}?category=${query?.currentcategory}&page=${Number(query?.page) + 1}`}
                                            >
                                                <button className="btn btn-primary btn-outline btn-sm ">
                                                    Next Page <MdChevronRight />
                                                </button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p className="text-2xl font-semibold text-red-600">
                                {' '}
                                No App fond in {query?.currentcategory} category. <br />
                                Please select another category
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
