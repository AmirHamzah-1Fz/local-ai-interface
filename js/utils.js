export function closeSideBar() {
   const closeSideBar = document.getElementById('closeSideBar');
   const sidebar = document.getElementById('sidebar');
   const globalChatContainer = document.getElementById('globalChatContainer');

   closeSideBar.addEventListener('click', () => {
      sidebar.classList.toggle('w-0');
      sidebar.classList.toggle('w-full');

      if (sidebar.classList.value.includes('w-0')) {
         sidebar.classList.remove('px-4');
         sidebar.classList.add('px-0');
         const inputEl = document.getElementById('input')

         setTimeout(() => {
            globalChatContainer.classList.remove('w-[80%]');
            globalChatContainer.classList.add('w-[60%]');

            inputEl.classList.remove('w-[80%]');
            inputEl.classList.add('w-[60%]');
         }, 400);
      }
   });
}

export function newDate(){
    const getDate = new Date();
    const dateFormat = { day: 'numeric', year: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
    return getDate.toLocaleString('en-ID', dateFormat);
};

export function createUserChatBox(message) {
   const globalChatContainer = document.getElementById('globalChatContainer');

   const userChatBoxContainer = document.createElement('div');
   userChatBoxContainer.classList.add('flex', 'h-auto', 'w-full', 'flex-col');

   const userChatBox = document.createElement('div');
   userChatBox.classList.add('h-auto', 'w-auto', 'max-w-[80%]', 'self-end', 'rounded-xl', 'border', 'border-sky-500', 'bg-gradient-to-r', 'from-sky-600', 'to-blue-600', 'px-3', 'py-2', 'shadow-lg', 'shadow-sky-500/40');

   const userMessage = document.createElement('pre');
   userMessage.classList.add('max-w-[60ch]', 'text-base', 'font-thin', 'text-white');
   userMessage.textContent = `${message}`;

   const timeStamp = document.createElement('p');
   timeStamp.classList.add('text-end', 'text-gray-500', 'mt-3', 'text-sm')
   timeStamp.textContent = `You, ${newDate()}`;

   globalChatContainer.appendChild(userChatBoxContainer);
   userChatBoxContainer.appendChild(userChatBox);
   userChatBoxContainer.appendChild(timeStamp);
   userChatBox.appendChild(userMessage);
};
