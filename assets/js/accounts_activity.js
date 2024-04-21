// Parse the query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the value of the parameter you want to use in the title
const pageTitle = urlParams.get("data_title");

const accountsActivityTop = document.getElementById("accountsActivityTop");
const btn = accountsActivityTop.querySelector("button");
const title = btn.querySelector("p");

if (pageTitle) {
  title.textContent = pageTitle;
  switch (pageTitle) {
    case "Bill entry":
      title.textContent = "Bill Entry";
      fetchHrData("Bill_entry")
        .then((response) => {
          bill_entry_func(response);
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    default:
      console.log("Test");
      break;
  }
}

function bill_entry_func(response) {
  const container = document.getElementById("accountsActivityMain"); // Get the image element by its id
  container.innerHTML = "";
  const bill_entry_container = document.createElement("div"); // Create a div element
  bill_entry_container.setAttribute("class", "bill_entry_container");
  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("id", "bill_entry_button_container");
  buttonContainer.setAttribute("class", "bill_entry_button_container");
  const entry_details_container = document.createElement("div");
  entry_details_container.setAttribute("id", "bill_entry_details_container");
  entry_details_container.setAttribute("class", "bill_entry_details_container");

  const buttons = createNavigationButton(response, 'Entry', function (data, key) {
    entry_details_container.innerHTML = "";
    const entry_top_container = document.createElement("div");
    const entry_middle_container = document.createElement("div");
    entry_top_container.setAttribute("id", "entry_container_top");
    entry_top_container.setAttribute("class", "entry_container_top");
    entry_middle_container.setAttribute("id", "entry_container_middle");
    entry_middle_container.setAttribute("class", "entry_container_middle");

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const currentTime = formattedHours + ":" + formattedMinutes;
    const monthName = currentDate.toLocaleString("default", { month: "short" });
    const currentDay = String(currentDate.getDate()).padStart(2, "0");
    const formattedCurrentDate = `${currentDay}/${monthName}/${currentYear}`;

    

    if (key === "Entry") {
      const useForm = handleFormAndSubmit('entry','entry_class');
      for (let elements in data) {
        if (elements === "short_title") {
          data[elements].map((info, index) => {
            const span = document.createElement("span");
            const label = document.createElement("label");
            const text = document.createElement("p");
            label.textContent = info;
            text.textContent =
              info === "Time"
                ? currentTime
                : info === "Date"
                ? formattedCurrentDate
                : "";
            span.appendChild(label);
            span.appendChild(text);
            entry_top_container.appendChild(span);
          });
        } else {
          const filteredKeys = Object.keys(data).filter(
            (key) => key === elements
          );
          filteredKeys.forEach((key) => {
            const label = document.createElement("label");
            const selectElement = document.createElement("select");
            selectElement.setAttribute("name",key)
            const span = document.createElement("span");
            if (
              key === "Company" ||
              key === "Bill Type" ||
              key === "Purpose" ||
              key === "Bill For"
            ) {
              data[key].length &&
                data[key].length > 0 &&
                data[key].forEach((optionText) => {
                  label.textContent = key;
                  const optionElement = document.createElement("option");
                  optionElement.value = optionText; // Set the value attribute
                  optionElement.textContent = optionText; // Set the text content
                  selectElement.appendChild(optionElement);
                  span.appendChild(label);
                  span.appendChild(selectElement);
                });
            } else if (key === "Bill date") {
              const billDate = document.createElement("input");
              billDate.type = "text";
              billDate.id = "billDate";
              billDate.name = "billDate";
              billDate.value = formattedCurrentDate;
              $(billDate).datepicker({
                dateFormat: "dd/mm/yy",
                onSelect: function (selectedDate) {
                  const dateObject = $.datepicker.parseDate(
                    "dd/mm/yy",
                    selectedDate
                  );
                  const shortMonthName = $.datepicker.formatDate(
                    "dd/M/yy",
                    dateObject
                  );
                  billDate.value = shortMonthName;
                },
              });
              label.textContent = key;
              span.appendChild(label);
              span.appendChild(billDate);
            } else if (key === "Note") {
              const billNote = document.createElement("textarea");
              billNote.type = "text";
              billNote.id = "billNote";
              billNote.name = "billNote";
              billNote.rows = 4; // Set the number of rows

              billNote.value = "";
              label.textContent = key;
              span.appendChild(label);
              span.appendChild(billNote);
            } else if (key === "Amount(Tk)") {
              const billAmount = document.createElement("input");
              billAmount.setAttribute("id", "rtl-cursor");
              billAmount.setAttribute("class", "rtl-cursor");
              billAmount.type = "number";
              billAmount.id = "billAmount";
              billAmount.name = "billAmount";
              billAmount.value = "";
              label.textContent = key;
              span.appendChild(label);
              span.appendChild(billAmount);
            }
            useForm.appendChild(span);
          });
        }
      }

      // Create a submit button
      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.textContent = "Submit";
      useForm.appendChild(submitButton);
      entry_middle_container.appendChild(useForm);
      entry_details_container.appendChild(entry_top_container);
      entry_details_container.appendChild(entry_middle_container);

    } else if (key === "view") {
      const useForm = handleFormAndSubmit('view','view_class');
      const dateContainer = document.createElement("div");
      
      dateContainer.setAttribute("id", "date_container");
      dateContainer.setAttribute("class", "date_container");

     

      const startTimeInput = handleDateAndTime('startDatePickerInput');
      const endTimeInput = handleDateAndTime('endDatePickerInput');
      
      for (let elements in data) {
        const selectElement = document.createElement("select");
        selectElement.setAttribute("name",elements);
        const span = document.createElement("span");

        data[elements].forEach((optionText, index) => {
          const optionElement = document.createElement("option");
          optionElement.value = optionText; // Set the value attribute
          optionElement.textContent = optionText; // Set the text content
          selectElement.appendChild(optionElement);

          span.appendChild(selectElement);
        });
        useForm.appendChild(span);
        
      }

      dateContainer.appendChild(startTimeInput.elementName);
      dateContainer.appendChild(endTimeInput.elementName);

      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.textContent = "Search";

      useForm.appendChild(dateContainer);
      useForm.appendChild(submitButton)

      entry_middle_container.appendChild(useForm);
      entry_details_container.appendChild(entry_middle_container);
    } else if (key === "Approval") {
      const useForm = handleFormAndSubmit('approval','approval_class');
      const dateContainer = document.createElement("div");
      
      dateContainer.setAttribute("id", "date_container");
      dateContainer.setAttribute("class", "date_container");

     

      const startTimeInput = handleDateAndTime('startDatePickerInput');
      const endTimeInput = handleDateAndTime('endDatePickerInput');
      
      for (let elements in data) {
        const selectElement = document.createElement("select");
        selectElement.setAttribute("name",elements);
        const span = document.createElement("span");

        data[elements].forEach((optionText, index) => {
          const optionElement = document.createElement("option");
          optionElement.value = optionText; // Set the value attribute
          optionElement.textContent = optionText; // Set the text content
          selectElement.appendChild(optionElement);

          span.appendChild(selectElement);
        });
        useForm.appendChild(span);
        
      }

      dateContainer.appendChild(startTimeInput.elementName);
      dateContainer.appendChild(endTimeInput.elementName);

      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.textContent = "Search";

      useForm.appendChild(dateContainer);
      useForm.appendChild(submitButton)

      entry_middle_container.appendChild(useForm);
      entry_details_container.appendChild(entry_middle_container);
    }
  });

  buttonContainer.appendChild(buttons);

  bill_entry_container.appendChild(buttonContainer);
  bill_entry_container.appendChild(entry_details_container);
  container.appendChild(bill_entry_container);
}

function handleFormAndSubmit(name,class_name) {
  const form = document.createElement("form");
  form.setAttribute("id", class_name);
  form.setAttribute("class", class_name);
  form.setAttribute("method", "POST");

  // Add event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    const newFormData ={}
    const formData = new FormData(form);
    for (var pair of formData.entries()) {
      newFormData[pair[0]] = pair[1];
    }

    console.log(newFormData)
    // const formData = {};
    // form.querySelectorAll("span").forEach((span) => {
    //   // const label = span.querySelector("label").textContent;
    //   let name;
    //   let value;
    //   const selectElements = span.querySelector("select");
    //   if (selectElements) {

    //     value = selectElements.value;
    //     name = selectElements.name
        
    //   } else {
    //     const inputElemens = span.querySelector("input,textarea");
    //     if (inputElemens) {
    //       value = inputElemens.value;
    //       name = inputElemens.name
          
    //     }
    //   }

    //   formData[name] = value;
    // });


    // form.remove();
  });

  return form;
}


function handleDateAndTime(elementName){
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const currentTime = formattedHours + ":" + formattedMinutes;
  const monthName = currentDate.toLocaleString("default", { month: "short" });
  const currentDay = String(currentDate.getDate()).padStart(2, "0");
  const formattedCurrentDate = `${currentDay}/${monthName}/${currentYear}`;
  
  let id_name = elementName
  
  elementName = document.createElement("input");
  elementName.type = "text";
  elementName.id = id_name;
  elementName.name = id_name;
  elementName.value = formattedCurrentDate;
  $(elementName).datepicker({
    dateFormat: "dd/mm/yy",
    onSelect: function (selectedDate) {
      const dateObject = $.datepicker.parseDate("dd/mm/yy", selectedDate);
      const shortMonthName = $.datepicker.formatDate("dd/M/yy", dateObject);
      elementName.value = shortMonthName;
    },
  });
  
  return {elementName}
  
}

