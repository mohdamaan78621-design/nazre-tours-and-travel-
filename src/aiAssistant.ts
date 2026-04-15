import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getGeminiResponse(userMessage: string, history: any[] = []) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "You are a helpful assistant for Nazre Tours and Travels. You help users with Hajj and Umrah planning. Use Google Maps to provide accurate location information when asked about hotels, mosques, or landmarks in Makkah and Medina."
        });

        const chat = model.startChat({
            history: history.map(h => ({
                role: h.role === 'user' ? 'user' : 'model',
                parts: [{ text: h.parts[0].text }]
            }))
        });

        const result = await chat.sendMessage(userMessage);
        return result.response.text();
    } catch (error) {
        console.error("Gemini Error:", error);
        return "I'm sorry, I'm having trouble connecting to my spiritual guidance system right now. Please try again later.";
    }
}

export async function getComplexReasoningResponse(userMessage: string) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-thinking-exp",
            systemInstruction: "You are an expert spiritual advisor and travel planner for Hajj and Umrah. Provide deep, well-reasoned answers to complex spiritual or logistical questions."
        });

        const result = await model.generateContent(userMessage);
        return result.response.text();
    } catch (error) {
        console.error("Gemini Thinking Error:", error);
        return "This is a complex matter that requires deep reflection. I'm currently unable to provide a detailed response. Please consult with our scholars directly.";
    }
}
