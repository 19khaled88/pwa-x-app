// Parse the query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the value of the parameter you want to use in the title
const pageTitle = urlParams.get("data_title");

const filterTitle = [
    {"C":"Company"},
    {"L":"Location"},
    {"D":"Department"},
    {"P":"Position"},
    {"O":"Office"}
]
if (pageTitle === "Contacts") {
    // URL to fetch data from
  const url =
  "https://www.condomshopbd.com/xapi/dash_api.ashx?cmd=emp&list=all&imei=70:3a:51:90:39:05";

// Fetch data from the URL
fetch(url)
  .then((response) => {
    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Parse the JSON response
    return response.json();
  })
  .then((data) => {
    // Work with the fetched data    
    showContact(data);
  })
  .catch((error) => {
    // Handle errors
    console.error("There was a problem with the fetch operation:", error);
  });
}






function showContact(data){
    const contactsMain = document.getElementById("contactsMain");
    console.log(data.data)
    const employeeHTML = data.data.map(element => `
        <div class="employee">
            <div class="leftView">
                <img src="${element.emImage}" alt="Employee Image">
            </div>
            <div class="rightView">
                <p class="emName">${element.emName}</p>
                <p class="emDegi">${element.emDesignation}</p>
                <p class="emDegi">${element.emOrganization}</p>
                <p class="emDegi">${element.emPhone}</p>
            </div>
                
                
        </div>
    `).join('');


    contactsMain.innerHTML =`
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Search by Name or Mobile">
            <button id="searchButton"><img src="" alt="Search"></button>
        </div>
        <div class="filter-container">
            ${filterTitle.map((item) =>`
                <button onclick='handleFilterTitle(${JSON.stringify(Object.values(item)[0]).trim()})'>
                    <h1>${Object.keys(item)}</h1>
                    <label>${Object.values(item)}</label>
                </button>
            `).join('')}
            <button><img src="../assets/images/menu.png" alt="No Image"/></button>
            <button><img src="../assets/images/menu-dots.png" alt="No Image"/></button>
        </div>
        <div class="individual-employee-container">
            ${employeeHTML}
        </div>`;
}


function handleFilterTitle(data){
    
    console.log(data);
}
