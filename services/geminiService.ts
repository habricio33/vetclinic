import { GoogleGenAI } from "@google/genai";

// Lazy initialization to prevent crash even if key is missing on Vercel
let aiInstance: any = null;

const getAI = () => {
  if (aiInstance) return aiInstance;

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("VITE_GEMINI_API_KEY not found. AI Assistant features will be disabled.");
    return null;
  }

  try {
    aiInstance = new GoogleGenAI({ apiKey });
    return aiInstance;
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI:", err);
    return null;
  }
};

export const getSmartAssistance = async (query: string) => {
  const ai = getAI();

  if (!ai) {
    return "O Assistente IA não está configurado corretamente (chave de API ausente).";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash', // Updated to a stable model name
      contents: query,
      config: {
        systemInstruction: "Você é o 'VetBot', o assistente de elite da VetClinic Pro. Sua missão é fornecer suporte técnico veterinário (protocolos, doses, diagnósticos diferenciais) e administrativo (gestão de estoque e agenda). Seja breve, preciso e use termos técnicos adequados em português do Brasil.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Assistance Error:", error);
    return "Tive um problema de conexão com meus módulos de IA. Por favor, tente novamente.";
  }
};
