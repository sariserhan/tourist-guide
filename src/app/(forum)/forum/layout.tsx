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
    </div>
  );
};

export default Layout;
