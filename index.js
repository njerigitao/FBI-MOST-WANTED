const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const wantedList = document.getElementById('wantedList');
let darkMode = false;
//fetch data from the API
async function fetchData(){
    try{
        const response = await fetch('https://api.fbi.gov/wanted/v1/list');
        const data = await response.json();
        return data.items;
    } catch(error){
        console.error('Error fetching data:', error);
    }
}
// Render wanted individuals
function renderList(individuals){
    wantedList.innerHTML = '';
    individuals.forEach(individual => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <h2>${individual.title}</h2>
        <p>${individual.description}</p>
        `;
        wantedList.appendChild(card);
    });
}
// Search functionality
searchForm.addEventListener('submit', async (event)=>{
    event.preventDefault(); // Prevent form submission
    const searchTerm = searchInput.value.toLowerCase();
    const data = await fetchData();
    const filteredData = data.filter(individual =>
    individual.title.toLowerCase().includes(searchTerm)
);
renderList(filteredData);
});

// Initial render
fetchData().then(data => renderList(data));