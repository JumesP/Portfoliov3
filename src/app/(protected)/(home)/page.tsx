import Main from "@/src/page/Main/Main";

import Header from "@/src/components/header/Header";
import LinkBox from "@/src/components/link-box/LinkBox";

export default function Page() {
    return (
        <div className="main-section">
            <Header />
            <Main />
            <LinkBox />
        </div>
    )
}