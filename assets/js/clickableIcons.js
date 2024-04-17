

async function fetchData() {
  try {
    const response = await fetch("../helpers/dbs.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    const parsedData = JSON.parse(data);

   
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
   
    const receivedClassName = urlParams.get("class_name");
    const receivedDataTitle = urlParams.get("data_title");
    
    const container = document.getElementById(receivedClassName); // Get the image element by its id
    container.innerHTML = "";

    parsedData[receivedDataTitle].map((item, index) => {
      container.appendChild(createButton(item, index,parsedData));
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

fetchData();

function createButton(item, index,parsedData) {
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
  itemBtn.appendChild(itemImg);
  itemBtn.appendChild(label);


  //  // Add onclick function to the button
  //  itemBtn.onclick = function() {
  //   // Add your onclick functionality here
  //   console.log(item.title);
  // };


  itemBtn.addEventListener("click", function() {
    // navigateToPage(item.title);

    for(let items in parsedData){
      const isExist = (items === 'hrmIcon' || items === 'accounts') && parsedData[items].some((element)=>element.title === item.title)
      if(isExist == true && items === 'hrmIcon'){
        routeToPage('../pages/HumanResourceActivity.html','',item.title)
      } else if(isExist == true && items === 'accounts'){
        routeToPage('../pages/AccountActivity.html','',item.title)
      }
      
    } 
    // routeToPage('../pages/HumanResourceActivity.html','',item.title)
  });
  return div; // Return the div element containing the button
}


// function navigateToPage(text){
//   console.log(text)

//   // const url = `${path}?class_name=${encodeURIComponent(classInfo)}&data_title=${encodeURIComponent(dataTitle)}`;
// }


