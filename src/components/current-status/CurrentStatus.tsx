"use client"
import React, {useState, useEffect } from 'react';

const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const weekend = ["saturday", "sunday"];


const CurrentStatus = () => {
    const [date, setDate] = useState(new Date());
    const [status, setStatus] = useState("unknown");

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setStatus(currentStatus());

        const interval = setInterval(() => {
            setStatus(currentStatus());
        }, 3600000);

        return () => clearInterval(interval);
    }, []);

    const time = date.toLocaleTimeString("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const currentDate = date.toLocaleDateString("en-GB", {
        timeZone: "Europe/London",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const weekDay = date.toLocaleDateString("en-GB", {
        timeZone: "Europe/London",
        weekday: "long"
    });

    const hour = Number(time.split(":")[0]);

    const currentStatus = () => {
        const isWeekday = weekdays.includes(weekDay.toLowerCase());
        const isSleepingHours = hour < 8;
        const isWorkingHours = hour >= 9 && hour < 18;
        const isRelaxingHours = hour >= 18 && hour < 21;
        const isRunningHours = hour >= 21 && hour < 22;

        console.log(isWeekday);

        if (isSleepingHours) {
            return "sleeping";
        }

        if (isWeekday && isWorkingHours) {
            return "working";
        }

        if (isWeekday && isRelaxingHours) {
            return "relaxing";
        }

        if (isWeekday && isRunningHours) {
            return "running";
        }

        return "coding";
    }



    return (
        <div className="flex flex-col items-center gap-4 w-[500px] h-fit p-4 m-4 border-2 bg-[#73946B] rounded-2xl">
            <h3>Current Status:</h3>
            <div className="flex flex-col gap-4 items-center border-2 p-2"> {/*// current time in timezone*/}
                <p>{time}</p><p>{currentDate}</p><p>{weekDay}</p>
            </div>
            <div>{/*what im currently doing... work, sleep, maybe current discord status or spotify song?*/}
                {status}
            </div>
        </div>
    )
};

export default CurrentStatus;