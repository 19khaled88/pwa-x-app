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

let newFilterData;
let fetchedData;
let newEmployeeHTML;

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
    fetchedData = data.data 
    showContact(data);
  })
  .catch((error) => {
    // Handle errors
    console.error("There was a problem with the fetch operation:", error);
  });
}

function showContact(data){
    const filterData = data.data
    manageEmployeeDataShow(filterData,'')
}

function handleFilterItem(item){
    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = '';

   let uniqueNames;
   if(item === 'Company'){
    uniqueNames = getUniqueValues(fetchedData, 'emOrganization');
    uniqueNames.forEach(company=>{
        const label = document.createElement('label');
            label.textContent = company;
            contentContainer.appendChild(label);
            // Add onclick event listener to the label element
            label.addEventListener('click', function() {
               const filteredCompany = fetchedData.filter(employee=>employee.emOrganization === company)
               newFilterData = filteredCompany
               manageEmployeeDataShow(filteredCompany,'')
            
            });
    })
   } else if(item === 'Location'){
    uniqueNames = getUniqueValues(fetchedData, 'emLocation');
    uniqueNames.forEach(location=>{
        const label = document.createElement('label');
            label.textContent = location;
            contentContainer.appendChild(label);
             // Add onclick event listener to the label element
             label.addEventListener('click', function() {
                const filteredLocation = fetchedData.filter(employee=>employee.emLocation === location)
                newFilterData = filteredLocation
                manageEmployeeDataShow(filteredLocation,'')
            });
    })
   } else if(item === 'Department'){
    uniqueNames = getUniqueValues(fetchedData, 'emDepartment');
    uniqueNames.forEach(department=>{
        const label = document.createElement('label');
            label.textContent = department;
            contentContainer.appendChild(label);
              // Add onclick event listener to the label element
              label.addEventListener('click', function() {
                const filteredDepartment = fetchedData.filter(employee=>employee.emDepartment === department)
                newFilterData = filteredDepartment
                manageEmployeeDataShow(filteredDepartment,'')
            });
    })
   } else if(item === 'Position'){
    uniqueNames = getUniqueValues(fetchedData, 'emPosition');
    uniqueNames.forEach(position=>{
        const label = document.createElement('label');
            label.textContent = position;
            contentContainer.appendChild(label);
             // Add onclick event listener to the label element
             label.addEventListener('click', function() {
                const filteredPosition = fetchedData.filter(employee=>employee.emPosition === position)
                newFilterData = filteredPosition
                manageEmployeeDataShow(filteredPosition,'')
            });
    })
   } else if(item === 'Office'){
    uniqueNames = getUniqueValues(fetchedData, 'emOffice');
    uniqueNames.forEach(office=>{
        const label = document.createElement('label');
            label.textContent = office;
            contentContainer.appendChild(label);

            // Add onclick event listener to the label element
            label.addEventListener('click', function() {
                const filteredOffice = fetchedData.filter(employee=>employee.emOffice === office)
                newFilterData = filteredOffice
                manageEmployeeDataShow(filteredOffice,'')
            });
    })
   } else if(item === 'single-column'){
    if(newFilterData != undefined){
        manageEmployeeDataShow(newFilterData, 'single-column')
    }
   } else if(item ==='double-column'){
    if(newFilterData != undefined){
        manageEmployeeDataShow(newFilterData, 'double-column')
    }
   }
}

function getUniqueValues(arrayOfObjects, key) {
    // Use Set to store unique values
    const uniqueValues = new Set();

    // Iterate over the array of objects
    arrayOfObjects.forEach(obj => {
        // Add the value of the specified key to the Set
        uniqueValues.add(obj[key]);
    });

    // Convert the Set back to an array
    return Array.from(uniqueValues);
}

function handleSingleEmpShow(emCode){
   const result =  fetchedData.filter((emp)=>emp.emCode === emCode)
   if(result){
       manageEmployeeDataShow(result,'emp-details')
   }

}

function handleConnect(info,type){
    if(type === 'phone'){
        window.location.href = "tel:" + info
    }else if(type === 'email'){
        window.location.href = "mailto:" + info
    }else if(type === 'msg'){
        console.log('mgs')
    }
}

function manageEmployeeDataShow(filterData,classHint){
    const contactsMain = document.getElementById("contactsMain");
   
    newEmployeeHTML = filterData.map((element, index) => `
        <div class="employee" onclick='handleSingleEmpShow(${JSON.stringify(element.emCode)})'>
        ${
            classHint === 'double-column' ? 
            `
            <div class="topView">
                <p class="emName">${index + 1}. ${element.emName}</p>
            </div>
            <div class="buttomView">
                <img src="${element.emImage}" alt="Employee Image">
            </div>
            ` : 
            classHint === 'single-column' ? 
            `
            <div class="leftView">
                <span class="index">${index + 1}</span>
                <img src="${element.emImage}" alt="Employee Image">
            </div>
            <div class="rightView">
                <p class="emName">${element.emName}</p>
                <p class="emDegi">${element.emDesignation}</p>
                <p class="emDegi">${element.emOrganization}</p>
                <p class="emDegi">${element.emPhone}</p>
                <p class="emDegi">${element.emEmail}</p>
            </div>
            ` :
            `
            <div class="leftView">
                <span class="index">${index + 1}</span>
                <img src="${element.emImage}" alt="Employee Image">
            </div>
            <div class="rightView">
                <p class="emName">${element.emName}</p>
                <p class="emDegi">${element.emDesignation}</p>
                <p class="emDegi">${element.emOrganization}</p>
                <p class="emDegi">${element.emPhone}</p>
                <p class="emDegi">${element.emEmail}</p>
            </div>
            `
        }
            
        </div>
        `).join('');
    
    empDetails = filterData.map((element,index)=>`
        
            <div class="topDetails">
                
                <div class="em_image">
                    <span>${element.emName}</span>
                    <img src=${element.emImage} alt="No Image"/>
                </div>
                <div id="connect">
                    <button onclick='handleConnect(${JSON.stringify(element.emPhone)}, "phone")'><img src="../assets/images/telephone.png" alt="No Image"/></button>
                    <button onclick='handleConnect(${JSON.stringify(element.emPhone)}, "msg")'><img src="../assets/images/sms.png" alt="No Image"/></button>
                    <button onclick='handleConnect(${JSON.stringify(element.emEmail)}, "email")'> <img src="../assets/images/email.png" alt="No Image"/></button>
                </div>
            </div>
            <div class="bottomDetils">
                <span>
                    <label>Company</label>
                    <p>${element.emOrganization}</p>
                </span>
                <span>
                    <label>Designation</label>
                    <p>${element.emDesignation}</p>
                </span>
                <span>
                    <label>Office</label>
                    <p>${element.emOffice}</p>
                </span>
                <span>
                    <label>Location</label>
                    <p>${element.emLocation}</p>
                </span>
                <span>
                    <label>Department</label>
                    <p>${element.emDepartment}</p>
                </span>
                <span>
                    <label>Join</label>
                    <p>${element.emDateOfJoin}</p>
                </span>
                <span>
                    <label>Birthdate</label>
                    <p>${element.emBirthdate}</p>
                </span>
                <span>
                    <label>Cell Number</label>
                    <p>${element.emPhone}</p>
                </span>
                <span>
                    <label>Email</label>
                    <p>${element.emEmail}</p>
                </span>
                <span>
                    <label>PABX</label>
                    <p>${element.emPabx}</p>
                </span>
                <span>
                    <label>Blood Group</label>
                    <p>${element.emBloodGroup}</p>
                </span>
                <span>
                    <label>Position</label>
                    <p>${element.emPosition}</p>
                </span>
            </div>
      
    `);

    contactsMain.innerHTML =`
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Search by Name or Mobile">
            <button id="empSearchButton" >
                <i class="fa fa-search" style="font-size:26px"></i>
            </button>
        </div>
        <div class="filter-container">
            ${filterTitle.map((item) =>`
                <div>
                    <button onclick='handleFilterItem(${JSON.stringify(Object.values(item)[0]).trim()})'>
                        <h1>${Object.keys(item)}</h1>
                        <label>${Object.values(item)}</label>
                    </button>
                </div>
            `).join('')}
            <div><button onclick='handleFilterItem("single-column")'><img src="../assets/images/menu.png" alt="No Image"/></button></div>
            <div><button onclick='handleFilterItem("double-column")'><img src="../assets/images/menu-dots.png" alt="No Image"/></button></div>
        </div>
        <div class="individual-employee-container">
            <div id="contentContainer"></div>
            ${
                classHint === 'double-column' ? 
                `<div id="double_column">
                    ${newEmployeeHTML}
                </div>`:
                classHint === 'single-column' ? 
                `<div id="single_column">
                    ${newEmployeeHTML}
                </div>`:
                classHint === 'emp-details' ? 
                `<div id="emp-details"> 
                   ${empDetails}
                </div>`:
                `<div id="single_emp">
                    ${newEmployeeHTML}
                </div>`
            }
            
        </div>`;


    const empSearchButton = document.getElementById('empSearchButton');
    // Add click event listener to the button
    empSearchButton.addEventListener('click', function() {
        // Select the input element by its id
        const searchInput = document.getElementById('searchInput');

        // Get the text entered in the input field
        const searchText = searchInput.value;

        // All fetchData
        const searchAbleData = fetchedData
       
        findBestMatches( searchAbleData ,searchText)
                
    }); 

    
}

function findBestMatches(array,searchText ) {
    // Filter the array to find objects whose names start with the search text
    const searchLower = searchText.toLowerCase();
   
    const matches = array.filter(obj => 
        obj.emName.toLowerCase().includes(searchLower) || 
        obj.emPhone.includes(searchLower)
    );
    if(matches){
        newFilterData = matches
        manageEmployeeDataShow(matches,'')
    }
}



