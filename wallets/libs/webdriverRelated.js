const { until, By, Key } = require("selenium-webdriver");
const assert = require("assert");
const {keplrPassword} = require('../../configs/creds')
//---
let checkWindowHandle = async (driver) => {
  assert((await driver.getAllWindowHandles()).length === 1);
  let originalWindow = await driver.getWindowHandle();
  return originalWindow;
};

let navigateToUrl =  async (driver, url) => {
  await driver.get(url);
  await driver.navigate().refresh();
};

let switchToNewWindow = async (driver, originalWindow) => {
  await driver.wait(
    async () => (await driver.getAllWindowHandles()).length === 2, 10000
  );

  let windows = await driver.getAllWindowHandles();
  for (const handle of windows) {
    if (handle !== originalWindow) {
      await driver.switchTo().window(handle);
    }
  }
  return windows;
};

let switchToOriginalWindow = async (driver, defaultWindow) => {
  await driver.switchTo().window(defaultWindow);
  await driver.navigate().refresh();
};


let openNewTab = async (driver) => {
  await driver.switchTo().newWindow('tab');
};

let locateSellNets = async (driver, purpose) => {
  await driver.sleep(2000);
  await driver.executeScript(`let getElementByXpath=function(path) {return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;};
  getElementByXpath('//div[contains(text(), "sell")]').parentElement.querySelector("div[class*='dropDown'] div[class*='dropDownContainerHeader']").click()`);

  await driver.sleep(600);
  try {
    let nets = await driver.executeScript(`return window.sellTokens=(function(){let ar={};document.querySelectorAll('[class*="dropDownList"] div[class*="listItem"]').forEach(function(el){console.log(el);let z=el.querySelectorAll("div");let f=(z.length>4 ? z[4] : z[3]);ar[f.innerText]={'name': f.innerText, 'el': f}}); return ar})()`);
    await console.log('sellNets',nets);
    await driver.navigate().refresh();
    return nets;
  } catch (e) {
    console.log('err',e);
  }
}

let locateSellTokens = async (driver, purpose) => {
  await driver.sleep(3000);
  await driver.executeScript(`let getElementByXpath=function(path) {return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;};
  getElementByXpath('//div[contains(text(), "sell")]').parentElement.querySelectorAll("div[class*='dropDown']")[4].querySelector("div[class*='dropDownContainerHeader']").click()`);

  await driver.sleep(600);
  let tokens = await driver.executeScript(`return window.sellTokens=(function(){let ar={};document.querySelectorAll('[class*="dropDownList"] div[class*="listItem"]').forEach(function(el){console.log(el);let z=el.querySelectorAll("div");let f=(z.length>4 ? z[4] : z[3]);ar[f.innerText]={'name': f.innerText, 'el': f}}); return ar})()`);
  await console.log(tokens);
  return tokens;
};

let chooseSellToken = async (driver, token) => {
  await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), ${purpose})]//following::span[contains(text(), ${tokens)]")))
};

let locateBuyNets = async (driver, purpose) => {
  await driver.sleep(2000);
  await driver.executeScript(`let getElementByXpath=function(path) {return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;};
  getElementByXpath('//div[contains(text(), "buy")]').parentElement.querySelector("div[class*='dropDown'] div[class*='dropDownContainerHeader']").click()`);

  await driver.sleep(600);
  try {
    let nets = await driver.executeScript(`return window.sellTokens=(function(){let ar={};document.querySelectorAll('[class*="dropDownList"] div[class*="listItem"]').forEach(function(el){console.log(el);let z=el.querySelectorAll("div");let f=(z.length>4 ? z[4] : z[3]);ar[f.innerText]={'name': f.innerText, 'el': f}}); return ar})()`);
    await console.log('sellNets',nets);
    await driver.navigate().refresh();
    return nets;
  } catch (e) {
    console.log('err',e);
  }
}

let locateBuyTokens = async (driver) => {
  await driver.sleep(3000);
  await driver.executeScript(`let getElementByXpath=function(path) {return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;};
  getElementByXpath('//div[contains(text(), "buy")]').parentElement.querySelectorAll("div[class*='dropDown']")[4].querySelector("div[class*='dropDownContainerHeader']").click()`);

  await driver.sleep(600);
  let tokens = await driver.executeScript(`return window.sellTokens=(function(){let ar={};document.querySelectorAll('[class*="dropDownList"] div[class*="listItem"]').forEach(function(el){console.log(el);let z=el.querySelectorAll("div");let f=(z.length>4 ? z[4] : z[3]);ar[f.innerText]={'name': f.innerText, 'el': f}}); return ar})()`);
  return tokens;
};

let chooseBuyToken = async (driver, x) => {
  //console.log("ТРУЛЯЛЯ");
  let tokens = await locateBuyTokens(driver);
  let el = await tokens[Object.keys(tokens)[x]];
  let path = "//div[contains(text(), 'buy')]//following::span[contains(text(), " + "'" + el.name + "'" + ")]";
  //await console.log(path);
  //await console.log('TOKENS \n', tokens);
  let token = await driver.wait(until.elementLocated(By.xpath(path)), 10000);
  return token;
};

let setTokenAmount = async (driver) => {
  await driver.wait(until.elementLocated(
    By.xpath("//div[contains(text(), 'sell')]//following::div//input[contains(@id, 'tokenAAmount')]")
  ), 10000).sendKeys('100');
};

let switchToOriginalWindow2 = async (driver, defaultWindow) => {
  await driver.sleep(3000);
  await driver.switchTo().window(defaultWindow);
};

let submitSwap = async (driver) => {
  const { approveWallet2 } = require('./fsRelated')
  await driver.wait(until.elementLocated(By.xpath('//button[contains(text(), "swap")]')), 10000).click();
  await approveWallet2(driver);
  await console.log('---WALLET APPLIED---');
};

let getTxUrl = async (driver) => {
  let el = await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Transaction')]/following::a")), 10000);
  console.log(await el.getAttribute("href"));
};
//---
let setPassword = async (driver) => {
  let passwordId = "password";
  const passwdBtn = await driver.wait(
    until.elementLocated(By.name(passwordId)), 10000
  );
  await passwdBtn.sendKeys(keplrPassword, Key.ENTER);
  await driver.close();
};

let approveWallet = async (driver) => {

  const {SwitchToNewWindow} = require('./browser');
  for (let i = 0; i < 2; i++){
    await SwitchToNewWindow(driver);
    await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Approve')]")), 10000).click();
    await driver.sleep(3000);
  }
};

let connectWalletToApp = async (driver) => {
  await driver.sleep(3000);
  await driver.wait(until.elementLocated(By.xpath('//span//button//img[contains(@src, "keplr-icon")]')), 10000).click();
  await driver.wait(until.elementLocated(By.xpath('//button[contains(text(), "connect")]')), 10000).click();
};

let setPassword2 = async (driver) => {
  let passwordId = "password";
  const passwdBtn = await driver.wait(
    until.elementLocated(By.name(passwordId)), 10000
  );
  await driver.sleep(3000);
  await passwdBtn.sendKeys(keplrPassword, Key.ENTER);
};

let switchNetwork = async (driver) => {
  let netSwitcherBtnId = "title-MzwbR6axjSUpIx2dKWquf";
  await driver.sleep(2000);
  await driver.wait(until.elementLocated(By.className(netSwitcherBtnId)), 10000).click();
  await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'space-pussy-1')]")), 10000).click();
  await driver.close();
};

let getElAttrValue = async (driver, elId) => {
  let elem = await driver.wait(until.elementLocated(By.xpath(elId)), 10000)
  await driver.sleep(2000);
  let elem2 = await elem.getAttribute('value');
  return elem2;
};

let clickOnElement = async (driver, elId) => {
  await driver.wait(until.elementLocated(By.xpath(elId)), 10000).click();
};

let findElement = async (driver, elId) => {
  await driver.wait(until.elementLocated(By.xpath(elId)), 10000);
};

let getElText = async (driver, elId) => {
  let el = await driver.wait(until.elementLocated(By.xpath(elId)), 10000).getText();
  return el;
};

let ensureOneWindowsOpen = async (driver) => {
  let elem = await driver.wait(
    async () => (await driver.getAllWindowHandles()).length === 1, 10000);
  if(elem){
    return true;
  }else{
    return false;
  }
};

let ensureTwoWindowsOpen = async (driver) => {
  let elem = await driver.wait(
    async () => (await driver.getAllWindowHandles()).length === 2, 10000);
  if(elem){
    return true;
  }else{
    return false;
  }
};

let ensureElPresentDOM = async (driver, elId) => {
  let elem = await driver.wait(until.elementLocated(By.xpath(elId)), 10000);
  if(elem){
    return true;
  }else{
    return false;
  }
};

let closeWindow = async (driver) => {
  await driver.quit();
};

module.exports = {
  getElAttrValue: getElAttrValue,
  clickOnElement: clickOnElement,
  findElement: findElement,
  getElText: getElText,
  ensureOneWindowsOpen: ensureOneWindowsOpen,
  ensureTwoWindowsOpen: ensureTwoWindowsOpen,
  ensureElPresentDOM: ensureElPresentDOM,
  closeWindow: closeWindow,
  setPassword: setPassword,
  approveWallet: approveWallet,
  connectWalletToApp: connectWalletToApp,
  setPassword2: setPassword2,
  switchNetwork: switchNetwork,
  checkWindowHandle: checkWindowHandle,
  navigateToUrl: navigateToUrl,
  switchToNewWindow: switchToNewWindow,
  switchToOriginalWindow: switchToOriginalWindow,
  openNewTab: openNewTab,
  locateSellNets: locateSellNets,
  locateSellTokens: locateSellTokens,
  setTokenAmount: setTokenAmount,
  switchToOriginalWindow2: switchToOriginalWindow2,
  submitSwap: submitSwap,
  getTxUrl: getTxUrl,
  chooseSellToken: chooseSellToken,
  locateBuyNets: locateBuyNets,
  locateBuyTokens: locateBuyTokens,
  chooseBuyToken: chooseBuyToken
}