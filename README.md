# Cascading or Dependent Dropdown Menus in Google Apps Script
This repository consists of several <a href="https://developers.google.com/apps-script/guides/sheets/functions"> Google Apps Script (.gs) custom functions </a> and html 
(.html) files. Once the code in this repo is pasted into a new spreadsheet using the Apps Script Editor, users will be able to create n-tiered cascading dropdown menus.  The number of 
tiers used in the cascading dropdown menus is only limited by the amount of storage in the Google Apps Script <a href = "https://developers.google.com/apps-script/guides/properties">
document properties </a>, and inherent limits on the number of rows/columns in a given sheet.

This avoids the issue which presents in many online tutorials about cascading dropdown menus: the arbitrary limit on the number of tiers that the cascading menus
can consist of (see e.g. <a href = "https://www.youtube.com/watch?v=60IVqMtJFFI"> this youtube tutorial </a> (arbirarily limiting the number of tiers to two); <a href = "https://www.youtube.com/watch?v=s-I8Z4nTDak">
this other tutorial </a> (arbitrarily limiting the number of tiers to three)).

## What are "Cascading Dropdown Menus"?
Cascading dropdown menus (or 'dependent' dropdown menus) are list-based data-validated cells (for a general primer on data validation in Google Sheets, see <a href = "https://support.google.com/appsheet/answer/10107325?hl=en">
this help page </a>) where the validation list in the active cell depends on the input into the cell immediately to the left.  For example, suppose that cell $C$1 contains
a data-validated list of food types ("vegetables, fruits, meats, grains") and that $D$1 is supposed to contain a list of sub-types. $D$1 should dynamically change based on 
the user input to $C$1.


## How this works
The code works by allowing the user to store nested objects in JSON format in the instant Google Sheet's 'document properties.'  When the user wants to declare a new series
of cascading dropdown menus
