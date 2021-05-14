const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');
const cy = require("cypress");

const { viewportHeight, viewportWidth, options, url } = config;

async function executeTest(){
    let resultInfo = {}
    let datetime = new Date().toISOString().replace(/:/g,".");

    cy.visit(url);
    cy.wait(100);
    cy.screenshot(`./screenshots/${datetime}/take1`);
    cy.get('button[id="generate"]').click();
    cy.screenshot(`./screenshots/${datetime}/take2`);

    if (!fs.existsSync(`../API/cypress/screenshots/palette.spec.js/screenshots`)){
        fs.mkdirSync(`./results/${datetime}`, { recursive: true });
    }
    //Launch the current browser context
    //const browser = await playwright[b].launch({headless: true, viewport: {width:viewportWidth, height:viewportHeight}});
    //const context = await browser.newContext();
    //const page = await context.newPage(); 
    //await page.goto(config.url);
    //await page.screenshot({ path: `./results/${datetime}/before-${b}.png` });
    //await page.click('#generate');
    //await page.screenshot({ path: `./results/${datetime}/after-${b}.png` });
    //await browser.close();
    
    const data = await compareImages(
        fs.readFileSync(`../API/cypress/screenshots/palette.spec.js/screenshots/take1.png`),
        fs.readFileSync(`../API/cypress/screenshots/palette.spec.js/screenshots/take2.png`),
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
    fs.writeFileSync(`../API/cypress/screenshots/palette.spec.js/screenshots/compare.png`, data.getBuffer());

    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the results folder")
    return resultInfo;  
  }
(async ()=>console.log(await executeTest()))();