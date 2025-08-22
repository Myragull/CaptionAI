const { GoogleGenAI }=require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

async function generateCaption(base64ImageFile) {
    const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "Caption this image." },
];
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config:{
        systemInstruction:`
        You are an expert in generating captions for images.
      - Generate a single caption for the image.
      - Keep it short and concise.
      - Always include relevant hashtags and emojis.
        `
    }
  });
  return response.text;
}

module.exports = generateCaption