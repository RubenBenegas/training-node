const apiHelper = require("./apiHelper.js");

function executeGlobalStats() {
    const promiseGlobalStats = new Promise(function (resolve, reject) {
      globalStats(function (err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  
    async function globalStats(callback) {
      const result = await apiHelper.getGlobalStats();
      if (result.error) {
        callback(result.message, null);
      }
      callback(null, result.data);
    }
    promiseGlobalStats
      .then((result) => {
        console.table(result);
      })
      .catch((error) => console.log(error));
  }
  
  function executeStatsByCountry(countryParam){
  
    const promiseStatsByCountry = new Promise(function(resolve, reject){
      statsByCountry(function(err, data) {
          if(err){
              reject(err)
          }
          if(data.message != "OK"){
            
            const messages = data.message.split(".");
            reject(`${messages[0]}. ${messages[2]}.`)
          }
          resolve(data.data)
      })
  })
  
  async function statsByCountry(callback) {
      const result = await apiHelper.getStatsByCountry(countryParam);
      if(result.error){
          callback(result.message, null);
      }
      callback(null, result);
  }
  
      promiseStatsByCountry
        .then((result) => {
          console.table(result.covid19Stats);
        })
        .catch((error) => console.log(error));
  }

  module.exports = {executeGlobalStats, executeStatsByCountry}