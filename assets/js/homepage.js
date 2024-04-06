// import { homepageImage } from "../../helpers/db.js";

async function fetchData() {
  try {
    const response = await fetch("./helpers/dbs.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    const parsedData = JSON.parse(data);
    const container = document.getElementById("main"); // Get the image element by its id

    container.innerHTML = "";
    parsedData.Image.map((file,index) => {
      const div = document.createElement("div"); // Create a div element
      const itemBtn = document.createElement("button");
      const imageElement = document.createElement("img"); // Create an img element for each file
      imageElement.src = file; // Set the src attribute to the URL of the image file
      imageElement.alt = "No image"; // Set the alt attribute
      imageElement.width = 120; // Set the width and height attributes
      imageElement.height = 60; // Set the width and height attributes
      itemBtn.type = "button";
      itemBtn.classList.add("item-add-btn");

      if ((index + 1) % 2 === 0) {
        div.classList.add("even-div");
      } else {
        div.classList.add("odd-div");
      }

      
      div.appendChild(itemBtn);
      itemBtn.appendChild(imageElement);
      container.appendChild(div);
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

fetchData();
