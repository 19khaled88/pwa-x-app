// Parse the query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the value of the parameter you want to use in the title
const pageTitle = urlParams.get("data_title");


if (pageTitle === "Notice Board") {
  // URL to fetch data from
  const url =
    "https://www.condomshopbd.com/xapi/emp.ashx?cmd=note&list=allnew&imei=70:3a:51:90:39:05";

   
  // Fetch data from the URL
  fetch(url)
    .then((response) => {
      // Check if the request was successful (status code 200)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse the JSON response
      return response.json();
    })
    .then((data) => {
      // Work with the fetched data
      
      showNotice(data);
    })
    .catch((error) => {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    });
}

function showNotice(data) {

  const noticeMain = document.getElementById("noticeMain");
  
  data.forEach((item, index) => {
    const individualNotices = document.createElement("div");
    individualNotices.classList.add("individual-notice"); // Add a class instead of an ID

    // Decode URL-encoded text
    const decodedText = decodeURIComponent(item.body);
    const humanReadableText = decodedText
      .replace(/\+/g, " ") // Replace '+' with space
      .replace(/%26/g, "&") // Replace '%26' with '&'
      .replace(/\n/g, "<br>")
      .replace(/%2c/g, ",") // Replace '%2c' with ','
      .replace(/%3a/g, ":") // Replace '%3a' with ':'
      .replace(/%e2%80%99/g, "'"); // Replace '%e2%80%99' with apostrophe symbol
    
    
    
    if(item.img_id !== ""){
        individualNotices.innerHTML = `
        <span class="title-attachment" id="title-attachment"> 
            <p>${item.title}</p>
            <button onClick="showPDF('${item.img_id}')" class="attachment-button">
                <img src="../assets/images/paper-clip.png" alt=""/>
            </button>
        </span>
        <p>${item.post_date}</p>
        <span class="info">${humanReadableText}</span>
        `;
    }else{
        individualNotices.innerHTML = `
        <p class="title" id="title">${item.title}</p>
        <p>${item.post_date}</p>
        <span class="info">${humanReadableText}</span>
        `;
    }


    noticeMain.appendChild(individualNotices);
  });
}

function showPDF(pdfUrl) {
  var pdfContainer = document.getElementById("pdfContainer");
  var pdfOverlay = document.getElementById("pdfOverlay");
  var noticeTop = document.getElementById("noticeTop")
  // Clear any existing content in the container
  
  var extension = getFileExtension(pdfUrl);
  
  pdfContainer.innerHTML = "";
  noticeTop.style.display = 'none'

  // Check if the file is a PDF
  if (extension.toLowerCase() === 'pdf') {
    // Create an <iframe> element
    var iframeElement = document.createElement("iframe");
    iframeElement.setAttribute("src", pdfUrl);
    iframeElement.setAttribute("width", "100%");
    iframeElement.setAttribute("height", "100%");

    // Append the <iframe> element to the container
    pdfContainer.appendChild(iframeElement);
} else if (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg' || extension.toLowerCase() === 'png') {
    // Create an <img> element
    var imgElement = document.createElement("img");
    imgElement.setAttribute("src", pdfUrl);
    imgElement.setAttribute("alt", "Image");

    // Append the <img> element to the container
    pdfContainer.appendChild(imgElement);
}

  //show the overlay
  pdfOverlay.style.display = "flex"; // Show overlay
}

function closePDFOverlay() {
  var pdfOverlay = document.getElementById("pdfOverlay");
  var noticeTop = document.getElementById("noticeTop")
  // Hide the overlay
  pdfOverlay.style.display = "none"; // Hide overlay
  noticeTop.style.display = 'block'
}

function getFileExtension(filePath) {
  return filePath.substring(filePath.lastIndexOf('.') + 1);
}


