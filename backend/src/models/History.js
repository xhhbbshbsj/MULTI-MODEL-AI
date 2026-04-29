import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    userId: { type: String, default: "guest_user" }, // Scaleable for later
    input: {
        text: String,
        imagePath: String,
        modality: { type: String, enum: ['text', 'vision', 'multi'] }
    },
    output: String,
    mode: { type: String, enum: ['beginner', 'advanced'] },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('History', historySchema);