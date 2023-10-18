import Link from "next/link";
import React, {useMemo} from "react";
import footerMenuItems, {FooterMenuItems} from "@/utils/footerMenuItems";



const FooterMenu: React.FC = () => {
    const _footerMenuItems: FooterMenuItems[] = useMemo(() => footerMenuItems, [])

    return <div
        className="sm:hidden w-screen border-y-[1px] border-gray-100 dark:border-gray-700 fixed bottom-0 bg-white dark:bg-black z-40">

        <ul className="flex justify-around">
            {_footerMenuItems.map(item => (
                <li key={crypto.randomUUID()}>
                    <Link href={item.link}
                          className="block p-4 rounded-full transition-all cursor-pointer disabled:opacity-50"
                          aria-disabled={item.disabled}
                    >
                        <span className='text-2xl'>{item.icon}</span>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
}

export default FooterMenu