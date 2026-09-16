

const About = () => {
    return (
        <div className="MainContent flex flex-row justify-center">
            <div className="Content flex flex-col gap-10 mt-20 max-w-[1200px]">
                <div className="flex flex-col gap-4 justify-center items-center">
                    <h1 className="text-4xl">About Page</h1>
                    <p className="text-lg">This is the about page.</p>
                </div>
                <div className="flex flex-row rounded-xl bg-[#73946B] p-[20px] gap-10 mx-4">
                    <div className="flex flex-col gap-4 w-[20%] justify-center items-center">
                        <img src="images/Linkedin_PFP.jpeg" alt="" className="rounded-xl ml-20 aspect-square" />
                    </div>
                    <div className="w-[80%] flex flex-col gap-4 pl-20 p-8">
                        <h1 className="text-3xl font-bold">James Price</h1>
                        <h3 className="text-lg font-semibold">Software Developer</h3>
                        <p>After finishing my Computer Science degree in Winchester, I Began my professional career at Mediaferry (EKCS)</p>
                        <p>I have a passion for technology and enjoy exploring new programming languages and frameworks.</p>
                        <p> my free time, I like to work on personal projects, contribute to open-source, and share my knowledge with others through tutorials and blog posts.</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 justify-center items-center bg-[#73946B] rounded-xl h-80 mx-4">
                    <p>timeline to come...</p>
                </div>
            </div>
        </div>
    )
}

export default About;