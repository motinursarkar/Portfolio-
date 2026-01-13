
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPortfolioResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `
          You are the AI assistant for Motinur Sarkar's portfolio. 
          Motinur is an Electrical and Electronic Engineering (EEE) student at the University of Chittagong. 
          He is passionate about embedded systems, renewable energy, and robotics. 
          Be professional, concise, and helpful. If asked about projects, mention his Smart Power Management or Solar Tracker.
          He is looking for internship opportunities in the tech and engineering sector.
        `,
      },
    });
    return response.text || "I'm sorry, I couldn't process that. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The assistant is currently offline. Please contact Motinur directly!";
  }
};
