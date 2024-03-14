"use-client";
import Image from "next/image";
import Link from "next/link";
import TrustedBy from "../trustedBy/trustedBy";
import TemplateSection from "../templateSection/templateSection";
import GetStarted from "../getStarted/getStarted";
import feat1 from "../../../public/assets/img/features/feat1.png";
import feat2 from "../../../public/assets/img/features/feat2.png";
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
      <div className="mx-auto grid mt-14 gap-24 w-full  md:pt-48 pt-24">
        <div className="grid gap-14 container">
          <div className="grid gap-4 md:gap-10">
            {pageData?.h3 && <h3 className="text-2xl">{pageData?.h3}</h3>}
            <div className="grid gap-2 md:w-5/6 w=1/1">
              {pageData?.h1 && (
                <h1 className="md:text-6xl text-4xl font-medium ">
                  {pageData?.h1}
                </h1>
              )}
              {pageData?.h2 && <h3 className="text-2xl">{pageData?.h2}</h3>}
            </div>
          </div>

          <div className="flex flex-col gap-6 mb-4">
            <div className="flex flex-col gap-6 mb-4">
              <button className=" text-lg btn btn-accent w-fit ">
                Hire a no-code builder
              </button>
              <Link href="/" className="underline  w-fit font-normal text-lg">
                Click for our 24/7 AI & Team Support
              </Link>
            </div>
          </div>
          {pageData?.hero_img[0] && (
            <Image
              className="w-full h-auto"
              src={pageData?.hero_img[0]}
              width={1300}
              height={800}
              alt="Flow"
            />
          )}

          <TrustedBy data={props?.trustedBy} />
        </div>
        <div className="grid gap-10 container">
          <h2 className="text-3xl font-semibold">Features</h2>

          <div className="grid lg:grid-cols-4 lg:grid-rows-3 md:grid-cols-3 md:grid-rows-4 sm:grid-cols-2 sm:grid-rows-6 gap-5  overflow-hidden ">
            {props?.features
              .sort((a, b) => a.priority - b.priority)
              .map((feature, index) => {
                if (feature?.product?.toLowerCase() === props?.page) {
                  if (feature.block_type === "R2C2") {
                    return (
                      <div
                        key={index}
                        className={` col-span-2 row-span-2 h-full bg-[#F7F7F8] p-6 rounded-lg justify-between gap-4 flex flex-col`}
                      >
                        <div className="flex flex-col gap-3">
                          {feature?.icon ? (
                            <feature.icon size={35} />
                          ) : (
                            <HiOutlineComputerDesktop size={35} />
                          )}
                        </div>

                        <div className="flex flex-col gap-2 justify-end">
                          <h1 className="text-xl font-semibold">
                            {feature.name}
                          </h1>
                          <p className="text-sm text-gray-500">
                            {feature?.description}
                          </p>
                          {feature?.link && (
                          <Link href={feature?.link}>
                            <button className="underline text-blue-500">
                              {" "}
                              Discover{" "}
                            </button>
                          </Link>
                        )}
                        </div>
                      

                        {feature?.image && (
                          <div className="flex w-full">
                            <Image
                              src={feature?.image}
                              alt="feature 1"
                              className="w-full "
                            />
                          </div>
                        )}
                      </div>
                    );
                  } else if (feature.block_type === "R1C1") {
                    return (
                      <div
                        key={index}
                        className={`col-span-1 row-span-1 h-full bg-[#F7F7F8] p-6 rounded-lg justify-between gap-4 flex flex-col`}
                      >
                        <div className="flex flex-col gap-3">
                          {feature?.icon ? (
                            <feature.icon size={35} />
                          ) : (
                            <HiOutlineComputerDesktop size={35} />
                          )}
                        </div>

                        <div className="flex flex-col gap-2 justify-end">
                          <h1 className="text-xl font-semibold">
                            {feature.name}
                          </h1>
                          <p className="text-sm text-gray-500">
                            {feature?.description}
                          </p>
                          {feature?.link && (
                          <Link href={feature?.link}>
                            <button className="underline text-blue-500">
                              {" "}
                              Discover{" "}
                            </button>
                          </Link>
                        )}
                        </div>

                        

                        {feature?.image && (
                          <div className="flex w-full">
                            <Image
                              src={feature?.image}
                              alt="feature 1"
                              className="w-full "
                            />
                          </div>
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className={` col-span-2 row-span-1 h-full bg-[#F7F7F8] p-6 rounded-lg justify-between gap-4 flex flex-col`}
                      >
                        <div className="flex flex-col gap-3">
                          {feature?.icon ? (
                            <feature.icon size={35} />
                          ) : (
                            <HiOutlineComputerDesktop size={35} />
                          )}
                        </div>

                        <div className="flex flex-col gap-2 justify-end">
                          <h1 className="text-xl font-semibold">
                            {feature.name}
                          </h1>
                          <p className="text-sm text-gray-500">
                            {feature?.description}
                          </p>
                          {feature?.link && (
                          <Link href={feature?.link}>
                            <button className="underline text-blue-500">
                              {" "}
                              Discover{" "}
                            </button>
                          </Link>
                        )}
                        </div>

                        

                        {feature?.image && (
                          <div className="flex w-full">
                            <Image
                              src={feature?.image}
                              alt="feature 1"
                              className="w-full "
                            />
                          </div>
                        )}
                      </div>
                    );
                  }
                }
              })}
          </div>
        </div>
        {props?.templatedata && <TemplateSection data={templates} />}
        {props?.tablevsspreadsheet && (
          <div className="grid gap-10 container">
            <h2 className="text-3xl font-semibold">
              Why use Tables instead of a spreadsheet?
            </h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
              {tablevsspreadsheet.map((reason, index) => {
                return (
                  <div className="grid gap-2" key={index}>
                    <h3 className="font-semibold text-xl">{reason?.name}</h3>
                    <p className="">{reason?.des}</p>
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
