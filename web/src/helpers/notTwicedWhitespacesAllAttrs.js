const navigateByAllAttributes = (objValue, callback) => {
  for (var prop in objValue) {
    if (typeof objValue[prop] === "object") {
      console.log("It's an object!");
      navigateByAllAttributes(objValue[prop], callback);
    }
    if (typeof objValue[prop] === "string") {
      objValue[prop] = callback(objValue[prop]);
    }
  }
};

const removeInnerTwicedWhitespaces = (value) => value.replace(/\s{2,}/g, " ");
const trimmedValue = (value) => value.trim();

const notTwicedWhitespacesAllAttrs = (obj) => {
  navigateByAllAttributes(obj, removeInnerTwicedWhitespaces);
  navigateByAllAttributes(obj, trimmedValue);
  return obj;
};

export default notTwicedWhitespacesAllAttrs;
