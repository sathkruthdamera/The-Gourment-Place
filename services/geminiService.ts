
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RESTAURANT_NAME } from "../constants";

const API_KEY = process.env.API_KEY;

// Ensure API_KEY is defined. In a real app, you might have better error handling or fallback.
if (!API_KEY) {
  console.warn("Gemini API key not found. Using mock data for Gemini services.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const defaultWelcomeMessage = `Welcome to ${RESTAURANT_NAME}! Experience an unforgettable culinary journey with our exquisite dishes, crafted from the freshest ingredients by our world-class chefs. We invite you to relax, indulge, and create lasting memories in our warm and inviting atmosphere.`;

export const getRestaurantWelcomeMessage = async (): Promise<string> => {
  if (!ai) {
    return defaultWelcomeMessage;
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: `Generate a warm and inviting welcome message (around 50-70 words) for a fine dining restaurant called "${RESTAURANT_NAME}". Highlight exquisite cuisine and a memorable experience.`,
      config: {
        temperature: 0.7,
        topK: 50,
        topP: 0.9,
      }
    });
    return response.text || defaultWelcomeMessage;
  } catch (error) {
    console.error("Error fetching welcome message from Gemini:", error);
    return defaultWelcomeMessage; 
  }
};

// Example of generating menu item descriptions (conceptual)
interface MenuItemDetails {
  name: string;
  category: string;
  keyIngredients?: string[];
}

export const generateMenuItemDescription = async (itemDetails: MenuItemDetails): Promise<string> => {
  if (!ai) {
    return `A delicious ${itemDetails.category.toLowerCase()} featuring ${itemDetails.name}.`;
  }
  
  const prompt = `Generate a short, appetizing menu description (20-30 words) for a restaurant item.
  Item Name: ${itemDetails.name}
  Category: ${itemDetails.category}
  ${itemDetails.keyIngredients ? `Key Ingredients: ${itemDetails.keyIngredients.join(', ')}` : ''}
  Focus on appealing adjectives and taste sensations.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
      config: {
        temperature: 0.8,
      }
    });
    return response.text || `A delightful ${itemDetails.name}.`;
  } catch (error) {
    console.error(`Error generating description for ${itemDetails.name}:`, error);
    return `Discover the unique taste of our ${itemDetails.name}.`;
  }
};
