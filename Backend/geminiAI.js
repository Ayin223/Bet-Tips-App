import { configDotenv } from "dotenv";
import { GoogleGenAI } from "@google/genai"

configDotenv()

const ai = new GoogleGenAI({ apiKey: process.env.geminiAPI })
const modelName = "gemini-2.5-flash"; 

// The 'chat' object will hold the persistent chat session
let chat = null; 

// Function to initialize the chat session using the new SDK syntax
const initializeChat = (systemInstruction = "") => {
    // If chat is already initialized, return the existing instance
    if (chat) return chat;

    const config = systemInstruction ? { systemInstruction } : {};

    // *** THE CORRECTED LINE: Use ai.chats.create() ***
    // This creates and starts the stateful chat session
    chat = ai.chats.create({ 
        model: modelName, 
        config,
        // history: [] // Optional: provide initial history
    });
    
    return chat;
};


export const getResponse = {
    // ... (Your existing AI function for one-off calls is fine)
    AI: async function (prompt){
        try{
            // Note: Your existing AI function is ALREADY using the correct new syntax:
            // ai.models.generateContent()
            const response  = await ai.models.generateContent({
                model: modelName,
                contents: prompt,
            })
            return response.text;
        } catch(err){
            console.error(`Gemini error message: ${err}`)
            return `Error: ${err.message}`
        }
    },

    // New function for conversational chat using the initialized 'chat' instance
    chatAI: async function (prompt){
        // Ensure the chat session is initialized
        const chatSession = initializeChat();

        try{
            // Use chatSession.sendMessage() which is available on the chat object
            const response = await chatSession.sendMessage({ message: prompt });
            
            return response.text;
        }catch(err){
            console.error(`Gemini chat error message: ${err}`)
            return `Error: ${err.message}`
        }
    },

    // Optional: Function to reset the conversation
    resetChat: () => {
        chat = null;
        console.log("Chat history has been reset.");
    }
}

// console.log(await getResponse.chatAI("what is my name"))