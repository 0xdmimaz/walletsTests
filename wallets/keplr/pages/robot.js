module.exports = {
  sellAmountId: "//div[contains(text(), 'sell')]//following::div//input[contains(@id, 'tokenAAmount')]",
  buyAmountId: "//*[@id = 'tokenBAmount']",
  sellAmount: 100,
  buyAmount: Math.round(94.354),
  swapBtnId: "//button[contains(text(), 'swap')]",
  checkTxMsg: "check the transaction\n...",
  checkTxTextId: "//div[contains(text(), 'check the transaction')]",
  pleaseWaitMsg: "Please wait while we confirm the transaction on the blockchain\n...",
  pleaseWaitId: "//div[contains(text(), 'Please wait while we confirm the transaction on the blockchain')]",
  txText: "Transaction",
  txTextId: "//div[contains(text(), 'Transaction')]",
  txUrlId: "//div[contains(text(), 'Transaction')]/following::a",
  wasIncludedTxt: "was included in the block",
  wasIncludedTxtId: "//div[contains(text(), 'was included in the block')]",
  fuckBTNText: "Fuck Google",
  fuckBtnId: "//button[contains(text(), 'Fuck Google')]"
}
