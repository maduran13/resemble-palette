const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');
const cypress = require("cypress");
const cypress = require("./cypress/integration/palette.spec.js");


const { viewportHeight, viewportWidth, options, url } = config;

async function executeTest(){
  let resultInfo = {}

  let datetime = new Date().toISOString().replace(/:/g,".");

  await cypress.run({
      spec: './cypress/integration/palette.spec.js',
      config: {
          video: false
      },
      env: {
          datetime: `${datetime}`
      }
  }).then((results) => {
      console.log(results)
      
  })
  
  fs.renameSync(`./cypress/screenshots/palette.spec.js/${datetime}/`,`./reports/${datetime}/`);
  
  const data = await compareImages(
      fs.readFileSync(`./reports/${datetime}/take1.png`),
      fs.readFileSync(`./reports/${datetime}/take2.png`),
      options
  );
  resultInfo = {
      isSameDimensions: data.isSameDimensions,
      dimensionDifference: data.dimensionDifference,
      rawMisMatchPercentage: data.rawMisMatchPercentage,
      misMatchPercentage: data.misMatchPercentage,
      diffBounds: data.diffBounds,
      analysisTime: data.analysisTime
  }

  console.log('------------------------------------------------------------------------------------')
  console.log("Execution finished. Check the report under the results folder")

  //createReport(datetime,resultInfo);

  return resultInfo;  
}
(async ()=>console.log(await executeTest()))();


/*function createReport(datetime, resInfo){
    var tableElement = "<tr>";
    tableElement += "<th scope='row'>" + datetime + "</th>";
    tableElement += "<td colspan='2'><img src='./reports/${datetime}/take1.png' class='rounded mx-auto d-block' alt='First Image'></td>";
    tableElement += "<td colspan='2'><img src='./reports/${datetime}/take2.png' class='rounded mx-auto d-block' alt='Second Image'></td>";
    tableElement += "<td colspan='2'><img src='./reports/${datetime}/compare.png' class='rounded mx-auto d-block' alt='Differences'></td>";
    tableElement += "<td colspan='2'> Porcentaje de discordancia: " +  resInfo.misMatchPercentage + "</br> Tiene la misma longitud: "+ 
                        resInfo.isSameDimensions + "</br> Tiempo de Analisis en segundo: "+ 
                        resInfo.analysisTime + "</br> Diferencias : "+ 
                        resInfo.diffBounds +"</td>";
    tableElement += "</tr>";
    
    document.getElementById("contenido").innerHTML = tableElement;
}*/