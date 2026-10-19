"use client"
import react, { useState, useEffect } from 'react';
import ChessEngineComponent from '@/src/components/ChessEngineComponent/ChessEngineComponent';

const ChessEngine = () => {

    return (
        <div className="MainContent flex-1 flex flex-row justify-center w-full">
            <div className="Content flex flex-col gap-20 mt-20 w-full max-w-300">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-5xl font-bold mb-5">Play my Chess Engine</h1>
                    <p className="text-lg font-medium">This is my custom-built Chess Engine that you can play against!</p>
                    <p className="text-lg font-medium">It's a fun way to test your skills and see how well you can do against a computer!</p>
                    <p className="text-lg font-medium">Good luck and have fun! (If you do the same moves every time, the computer also will)</p>
                    <p className="text-small font-medium pt-8 text-gray-700">Depth is currently set to 3 (meaning it will look at its next move, yours then its again)</p>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <ChessEngineComponent />
                </div>
            </div>
        </div>
    )
};

export default ChessEngine;
