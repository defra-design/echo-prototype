module.exports = {

makeCurrancyValue: function (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
},
 
getKeyByValue : function (object, value) {
  return Object.keys(object).find(key => object[key] === value);
},

hasNumber : function (myString) {
  return /\d/.test(myString);
},
removeFromList : function (array, value) {
  for (var i = 0; i < array.length; i++) {

    if (array[i].ID == value) {
      array.splice(i, i + 1);
      return true;
    }
  }
  return false;
},
}
