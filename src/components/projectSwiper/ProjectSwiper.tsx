"use client"
import React, {useState, useEffect} from 'react'
import {ProjectCard} from "@/src/types/project/projectTypes";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const getRandomRotation = () => {
    return Math.floor(Math.random() * 31) - 15;
};

const initialCards: ProjectCard[] = [
    { name: "Project1", "image": "https://images.unsplash.com/photo-1789207051591-05b3c423cc14?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
    { name: "Project2", "image": "https://images.unsplash.com/photo-1789348991835-b464f797fb2e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
    { name: "Project3", "image": "https://images.unsplash.com/photo-1788771813083-1053f70233b5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
    { name: "Project1", "image": "https://images.unsplash.com/photo-1789207051591-05b3c423cc14?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
    { name: "Project2", "image": "https://images.unsplash.com/photo-1789348991835-b464f797fb2e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
    { name: "Project3", "image": "https://images.unsplash.com/photo-1788771813083-1053f70233b5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
    { name: "Project1", "image": "https://images.unsplash.com/photo-1789207051591-05b3c423cc14?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
    { name: "Project2", "image": "https://images.unsplash.com/photo-1789348991835-b464f797fb2e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
    { name: "Project3", "image": "https://images.unsplash.com/photo-1788771813083-1053f70233b5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
]

const ProjectSwiper = ({projects}: {projects: ProjectCard[]}) => {
    const [cards, setCards] = useState<ProjectCard[]>([]);
    const [exitingCard, setExitingCard] = useState<{
        index: number;
        direction: "left" | "right";
    } | null>(null);

    useEffect(() => {
        const reversedCards = projects ? [...projects].reverse() : [...initialCards].reverse();
        setCards(reversedCards);
    }, []);

    const transform: string = `hover:rotate-0 hover:-translate-y-1`
    const animation: string = `transition-transform duration-2000 ease-in-out hover:-translate-y-2 hover:scale-110`
    // const textBackground: string = `bg-[linear-gradient(to_bottom,rgba(26,26,26,0.7)_0%,rgba(255,255,255,0.4)_50%,rgba(26,26,26,0.7)_100%)]`;
    const textBackground: string = `bg-gradient-to-b from-transparent via-gray-200/30 to-transparent`;

    const getExitAnimation = (exitDirection: "left" | "right") => {
        if (exitDirection === "right") {
            return "translate-x-[150vw] rotate-[45deg]";
        }

        if (exitDirection === "left") {
            return "-translate-x-[150vw] rotate-[-45deg]";
        }

        return "";
    };



    const handleLike = (index: number) => {
        setExitingCard({
            index,
            direction: "right",
        });

        setTimeout(() => {
            setCards(prev => prev.filter((_, i) => i !== index));
            setExitingCard(null);
        }, 500);
    };

    const handleDislike = (index: number) => {
        setExitingCard({
            index,
            direction: "left",
        });

        setTimeout(() => {
            setCards(prev => prev.filter((_, i) => i !== index));
            setExitingCard(null);
        }, 500);
    };


    return (
        <div className="container relative flex flex-col justify-center items-center bg-[#73946B] p-4 rounded-xl w-[1000px] h-[800px]">
            {cards && cards.map((card, index) => {
                const isExiting = exitingCard?.index === index;

                const exitAnimation = isExiting
                    ? getExitAnimation(exitingCard.direction)
                    : "";

                return (
                    <div
                        key={index}
                        className={`absolute animate-[cardDrop_1s_cubic-bezier(0.22,1,0.36,1)_both]`}
                        style={{
                            animationDelay: `${index * 250}ms`,
                        }}
                    >
                        <div
                            key={index}
                            className={`project-card aspect-[4/3] w-[40rem] ${transform} ${animation} ${exitAnimation}`}
                            style={{"--rotation": `${card.rotation}deg`} as React.CSSProperties}
                        >
                            <img src={card.image} alt={card.name} className={`rounded-xl h-full w-full object-cover`}/>
                            <p className={`absolute bottom-5 left-1/2 -translate-x-1/2 text-black font-semibold h-16 flex items-center justify-center ${textBackground} p-3`}>{card.name}</p>
                            <button onClick={() => handleLike(index)}
                                    className="absolute bottom-5 right-5 border-green-600 bg-green-700/40 border-2 w-16 h-16 rounded-4xl cursor-pointer hover:bg-green-700/80 flex justify-center items-center">
                                <FaCheck className="text-green-600 text-xl" />
                            </button>
                            <button onClick={() => handleDislike(index)}
                                    className="absolute bottom-5 left-5 border-red-600 bg-red-700/40  border-2 w-16 h-16 rounded-4xl cursor-pointer hover:bg-red-700/60 flex justify-center items-center">
                                <ImCross className="text-red-600 text-xl" />
                            </button>
                        </div>
                    </div>
                )
            })}
            {cards.length === 0 && (
                <>
                    <p>out of projects...</p>
                </>
            )}
        </div>
    )
}

export default ProjectSwiper;