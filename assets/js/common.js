
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

  function createNavigationButton(elements, activeElement,callback){
    const buttonContainer = document.createElement("div");  
    
    for (let element in elements) {
        const button = document.createElement("button");
        button.textContent = element;
    
        button.addEventListener("click", function () {
    
          // Remove active class from all buttons
          buttonContainer.querySelectorAll("button").forEach((btn) => {
            btn.classList.remove("active");
          });
    
          // Add active class to the clicked button
          button.classList.add("active");
    
          callback(elements[element], element);
        });
    
        if (element === activeElement) {
          button.click();
        }
        buttonContainer.appendChild(button);
      }
    
      return buttonContainer;
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
    

