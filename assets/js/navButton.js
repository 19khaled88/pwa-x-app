function routeToPage(path, classInfo,dataTitle) {
  const url = `${path}?class_name=${encodeURIComponent(classInfo)}&data_title=${encodeURIComponent(dataTitle)}`;

  window.location.href = url;
}

function backBtn(path) {
  window.location.href = path;
}

//   document.addEventListener('DOMContentLoaded', function() {
//     const myButton = document.getElementById('hrmButton');
//     myButton.addEventListener('click', routeToPage);
//   });
