/** @param {NS} ns */
/** @param {import(".").NS} ns */

export default function encryptionOneCaesarCipher(ns, input) {
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  ns.tprint(input);
  let text = input[0];
  let key = input[1];
  ns.tprint(`Cipher: ${text} with key: ${key}`);

  let cipheredText = "";
  text.split("").forEach((letter) => {
    let isLetter = (element) => element === letter;
    let index = letters.findIndex(isLetter);
    if (index >= 0) {
      cipheredText += letters[newIndex(index, key)];
    } else {
      cipheredText += letter;
    }
  });
  return cipheredText;
}

function newIndex(index, key) {
  let i = index - key;
  if (i > 25) {
    i -= 26;
  }
  if (i < 0) {
    i += 26;
  }
  return i;
}
