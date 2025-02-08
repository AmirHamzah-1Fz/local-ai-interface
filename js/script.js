import { closeSideBar } from './utils.js';
import { sendMessage } from './utils.js';

closeSideBar();
sendMessage();

const suggestionChatContainer = document.querySelectorAll('#suggestionChatContainer');

suggestionChatContainer.forEach((suggestionChatContainer) => {
   suggestionChatContainer.addEventListener('click', () => {
      const sendMessage = document.getElementById('sendMessage');
      const dontSendMessage = document.getElementById('dontSendMessage');
      const getQuickSuggestion = suggestionChatContainer.textContent.trim();
      const userInput = document.getElementById('userInput');

      userInput.value = `Write me about ${getQuickSuggestion}`;

      sendMessage.classList.remove('hidden');
      dontSendMessage.classList.add('hidden');
   });
});
