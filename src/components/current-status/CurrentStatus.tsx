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
        }, 60000);

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
    const displayTime = time.split(":").slice(0, 2).join(":");

    const currentStatus = () => {
        const isWeekday = weekdays.includes(weekDay.toLowerCase());
        const isSleepingHours = hour < 8;
        const isWorkingHours = hour >= 9 && hour < 18;
        const isRelaxingHours = hour >= 18 && hour < 21;
        const isRunningHours = hour >= 21 && hour < 22;

        console.log(isWeekday);

        if (isSleepingHours) {
            return "Sleeping";
        }

        if (isWeekday && isWorkingHours) {
            return "Working";
        }

        if (isWeekday && isRelaxingHours) {
            return "Relaxing";
        }

        if (isWeekday && isRunningHours) {
            return "Running";
        }

        // weekend

        if (!isWeekday && isWorkingHours) {
            return "Enjoying the weekend";
        }

        if (!isWeekday && isRelaxingHours) {
            return "Relaxing";
        }

        if (!isWeekday && isRunningHours) {
            return "Running";
        }

        return "Coding";
    }



    return (
        <div className="
            relative w-125 m-4 p-6
            overflow-hidden
            rounded-3xl
            border border-white/20
            bg-linear-to-br from-[#73946B] via-[#65865e] to-[#4f7049]
            shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)]
            text-white
        ">
            {/* Decorative glow */}
            <div className="
                absolute -top-16 -right-16
                w-40 h-40
                rounded-full
                bg-white/10
                blur-3xl
            " />

            {/* Header */}
            <div className="relative flex items-center justify-between mb-6">
                <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                        Live Status
                    </p>

                    <h3 className="text-2xl font-semibold tracking-tight">
                        Current Status
                    </h3>
                </div>

                {/* Online indicator */}
                <div className="
                    flex items-center gap-2
                    px-3 py-1.5
                    rounded-full
                    bg-black/10
                    border border-white/10
                    backdrop-blur-sm
                ">
                    <span className="
                        w-2 h-2
                        rounded-full
                        bg-green-300
                        shadow-[0_0_10px_rgba(134,239,172,0.9)]
                        animate-pulse
                    " />

                        <span className="text-xs font-medium text-white/80">
                        LIVE
                    </span>
                </div>
            </div>

            {/* Time */}
            <div className="
                relative
                flex items-center justify-between
                p-4
                rounded-2xl
                bg-black/10
                border border-white/10
                backdrop-blur-sm
            ">
                <div>
                    <p className="text-xs uppercase tracking-widest text-white/50">
                        Local Time
                    </p>

                    <p className="mt-1 text-3xl font-bold tracking-tight">
                        {displayTime}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-white/50">
                        Day
                    </p>

                    <p className="mt-1 font-medium text-white/90">
                        {weekDay}
                    </p>
                </div>
            </div>

            {/* Current activity */}
            <div className="
                relative mt-4
                p-4
                rounded-2xl
                bg-white/10
                border border-white/10
                backdrop-blur-sm
            ">
                <p className="text-xs uppercase tracking-widest text-white/50">
                    Currently
                </p>

                <div className="flex items-center gap-3 mt-2">
                    <span className="text-2xl">💻</span>

                    <p className="text-lg font-medium">
                        {status}
                    </p>
                </div>
            </div>

            <div className="relative flex items-center gap-2 mt-5 text-xs text-white/40">
                <span className="w-1 h-1 rounded-full bg-white/40" />
                Automatically updated
            </div>
        </div>
    )
};

export default CurrentStatus;
