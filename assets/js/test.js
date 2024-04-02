

async function fetchData(){
    try {
        const response = await fetch('../helpers/dbs.json');
        if(!response.ok){
            throw new Error('Network response was not ok')
        }
        const data = await response.text();
        const parsedData = JSON.parse(data);
        console.log(parsedData)
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
fetchData();



// fetch('../helpers/dbs.json')
//     .then(response=>response.text())
//     .then(data=>{
//         const res = JSON.parse(data)
//         console.log(res)
//     })
//     .catch(error=>{
//         console.log(error)
//     })

