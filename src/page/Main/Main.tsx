

const Main = () => {

    const headerGradient = "bg-[linear-gradient(45deg,#ffffff,#979797)] bg-clip-text text-transparent"
    const headerHoverGradient = "hover:bg-[linear-gradient(45deg,#979797,#ffffff)] bg-clip-text text-transparent"
    const headerGoldenGradient = "bg-[linear-gradient(45deg,#ffffff,#f8d568)] bg-clip-text text-transparent"
    const headerShadow= "[text-shadow:0_2px_4px_rgba(0,0,0,0.2)]"
    const headerHoverShadow = "hover:[text-shadow:0_3px_5px_rgba(0,0,0,0.3)]"
    const headerEntranceAnimation = "animate-[titleEntrance_1.5s_ease-out_forwards]"
    const goldPulseAnimation = "animate-[goldPulse_10s_ease-in-out_infinite]"

    return (
        <div className="MainContent">
            <div className="Content mt-52">
                <section className="blob-box">
                    <div className="blob">
                        {/*<img*/}
                        {/*    src={blob}*/}
                        {/*    alt="Floating Blob"*/}
                        {/*></img>*/}
                    </div>
                    <div className="blob">
                        {/*<img*/}
                        {/*    src={blob_shadow}*/}
                        {/*    alt="Floating Blob Shadow"*/}
                        {/*></img>*/}
                    </div>
                </section>
                <div className="pl-72">
                    {/*<h1 className={`text-8xl font-semibold ${headerGradient} ${headerHoverGradient} ${headerShadow} ${headerEntranceAnimation} ${headerHoverAnimation} w-fit`}>James Price</h1>*/}
                    <h1 className={`relative w-fit text-8xl font-semibold pb-4 ${headerEntranceAnimation}`}>
                        {/* Base grey gradient */}
                        <span className={`${headerGradient} ${headerShadow} ${headerHoverShadow}`}>
                            James Price
                        </span>

                        {/* Animated gold gradient */}
                        <span className={`absolute inset-0 ${headerGoldenGradient} ${headerShadow} ${headerHoverShadow} ${goldPulseAnimation}`}>
                            James Price
                        </span>
                    </h1>
                    <h2 className={`text-xl pb-1`}>Full Stack Software Engineer Learning to Code!</h2>
                    <p className={`text-lg`}>
                        Click on the links above to navigate to other pages
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;

