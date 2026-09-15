import {black} from "next/dist/lib/picocolors";

const github = "/images/logos/github.png";
const linkedin = "/images/logos/linkedin.png";
const stackoverflow = "/images/logos/stackoverflow.png";
const twitter = "/images/logos/twitter.png";
const youtube = "/images/logos/youtube.png";

const linkItems = [
    { linkName: "LinkedIn", link: "https://www.linkedin.com/in/james-price-806032186/", icon: linkedin },
    { linkName: "GitHub", link: "https://github.com/JumesP", icon: github },
    { linkName: "YouTube", link: "https://www.youtube.com/@Jumescode", icon: youtube },
    { linkName: "Twitter", link: "https://twitter.com/JumesCode", icon: twitter },
    { linkName: "Stack Overflow", link: "https://stackoverflow.com/users/22334846/jumes", icon: stackoverflow },
];


const LinkBox = () => {
    return (
        <div className="fixed bottom-[3vw] right-[3vw] w-[125px] h-[125px] grid grid-cols-3 grid-rows-3 gap-[10px] z-[1000]">
            {linkItems.map((item, index) => (
                <a key={index} className="relative w-[35px] h-[35px]" href={item.link} target="_blank" rel="noopener noreferrer">
                    <img className="relative w-[35px] h-[35px] rounded-md border-1" src={item.icon} alt={item.linkName} />
                </a>
            ))}
        </div>
    )
}

export default LinkBox;