export function removeFirstWord(inputString: string) {
  // Split the string into an array of words
  const words = inputString.split("\n");

  // Remove the first word (the element at index 0)
  words.shift();

  // Join the remaining words back into a string
  const resultString = words.join("\n");

  return resultString;
}
