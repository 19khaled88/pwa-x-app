
async function fetchHrData(heading) {
    try {
      const response = await fetch("../helpers/dbs.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.text();
      const parsedData = await JSON.parse(data);
      return parsedData[heading];
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }