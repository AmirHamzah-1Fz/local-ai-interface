const closeSideBar = document.getElementById('closeSideBar');
const sidebar = document.getElementById('sidebar');

closeSideBar.addEventListener('click', () => {
   sidebar.classList.toggle('w-0');
   sidebar.classList.toggle('w-full');
});
if (sidebar.classList.value.includes('w-0')) {
   sidebar.classList.remove('px-4');
   sidebar.classList.add('px-0');
}