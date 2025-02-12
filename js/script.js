// import { GoogleGenerativeAI } from '@google/generative-ai';

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

async function createUserChatBox(prompt) {
   const globalChatContainer = document.getElementById('globalChatContainer');
   const userInput = document.getElementById('userInput').value;

   if (userInput === '') {
      return;
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

   return userInput; // Mengembalikan input user untuk digunakan sebagai prompt
}

async function getAiRes(prompt) {
   try {
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
         const genAI = new GoogleGenerativeAI('AIzaSyC3I9aljFP6xdpLyugK91mR2ofMHvpQfIM'); // Ganti dengan API key Anda
         const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

         const result = await model.generateContent(prompt);
         const response = result.response;
         const text = await response.text();

         console.log('AI Response:', text);

         loadingContainer.remove(); // Hapus loading

         // Buat elemen untuk respons AI
         const aiChatBoxContainer = document.createElement('div');
         aiChatBoxContainer.classList.add('flex', 'h-auto', 'w-full', 'flex-col');

         const aiChatBox = document.createElement('div');
         aiChatBox.classList.add('h-auto', 'w-auto', 'max-w-[85%]', 'self-start', 'rounded-xl', 'border', 'border-gray-800', 'bg-gray-900', 'px-3', 'py-2');

         const aiMessage = document.createElement('pre');
         aiMessage.classList.add('max-w-[60ch]', 'text-base', 'max-sm:text-sm', 'leading-relaxed', 'font-thin', 'text-gray-300');
         aiMessage.textContent = text;

         const timeStamp = document.createElement('p');
         timeStamp.classList.add('text-start', 'text-gray-500', 'mt-2', 'text-xs', 'px-3');
         timeStamp.textContent = `Thenders, ${newDate()}`;

         // Tambahkan elemen ke DOM
         aiChatBoxContainer.appendChild(aiChatBox);
         aiChatBox.appendChild(aiMessage);
         aiChatBoxContainer.appendChild(timeStamp);
         globalChatContainer.appendChild(aiChatBoxContainer);

         // Scroll ke bawah
         window.scrollTo(0, document.body.scrollHeight);
      } catch (aiError) {
         console.error('AI Error:', aiError);

         setTimeout(() => {
            loadingContainer.classList.add('transition', 'duration-300', 'ease-in-out', 'opacity-0');
            setTimeout(() => {
               loadingContainer.remove();
            }, 10);
         }, 2000);
         throw new Error(`Error saat menghasilkan respons: ${aiError.message}`);
      }
   } catch (error) {
      console.error('Error:', error);

      // Tampilkan pesan error ke user
      setTimeout(() => {
         const globalChatContainer = document.getElementById('globalChatContainer');
         const errorContainer = document.createElement('div');
         errorContainer.classList.add('flex', 'h-auto', 'w-full', 'flex-col', 'transition', 'duration-200', 'ease-out', '-translate-y-3', 'opacity-[0%]');

         setTimeout(() => {
            errorContainer.classList.remove('opacity-[0%]');
            errorContainer.classList.add('opacity-[100%]');
            errorContainer.classList.remove('-translate-y-3');
            errorContainer.classList.add('-translate-y-0');
            window.scrollTo(0, document.body.scrollHeight);
         }, 10);

         errorContainer.innerHTML = `
         <div class="h-auto w-auto max-w-[85%] self-start rounded-xl border border-red-800 bg-red-900/50 px-3 py-2">
         <pre class="max-w-[60ch] text-base max-sm:text-sm leading-relaxed font-thin text-red-300">
         Maaf, fitur ini sedang dalam tahap pengembangan. Silahkan coba kembali di lain waktu. :(
         </pre>
         </div>
         `;
         globalChatContainer.appendChild(errorContainer);
      }, 2000);
   }
}

function sendMessage() {
   const sendMessage = document.getElementById('sendMessage');
   const dontSendMessage = document.getElementById('dontSendMessage');
   const userInput = document.getElementById('userInput');

   // Fungsi untuk mengatur tampilan tombol berdasarkan isi input
   function updateButtonVisibility() {
      if (userInput.value.trim() === '') {
         dontSendMessage.classList.remove('hidden');
         sendMessage.classList.add('hidden');
      } else {
         sendMessage.classList.remove('hidden');
         dontSendMessage.classList.add('hidden');
      }
   }

   // Event listener untuk input
   userInput.addEventListener('input', updateButtonVisibility);
   // Event listener untuk tombol kirim
   sendMessage.addEventListener('click', async () => {
      if (userInput.value.trim() === '') return;

      document.getElementById('greet').classList.add('hidden');

      const prompt = await createUserChatBox();
      userInput.value = '';
      updateButtonVisibility();

      await getAiRes(prompt);
      window.scrollTo(0, document.body.scrollHeight);
   });

   // Event listener untuk Enter key
   userInput.addEventListener('keypress', async (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         if (userInput.value.trim() !== '') {
            sendMessage.click();
         }
      }
   });
}

document.addEventListener('DOMContentLoaded', () => {
   closeSideBar();
   sendMessage();
});
