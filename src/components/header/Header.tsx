"use client";
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import Link from "next/link";

const menuItems = [
    { menuName: "About", link: "/about" },
    { menuName: "Contact Me", link: "/contact-me" },
    { menuName: "Projects", link: "/projects" },
    { menuName: "Technologies", link: "/technologies" },
    { menuName: "Chess", link: "/chess" },
    { menuName: "Running", link: "/running" },
    { menuName: "Eat", link: "/eat" },
    { menuName: "Chess Engine", link: "/chess-engine" },
];

const GAP = 4; // gap-1 = 0.25rem = 4px

// Shared by the real tabs and the hidden measuring copy so widths match
const ITEM_CLASS = "p-1 pt-1.5 content-center";
const LINK_CLASS = "text-[#D2D0A0] font-semibold text-base";

const Header = (): React.ReactNode => {
    const navRef = useRef<HTMLElement>(null);
    const measureRef = useRef<HTMLUListElement>(null);
    const moreRef = useRef<HTMLLIElement>(null);

    const [visibleCount, setVisibleCount] = useState(menuItems.length);
    const [open, setOpen] = useState(false);

    // Work out how many tabs fit
    useLayoutEffect(() => {
        const calculate = () => {
            if (!navRef.current || !measureRef.current) return;

            const available = navRef.current.offsetWidth;
            const children = Array.from(measureRef.current.children) as HTMLElement[];
            const moreWidth = children[children.length - 1].offsetWidth; // last child is the "More" button
            const widths = children.slice(0, -1).map((c) => c.offsetWidth);

            // Does everything fit with no More button?
            const total = widths.reduce((a, b) => a + b, 0) + GAP * (widths.length - 1);
            if (total <= available) {
                setVisibleCount(widths.length);
                return;
            }

            // Otherwise fit as many as we can, leaving room for More
            let used = 0;
            let count = 0;
            for (const w of widths) {
                const next = used + w + (count > 0 ? GAP : 0);
                if (next + GAP + moreWidth > available) break;
                used = next;
                count++;
            }
            setVisibleCount(count);
        };

        calculate();
        const observer = new ResizeObserver(calculate);
        observer.observe(navRef.current!);
        return () => observer.disconnect();
    }, []);

    // Close the dropdown when clicking anywhere outside it
    useEffect(() => {
        if (!open) return;
        const close = (e: MouseEvent) => {
            if (!moreRef.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, [open]);

    const visible = menuItems.slice(0, visibleCount);
    const hidden = menuItems.slice(visibleCount);

    return (
        <header className="relative border-b-2 border-white">
            <div className="flex flex-row gap-1 px-2 md:px-[10%] lg:px-[18%]">
                {/* Brand: never shrinks or wraps */}
                <div className="p-1 shrink-0">
                    <Link href="/" className="text-[#D2D0A0] font-semibold text-xl pr-2 whitespace-nowrap">
                        James Price
                    </Link>
                </div>

                {/* Nav takes the remaining space; this is the width we measure against */}
                <nav ref={navRef} className="flex flex-row gap-1 flex-1 min-w-0">
                    {visible.map((item) => (
                        <li
                            key={item.menuName}
                            className={`${ITEM_CLASS} list-none cursor-pointer hover:bg-green-700 whitespace-nowrap`}
                        >
                            <Link href={item.link} className={`${LINK_CLASS} hover:text-white`}>
                                {item.menuName}
                            </Link>
                        </li>
                    ))}

                    {hidden.length > 0 && (
                        <li ref={moreRef} className={`${ITEM_CLASS} list-none relative whitespace-nowrap`}>
                            <button
                                onClick={() => setOpen(!open)}
                                aria-expanded={open}
                                aria-haspopup="true"
                                className={`${LINK_CLASS} cursor-pointer hover:text-white`}
                            >
                                More ▾
                            </button>

                            {open && (
                                <ul className="absolute right-0 top-full z-10 flex flex-col min-w-40 border border-white bg-black">
                                    {hidden.map((item) => (
                                        <li key={item.menuName} className="hover:bg-green-700">
                                            <Link
                                                href={item.link}
                                                onClick={() => setOpen(false)}
                                                className={`${LINK_CLASS} hover:text-white block px-3 py-2 whitespace-nowrap`}
                                            >
                                                {item.menuName}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    )}
                </nav>
            </div>

            {/* Hidden copy of every tab + the More button, only used for measuring */}
            <ul
                ref={measureRef}
                aria-hidden="true"
                className="invisible absolute left-0 top-0 flex h-0 w-max gap-1 overflow-hidden whitespace-nowrap pointer-events-none"
            >
                {menuItems.map((item) => (
                    <li key={item.menuName} className={ITEM_CLASS}>
                        <span className={LINK_CLASS}>{item.menuName}</span>
                    </li>
                ))}
                <li className={ITEM_CLASS}>
                    <span className={LINK_CLASS}>More ▾</span>
                </li>
            </ul>
        </header>
    );
};

export default Header;
