import Logo from "@/components/logo";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col flex-grow flex-1 min-h-screen bg-gray-100">
      <div className='absolute left-0 top-5 z-50'>
        <Logo />
      </div>
      <main className="flex-grow">
        {children}
      </main>
      <footer className='flex justify-center items-center bg-gray-100 p-4'>
        <p className="text-center text-sm text-gray-500">
          Copyright &copy; 2024. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
