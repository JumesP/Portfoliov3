"use client";
import react, { useState, useEffect } from "react";
// import { CanHerbEatItEntry } from "@/src/components/canHerbEatItEntry/CanHerbEatItEntry";
import CanHerbEatItEntry from "@/src/components/herb/CanHerbEatItEntry";

const CanHerbEatIt = () => {
    return (
        <div className="MainContent flex flex-row justify-center">
            <div className="Content flex flex-col gap-10 mt-20 max-w-300">
                <div className="flex flex-col gap-4 justify-center items-center">
                    <h1 className="text-4xl font-bold mb-4">Can Herb Eat It?</h1>
                    <p className="text-lg text-gray-700 mb-8">
                        A simple tool to check if a food is safe for your hamster, Herb.
                    </p>
                </div>
                <div className="flex flex-row rounded-xl bg-[#73946B] p-5 gap-10 mx-4 max-w-300">
                    <CanHerbEatItEntry />
                </div>
            </div>
        </div>
    );
};

export default CanHerbEatIt;
