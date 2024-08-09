import Image from 'next/image';
import Link from 'next/link';
import { MdAdd, MdClose, MdOutlineArrowForward } from 'react-icons/md';
import { getDbdashData } from './api/index';
import { MdArrowForward } from 'react-icons/md';
import GetStarted from '@/components/getStarted/getStarted';
import { FeaturesGrid } from '@/components/featureGrid/featureGrid';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import axios from 'axios';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { useEffect, useState } from 'react';
import Industries from '@/assets/data/categories.json';

const Index = ({ products, testimonials, caseStudies, getStartedData, features, metaData, faqData, apps, posts }) => {
    const [searchTerm, setSearchTerm] = useState();
    const formattedIndustries = Industries.industries.map((name, id) => ({ name: name, id: id + 1 }));

    if (apps.length > 0) {
        return (
            <>
                <MetaHeadComp metaData={metaData} page={'/'} />
                <div className="grid gap-20 ">
                    <div className="flex flex-col gap-10 container lg:pb-8 pt-20 ">
                        <span className="text-3xl font-semibold">Ai First</span>
                        <h1 className="text-6xl font-bold">
                            Connect your favorite apps and automate your repetitive tasks.
                        </h1>
                        <div className="flex flex-col gap-3">
                            <h2 className="text-3xl font-semibold">What industries are automating</h2>
                            <div className="flex flex-wrap gap-6">
                                <select
                                    placeholder="Select an industry"
                                    className="select select-bordered rounded-md w-full max-w-[250px] bg-white"
                                    onChange={(e) => handleIndusSelect(e.target.value)}
                                >
                                    <option value="">Select your industry</option>
                                    {formattedIndustries.length > 0 &&
                                        formattedIndustries.map((indus, index) => {
                                            return <option key={index}>{indus.name}</option>;
                                        })}
                                </select>

                                {apps.slice(0, 2).map((app, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 bg-white w-fit p-3 rounded cursor-pointer "
                                        >
                                            <Image src={app?.iconurl} width={24} height={24} alt="ico" />
                                            <span>{app?.name}</span>
                                            <MdClose
                                                className="text-gray-300 hover:text-gray-950"
                                                onClick={() => {
                                                    removeAppFromArray(index);
                                                }}
                                            />
                                        </div>
                                    );
                                })}

                                <div>
                                    <div>
                                        <div className="relative">
                                            {/* <button className="btn border-none bg-white h-[48px] w-[48px] flex items-center justify-center rounded p-0">
                                                <MdAdd color="black" fontSize={30} />
                                            </button> */}

                                            <div className=" w-[250px] transition-all duration-300 relative bg-white dropdown">
                                                <label
                                                    className="input border-[#CCCCCC] flex items-center gap-2 bg-white rounded"
                                                    tabIndex={0}
                                                    role="button"
                                                >
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
                                                    <span
                                                        className="btn icon border-none bg-transparent p-0"
                                                        onClick={() => {
                                                            setSearchTerm('');
                                                        }}
                                                    >
                                                        <MdClose color="black" fontSize={24} />
                                                    </span>
                                                </label>
                                                <ul
                                                    tabIndex={0}
                                                    className="dropdown-content menu flex-nowrap bg-base-100  z-[1] shadow max-h-[290px] w-[250px] overflow-scroll p-0"
                                                >
                                                    {apps.slice(0, 10).map((app, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="flex items-center gap-2 bg-white p-3 cursor-pointer w-full hover:bg-slate-100 "
                                                                onClick={() => {
                                                                    handleSelect(app.name);
                                                                }}
                                                            >
                                                                <Image
                                                                    src={app?.iconurl}
                                                                    width={24}
                                                                    height={24}
                                                                    alt="ico"
                                                                />
                                                                <span>{app?.name}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary h-[48px] w-auto flex items-center justify-center rounded ">
                                    Search automation
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="container grid gap-10">
                        <h2 className="font-inter text-3xl font-semibold leading-9 tracking-normal text-left">
                            Meet our automation products
                        </h2>
                        <div className=" grid md:grid-cols-2 grid-cols-1 md:flex-row lg:gap-16 md:gap-8 gap-8  items-center justify-center ">
                            {products &&
                                products.map((product, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            href={`/${product?.name && product.name}`}
                                            target="_blank"
                                            className="flex items-center justify-center w-full h-full"
                                            aria-label="products"
                                        >
                                            <div
                                                className="flex flex-col bg-white rounded-md overflow-hidden max-w-[400px] md:max-w-full w-full h-full hover:drop-shadow-lg"
                                                key={index}
                                            >
                                                <div className="p-6 grid gap-2 h-full">
                                                    <div className="flex items-center gap-2 ">
                                                        <Image
                                                            className="h-[40px]"
                                                            src={`/assets/brand/${product?.name}_ico.svg`}
                                                            width={36}
                                                            height={48}
                                                            alt={product?.name}
                                                        />
                                                        <p className="font-inter text-3xl font-semibold leading-11 text-left capitalize tracking-wide">
                                                            {product?.name}
                                                        </p>
                                                    </div>
                                                    <p className="font-inter lg:text-xl text-base font-normal leading-6 tracking-normal text-left">
                                                        {product?.description}
                                                    </p>
                                                    {/* If you need another Link here, ensure it follows the same pattern */}
                                                    <button
                                                        className="flex items-center gap-1 text-[#0000ff]"
                                                        aria-label="Explore"
                                                    >
                                                        Explore <MdArrowForward />
                                                    </button>
                                                </div>
                                                <div className="pt-6 w-full ">
                                                    <Image
                                                        className="w-full bg-[#F6F4EE]"
                                                        src={product.image[0]}
                                                        height={90}
                                                        width={80}
                                                        alt={product?.name}
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                    {features && <FeaturesGrid features={features} page={'overall'} />}
                    <div className="grid gap-10 container w">
                        <h2 className="font-inter text-3xl font-semibold leading-9 tracking-normal text-left ">
                            What clients says
                        </h2>
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 w-full">
                            {testimonials &&
                                testimonials.map((testimonial, index) => {
                                    return (
                                        <div className="flex flex-col rounded-md  p-8 gap-8 bg-[#FEFDFD] " key={index}>
                                            <p className="font-inter text-lg font-normal leading-[32px] tracking-normal text-left ">
                                                " {testimonial?.testimonial}"
                                            </p>
                                            <div className="flex items-center gap-2 mt-auto">
                                                <Image
                                                    className="rounded-full"
                                                    src={testimonial?.client_img[0]}
                                                    width={36}
                                                    height={36}
                                                    alt={testimonial?.given_by}
                                                />
                                                <div>
                                                    <p className="font-inter  font-semibold leading-4 tracking-normal text-left">
                                                        {testimonial?.given_by}
                                                    </p>
                                                    <p className="font-inter text-sm font-normal leading-4 tracking-normal text-left pt-1 text-gray-400">
                                                        {testimonial?.giver_title}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="grid container gap-10">
                        <h2 className="font-inter text-3xl font-semibold leading-9 tracking-normal text-left ">
                            Client Stories
                        </h2>

                        <div className="grid grid-rows-6 grid-cols-6 gap-6 container md:max-h-[700px]">
                            {caseStudies &&
                                caseStudies.map((caseStudy, index) => {
                                    if (caseStudy?.priority === 1) {
                                        return (
                                            <Link
                                                key={index}
                                                href={caseStudy?.link}
                                                target="_blank"
                                                className="lg:row-span-6 lg:col-span-3 md:row-span-3 md:col-span-6 row-span-2 col-span-6 bg-white flex flex-col md:flex-row lg:flex-col items-center rounded-md overflow-hidden hover:drop-shadow-lg"
                                                aria-label="casestudy"
                                            >
                                                <div className="casestudy_img w-full h-full">
                                                    <Image
                                                        src={caseStudy?.image[0]}
                                                        width={1080}
                                                        height={1080}
                                                        alt={caseStudy?.title}
                                                    />
                                                </div>
                                                <div className="grid p-4">
                                                    <p>{caseStudy?.title}</p>
                                                    <Link
                                                        target="_blank"
                                                        href={caseStudy?.link}
                                                        className="flex items-center gap-1 text-[#0000ff] mt-6"
                                                        aria-label="case study"
                                                    >
                                                        Learn More <MdOutlineArrowForward />
                                                    </Link>
                                                </div>
                                            </Link>
                                        );
                                    } else {
                                        return (
                                            <Link
                                                key={index}
                                                target="_blank"
                                                href={caseStudy?.link}
                                                className="lg:row-span-3 lg:col-span-3 md:row-span-3 md:col-span-3 row-span-2 col-span-6 bg-white flex flex-col lg:flex-row lg:items-center items-start rounded-md overflow-hidden justify-center hover:drop-shadow-lg"
                                            >
                                                <div className="casestudy_img w-full h-full">
                                                    <Image
                                                        src={caseStudy?.image[0]}
                                                        height={1080}
                                                        width={1080}
                                                        alt={caseStudy?.title}
                                                    />
                                                </div>
                                                <div className="w-fit h-fit xl:min-w-[360px] lg:min-w-[260px] p-4">
                                                    <p>{caseStudy?.title}</p>
                                                    <Link
                                                        target="_blank"
                                                        href={caseStudy?.link}
                                                        className="flex items-center gap-1 text-[#0000ff] mt-6"
                                                    >
                                                        Learn More <MdOutlineArrowForward />
                                                    </Link>
                                                </div>
                                            </Link>
                                        );
                                    }
                                })}
                        </div>
                    </div>

                    {posts?.length && (
                        <div className="container mx-auto  py-12">
                            {' '}
                            <BlogGrid posts={posts} />
                        </div>
                    )}

                    <div className="bg-white py-20 ">
                        {faqData && faqData.length > 0 && (
                            <div className="container">
                                <FAQSection faqData={faqData} faqName={'/index'} />
                            </div>
                        )}
                    </div>

                    {getStartedData && (
                        <div className="container">
                            <GetStarted data={getStartedData} isHero={'false'} />
                        </div>
                    )}
                </div>
            </>
        );
    }
};
export default Index;

export async function getServerSideProps() {
    const IDs = [
        'tblogeya1',
        'tblwql8n1',
        'tblwoqytc',
        'tblvgm05y',
        'tblmsw3ci',
        'tblsaw4zp',
        'tblvo36my',
        'tbl2bk656',
        'tblnoi7ng',
        'tblvu0f6w',
    ];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    const tag = 'via-socket';
    const defaultTag = 'integrations';
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaulttag=${defaultTag}`
    );
    const posts = await res.data;
    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=200`, apiHeaders);
    const apps = await response.json();

    return {
        props: {
            products: results[0]?.data?.rows,
            testimonials: results[1]?.data?.rows,
            caseStudies: results[2]?.data?.rows,
            getStartedData: results[3]?.data?.rows,
            features: results[6]?.data?.rows,
            metaData: results[7]?.data?.rows,
            faqData: results[8]?.data?.rows,
            apps,
            posts: posts,
        },
    };
}
