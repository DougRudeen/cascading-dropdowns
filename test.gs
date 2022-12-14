function testFunction() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var range = ss.getRange("Menus_1!$A$2:$D$53").getValues();

  //Testing the nestObj function 

  //var testResult = nestObj(range);
  //Logger.log(testResult)

  //areDDs()
  //deleteDocProps()

  var name = "dropdown_2";
  var nameArr = name.split("_");
  Logger.log(parseInt(nameArr[1]));

}
