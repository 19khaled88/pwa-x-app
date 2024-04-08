// Parse the query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the value of the parameter you want to use in the title
const pageTitle = urlParams.get("data_title");

const hrmActivityTop = document.getElementById("hrmActivityTop");
const btn = hrmActivityTop.querySelector("button");
const title = btn.querySelector("p");

// Check if the parameter is present
if (pageTitle) {
  // Set the title of the HTML page
  //   document.title = pageTitle;
  title.textContent = pageTitle;
  switch (pageTitle) {
    case "HR policy":
      title.textContent = "HR Policies";
      fetchHrData("hr_policy")
        .then((result) => {
          const container = document.getElementById("hrmActivityMain"); // Get the image element by its id
          container.innerHTML = "";

          const div = document.createElement("div"); // Create a div element
          div.setAttribute("class", "policy-container");
          const divContainer = container.appendChild(div);
          // Handle the result
          result.map((item, index) => {
            divContainer.appendChild(createPolicy(item, index));
          });
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });

      break;
    case "holidays":
      title.textContent = "Annual Holiday List";
      fetchHrData("holiday_list")
        .then((result) => {
          const container = document.getElementById("hrmActivityMain"); // Get the image element by its id
          container.innerHTML = "";

          container.appendChild(createHoliday(result));
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    case "attendance":
      title.textContent = "My Attendence Status";
      fetchHrData("attendance")
        .then((result) => {
          createAttendance(result);
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    case "payslip":
      title.textContent = "My Payslip Status";
      break;
    case "late applicatoin":
      title.textContent = "Late Reasons";
      break;
    case "leave application":
      title.textContent = "Leave Application";
      break;
    case "tax":
      title.textContent = "Tax Activity";
      break;
    case "leave status":
      title.textContent = "Leave Status";
      break;
    case "work from home":
      title.textContent = "Work From Home";
      break;
    case "work from home status":
      title.textContent = "Work From Home Status";
      break;
    case "provident fund":
      title.textContent = "Provident Fund Activity";
      break;
    case "mandatory saving scheme":
      title.textContent = "Mandatory Saving Scheme";
      break;
    case "loan application":
      title.textContent = "Loan Application";
      break;
    case "loan status":
      title.textContent = "Loan Status Activity";
      break;
    case "loan application":
      title.textContent = "Loan Application";
      break;
    default:
      title.textContent = "Live Roster Duty";
  }
}

async function fetchHrData(heading) {
  try {
    const response = await fetch("../helpers/dbs.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    const parsedData = await JSON.parse(data);
    return parsedData[heading];
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

function createPolicy(item, index) {
  const itemBtn = document.createElement("button"); // Create a button element
  const itemImg = document.createElement("img");
  const spanElement = document.createElement("span");
  const label = document.createElement("p");
  itemImg.src = item.image;
  itemImg.alt = "Description of the image";
  // itemImg.width = 60;
  // itemImg.height = 50;

  itemBtn.type = "button";
  itemBtn.classList.add("item-add-btn");

  // Add different classes based on even or odd index
  if ((index + 1) % 2 === 0) {
    itemBtn.classList.add("even-div");
  } else {
    itemBtn.classList.add("odd-div");
  }

  label.innerText += item.title;
  spanElement.innerText += index + 1 + ".";

  itemBtn.appendChild(spanElement);
  itemBtn.appendChild(label);
  itemBtn.appendChild(itemImg);

  //  // Add onclick function to the button
  //  itemBtn.onclick = function() {
  //   // Add your onclick functionality here
  //   console.log(item.title);
  // };

  itemBtn.addEventListener("click", function () {
    //   routeToPage('../pages/HumanResourceActivity.html','',item.title)
  });

  return itemBtn; // Return the div element containing the button
}

function createHoliday(item) {
  // Create table element
  const table = document.createElement("table");
  table.setAttribute("id", "annual_holiday_list");

  // Create caption for the table
  const topCaption = document.createElement("caption");
  topCaption.textContent = "Annual Holiday List - 2024";
  table.appendChild(topCaption);

  // Create table header
  const tableHeader = table.createTHead();
  const headerRow = tableHeader.insertRow();
  ["SL", "Date", "Purpose"].forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  // Create table body
  const tableBody = document.createElement("tbody");
  table.appendChild(tableBody);

  // Dictionary to store background colors for each purpose
  const purposeColors = {};

  // Populate table rows
  item.forEach((event, index) => {
    const row = tableBody.insertRow();
    // event.date.forEach((datePart) => {
    //   const cell = row.insertCell();
    //   cell.textContent = datePart;
    // });

    const slCell = row.insertCell();
    slCell.textContent = index + 1;

    const dateCell = row.insertCell();
    // Split the date array by commas and join with <br> tags
    dateCell.innerHTML = event.date.join("<br>");

    const purposeCell = row.insertCell();
    purposeCell.textContent = event.purpose;

    let backgroundColor;
    if ((index + 1) % 2 === 0) {
      backgroundColor = ""; // Light blue for even rows
    } else {
      backgroundColor = "#606462"; // Light grey for odd rows
    }

    // Check if purpose already has a background color assigned
    if (!purposeColors[event]) {
      purposeColors[event.purpose] = backgroundColor;
    }

    // Apply background color for cells with the same purpose
    row.style.backgroundColor = purposeColors[event.purpose];
  });

  // Create table footer
  const tableFooter = table.createTFoot();
  const footerRow = tableFooter.insertRow();
  const footerCell = footerRow.insertCell();
  footerCell.colSpan = 3; // Span the cell across all columns
  footerCell.textContent = " ** Depends on sighting of the Moon";

  return table;
}

function createAttendance(item) {
  const container = document.getElementById("hrmActivityMain");
  container.innerHTML = "";

  const attendance_container = document.createElement("div");

  attendance_container.setAttribute("id", "attendanceContainer");
  attendance_container.setAttribute("class", "attendanceContainer");

  const attendance_container_top_div = document.createElement("div");
  const attendance_container_bottom_div = document.createElement("div");

  attendance_container_top_div.setAttribute("id", "topDiv");
  attendance_container_top_div.setAttribute("class", "topDiv");
  attendance_container_bottom_div.setAttribute("id", "bottomDiv");
  attendance_container_bottom_div.setAttribute("class", "bottomDiv");

  const attendance_container_top_div_span_1 = document.createElement("span");
  const attendance_container_top_div_span_2 = document.createElement("span");

  attendance_container_top_div_span_1.setAttribute("id", "topSpan");
  attendance_container_top_div_span_1.setAttribute("class", "topSpan");
  attendance_container_top_div_span_2.setAttribute("id", "bottomSpan");
  attendance_container_top_div_span_2.setAttribute("class", "bottomSpan");

  const btn = document.createElement("button");
  btn.setAttribute("id", "atndOkBtn");
  btn.setAttribute("class", "atndOkBtn");
  btn.textContent = "OK";

 
  let selectedMonth = "";
  let selectedYear = "";
  
 // Assuming monthList is a select element (dropdown)
const monthList = document.getElementById("monthList");

if(monthList){
  // Get the currently selected month before onchange
const currentSelectedMonth = monthList.value;
console.log(monthList)
}


  // Add onclick event handler
  btn.addEventListener("click", function () {
    let selectedMonth = "";
    let selectedYear = "";
    const monthList = document.getElementById("monthList");
    const yearList = document.getElementById("yearList");
   

   
    // Add your onclick functionality here
    monthList.addEventListener("change", function(event) {
       selectedMonth = event.target.value;
      // Do something with the selected month
      console.log("Selected month:", selectedMonth);
    });
    
    // Add event listener for yearList
    yearList.addEventListener("change", function(event) {
       selectedYear = event.target.value;
      // Do something with the selected year
      console.log("Selected year:", selectedYear);
    });
  });

  attendance_container_top_div.appendChild(attendance_container_top_div_span_1);
  attendance_container_top_div.appendChild(attendance_container_top_div_span_2);

  attendance_container_top_div_span_1.appendChild(
    createDropdown(item[0].months, "monthList")
  );
  attendance_container_top_div_span_1.appendChild(
    createDropdown(item[1].years, "yearList")
  );
  attendance_container_top_div_span_1.appendChild(btn);

  attendance_container.appendChild(attendance_container_top_div);
  attendance_container.appendChild(attendance_container_bottom_div);

  container.appendChild(attendance_container);

  const status = item[3].status.map((statusText) => {
    const status_div = document.createElement("div");
    const status_paragraph_1 = document.createElement("p");
    const status_paragraph_2 = document.createElement("p");

    status_paragraph_1.setAttribute("id", "status_title");
    status_paragraph_2.setAttribute("id", "status_value");
    status_paragraph_1.textContent = statusText + ":";
    status_paragraph_2.textContent = 0;

    status_div.appendChild(status_paragraph_1);
    status_div.appendChild(status_paragraph_2);
    
    if (statusText === "Absent" || statusText === "Late") {
      status_paragraph_1.style.color = "red";
      status_paragraph_2.style.color = "red";
    }
    attendance_container_top_div_span_2.appendChild(status_div);
  });
}

function createDropdown(options, id) {
  const dropdown = document.createElement("select"); // Create select element
  dropdown.setAttribute("id", id); // Set id attribute

  // Create and append option elements for each dropdown item
  options.forEach((option) => {
    const optionElement = document.createElement("option"); // Create option element
    optionElement.value = option; // Set value attribute
    optionElement.textContent = option; // Set text content
    dropdown.appendChild(optionElement); // Append option element to dropdown
  });

  return dropdown; // Return the created dropdown
}

function getDatesOfMonth(year, month) {
  const dates = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Octr",
    "Nov",
    "Dec",
  ];

  // Loop through each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    // Create a Date object for the current day
    const date = new Date(year, month, day);

    // Extract the day, month, and year from the Date object
    const dayOfMonth = date.getDate();
    // const monthOfYear = date.getMonth() + 1; // Months are zero-based, so add 1
    const monthName = monthNames[date.getMonth()];
    const yearOfDate = date.getFullYear();

    // Add the day, month, and year to the dates array
    dates.push(`${dayOfMonth}/${monthName}/${yearOfDate}`);
  }

  return dates;
}

// Example usage:
const year = 2024;
const month = 1; // 0 for January, 1 for February, and so on...
const datesOfMonth = getDatesOfMonth(year, month);

// console.log(datesOfMonth);



