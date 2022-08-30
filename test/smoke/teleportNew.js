const assert = require('assert')
const driverModule = require("../../wallets/libs/buildDriver");

const {profilePath, appPath} = require('../../configs/paths');
const {robot, teleport} = require('../../configs/urls');

const {txUrlId, fuckBtnId, continueBtnId } = require('../../wallets/keplr/pages/robot');

const {applyBtnId} = require('../../wallets/keplr/pages/keplr');
const { clickOnElement, ensureOneWindowsOpen, ensureElPresentDOM, closeWindow, checkWindowHandle,
  navigateToUrl, switchToNewWindow, switchToOriginalWindow2, setPassword, setTokenAmount,
  switchToOriginalWindow, chooseBuyToken, chooseSellToken, clearTokenAmount, chooseBtnClick, locateSellNets,
  locateSellTokens, locateBuyNets, locateBuyTokens
} = require('../../wallets/libs/webdriverRelated');

const {takeScreenshot} = require('../../wallets/libs/fsRelated');

describe('add()', async () => {

  let driver = new driverModule(profilePath, appPath);
  let defaultWindow;

  let networks = {};
  let tokens = {};
  let tokens1 = {};

  let tokensArr0;
  let tokensArr1;
  let netArr;
  await console.log('Let the abuse begin...')

  before( async() => {
    await console.log('Let the abuse begin...');

  });

  // defaultWindow = await checkWindowHandle(driver.getDriver());
  // await console.log('ORIGINAL WINDOW HANDLE \n', defaultWindow);
  // await navigateToUrl(driver.getDriver(), robot);
  // let windows = await switchToNewWindow(driver.getDriver(), defaultWindow);
  // await console.log("WINDOWS HANDLES\n", windows);
  // await setPassword(driver.getDriver());
  // await switchToOriginalWindow(driver.getDriver(), defaultWindow, []);
  // await navigateToUrl(driver.getDriver(), teleport);
  // await console.log("WINDOWS HANDLES\n", windows);
  //
  // networks = await locateSellNets(driver.getDriver());
  // tokens = await locateSellTokens(driver.getDriver());
  // tokens1 = await locateSellTokens(driver.getDriver());
  //
  // await console.log('NETWORKS \n', networks);
  // await console.log('TOKENS \n', tokens);
  // await console.log('TOKENS \n', tokens1);
  // await console.log('/////////////////////');
  //
  // netArr = Array.from(networks.name);
  // tokensArr0 = Array.from(tokens.name);
  // tokensArr1 = Array.from(tokens1.name);
  //
  // await console.log(tokensArr0);
  // await console.log(tokensArr1);
  // await console.log('/////////////////////');

  tokensArr0.forEach((tokensArr0) => {
    console.log(tokensArr0);
    tokensArr1.forEach((tokensArr1) => {
      console.log(tokensArr1);
      it('Swap token from: ${token.name}, to: ${token2.name}', () => {
        // await chooseSellToken(driver.getDriver(), tokensArr0);
        // await chooseBuyToken(driver.getDriver(), tokensArr1);
        // await clearTokenAmount(driver.getDriver());
        // await setTokenAmount(driver.getDriver(), '100');
        // await chooseBtnClick(driver.getDriver());
        // await switchToNewWindow(driver.getDriver(), defaultWindow);
        // await takeScreenshot(driver.getDriver());
        // await clickOnElement(driver.getDriver(), applyBtnId);
        // await switchToOriginalWindow2(driver.getDriver(), defaultWindow);
        // let el = await ensureElPresentDOM(driver.getDriver(), txUrlId);
        // await assert.equal(el, true);
        // await clickOnElement(driver.getDriver(), fuckBtnId);
      });
    });
  });
});