import dotenv from 'dotenv';
dotenv.config();

async function checkModels() {
    const key = process.env.GEMINI_API_KEY;
    console.log("Checking Google's servers...");
    
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await res.json();
        
        if (data.error) {
            console.error("❌ Key Error:", data.error.message);
            return;
        }

        const usableModels = data.models.filter(m => 
            m.supportedGenerationMethods.includes("generateContent")
        );
        
        console.log("\n✅ YOUR API KEY IS ALLOWED TO USE THESE MODELS:");
        usableModels.forEach(m => console.log("👉", m.name.replace('models/', '')));
        
    } catch (err) {
        console.error("Network failed:", err.message);
    }
}

checkModels();