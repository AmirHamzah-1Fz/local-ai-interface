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

function closeSideBar() {
   const closeSideBar = document.getElementById('closeSideBar');
   const sidebar = document.getElementById('sidebar');
   const globalChatContainer = document.getElementById('globalChatContainer');

   closeSideBar.addEventListener('click', () => {
      sidebar.classList.toggle('w-0');
      sidebar.classList.toggle('w-full');

      if (sidebar.classList.value.includes('w-0')) {
         sidebar.classList.remove('px-4');
         sidebar.classList.add('px-0');
         const inputContainer = document.getElementById('inputContainer');

         setTimeout(() => {
            globalChatContainer.classList.remove('w-[65%]');
            globalChatContainer.classList.add('w-[50%]');

            inputContainer.classList.remove('w-[50%]');
            inputContainer.classList.add('w-[50%]');
         }, 400);
      }
   });
}

function newDate() {
   const getDate = new Date();
   const dateFormat = { day: 'numeric', year: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
   return getDate.toLocaleString('en-ID', dateFormat);
}

function createUserChatBox(prompt) {
   const globalChatContainer = document.getElementById('globalChatContainer');

   const userChatBoxContainer = document.createElement('div');
   userChatBoxContainer.classList.add('flex', 'h-auto', 'w-full', 'flex-col');

   const userChatBox = document.createElement('div');
   userChatBox.classList.add('h-auto', 'w-auto', 'max-w-[85%]', 'self-end', 'rounded-xl', 'border', 'border-sky-500', 'bg-gradient-to-r', 'from-sky-600', 'to-blue-600', 'px-3', 'py-2', 'shadow-lg', 'shadow-sky-500/20');

   const userMessage = document.createElement('pre');
   userMessage.classList.add('max-w-[60ch]', 'text-base', 'leading-relaxed', 'font-thin', 'text-gray-50');

   const userInput = document.getElementById('userInput').value;
   prompt = userInput;

   if (userInput === '') {
      return;
   }

   userMessage.textContent = `${prompt}`;

   const timeStamp = document.createElement('p');
   timeStamp.classList.add('text-end', 'text-gray-500', 'mt-2', 'text-xs', 'px-3');
   timeStamp.textContent = `You, ${newDate()}`;

   globalChatContainer.appendChild(userChatBoxContainer);
   userChatBoxContainer.appendChild(userChatBox);
   userChatBoxContainer.appendChild(timeStamp);
   userChatBox.appendChild(userMessage);
}

function sendMessage() {
   const sendMessage = document.getElementById('sendMessage');
   const dontSendMessage = document.getElementById('dontSendMessage');
   const userInput = document.getElementById('userInput');

   userInput.addEventListener('input', function () {
      sendMessage.classList.remove('hidden');
      dontSendMessage.classList.add('hidden');

      if (userInput.value === '') {
         dontSendMessage.classList.remove('hidden');
         sendMessage.classList.add('hidden');
      }
   });

   sendMessage.addEventListener('click', () => {
      const sendMessage = document.getElementById('sendMessage');
      const userInput = document.getElementById('userInput');
      const dontSendMessage = document.getElementById('dontSendMessage');

      document.getElementById('greet').classList.add('hidden');
      window.scrollTo(0, document.body.scrollHeight);

      createUserChatBox();
      userInput.value = '';
      dontSendMessage.classList.remove('hidden');
      sendMessage.classList.add('hidden');

      setTimeout(() => {
         getAiRes(aiRes);
         window.scrollTo(0, document.body.scrollHeight);
      }, 1000);
   });
}

function getAiRes() {
   const globalChatContainer = document.getElementById('globalChatContainer');

   const aiChatBoxContainer = document.createElement('div');
   aiChatBoxContainer.classList.add('flex', 'h-auto', 'w-full', 'flex-col');

   const aiChatBox = document.createElement('div');
   aiChatBox.classList.add('h-auto', 'w-auto', 'max-w-[85%]', 'self-start', 'rounded-xl', 'border', 'border-gray-800', 'bg-gray-900', 'px-3', 'py-2', 'shadow-lg');

   const aiMessage = document.createElement('pre');
   aiMessage.classList.add('max-w-[60ch]', 'text-base', 'leading-relaxed', 'font-thin', 'text-gray-100');

   aiMessage.textContent = `${aiRes}`;

   const timeStamp = document.createElement('p');
   timeStamp.classList.add('text-start', 'text-gray-500', 'mt-2', 'text-xs', 'px-3');
   timeStamp.textContent = `${newDate()}`;

   globalChatContainer.appendChild(aiChatBoxContainer);
   aiChatBoxContainer.appendChild(aiChatBox);
   aiChatBoxContainer.appendChild(timeStamp);
   aiChatBox.appendChild(aiMessage);
}

let aiRes = `Sorry, the feature for chat is under development. Please still patience and wait for the next updates.`;

closeSideBar();
sendMessage();