const axios = require("axios");

const urlBase = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/";

axios.defaults.headers = {
  "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
  "x-rapidapi-key": "c8556a98demsh5011ee6bd6cd21fp162977jsnd25e5195221a",
};

const getGlobalStats = async () => {
  try {
    const url = urlBase + "total/";
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log("Hubo un error");
  }
};

const getStatsByCountry = async (country) => {
  try {
    const url = urlBase + "stats/?country=" + country;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log("Hubo un error");
  }
};

module.exports = {getGlobalStats, getStatsByCountry}