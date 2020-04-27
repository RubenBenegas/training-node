const utils = require("./src/utils.js");
const io = require("console-read-write");

Main();

async function Main() {
  console.log(`
    ===============================================================
    ||                                                           ||
    || Select the type of statistics you want to consult:        ||
    ||    1. Global Statistics                                   ||
    ||    2. Statistics by country                               ||
    ||                                                           ||
    ===============================================================`);

  const answer = await io.read();

  switch(answer){
    case "1":
      utils.executeGlobalStats();
      break;
    case "2":
    console.log(`
    ===============================================================
    ||                                                           ||
    || Enter the name of the country to consult:                 ||
    ||                                                           ||
    ===============================================================`);
      countryParam = await io.read();
      utils.executeStatsByCountry(countryParam);
      break;
    default:
    console.log(`
    ===============================================================
    ||                                                           ||
    || It is not a valid option.                                 ||
    ||                                                           ||
    ===============================================================`);
      break;

  }
  
}
