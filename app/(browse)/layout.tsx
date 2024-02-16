import { Suspense } from "react";
import { Container } from "./_components/container";
import { Navbar } from "./_components/navbar";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";

const BrowserLayout = ({children} : {children: React.ReactNode;}) => {
  return (
    <>
        <Navbar/>
        <div className="flex h-full pt-20">
            {/* This Suspense is helping us to render the skeletin for us. */}
            <Suspense fallback={<SidebarSkeleton/>}>
                <Sidebar/>
            </Suspense>

            <Container>
                {children}
            </Container>
        </div>
    </>
  )
}

export default BrowserLayout