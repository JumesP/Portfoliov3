"use client"
import React, {useState, useEffect } from 'react';


import { FormEvent } from 'react';

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess(false);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/contact/storeContact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setSuccess(true);
            form.reset();

        } catch {
            setError("Something went wrong. Please try again.");

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 w-[500px] h-fit p-4 m-4 border-2 bg-[#73946B] rounded-xl">
            <h3>Contact:</h3>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 w-full max-w-xl"
            >

                <div>
                    <label htmlFor="name">
                        Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full border p-3"
                    />
                </div>

                <div>
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full border p-3"
                    />
                </div>

                <div>
                    <label htmlFor="subject">
                        Subject
                    </label>

                    <input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="What's this about?"
                        className="w-full border p-3"
                    />
                </div>

                <div>
                    <label htmlFor="message">
                        Message
                    </label>

                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder="Tell me what's on your mind..."
                        className="w-full border p-3"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="border p-3"
                >
                    {loading ? "Sending..." : "Send message"}
                </button>

                {success && (
                    <p>
                        Message sent successfully!
                    </p>
                )}

                {error && (
                    <p>
                        {error}
                    </p>
                )}

            </form>
            <div>
            </div>
        </div>
    )
};

export default Contact;