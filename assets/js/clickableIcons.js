import {hrmIcons} from '../../helpers/db.js'


function createButton(item) {
    const itemBtn = document.createElement("button")
    itemBtn.type = "button"
    itemBtn.classList.add("item-add-btn")
    itemBtn.innerText += item
    return itemBtn
  }

function showIcons(){
    const container = document.getElementById("hrmMain");// Get the image element by its id
    container.innerHTML = "";

    hrmIcons.icons.map((item)=>{
        console.log(item)
        container.appendChild(createButton(item))
    })
}
showIcons()

