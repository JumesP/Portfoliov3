import React from "react";
import Link from "next/link";

const sections = ["Home", "About", "Contact", "Projects", "Technologies", "Chess"];

const menuItems = [
    { menuName: "Home", link: "/" },
    { menuName: "About", link: "/about" },
    { menuName: "Contact Me", link: "/contact-me" },
    { menuName: "Projects", link: "/projects" },
    { menuName: "Technologies", link: "/technologies" },
    { menuName: "Chess", link: "/chess" },
]

const Header = () : React.ReactNode => {


    return (
        <>
            <header className="border-b-2 border-white">
                <ul className="flex flex-row gap-1 pl-72">
                    <li className="p-1">
                        <Link href="/" className="text-[#D2D0A0] font-semibold text-xl pr-2">James Price</Link>
                    </li>

                    {menuItems.map((item) => (
                        <li key={item.menuName} className="p-1 pt-1.5 cursor-pointer hover:bg-green-700 content-center">
                            <Link href={item.link} className="text-[#D2D0A0] hover:text-white font-semibold text-md">{item.menuName}</Link>
                        </li>
                    ))}
                </ul>
            </header>
        </>
    )
}

export default Header;