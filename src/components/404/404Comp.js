import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdArrowBackIos } from 'react-icons/md'

export default function ErrorComp() {
    const router = useRouter()
    return (
        <>
            <div className="flex flex-col items-center justify-center py-6 w-dvw px-2">
                <Image
                    src="/assets/img/404.svg"
                    width={1080}
                    height={1080}
                    className="md:w-2/3 lg:w-1/3 w-full h-auto"
                    alt="404 Image"
                />
                <div className="flex flex-col items-center gap-3">
                    <h1 className="md:text-3xl text-xl text-center font-semibold">
                        The page you're trying to reach isn't available or
                        doesn't exist.
                    </h1>
                    <div className="flex gap-4">
                        <button
                            className="btn btn-accent btn-md"
                            onClick={() => router.back()}
                        >
                            <MdArrowBackIos />
                            Back
                        </button>
                        <Link href="/">
                            <button className="btn btn-md btn-accent btn-outline">
                                Go to home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}