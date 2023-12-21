import { Navbar } from "./_components/navbar";

const BrowserLayout = ({children} : {children: React.ReactNode;}) => {
  return (
    <>
        <Navbar/>
        <div className="flex h-full pt-20">
            {children}
        </div>
    </>
  )
}

export default BrowserLayout