"use client"

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import {useEffect} from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
    children: React.ReactNode;
}

export const Container = ({children} : ContainerProps) => {

    const matches = useMediaQuery("(max-width: 1024px)"); //isse jaise hi screen width 1024px hogi, matches true ho jaega.

    const {collapsed, onCollapse, onExpand} = useSidebar((state) => state);

    useEffect(() => {

        if(matches) { //hum chanhte hai ki small screen me automatic collapse ho jaye.
            onCollapse();
        } else {
            onExpand();
        }

    }, [matches, onCollapse, onExpand]);

  return (
    <div className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}>{children}</div>
  )
}
