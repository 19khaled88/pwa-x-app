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
          // Handle the result
          result.map((item, index) => {
            container.appendChild(createButton(item, index));
          });
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });

      break;
    case "holidays":
      title.textContent = "Annual Holiday List";
      break;
    case "attendance":
      title.textContent = "My Attendence Status";
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

function createButton(item, index) {
  const div = document.createElement("div"); // Create a div element
  const itemBtn = document.createElement("button"); // Create a button element
  const itemImg = document.createElement("img");
  const label = document.createElement("p");
  itemImg.src = item.image;
  itemImg.alt = "Description of the image";
  itemImg.width = 60;
  itemImg.height = 50;

  itemBtn.type = "button";
  itemBtn.classList.add("item-add-btn");

  // Add different classes based on even or odd index
  if ((index + 1) % 2 === 0) {
    div.classList.add("even-div");
  } else {
    div.classList.add("odd-div");
  }

  label.innerText += item.title;

  // div.appendChild(itemImg);
  div.appendChild(itemBtn); // Append the button to the div
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

  return div; // Return the div element containing the button
}
