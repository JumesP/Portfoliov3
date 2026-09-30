import React, { useState } from "react";
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

type PreviousGuess = {
    name: string;
    isSafe: boolean;
};

const CanHerbEatItEntry = () => {
    const [foodInput, setFoodInput] = useState("");
    const [result, setResult] = useState<FoodCheckResult | null>(null);
    const [checkingWithAI, setCheckingWithAI] = useState(false);
    const [guessTotal, setGuessTotal] = useState<number | null>(null);
    const [previousGuesses, setPreviousGuesses] = useState<PreviousGuess[]>([]);
    const [invalidWordErrorMessage, setInvalidWordErrorMessage] = useState<boolean>(false);

    const getResultColor = (result: FoodCheckResult | null) => {
        if (!result) return "bg-gray-100 border-gray-500";
        if (result.reason === "not in database, needs AI check") return "bg-yellow-100 border-yellow-500";
        if (result.isSafe) return "bg-green-100 border-green-500";
        if (result.isSafe === false) return "bg-red-100 border-red-500";
        return "bg-gray-100 border-gray-500";
    };

    const validateFoodInput = (foodName: string) => {
        const normalizedFood = foodName.trim();

        if (!normalizedFood) {
            console.log("Please enter a food item.");
            return false;
        }

        if (!/^[a-zA-Z\s]+$/.test(normalizedFood)) {
            console.log("Please enter a valid food item (letters and spaces only).");
            return false;
        }

        return normalizedFood;
    }

    const spellCheckFood = (foodName: string) => {
        const spellCheckResult = spellCheckHamsterFood(foodName);

        if (spellCheckResult.exactMatch) {
            console.log(`${foodName} is in the database. Checking if it's safe...`);
        } else if (spellCheckResult.closestMatch && spellCheckResult.distance <= 2) {

            // this will check both if its inside of it and if its spelt slightly wrong

            foodName = spellCheckResult.closestMatch;
            console.log(`Did you mean "${spellCheckResult.closestMatch}"? Checking if it's safe...`);
        }

        return foodName;
    };

    const checkWithAi = async (foodName: string) => {
        setCheckingWithAI(true);
        console.log(`Sending ${foodName} to AI for checking...`);

        try {
            const response = await fetch("/api/herb/checkWithAi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ foodName }),
            });

            if (!response.ok) {
                throw new Error(`Error checking with AI: ${response.statusText}`);
            }

            const data: FoodCheckResult = await response.json();
            console.log("AI Response:", data);

            return { AIResult: data };
        } catch (error) {
            console.error("Error checking with AI:", error);
            return { AIResult: null };
        } finally {
            setCheckingWithAI(false);
        }
    };

    const normalizeAIResult = (AIResult: FoodCheckResult | null, foodName: string) => {
        if (!AIResult) return null;

        return {
            isSafe: AIResult.isSafe,
            name: foodName,
            amount: AIResult.amount || "unknown",
            frequency: AIResult.frequency || "unknown",
            reason: AIResult.reason || "checked with AI",
        };
    }

    const databaseCheck = async (foodName: string) => {
        try {
            const response = await fetch("/api/herb/fetchFood", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ foodName }),
            });

            if (!response.ok) {
                throw new Error(`Error checking with database: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Database Response:", data);

            if (data && data.item === null) {
                console.log(`${foodName} is not in the database.`);
                return { isInDatabase: false, DBResult: null };
            }

            if (data && data.item && data.item.name) {
                const item = data.item;
                return { isInDatabase: true, DBResult: item };
            }
        } catch (error) {
            console.error("Error checking with database:", error);
        }

        return { isInDatabase: false, DBResult: null };
    };

    const incrementFoodInput = async (result: FoodCheckResult, foodName: string) => {

        const payload = {
            foodName: foodName,
            isSafe: result.isSafe,
            amount: result.amount,
            frequency: result.frequency,
            reason: result.reason || "No reason provided"
        }

        console.log("Storing food input:", payload);

        const response = await fetch("/api/herb/storeFood", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        console.log("response:", response);

        if (!response.ok) {
            console.error(`Error storing food input: ${response.statusText}`);
        } else {
            const data = await response.json();
            if (data && data.totalGuesses !== undefined) {
                setGuessTotal(data.totalGuesses);
            }
            console.log("Stored food input:", data);
        }
    }

    const handleCheckFood = async (foodEntered: string) => {
        setGuessTotal(null);
        setInvalidWordErrorMessage(false);
        let normalizedFood = validateFoodInput(foodEntered);

        if (!normalizedFood) {
            return;
        }

        setFoodInput("");

        // do greater validation, such as:
        // ensure no numbers, special characters, or empty strings
        // i want as little calls to ai as possible, so i want to ensure that the input is valid before sending it to ai

        // spell check
        normalizedFood = spellCheckFood(normalizedFood);

        const alreadyGuessed = previousGuesses.some(
            (guess) => guess.name.toLowerCase() === normalizedFood.toLowerCase()
        );

        if (alreadyGuessed) {
            console.log(`${normalizedFood} has already been guessed.`);
            return;
        }

        const recordGuess = (foodResult: FoodCheckResult) => {
            setPreviousGuesses((guesses) => [
                ...guesses,
                { name: foodResult.name, isSafe: foodResult.isSafe },
            ]);
        };

        const isInExampleSafeList = HAMSTER_SAFE_FOODS.includes(normalizedFood.toLowerCase());
        const isInExampleUnsafeList = HAMSTER_UNSAFE_FOODS.includes(normalizedFood.toLowerCase());

        if (isInExampleSafeList) {
            const safeFood = hamsterSafeFoods.find((food) => food.name.toLowerCase() === normalizedFood.toLowerCase()) || null;
            console.log(`${normalizedFood} is safe for Herb!`);
            const result = safeFood ? {
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
            };
            setResult(result);
            recordGuess(result);
            incrementFoodInput(result, normalizedFood);
            return;
        }

        if (isInExampleUnsafeList) {
            const unsafeFood = hamsterUnsafeFoods.find((food) => food.name.toLowerCase() === normalizedFood.toLowerCase()) || null;
            console.log(`${normalizedFood} is NOT safe for Herb!`);
            const result = unsafeFood ? {
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
            };
            setResult(result);
            recordGuess(result);
            incrementFoodInput(result, normalizedFood);
            return
        }

        console.log("CHECKPOINT 1")
        const { isInDatabase, DBResult } = await databaseCheck(normalizedFood);
        console.log("Database Check Result:", { isInDatabase, DBResult });

        if (isInDatabase) {
            console.log(`${normalizedFood} is in the database. Checking if it's safe...`);
            setResult({
                isSafe: DBResult.isSafe,
                name: DBResult.name,
                amount: DBResult.amount || "unknown",
                frequency: DBResult.frequency || "unknown",
                reason: DBResult.reason || "fetched from database",
            });
            recordGuess({
                isSafe: DBResult.isSafe,
                name: DBResult.name,
                amount: DBResult.amount || "unknown",
                frequency: DBResult.frequency || "unknown",
                reason: DBResult.reason || "fetched from database",
            });
            incrementFoodInput(DBResult, normalizedFood);
            return;
        }

        // use ai to check if its a real word.

        const isRealWord = true; // new function

        if (!isRealWord) {
            setInvalidWordErrorMessage(true);
            return;
        }

        console.log("CHECKPOINT 2")
        const { AIResult } = await checkWithAi(normalizedFood);


        if (AIResult) {
            const normalizedAIResult = normalizeAIResult(AIResult, normalizedFood);
            console.log(`${normalizedFood} is not in the database. Checking with AI...`)
            setResult({
                isSafe: normalizedAIResult?.isSafe || false,
                name: normalizedFood,
                amount: normalizedAIResult?.amount || "unknown",
                frequency: normalizedAIResult?.frequency || "unknown",
                reason: normalizedAIResult?.reason || "checked with AI",
            });
            recordGuess({
                isSafe: normalizedAIResult?.isSafe || false,
                name: normalizedFood,
                amount: normalizedAIResult?.amount || "unknown",
                frequency: normalizedAIResult?.frequency || "unknown",
                reason: normalizedAIResult?.reason || "checked with AI",
            });
            console.log("AI Result:", AIResult);
            incrementFoodInput(AIResult, normalizedFood);
            return;
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
                        {guessTotal && (
                            <p>Guessed {guessTotal} times</p>
                        )}
                    </div>
                )}
                {checkingWithAI && (
                    <div className="flex flex-col gap-2 align-items justify-center text-center border-2 rounded-md p-4 bg-yellow-100 border-yellow-500">
                        <p>Checking with AI...</p>
                    </div>
                )}
                {invalidWordErrorMessage && (
                    <div className="flex flex-col gap-2 align-items justify-center text-center border-2 rounded-md p-4 bg-yellow-100 border-yellow-500">
                        <p>That guess is not a real word.</p>
                    </div>
                )}
                {previousGuesses.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <table className="w-full border-collapse border border-green-300 text-left">
                            <thead className="bg-green-100">
                                <tr>
                                    <th className="border border-green-300 p-2">She can eat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {previousGuesses.filter((guess) => guess.isSafe).map((guess) => (
                                    <tr key={guess.name}>
                                        <td className="border border-green-300 p-2">{guess.name}</td>
                                    </tr>
                                ))}
                                {!previousGuesses.some((guess) => guess.isSafe) && (
                                    <tr>
                                        <td className="border border-green-300 p-2 text-gray-500">No guesses yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <table className="w-full border-collapse border border-red-300 text-left">
                            <thead className="bg-red-100">
                                <tr>
                                    <th className="border border-red-300 p-2">She cannot eat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {previousGuesses.filter((guess) => !guess.isSafe).map((guess) => (
                                    <tr key={guess.name}>
                                        <td className="border border-red-300 p-2">{guess.name}</td>
                                    </tr>
                                ))}
                                {!previousGuesses.some((guess) => !guess.isSafe) && (
                                    <tr>
                                        <td className="border border-red-300 p-2 text-gray-500">No guesses yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CanHerbEatItEntry;
