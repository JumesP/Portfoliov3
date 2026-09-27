"use client";
import RunChart from "@/src/components/runChart/RunChart";

const Running = () => {
    return (
        <div className="MainContent flex flex-row justify-center">
            <div className="Content flex flex-col gap-10 mt-20 max-w-300">
                <div className="flex flex-col gap-4 justify-center items-center">
                    <h1 className="text-4xl">Running Page</h1>
                    <p className="text-lg">This is the running page.</p>
                </div>
                <div className="flex flex-row rounded-xl bg-[#73946B] p-5 gap-10 mx-4 max-w-300">
                    <RunChart />
                </div>
            </div>
        </div>
    )
}

export default Running;
