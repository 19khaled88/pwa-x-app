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

  
  const attendance_container_top_div = document.createComment("div");
  const attendance_container_bottom_div = document.createComment("div");

  // const attendance_container_top_div_span_1 = document.createElement("span");
  // const attendance_container_top_div_span_2 = document.createElement("span");

  // attendance_container_top_div.appendChild(attendance_container_top_div_span_1);
  // attendance_container_top_div.appendChild(attendance_container_top_div_span_2);


  // attendance_container_top_div_span_1.appendChild(createDropdown(item[0].months, "monthList"))


  // attendance_container_top_div.appendChild(attendance_container_top_div_span_1);
  // attendance_container_top_div.appendChild(attendance_container_top_div_span_2)

  attendance_container.appendChild(attendance_container_top_div);
  attendance_container.appendChild(attendance_container_bottom_div);

  container.appendChild(attendance_container);



  

  // const div_1 = document.createElement("div");
  // div_1.setAttribute("id", "myDiv");
  // div_1.setAttribute("class", "myClass");

  // // const div_1_top = document.createElement("div");
  // // const div_1_bottom = document.createElement("div");
  // const div_1_span_1 = document.createComment("span")
  // const div_1_span_2 = document.createComment("span")

  // const div_2 = document.createElement("div");

  // // const btn = document.createElement("button");

  // const attendance_container_div_1 = attendance_container.appendChild(div_1);
  // const attendance_container_div_2 = attendance_container.appendChild(div_2);
  // const div_1_span_1_container = attendance_container_div_1.appendChild(div_1_span_1)
  // const div_1_span_2_container = attendance_container_div_1.appendChild(div_1_span_2)
  // // btn.setAttribute("id", "atndOkBtn");
  // // btn.setAttribute("class", "atndOkBtn");
  // // btn.textContent = "OK";

  // // attendance_container_div_1.appendChild(
  // //   createDropdown(item[0].months, "monthList")
  // // );
  // // attendance_container_div_1.appendChild(
  // //   createDropdown(item[1].years, "YearList")
  // // );
  // // attendance_container_div_1.appendChild(btn);


  // container.appendChild(attendance_container_div_1);
  // container.appendChild(attendance_container_div_2);
}

function createDropdown(options, id) {
  const dropdown = document.createElement("select"); // Create select element
  dropdown.setAttribute("id", id); // Set id attribute

  // Create and append option elements for each dropdown item
  options.forEach((option) => {
    console.log(option);
    const optionElement = document.createElement("option"); // Create option element
    optionElement.value = option; // Set value attribute
    optionElement.textContent = option; // Set text content
    dropdown.appendChild(optionElement); // Append option element to dropdown
  });

  return dropdown; // Return the created dropdown
}