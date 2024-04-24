import { cn } from "@/lib/utils"

const Layout = ({ children, image, className}: { children?: React.ReactNode, image:string , className?:string}) => {
    return (
        <div className={cn("bg-cover bg-center ", className)} style={{ backgroundImage: image }}>
            {children}
        </div>
    );
};

export default Layout;
