import Image from "next/image";
import Link from "next/link";
import styles from "./productComp.module.scss";
import TrustedBy from "../trustedBy/trustedBy";
import TemplateSection from "../templateSection/templateSection";
import GetStarted from "../getStarted/getStarted";
import { HiOutlineComputerDesktop } from "react-icons/hi2";

export default function ProductComp(props) {
  let pageData = props?.productData.find(
    (page) => page?.name?.toLowerCase() === props?.page
  );
  // const parseBlockType = (blockType) => {
  //   const [rowSpan, colSpan] = blockType.match(/\d+/g).map(Number);
  //   return { rowSpan, colSpan };
  // };

  return (
    <>
      <div className='mx-auto grid mt-14 gap-24 w-full  md:pt-48 pt-24'>
        <div className='grid gap-14 container'>
          <div className='grid gap-4 md:gap-10'>
            {pageData?.h3 && <h3 className='text-2xl'>{pageData?.h3}</h3>}
            <div className='grid gap-2 md:w-5/6 w=1/1'>
              {pageData?.h1 && (
                <h1 className='md:text-6xl text-4xl font-medium '>
                  {pageData?.h1}
                </h1>
              )}
              {pageData?.h2 && <h3 className='text-2xl'>{pageData?.h2}</h3>}
            </div>
          </div>

          <div className='flex flex-col gap-6 mb-4'>
            <div className='flex flex-col gap-6 mb-4'>
              <button className=' text-lg btn btn-accent w-fit '>
                Hire a no-code builder
              </button>
              <Link href='/' className='underline  w-fit font-normal text-lg'>
                Click for our 24/7 AI & Team Support
              </Link>
            </div>
          </div>
          {pageData?.hero_img[0] && (
            <Image
              className='w-full h-auto'
              src={pageData?.hero_img[0]}
              width={1300}
              height={800}
              alt='Flow'
            />
          )}

          <TrustedBy data={props?.trustedBy} />
        </div>
        <div className='grid gap-10 container'>
          <h2 className='text-3xl font-semibold'>Features</h2>

          <div className='grid xl:grid-cols-4 lg:grid-cols-3 lg:grid-rows-3 md:grid-cols-3 md:grid-rows-4 sm:grid-cols-2 sm:grid-rows-6 md:gap-5 gap-3  overflow-hidden '>
            {props?.features
              .sort((a, b) => a.priority - b.priority)
              .map((feature, index) => {
                if (feature?.product?.toLowerCase() === props?.page) {
                  if (feature.block_type === "R2C2") {
                    return (
                      <Link
                        key={index}
                        href={feature?.link ? feature?.link : "#"}
                        className={`${styles.r2c2} col-span-2 row-span-2  bg-[#F7F7F8] rounded-lg justify-between gap-4 w-full h-full flex flex-col aspect-square overflow-hidden `}
                      >
                        <div className='flex flex-col gap-3 lg:p-5 md:p-3 p-3'>
                          {feature?.icon ? (
                            <feature.icon size={35} />
                          ) : (
                            <HiOutlineComputerDesktop size={35} />
                          )}
                          <div className='flex flex-col gap-2 justify-end'>
                            <h1 className='md:text-xl text-lg font-semibold'>
                              {feature.name}
                            </h1>
                            <p className='md:text-sm text-xs text-gray-500'>
                              {feature?.description}
                            </p>
                            {/* {feature?.link && (
                              <Link href={feature?.link}>
                                <button className='underline md:text-sm text-xs text-blue-500'>
                                  {" "}
                                  Discover{" "}
                                </button>
                              </Link>
                            )} */}
                          </div>
                        </div>
                        {/* <Image
                              src="https://placehold.co/900x1600"
                              alt="Placeholder"
                              className={`${styles.r2c2_img} `}
                              height={1080}
                              width={1080}
                            /> */}
                        <div
                          className={`${styles.r2c2_img_cont} flex h-full justify-end items-end`}
                        >
                          {feature?.image ? (
                            <Image
                              src={feature.image}
                              alt='feature 1'
                              className={`${styles.r2c2_img} `}
                              height={1080}
                              width={1080}
                            />
                          ) : (
                            <Image
                              src='https://placehold.co/1600x1400'
                              alt='Placeholder'
                              className={`${styles.r2c2_img} `}
                              height={1080}
                              width={1080}
                            />
                          )}
                        </div>
                      </Link>
                    );
                  } else if (feature.block_type === "R1C2") {
                    return (
                      <Link
                        key={index}
                        href={feature?.link ? feature?.link : "#"}
                        className={`${styles.r1c2} bg-[#F7F7F8]  col-span-2 row-span-1 flex sm:flex-row flex-col rounded-lg w-full h-full`}
                      >
                        <div className='flex flex-col gap-3 h-full justify-between  lg:p-5 md:p-3 p-3 sm:w-1/2 w-1/1'>
                          {feature?.icon ? (
                            <feature.icon size={35} />
                          ) : (
                            <HiOutlineComputerDesktop size={35} />
                          )}
                          <div className='flex flex-col gap-2 justify-end'>
                            <h1 className='md:text-xl text-lg font-semibold'>
                              {feature.name}
                            </h1>
                            <p className='md:text-sm text-xs text-gray-500'>
                              {feature?.description}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`${styles.r1c2_img_cont} flex justify-end items-end sm:w-1/2 w-1/1 h-auto`}
                        >
                          {feature?.image ? (
                            <Image
                              src={feature.image}
                              alt='feature 1'
                              className={`${styles.r1c2_img} `}
                              height={1080}
                              width={1080}
                            />
                          ) : (
                            <Image
                              src='https://placehold.co/1600x1600'
                              alt='Placeholder'
                              className={`${styles.r1c2_img} `}
                              height={1080}
                              width={1080}
                            />
                          )}
                        </div>
                      </Link>
                    );
                  } else {
                    return (
                      <Link
                        href={feature?.link ? feature?.link : "#"}
                        key={index}
                        className={`col-span-2 md:col-span-1 row-span-1 min-h-[200px] bg-[#F7F7F8] lg:p-5 md:p-3 p-3 rounded-lg justify-between gap-1  flex flex-col  md:aspect-square w-full h-full`}
                      >
                        <div className='flex flex-col gap-3'>
                          {feature?.icon ? (
                            <feature.icon size={35} />
                          ) : (
                            <HiOutlineComputerDesktop size={35} />
                          )}
                        </div>

                        <div className='flex flex-col gap-2 justify-end '>
                          <h1 className='md:text-xl text-lg  font-semibold'>
                            {feature.name}
                          </h1>
                          <p className='md:text-sm text-xs text-gray-500'>
                            {feature?.description}
                          </p>
                          {/* {feature?.link && (
                            <Link href={feature?.link}>
                              <button className='underline md:text-sm text-xs text-blue-500'>
                                {" "}
                                Discover{" "}
                              </button>
                            </Link>
                          )} */}
                        </div>
                      </Link>
                    );
                  }
                }
              })}
          </div>
        </div>
        {props?.templatedata && <TemplateSection data={templates} />}
        {props?.tablevsspreadsheet && (
          <div className='grid gap-10 container'>
            <h2 className='text-3xl font-semibold'>
              Why use Tables instead of a spreadsheet?
            </h2>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
              {tablevsspreadsheet.map((reason, index) => {
                return (
                  <div className='grid gap-2' key={index}>
                    <h3 className='font-semibold text-xl'>{reason?.name}</h3>
                    <p className=''>{reason?.des}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <GetStarted data={props?.getStartedData} />
      </div>
    </>
  );
}
