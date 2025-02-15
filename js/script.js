import { getOllamaResponse } from './ollamaConfig.js';

function newDate() {
   const now = new Date();
   const hours = now.getHours().toString().padStart(2, '0');
   const minutes = now.getMinutes().toString().padStart(2, '0');
   return `${hours}:${minutes}`;
}

async function getAiRes(userInput) {
   const globalChatContainer = document.getElementById('globalChatContainer');

   // Buat elemen loading
   const loadingContainer = document.createElement('div');
   loadingContainer.classList.add('flex', 'h-auto', 'w-full', 'flex-col');
   loadingContainer.innerHTML = `
         <div class="h-auto w-auto max-w-[85%] self-start rounded-xl border border-gray-800 bg-gray-900 px-3 py-2">
            <div class="flex items-center gap-2">
               <div class="h-2 w-2 animate-pulse rounded-full bg-gray-600"></div>
               <div class="h-2 w-2 animate-pulse rounded-full bg-gray-600"></div>
               <div class="h-2 w-2 animate-pulse rounded-full bg-gray-600"></div>
            </div>
         </div>
      `;
   globalChatContainer.appendChild(loadingContainer);

   try {
      // Persiapkan elemen untuk respons AI
      const aiChatBoxContainer = document.createElement('div');
      aiChatBoxContainer.classList.add('flex', 'h-auto', 'w-full', 'flex-col');

      const aiChatBox = document.createElement('div');
      aiChatBox.classList.add('h-auto', 'w-auto', 'max-w-[85%]', 'self-start', 'rounded-xl', 'border', 'border-gray-800', 'bg-gray-900', 'px-3', 'py-2');

      const aiMessage = document.createElement('pre');
      aiMessage.classList.add('max-w-[60ch]', 'text-base', 'max-sm:text-sm', 'leading-relaxed', 'font-thin', 'text-gray-300');

      // Dapatkan respons dari Ollama
      const aiResponse = await getOllamaResponse(userInput);
      aiMessage.textContent = aiResponse;

      const timeStamp = document.createElement('p');
      timeStamp.classList.add('text-start', 'text-gray-500', 'mt-2', 'text-xs', 'px-3');
      timeStamp.textContent = `Thenders, ${newDate()}`;

      // Tambahkan elemen ke DOM
      aiChatBoxContainer.appendChild(aiChatBox);
      aiChatBox.appendChild(aiMessage);
      aiChatBoxContainer.appendChild(timeStamp);
      globalChatContainer.appendChild(aiChatBoxContainer);
   } catch (error) {
      console.error('Error getting AI response:', error);
      // Tampilkan pesan error ke user
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('text-red-500', 'text-sm', 'px-3');
      errorMessage.textContent = 'Failed to get AI response. Please try again.';
      globalChatContainer.appendChild(errorMessage);
   } finally {
      loadingContainer.remove();
   }
}

function createUserChatBox() {
   const globalChatContainer = document.getElementById('globalChatContainer');
   const userInput = document.getElementById('userInput').value;
   const greetElement = document.getElementById('greet');

   // Hanya membuat chat box jika input tidak kosong
   if (userInput.trim() === '') return;

   // Sembunyikan greeting saat pesan pertama dikirim
   if (greetElement) {
      greetElement.style.display = 'none';
   }

   const userChatBoxContainer = document.createElement('div');
   userChatBoxContainer.classList.add('flex', 'h-auto', 'w-full', 'flex-col');

   const userChatBox = document.createElement('div');
   userChatBox.classList.add('h-auto', 'w-auto', 'max-w-[85%]', 'self-end', 'rounded-xl', 'border', 'border-sky-500', 'bg-gradient-to-r', 'from-sky-600', 'to-blue-600', 'px-3', 'py-2', 'shadow-lg', 'shadow-sky-500/20');

   const userMessage = document.createElement('pre');
   userMessage.classList.add('max-w-[60ch]', 'text-base', 'max-sm:text-sm', 'leading-relaxed', 'font-thin', 'text-gray-50');
   userMessage.textContent = userInput;

   const timeStamp = document.createElement('p');
   timeStamp.classList.add('text-end', 'text-gray-500', 'mt-2', 'text-xs', 'px-3');
   timeStamp.textContent = `You, ${newDate()}`;

   globalChatContainer.appendChild(userChatBoxContainer);
   userChatBoxContainer.appendChild(userChatBox);
   userChatBoxContainer.appendChild(timeStamp);
   userChatBox.appendChild(userMessage);

   // Bersihkan input setelah mengirim pesan
   document.getElementById('userInput').value = '';

   // Panggil getAiRes dengan input user
   getAiRes(userInput);
}

// Event listener untuk tombol send
document.getElementById('sendMessage').addEventListener('click', createUserChatBox);

// Event listener untuk input keyboard (Enter)
document.getElementById('userInput').addEventListener('keypress', function (e) {
   if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Mencegah new line
      createUserChatBox();
   }
});
