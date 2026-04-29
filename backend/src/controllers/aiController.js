import { analyzeText } from '../services/textService.js';
import Chat from '../models/Chat.js';

export const handleEngineRequest = async (req, res) => {
    try {
        const { mode, sessionId } = req.body; 
        let prompt = req.body.prompt || "Analyze this attached file.";

        if (!sessionId) {
            return res.status(400).json({ error: "Session ID required for memory." });
        }

        let imageParts = [];

        // 🔥 THE FILE EATER LOGIC
        if (req.file) {
            const mimeType = req.file.mimetype;

            // Path A: It's an image (JPG, PNG, etc)
            if (mimeType.startsWith('image/')) {
                imageParts.push({
                    inlineData: {
                        data: req.file.buffer.toString("base64"),
                        mimeType: mimeType
                    }
                });
            } 
            // Path B: It's a text document (JS, CSV, JSON, TXT, etc)
            else {
                // Extract the raw text from the file buffer
                const fileContent = req.file.buffer.toString('utf-8');
                
                // Inject the file's text directly into the prompt
                prompt += `\n\n--- FILE CONTENTS (${req.file.originalname}) ---\n${fileContent}\n--- END OF FILE ---`;
            }
        }

        let chatRecord = await Chat.findOne({ sessionId });
        if (!chatRecord) {
            chatRecord = new Chat({ sessionId, history: [] });
        }

        const cleanHistory = chatRecord.history.map(msg => ({
            role: msg.role,
            parts: msg.parts.map(part => ({ text: part.text }))
        }));

        // 🔥 Pass the new prompt AND the imageParts to the service
        const textResult = await analyzeText(prompt, mode, cleanHistory, imageParts);

        // Save to MongoDB
        chatRecord.history.push({ role: "user", parts: [{ text: prompt }] });
        chatRecord.history.push({ role: "model", parts: [{ text: textResult.text }] });
        await chatRecord.save();

        res.status(200).json({
            engine_status: "processed",
            results: [{ type: 'text', data: textResult }]
        });

    } catch (error) {
        console.error("🔥 Engine Logic Failure:", error.message);
        res.status(500).json({ error: "The Engine encountered a logic failure." });
    }
};