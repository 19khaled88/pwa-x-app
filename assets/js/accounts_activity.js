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

  const buttons = createNavigationButton(response, function (data, key) {
    entry_details_container.innerHTML = "";
    const entry_top_container = document.createElement("div");
    const entry_middle_container = document.createElement("div");
    entry_top_container.setAttribute("id", "entry_container_top");
    entry_top_container.setAttribute("class", "entry_container_top");

    if (key === "Entry") {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      const currentTime = formattedHours + ":" + formattedMinutes;
      const monthName = currentDate.toLocaleString("default", {
        month: "short",
      });
      const currentDay = String(currentDate.getDate()).padStart(2, "0");
      const formattedCurrentDate = `${currentDay}/${monthName}/${currentYear}`;

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
            if(key === "Company" || key === "Bill Type" || key === "Purpose" || key === "Bill For"){
                data[key].length &&
                data[key].length > 0 && 
                data[key].forEach((optionText) => {
                  const optionElement = document.createElement("option");
                  optionElement.value = optionText; // Set the value attribute
                  optionElement.textContent = optionText; // Set the text content
                  selectElement.appendChild(optionElement);
                });
            }else if(key === "Bill date"){
                console.log(key)
            } else if(key=== 'Note'){
                console.log(key)
            } else if(key === "Amount(Tk)"){
                console.log(key)
            }
            // console.log(key);
            // console.log("Values:", data[key]);
            entry_middle_container.appendChild(selectElement)
          });
        }
      }

      entry_details_container.appendChild(entry_top_container);
      entry_details_container.appendChild(entry_middle_container)
      
    } else if (key === "view") {
    } else if (key === "Approval") {
    }
  });

  buttonContainer.appendChild(buttons);

  bill_entry_container.appendChild(buttonContainer);
  bill_entry_container.appendChild(entry_details_container);
  container.appendChild(bill_entry_container);
}
