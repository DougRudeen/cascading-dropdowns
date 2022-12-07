/**
 * Constructor function to be used in conjunction with the native filter() method to pull unique values from a flattened one dimensional array.
 * This constructor function (and its useage with the filter function in other parts of this program) were
 * shamelessly stolen from: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
 * 
 * An example use of the filter function used with a constructor function would be something like: 
 * //var array = [a.b.c.c.d.d.]
 * //var unique = array.filter(onlyUnique);
 * 
 * There is also a fancy ECMA 6 way of writing this:
 * //var myArray = ['a', 1, 'a', 2, '1'];
 * //var unique = myArray.filter((v, i, a) => a.indexOf(v) === i)
 * 
 * @value - the array value being passed into the function
 * @index - the index of the value being passed within the array
 * @self - I believe this is calling to the array somehow when this is nested inside of the filter function
 * 
 */
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
