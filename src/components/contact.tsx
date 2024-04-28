import Link from "next/link"
import Globe from "./globe"
import Logo from "./logo"
import Image from "next/image"

const Contact = () => {
  return (
        <section id="contact" className="">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex w-full justify-center mt-[20rem]">
                <div className="invisible md:visible md:w-3/4 shadow-xl border rounded-lg">
                    <Globe />
                </div>
                <div className="rounded-lg  border p-8 shadow-lg lg:col-span-3 lg:p-12 ">
                    <form action="#" className="space-y-4">
                        <div>
                            <label className="sr-only" htmlFor="name">Name</label>
                            <input
                            className="w-full rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm"
                            placeholder="Name"
                            type="text"
                            id="name"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                            <label className="sr-only" htmlFor="email">Email</label>
                            <input
                                className="w-full rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm"
                                placeholder="Email address"
                                type="email"
                                id="email"
                            />
                            </div>

                            <div>
                            <label className="sr-only" htmlFor="phone">Phone</label>
                            <input
                                className="w-full rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm"
                                placeholder="Phone Number"
                                type="tel"
                                id="phone"
                            />
                            </div>
                        </div>

                        <div>
                            <label className="sr-only" htmlFor="message">Message</label>

                            <textarea
                            className="w-full rounded-lg border bg-gray-50 border-gray-200 p-3 text-sm"
                            placeholder="Message"
                            rows={8}
                            id="message"
                            ></textarea>
                        </div>

                        <div className="mt-4">
                            <button
                            type="submit"
                            className="inline-block w-full rounded-lg  bg-black px-5 py-3 font-medium text-white sm:w-auto"
                            >
                            Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <footer className='justify-center items-center'>
            <div className="z-50 absolute right-0 bottom-2 ">
                <Link href="/">
                    <Image
                        src={'/logo.png'}
                        alt="logo"
                        width={80}
                        height={80}
                    />
                </Link>
            </div>
            <div className="absolute bottom-2 left-1">
                <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
                    Copyright &copy; 2024. All rights reserved.
                </p>
            </div>
        </footer>
        </section>
  )
}

export default Contact
