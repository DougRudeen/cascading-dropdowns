/**
 * This function creates a new sheet called "Menus_1" that contains the
 * dropdown categories. Caution: running this will overwrite the 
 * current version of Menus_1, this should be considered a temporary function
 */

function createNew() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dProps = PropertiesService.getDocumentProperties();
  
  //TODO: make this array dynamic so that the user can enter as many
  //categories as they need
  var headArr = [
    ["Cat_1","Cat_2","Cat_3","Cat_4","Cat_5"]
    ];

  ss.insertSheet().setName("Menus_1");

  var menSht = ss.getSheetByName("Menus_1");
  var menRng = menSht.getRange("Menus_1!$A$1:$E$1");
  menRng.setValues(headArr);
  
}

/**
 * This function takes range arguments from the 'createMenu' form as input and returns
 * a nested object using the nestObj() function.
 * 
 * @obj - an object containing two strings as values.  First string is the range where
 * the dropdown menu options are stored in hierarchical order, the second string is where the 
 *   
 */
function createDDs(obj){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dProps = PropertiesService.getDocumentProperties();

  areDDs();
  var ddObj = JSON.parse(dProps.getProperties()['dropdowns']);
  var count = countProp(ddObj);

  //TODO: error handling.  If this throws an error, it means that the original objects were 
  //misnnamed in the html document.  This is probably not as essential since I don't see
  // a condition where this would actually happen.

  var optsRng  = obj.optsRange;
  var ddsRng = obj.ddsRange;

  //TODO:if there are already dropdowns in the target range set in user properties, overwrite
  // the existing menus with the new one being declared.  A structured error message might be 
  //good to use here at some point, but I think the user can figure out if they made
  //drowpdon menus that overlap each other because it should cause some obvious problems
  //for them right away.

  ss.getRange("Sheet1!F2").setValue(JSON.stringify(ddObj));
  ss.getRange("Sheet1!F3").setValue(count);

}

/**
 * This function checks if the 'dropdowns' object is present
 * in the document properties.  If not, it creates one.  Note that even though 'newObj' is 
 * declared as an object in this script, Google's document properties seems to only be capable of storing
 * stringified JSON objects - hence the reason for JSON.parse() being used in the createDDs() function.
 */

function areDDs(){
  var dProps = PropertiesService.getDocumentProperties();
  var bool = (dProps.getProperties()['dropdowns'] == null);
  var newObj = {"dropdowns":{}};

  //Logger.log(JSON.stringify(dProps));
  //Logger.log(dProps.getProperties()['dropdowns']);
  //Logger.log('boolean: ' + bool);

  //if there is not a dropdown object, create one


  if(bool === true){
    dProps.setProperties(newObj)
  }
  
  //Logger.log("updated boolean : "+ (dProps.getProperties()['dropdowns'] == null))
  //Logger.log("getProperties : " + JSON.stringify(dProps.getProperties()['dropdowns']));
  //Logger.log(dProps.getProperties.hasOwnProperty('dropdowns'));
  //Logger.log(JSON.stringify(dProps.getProperties()['dropdowns']))

}

/**
 * A function that deletes all document properties
 */

function deleteDocProps(){
  PropertiesService.getDocumentProperties().deleteAllProperties()
}

/**
 * Todo: create a function that will count the number of dropdown functions present in the document properties
 * The number given below is just a placeholder.
 */

function countProp(obj){
  var res = Object.keys(obj).length;
  return res

}

/**
 * Todo: create a function that compares the dimensions of two arrays
 */

function compareRange(range1,range2){

}

/**
 * This function takes an array argument and returns a JSON object containing sub objects (labeled tier_1, tier_2, etc.) that correspond
 * with the dropdown column tiers.
 * 
 * @array - a one-dimensional array containing categories that will be 
 * nested within the returned JSON object. This function contains a method for parsing individual columns of 2d arrays that was
 * pulled from: https://stackoverflow.com/questions/7848004/get-column-from-a-two-dimensional-array
 * 
 * @array - the subject array of values
 * @headers - a true/false value indicating whether the array includes a single header row that should not be included in the dd
 * objects
 * 
 */

function nestObj(array,header = true){
  var obj = {};
  var arr = array;

  //get the dimensions of the array as seperate variables
  var width = arr[0].length;
  var height = arr.length;

  //iterate over each column in the array in oreder to create "tiers" of dropdown menu objects
  //that correspond to the number of columns.
  for (var i = 0; i < width-1 ;i++){
    var nestObj = {};
    var key = "tier_" + (i+1).toString(); //note that the tiers are not 0-indexed
    var firstCol = arr.map(function(value,index) { return value[i]; });
    var firstUnqVal = firstCol.filter(onlyUnique);
    var firstUnqLen = firstUnqVal.length;

    //iterate over just the unique objects extracted from the current column
    for (var j = 0; j < firstUnqLen; j++){
      var jVal = firstUnqVal[j];

      //create empty array to  hold the  nested values
      nestArr = [];
      path = [];

      //create array that serves as the value for the deepest tier of the current nested object.
      for (var k = 0; k < height; k++){
        var nxtVal = arr[k][i+1];
        var curVal = arr[k][i];
        var rowArr = arr[k];

        if(jVal == curVal && !nestArr.includes(nxtVal) && (!nxtVal == null || !nxtVal.length == 0 || !nxtVal.length == undefined)){
          nestArr.push(nxtVal);
          var path = rowArr.slice(0,i+1);
        };
      };
      //create the path
      set(nestObj,path,nestArr);
    };
    obj[key] = nestObj;
  };
  return obj
}

/** 
 * This accepts an object, an array, and a "val" - a last value.  The second array argument gets converted into
 * a nested array, and the innermost object.  This is based on a function available at https://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by
 * 
 * @obj - object to have key value pairings added
 * @path - the path of the nested value as a one-dimensional array
 * @val - the value of the innermost key in the nested object
 */
const set = (obj, path, val) => { 
  const keys = path;
  const lastKey = keys.pop();
  const lastObj = keys.reduce((obj, key) => 
      obj[key] = obj[key] || {}, 
      obj); 
  lastObj[lastKey] = val;
}

function openCreateForm(){
  var modalForm = HtmlService.createHtmlOutputFromFile('createMenu');
  SpreadsheetApp.getUi().showModalDialog(modalForm,'Create New Set of Cascading Dropdown Menus');
}

