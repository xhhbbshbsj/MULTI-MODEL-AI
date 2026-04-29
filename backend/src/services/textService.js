import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeText = async (prompt, mode, previousHistory = [], imageParts = []) => {
    const systemInstructions = {
        beginner: "Explain this like I am a high school student.",
        advanced: "Provide a technical, deep-dive analysis."
    };

    try {
        const model = genAI.getGenerativeModel({ 
            // Stick with Lite for speed and stability
            model: "gemini-2.5-flash-lite", 
            systemInstruction: systemInstructions[mode] || systemInstructions.advanced
        });

        const chat = model.startChat({
            history: previousHistory
        });

        // 🔥 NEW: We combine the text prompt and the image data into one package
        const messageParts = [prompt, ...imageParts];

        // Send the combined package to the Engine
        const result = await chat.sendMessage(messageParts);
        const response = await result.response;
        
        return { text: response.text() };

    } catch (error) {
        throw new Error("Gemini Service Failure: " + error.message);
    }
};