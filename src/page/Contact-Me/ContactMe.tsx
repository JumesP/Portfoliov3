import CurrentStatus from "@/src/components/current-status/CurrentStatus";
import Contact from "@/src/components/contact/Contact";


const ContactMe = () => {
    return (
        <div className="MainContent flex-1 flex flex-row justify-center w-full">
            <div className="Content flex flex-col justify-center items-center gap-20 mt-20 w-full max-w-[1200px]">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-5xl font-bold mb-5">Contact Me!</h1>
                    <p className="text-lg font-medium">Feel free to contact me reguarding any questions or opportunities.</p>
                </div>
                <div className="flex flex-row flex-wrap gap-[100px] w-full justify-center items-center mx-auto">
                    <CurrentStatus />
                    <Contact />
                </div>
            </div>
        </div>
    )
}

export default ContactMe;