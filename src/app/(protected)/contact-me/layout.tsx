import React from "react";

import Header from "@/src/components/header/Header"


export default function PageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <div className="PageLayout">
                {children}
            </div>
        </>
    );
}