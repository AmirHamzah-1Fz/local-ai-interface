// import { ollama } from "ollama";

export async function getOllamaResponse(userInput) {
   try {
      const response = await ollama.chat({
         model: 'llama3.2:1b',
         messages: [{ role: 'user', content: userInput }],
         stream: true,
      });
      return response.message.content;
   } catch (error) {
      console.error('Ollama Error:', error);
      throw error;
   }
}