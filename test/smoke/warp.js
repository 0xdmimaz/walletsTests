const assert = require('assert')
const driverModule = require("../../wallets/libs/buildDriver");

const {profilePath, appPath, filepath} = require('../../configs/paths');
const {warpTokens} = require('../../configs/urls');

const {netDenomId, tokenChainId, selectNets1, selectNets, confirmAddTokenId,
  btnAddFileId, tokenNameId, addNewTokenInputId, tokenMetadataId, chainIdTxt, tokenName,
  netDenomVal, tokenMeta, myTokenNameInListId, avatarBeingAdding} = require('../../wallets/keplr/pages/warp');
const {
  getElAttrValue, clickOnElement, ensureElPresentDOM, checkWindowHandle,
  navigateToUrl, switchToNewWindow, setPassword, switchToOriginalWindow,
  setValueToInput, findElement,uploadFile} = require('../../wallets/libs/webdriverRelated');

const {takeScreenshot} = require('../../wallets/libs/fsRelated');
let driver = new driverModule(profilePath, appPath);
let defaultWindow;

describe('Creating a token', () => {

  before(async () => {
    defaultWindow = await checkWindowHandle(driver.getDriver());
    await navigateToUrl(driver.getDriver(), warpTokens);
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await setPassword(driver.getDriver());
    await switchToOriginalWindow(driver.getDriver(), defaultWindow, []);
  });

  it('Add New Token input works', async () => {
    await clickOnElement(driver.getDriver(), addNewTokenInputId);
    let el = await ensureElPresentDOM(driver.getDriver(), selectNets)
    await assert.equal(el, true);
  });

  it('Network can be set', async () => {
    await clickOnElement(driver.getDriver(), selectNets);
    await clickOnElement(driver.getDriver(), selectNets1);
    let el = await clickOnElement(driver.getDriver(), selectNets1);
    let expected = await findElement(driver.getDriver(), selectNets1);
    await assert.equal(el, expected);
  });

  it('Token Name. Value set', async () => {
    await setValueToInput(driver.getDriver(), tokenNameId, tokenName);
    let el = await getElAttrValue(driver.getDriver(), tokenNameId);
    await assert.equal(el, tokenName);
  });

  it('Token Chain id. Value set', async () => {
    await setValueToInput(driver.getDriver(), tokenChainId, chainIdTxt);
    let el = await getElAttrValue(driver.getDriver(), tokenChainId);
    await assert.equal(el, chainIdTxt);
  });

  it('Network Denomination. Value set', async () => {
    await setValueToInput(driver.getDriver(), netDenomId, netDenomVal);
    let el = await getElAttrValue(driver.getDriver(), netDenomId);
    await assert.equal(el, netDenomVal);
  })

  it('Token Metadata. Value set', async () => {
    await setValueToInput(driver.getDriver(), tokenMetadataId, tokenMeta);
    let el = await getElAttrValue(driver.getDriver(), tokenMetadataId);
    await assert.equal(el, tokenMeta);
  });

  it('Should upload a logo', async () => {
    await uploadFile(driver.getDriver(), btnAddFileId, filepath);
    let el = ensureElPresentDOM(driver.getDriver(), avatarBeingAdding);
    assert.equal(avatarBeingAdding, true)

  });

  it('Should finish a token adding', async () => {
    await clickOnElement(driver.getDriver(), confirmAddTokenId)
    let el = await findElement(driver.getDriver(), myTokenNameInListId);
    assert.equal(el, true)
  })


  after(async () => {
    //await closeWindow(driver.getDriver());
  });
});

describe('Editing a token', () => {

})
