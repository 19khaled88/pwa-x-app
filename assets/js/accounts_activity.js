// Parse the query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the value of the parameter you want to use in the title
const pageTitle = urlParams.get("data_title");

const accountsActivityTop = document.getElementById("accountsActivityTop");
const btn = accountsActivityTop.querySelector("button");
const title = btn.querySelector("p");

if(pageTitle){
    title.textContent = pageTitle;
    switch(pageTitle){
        case "Bill entry":
            title.textContent = "Bill Entry";
            fetchHrData('Bill_entry')
                .then(response=>{
                    const container = document.getElementById("accountsActivityMain"); // Get the image element by its id
                    container.innerHTML = "";


                    const div = document.createElement("div"); // Create a div element
                    div.setAttribute("class", "bill_entry_container");
                    const buttonContainer = container.appendChild(div);


                    for(let buttons in response){
                        buttonContainer.appendChild(creatNavigationButton(buttons, response))
                    }
                })
                .catch(error=>{
                    console.log(error)
                })

    }

}

function creatNavigationButton(buttons, response){
    console.log(response,buttons)
}