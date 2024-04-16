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
      fetchHrData("dateTimeInfo")
        .then((result) => {
          createAttendance(result);
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    case "payslip":
      title.textContent = "My Payslip Status";
      fetchHrData("dateTimeInfo")
        .then((result) => {
          paySlipStatus(result);
        })
        .catch((error) => {});

      break;
    case "late applicatoin":
      title.textContent = "Late Reasons";
      fetchHrData("lateReasonTitle")
        .then((result)=>{
          lateApplication(result)
        })
        .catch((error)=>{})
      
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

  attendance_container_top_div.setAttribute("id", "attendanceTopDiv");
  attendance_container_top_div.setAttribute("class", "attendanceTopDiv");
  attendance_container_bottom_div.setAttribute("id", "attendanceBottomDiv");
  attendance_container_bottom_div.setAttribute("class", "attendanceBottomDiv");

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

  // Create a new Date object
  const currentDate = new Date();
  let currentMonthValue = currentDate.getMonth();
  let currentMonth = currentDate.toLocaleString("default", { month: "long" });
  let currentYear = currentDate.getFullYear();

  const currentDateTime = getDatesOfMonth(currentYear, currentMonthValue);
  attendance_container_bottom_div.appendChild(
    showAttendanceStatus(currentDateTime)
  );

  // Add onclick event handler
  btn.addEventListener("click", function () {
    const monthList = document.getElementById("monthList");
    const yearList = document.getElementById("yearList");

    // monthList.addEventListener("change", function (event) {
    //   currentMonth = yearList.value
    // // console.log(monthList.value, allMonth);
    // });

    // yearList.addEventListener("change", function (event) {
    //   currentYear = yearList.value;
    // });

    // Clear existing content in the container
    attendance_container_bottom_div.innerHTML = "";

    item[0].months.map((month, index) => {
      if (month === monthList.value) {
        const changedDateTime = getDatesOfMonth(
          parseInt(yearList.value),
          index
        );
        attendance_container_bottom_div.appendChild(
          showAttendanceStatus(changedDateTime)
        );
      }
    });
  });

  attendance_container_top_div.appendChild(attendance_container_top_div_span_1);
  attendance_container_top_div.appendChild(attendance_container_top_div_span_2);

  attendance_container_top_div_span_1.appendChild(
    createDropdown(item[0].months, "monthList", currentMonth)
  );
  attendance_container_top_div_span_1.appendChild(
    createDropdown(item[1].years, "yearList", currentYear)
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

function paySlipStatus(item) {
  const container = document.getElementById("hrmActivityMain");

  container.innerHTML = "";

  // Create a new Date object
  const currentDate = new Date();
  let currentMonthValue = currentDate.getMonth();
  let currentMonth = currentDate.toLocaleString("default", { month: "long" });
  let currentYear = currentDate.getFullYear();

  const btn = document.createElement("button");
  btn.setAttribute("id", "paySlicShowBtn");
  btn.setAttribute("class", "paySlicShowBtn");
  btn.textContent = "SHOW";

  // Add onclick event handler
  btn.addEventListener("click", function () {
    const monthList = document.getElementById("monthList");
    const yearList = document.getElementById("yearList");
    const selectedMonthNumber = monthList.selectedIndex;

    // Clear existing content in the container
    paySlipContainer_bottom_div_second_div.innerHTML = "";

    if (
      (selectedMonthNumber < currentMonthValue) &
      (parseInt(yearList.value) <= currentYear)
    ) {
      /*bottom div > first div > upper paragraph*/
      paySlipContainer_bottom_div_first_div_upper_p_1.textContent =
        monthList.value + " " + yearList.value;
      paySlipContainer_bottom_div_first_div_upper_p_2.textContent =
        "MD. KHALED AHASAN";
      paySlipContainer_bottom_div_first_div_upper_p_3.textContent =
        "Gross Salary";
      paySlipContainer_bottom_div_first_div_upper_p_4.textContent = 26000;
      paySlipContainer_bottom_div_first_div_upper_p_5.textContent =
        "Basic Salary";
      paySlipContainer_bottom_div_first_div_upper_p_6.textContent = 13000;
      paySlipContainer_bottom_div_first_div_upper_p_7.textContent =
        "Total Payment - This Month";
      paySlipContainer_bottom_div_first_div_upper_p_8.textContent = 26000;

      /*bottom div > first div > upper child addition*/
      paySlipContainer_bottom_div_first_div_upper.appendChild(
        paySlipContainer_bottom_div_first_div_upper_p_1
      );
      paySlipContainer_bottom_div_first_div_upper.appendChild(
        paySlipContainer_bottom_div_first_div_upper_p_2
      );

      /*bottom div > first div > upper > span child addition*/
      paySlipContainer_bottom_div_first_div_upper_span_1.appendChild(
        paySlipContainer_bottom_div_first_div_upper_p_3
      );
      paySlipContainer_bottom_div_first_div_upper_span_1.appendChild(
        paySlipContainer_bottom_div_first_div_upper_p_4
      );

      paySlipContainer_bottom_div_first_div_upper_span_2.appendChild(
        paySlipContainer_bottom_div_first_div_upper_p_5
      );
      paySlipContainer_bottom_div_first_div_upper_span_2.appendChild(
        paySlipContainer_bottom_div_first_div_upper_p_6
      );

      paySlipContainer_bottom_div_first_div_upper_span_3.appendChild(
        paySlipContainer_bottom_div_first_div_upper_p_7
      );
      paySlipContainer_bottom_div_first_div_upper_span_3.appendChild(
        paySlipContainer_bottom_div_first_div_upper_p_8
      );

      /*bottom div > first div > lower child addition*/
      paySlipContainer_bottom_div_first_div_lower.appendChild(
        paySlipContainer_bottom_div_first_div_upper_span_1
      );
      paySlipContainer_bottom_div_first_div_lower.appendChild(
        paySlipContainer_bottom_div_first_div_upper_span_2
      );
      paySlipContainer_bottom_div_first_div_lower.appendChild(
        paySlipContainer_bottom_div_first_div_upper_span_3
      );

      /*bottom div > first div child addition*/
      paySlipContainer_bottom_div_first_div.appendChild(
        paySlipContainer_bottom_div_first_div_upper
      );
      paySlipContainer_bottom_div_first_div.appendChild(
        paySlipContainer_bottom_div_first_div_lower
      );

      /*bottom div > second div > show payable amount calculation*/

      payslipPayableAmountShow()
        .then((root_div) => {
          paySlipContainer_bottom_div_second_div.appendChild(root_div);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      /*bottom div child addition*/
      paySlipContainer_bottom_div.appendChild(
        paySlipContainer_bottom_div_first_div
      );
      paySlipContainer_bottom_div.appendChild(
        paySlipContainer_bottom_div_second_div
      );
    }
  });

  const paySlipContainer = document.createElement("div");
  paySlipContainer.setAttribute("id", "paySlipContainer");
  paySlipContainer.setAttribute("class", "paySlipContainer");

  const paySlipContainer_top_div = document.createElement("div");
  const paySlipContainer_top_div_span = document.createElement("span");
  paySlipContainer_top_div.setAttribute("id", "paySlipTopDivContainer");
  paySlipContainer_top_div.setAttribute("class", "paySlipTopDivContainer");
  paySlipContainer_top_div.appendChild(paySlipContainer_top_div_span);

  paySlipContainer_top_div_span.appendChild(
    createDropdown(item[0].months, "monthList", currentMonth)
  );
  paySlipContainer_top_div_span.appendChild(
    createDropdown(item[1].years, "yearList", currentYear)
  );
  paySlipContainer_top_div_span.appendChild(btn);

  const paySlipContainer_bottom_div = document.createElement("div");
  paySlipContainer_bottom_div.setAttribute("id", "paySlipBottomDivContainer");
  paySlipContainer_bottom_div.setAttribute(
    "class",
    "paySlipBottomDivContainer"
  );

  const paySlipContainer_bottom_div_first_div = document.createElement("div");
  paySlipContainer_bottom_div_first_div.setAttribute(
    "id",
    "paySlipBottomDivFirst"
  );
  paySlipContainer_bottom_div_first_div.setAttribute(
    "class",
    "paySlipBottomDivFirst"
  );

  const paySlipContainer_bottom_div_first_div_upper =
    document.createElement("div");

  const paySlipContainer_bottom_div_first_div_upper_p_1 =
    document.createElement("p");
  const paySlipContainer_bottom_div_first_div_upper_p_2 =
    document.createElement("p");
  const paySlipContainer_bottom_div_first_div_upper_p_3 =
    document.createElement("p");
  const paySlipContainer_bottom_div_first_div_upper_p_4 =
    document.createElement("p");
  const paySlipContainer_bottom_div_first_div_upper_p_5 =
    document.createElement("p");
  const paySlipContainer_bottom_div_first_div_upper_p_6 =
    document.createElement("p");
  const paySlipContainer_bottom_div_first_div_upper_p_7 =
    document.createElement("p");
  const paySlipContainer_bottom_div_first_div_upper_p_8 =
    document.createElement("p");
  const paySlipContainer_bottom_div_first_div_upper_span_1 =
    document.createElement("span");
  const paySlipContainer_bottom_div_first_div_upper_span_2 =
    document.createElement("span");
  const paySlipContainer_bottom_div_first_div_upper_span_3 =
    document.createElement("span");

  const paySlipContainer_bottom_div_first_div_lower =
    document.createElement("div");

  const paySlipContainer_bottom_div_second_div = document.createElement("div");
  paySlipContainer_bottom_div_second_div.setAttribute(
    "id",
    "paySlipBottomDivSecond"
  );
  paySlipContainer_bottom_div_second_div.setAttribute(
    "class",
    "paySlipBottomDivSecond"
  );

  paySlipContainer_bottom_div.appendChild(
    paySlipContainer_bottom_div_first_div
  );
  paySlipContainer_bottom_div.appendChild(
    paySlipContainer_bottom_div_second_div
  );

  paySlipContainer.appendChild(paySlipContainer_top_div);
  paySlipContainer.appendChild(paySlipContainer_bottom_div);

  container.appendChild(paySlipContainer);
}

function payslipPayableAmountShow() {
  return new Promise((resolve, reject) => {
    fetchHrData("paySlipBreakDownTitle")
      .then((response) => {
        const root_div = document.createElement("div");

        const button_container = document.createElement("div");
        const pay_adjust_container = document.createElement("div");

        for (let items in response) {
          const button = document.createElement("button");
          button.textContent = items;
          button.addEventListener("click", function () {
            console.log(`${items}`);
            pay_adjust_container.innerHTML = ""; // Clear the container
        
            response[items].forEach((item) => {
              const div = document.createElement('div');
              const span = document.createElement("span");
              const paragraph1 = document.createElement("p");
              const paragraph2 = document.createElement("p");
              
              for (let itm in item) {
                if (itm === "Minimum Payment") {
                  paragraph1.textContent = itm;
                  paragraph2.textContent = item[itm];
                  span.appendChild(paragraph1);
                  span.appendChild(paragraph2);
                }
                if (itm === "Adjustments") {
                  item[itm].forEach((newItem) => {
                    const adjustmentSpan = document.createElement("span"); // Create a new span for each Adjustments object
                    for (let key in newItem) {
                      const adjustmentParagraph1 = document.createElement("p");
                      const adjustmentParagraph2 = document.createElement("p");
                      adjustmentParagraph1.textContent = key;
                      adjustmentParagraph2.textContent = newItem[key];
                      adjustmentSpan.appendChild(adjustmentParagraph1);
                      adjustmentSpan.appendChild(adjustmentParagraph2);
                    }
                    div.appendChild(adjustmentSpan); // Append the adjustmentSpan to the main span
                    
                  });
                 
                }
              }
              pay_adjust_container.appendChild(span); // Append the span to the container
              pay_adjust_container.appendChild(div); // Append the span to the container
              
              
            });
          });
          button_container.appendChild(button);
        }

        root_div.appendChild(button_container);
        root_div.appendChild(pay_adjust_container);

        resolve(root_div);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function lateApplication(items){
  const container = document.getElementById("hrmActivityMain");
  container.innerHTML = "";


  const lateApplicationContainer = document.createElement("div");
  const buttonContainer = document.createElement("div");
  const reason_status_container = document.createElement('div');

// Create buttons and attach event listener
  const buttons = createLateApplyButton(items,function(data,key){
    reason_status_container.innerHTML = "";
    // Create a new div to display the clicked data
    const lateAppData = document.createElement("div");
    
    
    if(key === 'apply'){
      const reasonDiv = document.createElement('div');
      lateAppData.setAttribute("id","applyReason")
      lateAppData.setAttribute("class","applyReason")
      const reasonLabel = document.createElement('p');
      const reasons = document.createElement('div');      
      reasonLabel.textContent = 'Late Reason'
      const submitBtn = document.createElement('button')
      submitBtn.textContent = 'SUBMIT'
      
      data.forEach((option, index) => {
        const span = document.createElement('span')
        const radioButton = document.createElement('input'); // Create radio button element
        radioButton.type = 'radio'; // Set type attribute
        radioButton.name = 'options'; // Set name attribute (all radio buttons should have the same name to form a group)
        radioButton.value = option; // Set value attribute
        radioButton.id = `option${index + 1}`; // Set id attribute

        const label = document.createElement('label'); // Create label element for the radio button
        label.textContent = option; // Set label text
        label.setAttribute('for', `option${index + 1}`); // Set "for" attribute to match radio button id

        // Append radio button and label to the span
        span.appendChild(radioButton);
        span.appendChild(label);

        reasons.appendChild(span); 
      });
    
     
      reasonDiv.appendChild(reasonLabel)
      reasonDiv.appendChild(reasons)

      const noteDiv = document.createElement('div');
      const noteInput = document.createElement('input')
      const noteLabel = document.createElement('p')
      noteLabel.textContent = 'Note'
      noteDiv.appendChild(noteLabel)
      noteDiv.appendChild(noteInput)



      lateAppData.appendChild(reasonDiv);
      lateAppData.appendChild(noteDiv)
      lateAppData.append(submitBtn)
    }else if(key === 'view'){
      const dateSelectDiv = document.createElement('div')
      const statusDiv  = document.createElement('div')
      lateAppData.setAttribute("id","viewStatus")
      lateAppData.setAttribute("class","viewStatus")

      // Get the current date
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
      const currentDay = String(currentDate.getDate()).padStart(2, '0');
      const formattedCurrentDate = `${currentDay}/${currentMonth}/${currentYear}`;

      const startDatePickerInput = document.createElement('input');
      startDatePickerInput.type = 'text';
      startDatePickerInput.id = 'viewStartDate';
      startDatePickerInput.name = 'viewStartDate';

      startDatePickerInput.addEventListener('click',function(){
        $( "#viewStartDate" ).datepicker();
      })

      const endDatePickerInput = document.createElement('input');
      endDatePickerInput.type = 'text';
      endDatePickerInput.id = 'viewEndDate';
      endDatePickerInput.name = 'viewEndDate';

      endDatePickerInput.addEventListener('click',function(){
        $( "#viewEndDate" ).datepicker();
      })

      const viewBtn = document.createElement("button");
      viewBtn.setAttribute("id", "viewBtn");
      viewBtn.setAttribute("class", "viewBtn");
      viewBtn.textContent = "OK";
      
      dateSelectDiv.appendChild(startDatePickerInput);
      dateSelectDiv.appendChild(endDatePickerInput);
      dateSelectDiv.appendChild(viewBtn);

      lateAppData.appendChild(dateSelectDiv);
      lateAppData.appendChild(statusDiv)

    }

    

    // Append the data div to the lateApplicationContainer
    reason_status_container.appendChild(lateAppData);
  })
 

  lateApplicationContainer.setAttribute("id","lateApplicatonContainer");
  lateApplicationContainer.setAttribute("class","lateApplicatonContainer");
  buttonContainer.setAttribute("id","buttonContainer");
  buttonContainer.setAttribute("class","buttonContainer");
  reason_status_container.setAttribute("id","reason_status_container");
  reason_status_container.setAttribute("class","reason_status_container");

  buttonContainer.appendChild(buttons);

  lateApplicationContainer.appendChild(buttonContainer);
  lateApplicationContainer.appendChild(reason_status_container);
  container.appendChild(lateApplicationContainer);

}

function createLateApplyButton(elements,callback){
  const buttonContainer = document.createElement("div");
  
 for(let element in elements){
    const button = document.createElement("button");
    button.textContent = element;
    
    button.addEventListener('click',function(){

      callback(elements[element],element);
    })

    buttonContainer.appendChild(button);
 }
  
  return buttonContainer;
}

function showAttendanceStatus(dateInfo) {
  const attendanceStatus_div = document.createElement("div");
  dateInfo.map((status) => {
    const attendanceStatus_span = document.createElement("span");
    const attendanceStatus_text_1 = document.createElement("p");
    const attendanceStatus_text_2 = document.createElement("p");

    attendanceStatus_text_1.textContent = status;
    attendanceStatus_text_2.textContent = "Absent";
    attendanceStatus_span.appendChild(attendanceStatus_text_1);
    attendanceStatus_span.appendChild(attendanceStatus_text_2);
    attendanceStatus_div.appendChild(attendanceStatus_span);
  });
  return attendanceStatus_div;
}

function createDropdown(options, id, defaultValue) {
  const dropdown = document.createElement("select"); // Create select element
  dropdown.setAttribute("id", id); // Set id attribute

  // Create and append option elements for each dropdown item
  options.forEach((option) => {
    const optionElement = document.createElement("option"); // Create option element
    optionElement.value = option; // Set value attribute
    optionElement.textContent = option; // Set text content

    // Check if the current option matches the default value
    if (option === defaultValue.toString()) {
      optionElement.selected = true; // Set selected attribute if it matches
    }
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

  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Loop through each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    // Create a Date object for the current day
    const date = new Date(year, month, day);

    // Extract the day, month, and year from the Date object
    const dayOfWeek = weekdayNames[date.getDay()];
    const dayOfMonth = date.getDate();
    // const monthOfYear = date.getMonth() + 1; // Months are zero-based, so add 1
    const monthName = monthNames[date.getMonth()];
    const yearOfDate = date.getFullYear();

    // Add the day, month, and year to the dates array
    dates.push(`${dayOfMonth}/${monthName}/${yearOfDate}/${dayOfWeek}`);
  }

  return dates;
}


$(document).ready(function() {
  // Select an element by its ID and perform actions
  $("#viewBtn").click(function() {
      // Action to perform when the button is clicked
      alert("Button clicked!");
  });

  // Select another element by its ID and perform actions
  $("#myDiv").text("New content for the div");
});
