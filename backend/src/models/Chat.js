import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    history: [
        {
            role: { type: String, enum: ['user', 'model'], required: true },
            parts: [{ text: { type: String, required: true } }]
        }
    ]
});

export default mongoose.model('Chat', chatSchema);