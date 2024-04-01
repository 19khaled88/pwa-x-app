import { hrmIcons,hrmIcon } from '../../helpers/db.js'


function createButton(item,index) {
    const div = document.createElement("div"); // Create a div element
    const itemBtn = document.createElement("button"); // Create a button element
    const itemImg = document.createElement("img");
    const label = document.createElement('p')
    itemImg.src = item.image;
    itemImg.alt = "Description of the image";
    itemImg.width = 150;
    itemImg.height =100;


    itemBtn.type = "button"

    itemBtn.classList.add("item-add-btn")
    
  
   

    // Add different classes based on even or odd index
    if ((index + 1 ) % 2 === 0) {
        div.classList.add("even-div");
    } else {
        div.classList.add("odd-div");
    }
    label.innerText += item.title;

    

    // div.appendChild(itemImg);
    div.appendChild(itemBtn); // Append the button to the div
    itemBtn.appendChild(itemImg)
    itemBtn.appendChild(label)
    
    return div; // Return the div element containing the button
    // return itemBtn
}

function showIcons() {
    const container = document.getElementById("hrmMain");// Get the image element by its id
    container.innerHTML = "";

    hrmIcon.map((item,index) => {
        console.log(item)
        container.appendChild(createButton(item,index))
    })
}
showIcons()

