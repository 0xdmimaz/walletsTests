//let tokenName = () => {}.tokenName;

module.exports = {
  addNewTokenInputId: "//input[contains(@value, 'Add new token')]",
  selectNets: "//select",
  selectNets0: "//select/option[contains(@value, 'space-pussy-1')]",
  selectNets1: "//select/option[contains(@value, 'osmosis-1')]",
  selectNets2: "//select/option[contains(@value, 'cosmoshub-4')]",
  selectNets3: "//select/option[contains(@value, 'wd')]",
  chainIdTxt: "17",
  tokenNameId: "//span[contains(text(), 'Token name')]//following::input",
  tokenChainId: "//span[contains(text(), 'Chain id')]//following::input",
  tokenMetadataId: "//span[contains(text(), 'Metadata')]//following::input",
  netDenomId: "//span[contains(text(), 'Denomination')]//following::input",
  btnAddFileId: "//span[contains(text(), 'Chain id')]//following::input[contains(@type, 'file')]",
  cancelInputId: "//input[contains(@value, 'Cancel')]",
  confirmAddTokenId: "//span[contains(text(), 'Confirm add token')]",
  tokenName: 'New Token 01',
  tokenMeta: 'base=xxx',
  netDenomVal: '16',
  myTokenNameInListId: `//td[2][contains(text(), 'New Token 01')]`,
  avatarBeingAdding: "//span[contains(text(), 'Logo')]//following::input//following::img",
  tokenEditBtnId: "//td[2][contains(text(), 'New Token 01')]//following::tr[3]//button[contains(text(), 'Edit')]",
}



console.log(module.exports['myTokenNameInListId'])