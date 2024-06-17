import Link from "next/link"
import Globe from "./globe"
import Image from "next/image"
import ContactForm from "./contact-form"

const Contact = () => {
    return (
        <section id="contact" className="">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex w-full justify-center mt-[20rem]">
                <div className="invisible md:visible md:w-3/4 shadow-xl border rounded-lg">
                    <Globe />
                </div>
                <div className="flex items-center justify-center rounded-lg border p-8 shadow-lg lg:col-span-3 lg:p-12">
                    <ContactForm />
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
