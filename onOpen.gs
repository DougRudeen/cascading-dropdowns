/**
 * The onOpen() function is a reserved name in Google Apps script and runs whenever the Spreadsheet is opened or
 * initialized. In this script, the onOpen() function creates the dropdown menus in the user interface, and
 * automatically runs the isDropDown() function.
 */

function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dProps = PropertiesService.getDocumentProperties();
  var ddTF = true; //TODO: finish writing the areDDs function that determines whether a document property called 'dropdowns' exists or not.

  var menuOpts = [{
    name: '❇️ Create Dropdowns',
    functionName: 'openCreateForm'
  },{
    name: '🔄 Refresh Dropdowns',
    functionName: 'refreshDDForm'
  },
  {
    name: "✅ Manage Dropdowns",
    functionName: 'manageDDForm'
  }];

  ss.addMenu("Custom",menuOpts);

}
