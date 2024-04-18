
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

  function createNavigationButton(elements, callback){
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
    
        if (element === "Entry") {
          button.click();
        }
        buttonContainer.appendChild(button);
      }
    
      return buttonContainer;
    }

