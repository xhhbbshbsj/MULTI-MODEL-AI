import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeImage = async (filePath, prompt = "Describe this image in detail.") => {
    try {
        const model = genAI.getGenerativeModel({
            // YOUR LATEST VISION MODEL:
            model: "gemini-2.5-flash",

            systemInstruction: "Analyze this image and provide a detailed, technical description."
        });

        const imageData = fs.readFileSync(filePath);
        const base64Image = imageData.toString('base64');
        const mimeType = getMimeType(filePath);

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Image,
                    mimeType
                }
            }
        ]);

        const response = await result.response;

        return {
            text: response.text(),
            usage: response.usageMetadata,
            file: path.basename(filePath)
        };
    } catch (error) {
        throw new Error("Vision Service Failure: " + error.message);
    }
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const types = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
    };
    return types[ext] || 'image/jpeg';
}
