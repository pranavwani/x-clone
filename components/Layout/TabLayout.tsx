import React, {ReactNode, useCallback} from "react";
import {useRouter} from "next/router";

type Tab = {
    title: string
    id: string,
    route?: string
}

interface TabLayoutProps {
    tabs: Tab[],
    activeTab: string,
    setActive?: Function,
    children?: ReactNode
}

const TabLayout: React.FC<TabLayoutProps> = ({tabs, activeTab, setActive, children}) => {
    const router = useRouter()
    const handleReload = useCallback((route: string) => {
        return router.push(`${route}?forceReload=true`)
    }, [router])

    return <div>
        {children}
        <div className="flex items-center border-b-[1px] border-gray-100 dark:border-gray-700">
            {tabs.map(tab => {
                return <div
                    key={tab.id}
                    className={`all-posts flex justify-center items-center relative w-full text-center pt-3 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer
                        ${activeTab === tab.id ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}
                    `}
                    onClick={() => setActive ? setActive(tab.id) : handleReload(tab?.route as string) }>
                    <div>
                        <div className="pb-3">{tab.title}</div>
                        <div className={`w-100 h-[4px] ${activeTab === tab.id ? "bg-blue-400" : ""} rounded-full`}></div>
                    </div>
                </div>
            })
            }
        </div>
    </div>
}

export default TabLayout;