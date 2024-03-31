import { homepageImage } from "../helpers/db.js";
function mapHomepageIcon() {

  const container = document.getElementById("main");// Get the image element by its id

  container.innerHTML = "";

  homepageImage.images.map((file) => {
    
    const imageElement = document.createElement("img");// Create an img element for each file
    
    imageElement.src = file;// Set the src attribute to the URL of the image file

    
    imageElement.alt = "Description of the image";// Set the alt attribute

    
    imageElement.width = 200;// Set the width and height attributes
    imageElement.height = 100;// Set the width and height attributes

    // link.href = file;
    // link.textContent = file;
    // link.target = '_blank'; // Open in a new tab

    // Append the img elements to the container
    container.appendChild(imageElement);
    
  });
}

mapHomepageIcon();

