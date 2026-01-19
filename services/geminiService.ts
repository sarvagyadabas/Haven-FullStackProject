import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!genAI) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable is not set");
    }
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAI;
};

export const initializeChat = async (systemInstruction: string): Promise<void> => {
  const ai = getClient();
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.7,
    },
  });
};

export const sendMessageToAI = async (text: string, systemInstructionIfNeeded?: string): Promise<string> => {
  if (!chatSession) {
    if (systemInstructionIfNeeded) {
        await initializeChat(systemInstructionIfNeeded);
    } else {
        throw new Error("Chat session not initialized and no system instruction provided");
    }
  }
  
  if (!chatSession) {
    throw new Error("Failed to initialize chat session");
  }

  try {
    const result = await chatSession.sendMessage({
      message: text
    });
    
    return result.text || "I'm listening, but I had trouble processing that. Could you say it again?";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I'm having a little technical trouble connecting right now. Please know I want to be here for you. Can we try again in a moment?";
  }
};