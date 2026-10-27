"use client";
import RunChart from "@/src/components/runChart/RunChart";

const Running = () => {
    return (
        <div className="MainContent flex flex-row justify-center">
            <div className="Content flex flex-col gap-10 mt-20 max-w-[1200px]">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-4xl pb-2 text-center">Running Page</h1>
                    <p className="text-lg text-center">This is the running page.</p>
                    <p className="text-lg text-center">Detailing my recent runs and fitness progress</p>
                </div>
                <div className="flex flex-row rounded-xl bg-[#73946B] p-5 gap-10 mx-4 max-w-[1200px]">
                    <RunChart />
                </div>
            </div>
        </div>
    )
}

export default Running;
