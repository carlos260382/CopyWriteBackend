export const reverseText = (text) => {
  if (typeof text === "string") {
    const result = text.split("").reverse().join("");
    return result;
  } else {
    const request = "no es un texto";
    return request;
  }
};
