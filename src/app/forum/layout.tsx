import Logo from "@/components/logo"

const layout = ({children}: {children:React.ReactNode}) => {
  return (
    <main className="min-h-screen">
        <div className='absolute left-0 top-5 z-50'>
            <Logo />
        </div>

        {children}
        <footer className='justify-center items-center'>
            <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
                Copyright &copy; 2024. All rights reserved.
            </p>
        </footer>
    </main>
  )
}

export default layout
