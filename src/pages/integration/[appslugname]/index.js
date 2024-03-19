import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import IntegrationSearch from "@/components/integration/integrationApps";

const IntegrationSlugPage = ({ combos, apps, pathArray }) => {
  //defined states
  const [plugin, setPlugin] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(25);
  const [visibleComboItems, setVisibleComboItems] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState(10);

  const router = useRouter();

  const cardsData = combos?.combinations;
  console.log(combos?.plugins?.[pathArray[2]]);

  //fetch apps


  //fetch apps


  useEffect(() => {
    setVisibleItems(25);
  }, [selectedCategory]);
  useEffect(() => {
    setPlugin(combos?.plugins?.[pathArray[2]]);
  }, [combos, pathArray[2]]);

  //fetch icons
  const getIconUrl = (pluginName) => {
    if (cardsData) {
      const plugin = combos?.plugins[pluginName];
      return plugin ? plugin.iconurl : null;
    }
  };

  const handleLoadMore = () => {
    setVisibleItems(visibleItems + 25);
  };

  const handleComboLoadMore = () => {
    setVisibleComboItems(visibleComboItems + 3);
  };

  //search functions
  const applyFilters = () => {
    let filteredItems = apps.filter((item) => {
      const nameMatches = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatches = selectedCategory === "All" || item.category === selectedCategory || !item.category;
      return nameMatches && categoryMatches;
    });

    setFilteredData(filteredItems);
  };

  useEffect(() => {
    applyFilters();
  }, [apps, searchTerm, selectedCategory]);

  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const handleCategoryClick = () => {
    setCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const uniqueCategories = [
    "All",
    "Engineering",
    "Productivity",
    "Marketing",
    "IT",
    "Support",
    "Website Builders",
    "Databases",
    "Social Media Accounts",
    "Communication",
    "Accounting",
    "Ads & Conversion",
    "AI Tools",
    "Analytics",
    "App Builder",
    "App Families",
    "Bookmark Managers",
    "Business Intelligence",
    "Calendar",
    "Call Tracking",
    "Website & App Building",
    "Commerce",
    "Communication",
    "Contact Management",
    "Content & Files",
    "CRM (Customer Relationship Management)",
    "Customer Appreciation",
    "Customer Support",
    "Dashboards",
    "Developer Tools",
    "Devices",
    "Documents",
    "Drip Emails",
    "eCommerce",
    "Education",
    "Email",
    "Email Newsletters",
    "Event Management",
    "Fax",
    "File Management & Storage",
    "Filters",
    "Fitness",
    "Forms & Surveys",
    "Fundraising",
    "Gaming",
    "Human Resources",
    "HR Talent & Recruitment",
    "Images & Design",
    "Internet of Things",
    "Proposal & Invoice Management",
    "IT Operations",
    "Online Courses",
    "Lifestyle & Entertainment",
    "Marketing Automation",
    "News & Lifestyle",
    "Notes",
    "Notifications",
    "Payment Processing",
    "Phone & SMS",
    "Printing",
    "Product Management",
    "Productivity",
    "Project Management",
    "Reviews",
    "Sales & CRM",
    "Scheduling & Booking",
    "Security & Identity Tools",
    "Server Monitoring",
    "Signatures",
    "Social Media Marketing",
    "Spreadsheets",
    "Support",
    "Taxes",
    "Team Chat",
    "Team Collaboration",
    "Time Tracking Software",
    "Task Management",
    "Transactional Email",
    "Transcription",
    "URL Shortener",
    "Video & Audio",
    "Video Conferencing",
    "Webinars",
  ];
  const renderFilterOptions = () => {
    return uniqueCategories.slice(0, visibleCategories).map((category) => (
      <h6
        key={category}
        onClick={() => setSelectedCategory(category)}
        className={`lg:text-[20px] text-base cursor-pointer ${
          selectedCategory === category ? "font-bold" : "font-normal"
        }`}
      >
        {category === "Null" ? "Other" : category}
      </h6>
    ));
  };
  const handleCategoryLoadMore = () => {
    setVisibleCategories(visibleCategories + 10); // Increase the number of visible categories by 10
  };

  const handleCategoryItemClick = (category) => {
    setSelectedCategory(category);
    setCategoryDropdownOpen(false);
  };

  const handleLocalStore = (appName) => {
    localStorage.setItem("selectedAppName", appName);
  };

  // console.log(combos?.plugins?.[pathArray[2]], 222);

  const getEventDescription = (eventId) => {
    const plugins = combos?.plugins;
    for (const pluginName in plugins) {
      const events = plugins[pluginName]?.events;
      if (events) {
        const event = events.find((e) => e.rowid === eventId);
        if (event) {
          return event.name;
        }
      }
    }
    return null;
  };

  return (
    <div>
      {/* nav start */}
      <div className="bg-[#00A68B] pt-6">
        <div className="flex flex-row justify-between items-center container bg-[#f5f5f5] py-4 px-6 rounded-lg">
          <Link
            href={`/integration/${encodeURIComponent(pathArray[2])
              .replace(/\s/g, "-")
              ?.toLowerCase()}`}
          >
            <div className="flex gap-1 items-center">
              <Image
                className="w-[26px] h-[26px]"
                src={
                  plugin?.iconurl
                    ? plugin?.iconurl
                    : "https://placehold.co/40x40"
                }
                width={40}
                height={40}
              />
              <h6 className="text-2xl font-bold capitalize">{combos?.plugins?.[pathArray[2]].name}</h6>
            </div>
          </Link>
        </div>
      </div>

      {/* Hero section start */}
      <div className="bg-[#00A68B] pt-14">
        <div className="flex container">
          <h1 className="lg:text-6xl md:text-4xl text-2xl text-white font-bold pb-8">
            {`Create integrations between ${combos?.plugins?.[pathArray[2]].name} and your favorite app.`}
          </h1>
        </div>
      </div>

      {/* Display cards */}
      <div className="bg-[#00A68B] pb-14">
        <div className="container grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center md:justify-start gap-10 py-10">
          {cardsData?.length > 0 &&
            cardsData.slice(0, visibleComboItems).map((card, index) => {
              const triggerDescription = getEventDescription(card.trigger.id);
              const actionDescriptions = card.action.map((action) =>
                getEventDescription(action.id)
              );
              // const combinedDescription = ` ${actionDescriptions.join(
              //   " and "
              // )} when ${triggerDescription} `;
              const capitalizeFirstLetter = (string) => {
                return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
              };
              const combinedDescription = `${capitalizeFirstLetter(actionDescriptions[0])} ${actionDescriptions.slice(1).map(desc => desc.toLowerCase())} when ${triggerDescription.toLowerCase()}`;
              return (
                <div
                  key={index}
                  className="card rounded-lg bg-white border relative "
                >
                  <div className="flex flex-col justify-between gap-4 ">
                    <div className="flex flex-row justify-between items-center pt-6 px-6 ">
                      <div className="flex gap-2">
                        {getIconUrl(card?.trigger?.name) && (
                          <Image
                            src={getIconUrl(card?.trigger?.name)}
                            width={26}
                            height={26}
                            alt={card?.trigger?.name}
                          />
                        )}

                        {card?.action?.map((action, actionIndex) => (
                          <Image
                            key={actionIndex}
                            alt={action?.name}
                            src={getIconUrl(action.name)}
                            width={26}
                            height={26}
                          />
                        ))}
                      </div>
                      {/* <div className='flex gap-4 items-center'>
                        <p className='text-base'>Details</p>
                      </div> */}
                    </div>
                    <div className="flex px-6 mb-4 pb-6 ">
                      <p className="md:text-xl text-lg font-medium ">
                        {combinedDescription}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end items-center gap-2 py-4 px-6 bg-[#E6E6E6] rounded-bl-lg rounded-br-lg mt-auto cursor-pointer">
                    <p className="text-base font-medium"> Try it</p>
                    <MdOutlineArrowRightAlt size={25} />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex flex-row justify-center items-center">
          {visibleComboItems < cardsData?.length && (
            <button
              onClick={handleComboLoadMore}
              className="border border-white px-4 py-2 rounded-md text-white text-base"
            >
              Load More
            </button>
          )}
        </div>
      </div>

      {/* search section implement */}
      <div className="bg-[#F5F5F5] py-14">
        <div className="container">
          <h1 className="lg:text-5xl  text-3xl md:text-4xl font-semibold">
            Integrate with specific service
          </h1>
          <IntegrationSearch
            loading={loading}
            selectedApp={pathArray[2]}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            renderFilterOptions={renderFilterOptions}
            isCategoryDropdownOpen={isCategoryDropdownOpen}
            handleCategoryClick={handleCategoryClick}
            selectedCategory={selectedCategory}
            handleCategoryItemClick={handleCategoryItemClick}
            filteredData={filteredData}
            handleLocalStore={handleLocalStore}
            visibleItems={visibleItems}
            apps={apps}
            handleLoadMore={handleLoadMore}
            uniqueCategories={uniqueCategories}
            visibleCategories={visibleCategories}
            handleCategoryLoadMore={handleCategoryLoadMore}
            pathArray={pathArray}
          />
        </div>
      </div>

      {/* blogg section starts here */}
      <div className="bg-[#F5F5F5] py-10 hidden">
        {/* heading */}
        <div className="flex flex-col gap-6 justify-center items-center container">
          <h1 className="lg:text-4xl md:text-3xl text-2xl  font-semibold">
            Blogs to help you automate things using Interakt
          </h1>
          <p className="md:text-lg text-base ">
            Interakt templates to make quick automation, just in few click away
            to automate your tasks
          </p>
        </div>
        {/* blogs */}

        <div className="container grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 py-10">
          {/* 1 */}
          <div className="card bg-white border border-[#CCCCCC] p-5 justify-between rounded-lg  h-64 ">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold">
                How to automate your task using Interakt
              </h1>
              <p className="text-base">
                Interakt templates to make quick automation, just in few click
                away to automate your tasks
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold">viaSocket</h1>
              <p className="text-base">01/03/2024</p>
            </div>
          </div>
          {/* 2 */}
          <div className="card bg-white border border-[#CCCCCC] p-5 justify-between rounded-lg  h-64 ">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold">
                How to automate your task using Interakt
              </h1>
              <p className="text-base">
                Interakt templates to make quick automation, just in few click
                away to automate your tasks
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold">viaSocket</h1>
              <p className="text-base">01/03/2024</p>
            </div>
          </div>
          {/* 3 */}
          <div className="card bg-white border border-[#CCCCCC] p-5 justify-between rounded-lg  h-64 ">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold">
                How to automate your task using Interakt
              </h1>
              <p className="text-base">
                Interakt templates to make quick automation, just in few click
                away to automate your tasks
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold">viaSocket</h1>
              <p className="text-base">01/03/2024</p>
            </div>
          </div>
        </div>
        {/* blogs */}
      </div>
      {/* blogg section starts here */}

      {/* ------------------------------------------------------------------------------------------------------ */}

      {/* ------------------------------------------------------------------------------------------------------ */}
      {/* abouttttt */}
      <div className="bg-[#F5F5F5] py-10">
        <div className="flex lg:flex-row md:flex-row flex-col gap-10 container justify-between">
          <div className="flex flex-1 flex-col justify-start gap-4">
            <Image
              src={
                plugin?.iconurl ? plugin?.iconurl : "https://placehold.co/40x40"
              }
              width={34}
              height={34}
            />
            <h6 className="lg:text-[32px] md:text-2xl text-xl font-medium">
              {`About ${combos?.plugins?.[pathArray[2]].name}`}
            </h6>
            <p className="md:text-xl text-base">{plugin?.description}</p>
            <div>
              
                {/* <button className="border border-black text-black bg-white px-4 py-2 rounded text-base ">
                  Learn more
                </button> */}
              
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4">
          <Link href="/">
            <Image
              src="../../../assets/brand/socket_fav_dark.svg"
              width={34}
              height={34}
            />
            </Link>
            <h6 className="lg:text-[32px] md:text-2xl text-xl font-medium">
              About viaSocket
            </h6>
            <p className="md:text-xl text-base ">
              viasocket is an innovative and versatile workflow automation
              platform designed to streamline and simplify the integration of
              your favorite applications and tools.
            </p>
            <div>
              {/* <Link href="/">
                <button className="border border-black text-black bg-white px-4 py-2 rounded text-base ">
                  Learn more
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------------------------------------------------------ */}

      {/* footer */}

      <div className="bg-[#E6E6E6] py-10">
        <div className="flex flex-row gap-4 justify-center items-center">
          <h4 className="lg:text-[32px] md:text-xl text-lg font-semibold">
            Integrations run at
          </h4>
          <Link href="/">
          <Image
            src='../../../assets/brand/socket_fav_dark.svg'
            width={40}
            height={40}
          />
          </Link>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------------ */}
    </div>
  );
};

export default IntegrationSlugPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const pathArray = [params.appslugname]; // Adjust based on your URL structure

  // Fetch data server-side here
  const combos = await fetchCombos(pathArray);
  const apps = await fetchApps("All", 25); // Example: fetching with default category "All" and 25 items

  return {
    props: {
      combos,
      apps,
      pathArray, // Pass other necessary data as props
    },
  };
}

async function fetchApps(selectedCategory, visibleItems) {
  const fetchUrl =
    selectedCategory && selectedCategory !== "All"
      ? `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?category=${
          selectedCategory && selectedCategory === "Other"
            ? null
            : selectedCategory
        }&limit=200`
      : `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=200`;
  const apiHeaders = {
    headers: {
      "auth-key": process.env.NEXT_PUBLIC_INTEGRATION_KEY,
    },
  };

  const response = await fetch(fetchUrl, apiHeaders);
  const responseData = await response.json();
  return responseData;
}

async function fetchCombos(pathArray) {
  
  const apiHeaders = {
    headers: {
      "auth-key": process.env.NEXT_PUBLIC_INTEGRATION_KEY,
      "Cache-Control" : "no-cache"
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/integrations?service=${pathArray[0]}`,
    apiHeaders
  );
  const responseData = await response.json();
  return responseData;
}

