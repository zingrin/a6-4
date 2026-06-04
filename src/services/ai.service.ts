"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL || env.BACKEND_URL;

export interface IChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

export const chatWithAI = async (messages: IChatMessage[]) => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/api/ai/chat`, {
            method: "POST",
            headers: {
                "Cookie": cookieStore.toString(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages }),
        });

        const data = await res.json();
        
        if (data.success && data.data) {
            return data.data;
        }

        return "I'm sorry, I'm having trouble connecting right now.";
    } catch (error) {
        console.error("AI Service Error:", error);
        throw new Error("Failed to communicate with AI");
    }
};
