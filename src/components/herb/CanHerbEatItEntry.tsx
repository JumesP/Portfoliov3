import React, { useEffect, useState } from "react";
import { hamsterSafeFoods, hamsterUnsafeFoods } from "@/src/data/can-herb-eat-it/food-data";
import { spellCheckHamsterFood } from "@/src/libs/spellcheck";

const HAMSTER_SAFE_FOODS = hamsterSafeFoods.map((food) => food.name.toLowerCase());
const HAMSTER_UNSAFE_FOODS = hamsterUnsafeFoods.map((food) => food.name.toLowerCase());

type FoodCheckResult = {
  isSafe: boolean;
  name: string;
  amount: string;
  frequency: string;
  reason?: string;
};

const CanHerbEatItEntry = () => {
    const [foodInput, setFoodInput] = useState("");
    const [result, setResult] = useState<FoodCheckResult | null>(null);
    const [checkingWithAI, setCheckingWithAI] = useState(false);

    useEffect(() => {
        if (!result || result.reason !== "not in database, needs AI check" || checkingWithAI) {
            return;
        }

        const checkWithAi = async () => {
            setCheckingWithAI(true);
            console.log(`Sending ${result.name} to AI for checking...`);

            try {
                const response = await fetch("/api/herb/checkWithAi", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ foodName: result.name }),
                });

                if (!response.ok) {
                    throw new Error(`Error checking with AI: ${response.statusText}`);
                }

                const data = await response.json();
                console.log("AI Response:", data);

                setResult({
                    isSafe: data.isSafe,
                    name: result.name,
                    amount: data.amount || "unknown",
                    frequency: data.frequency || "unknown",
                    reason: data.reason || "checked with AI",
                });
            } catch (error) {
                console.error("Error checking with AI:", error);
            } finally {
                setCheckingWithAI(false);
            }
        };

        checkWithAi();
    }, [result, checkingWithAI]);

    const getResultColor = (result: FoodCheckResult | null) => {
        if (!result) return "bg-gray-100 border-gray-500";
        if (result.reason === "not in database, needs AI check") return "bg-yellow-100 border-yellow-500";
        if (result.isSafe) return "bg-green-100 border-green-500";
        if (result.isSafe === false) return "bg-red-100 border-red-500";
        return "bg-gray-100 border-gray-500";
    };

    const handleCheckFood = (foodEntered: string) => {
        let normalizedFood = foodEntered.trim();

        // do greater validation, such as:
        // ensure no numbers, special characters, or empty strings
        // i want as little calls to ai as possible, so i want to ensure that the input is valid before sending it to ai

        if (!normalizedFood) {
            console.log("Please enter a food item.");
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(normalizedFood)) {
            console.log("Please enter a valid food item (letters and spaces only).");
            return;
        }

        // spell check
        const spellCheckResult = spellCheckHamsterFood(normalizedFood);

        if (spellCheckResult.exactMatch) {
            console.log(`${normalizedFood} is in the database. Checking if it's safe...`);
        } else if (spellCheckResult.closestMatch && spellCheckResult.distance <= 2) {

            // this will check both if its inside of it and if its spelt slightly wrong

            normalizedFood = spellCheckResult.closestMatch;
            console.log(`Did you mean "${spellCheckResult.closestMatch}"? Checking if it's safe...`);
        }

        // check if the item is in the existing database

        const isInExampleSafeList = HAMSTER_SAFE_FOODS.includes(normalizedFood.toLowerCase());
        const isInExampleUnsafeList = HAMSTER_UNSAFE_FOODS.includes(normalizedFood.toLowerCase());
        const isInDatabase = false; // check dynamoDB

        switch (true) {
            case isInExampleSafeList: {
                const safeFood = hamsterSafeFoods.find((food) => food.name.toLowerCase() === normalizedFood.toLowerCase()) || null;
                console.log(`${normalizedFood} is safe for Herb!`);
                setResult(safeFood ? {
                    isSafe: true,
                    name: safeFood.name,
                    amount: safeFood.amount,
                    frequency: safeFood.frequency,
                } : {
                    isSafe: true,
                    name: normalizedFood,
                    amount: "unknown",
                    frequency: "unknown",
                    reason: "matched safe list"
                });
                break;
            }
            case isInExampleUnsafeList: {
                const unsafeFood = hamsterUnsafeFoods.find((food) => food.name.toLowerCase() === normalizedFood.toLowerCase()) || null;
                console.log(`${normalizedFood} is NOT safe for Herb!`);
                setResult(unsafeFood ? {
                    isSafe: false,
                    name: unsafeFood.name,
                    amount: unsafeFood.amount,
                    frequency: unsafeFood.frequency,
                    reason: unsafeFood.reason,
                } : {
                    isSafe: false,
                    name: normalizedFood,
                    amount: "unknown",
                    frequency: "unknown",
                    reason: "matched unsafe list"
                });
                break;
            }
            default:
                console.log(`${normalizedFood} is not in the database. Checking with AI...`);
                setResult({
                    isSafe: false,
                    name: normalizedFood,
                    amount: "unknown",
                    frequency: "unknown",
                    reason: "not in database, needs AI check"
                });
        }

    };

    return (
        <div className="CanHerbEatItEntry flex flex-col gap-4 w-full">
            <input
                type="text"
                value={foodInput}
                onChange={(event) => setFoodInput(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        handleCheckFood(foodInput);
                    }
                }}
                placeholder="Enter a food item..."
                className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
                type="button"
                onClick={() => handleCheckFood(foodInput)}
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200"
            >
                Check
            </button>
            <div className="mt-4">
                {result && !checkingWithAI && (
                    <div className={`flex flex-col gap-2 align-items justify-center text-center border-2 rounded-md p-4 ${getResultColor(result)}`}>
                        <p>{result.name}</p>
                        <p>{result.amount}</p>
                        <p>{result.frequency}</p>
                        <p>{result.reason || "No reason provided"}</p>
                    </div>
                )}
                {checkingWithAI && (
                    <div className="flex flex-col gap-2 align-items justify-center text-center border-2 rounded-md p-4 bg-yellow-100 border-yellow-500">
                        <p>Checking with AI...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CanHerbEatItEntry;
