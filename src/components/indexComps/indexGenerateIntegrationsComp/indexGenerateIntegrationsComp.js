export default function IndexGenerateIntegrationsComp() {
    return (
        <div className="flex bg-gray-50 border border-black">
            <div className="flex flex-col gap-8 p-12 w-full">
                <div className="flex flex-col gap-4">
                    <div className="text-5xl flex items-start ">
                        <div className="min-w-fit">I Use</div>
                        <input
                            type="text"
                            placeholder="App"
                            className="focus:outline-none focus:bg-transparent  focus:border-0 input input-ghost w-60 min-w-fit text-5xl"
                        />
                    </div>
                    <div className="text-5xl flex items-start ">
                        <span className="min-w-fit">We're in the </span>{' '}
                        <input
                            type="text"
                            placeholder="Industry type"
                            className="focus:outline-none focus:bg-transparent focus:border-0 input input-ghost w-full  text-5xl overflow-visible"
                        />
                    </div>
                    <div className="text-5xl flex items-start ">
                        <span className="min-w-fit">I run</span>{' '}
                        <input
                            type="text"
                            placeholder="domain.com"
                            className="focus:outline-none focus:bg-transparent  focus:border-0 input input-ghost w-full  text-5xl overflow-visible"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <textarea
                        className="textarea textarea-bordered w-full min-h-[200px] focus:outline-none"
                        placeholder="eg :I run eCommerce website and manage sales on Shopify and use Notion for database.                    "
                    ></textarea>
                    <button className="btn btn-lg btn-primary">Generate</button>
                </div>
            </div>
            <div className="w-full  p-12 border-black border-y-0 border-l">
<div>
    
</div>

            </div>
        </div>
    );
}
