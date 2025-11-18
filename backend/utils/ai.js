const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY || 'dummy_key');

async function analyzeCitizenReport(description, location) {
    if (!process.env.AI_API_KEY) {
        return {
            aiSuggestedPriority: 'medium',
            aiSummary: 'AI analysis skipped: AI_API_KEY not provided.'
        };
    }
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `
        You are an AI assistant for a Smart Waste Management System.
        A citizen just submitted a waste collection report.
        Location: ${location}
        Description: ${description}
        
        Task:
        1. Categorize the priority of this issue as either 'low', 'medium', or 'high' based on the description (e.g. hazardous or blocking traffic is high).
        2. Provide a very short 1-2 sentence summary of the issue and an empathetic automated response for the citizen.
        
        Return ONLY valid JSON in this exact format, with no markdown formatting or extra text:
        {
          "priority": "low | medium | high",
          "summary": "Your short summary and empathetic response here."
        }
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Try to parse the JSON output
        let cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);
        
        return {
            aiSuggestedPriority: parsed.priority || 'medium',
            aiSummary: parsed.summary || 'Analyzed by AI'
        };
    } catch (error) {
        console.error("AI Analysis Failed:", error);
        return {
            aiSuggestedPriority: 'medium',
            aiSummary: 'AI analysis failed due to an error.'
        };
    }
}

module.exports = { analyzeCitizenReport };
