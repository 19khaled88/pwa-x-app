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
            <button onClick="handleAttachment('${item.img_id}')" class="attachment-button">
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

function handleAttachment(attachmentUrl) {
 
    console.log("Attachment URL:", attachmentUrl);

    StartPdf()
   
}

function StartPdf(){
    let loadingTask = pdfjsLib.getDocument(attachmentUrl)
    pdfDoc = null,
    canvas = document.querySelector('#pdfCanvas'),
    ctx = canvas.getContext('2d'),
    scale = 1.5,
    numPage = 1,
    console.log('Hi')
}

const overlay = document.getElementById("overlay");
const pdfViewer = document.getElementById("pdfViewer");
const pdfCanvas = document.getElementById("pdfCanvas");
const closePdfViewerBtn = document.getElementById("closePdfViewer");



  // Function to show the overlay and PDF viewer
function showPdfViewer() {
    overlay.style.display = "block";
    pdfViewer.style.display = "block";
  }
  
// Function to hide the overlay and PDF viewer
function hidePdfViewer() {
overlay.style.display = "none";
pdfViewer.style.display = "none";
}

// Add event listener to close button to hide the PDF viewer
closePdfViewerBtn.addEventListener("click", hidePdfViewer);
