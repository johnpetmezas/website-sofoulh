import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateCampaignImage(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `High-resolution, architectural photography style. ${prompt}. Inspired by Saba Italia aesthetic: minimalist, sophisticated, and warm. Neutral earth tones, soft textiles, premium natural wood textures. Soft, natural daylight streaming through large windows, highlighting the grain of the wood. Contemporary, open-plan Mediterranean villa setting.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Error generating image:", error);
  }
  return null;
}
