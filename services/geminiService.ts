
import { GoogleGenAI } from "@google/genai";

// Inicialização direta conforme diretrizes
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartAssistance = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
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
