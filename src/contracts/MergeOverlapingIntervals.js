export default function mergeOverlapingIntervals(input) {
  var sortedInput = input.sort(function (a, b) {
    return a - b;
  });
  for (var i = 0; i < input.length; i++) {
    if (i == input.length - 1) break;

    // actually needs to loop through all the rest of them..
    // remove 2 at a time, pass in, then add back..
    let result = mergeCheck(input[i], input[i + 1]);
  }

  // ORDER BY ASC
  // return sortedInput;
  return null;
}

// [[16,22],[23,27],[21,26],[6,15],[11,20],[24,27],[1,2],[19,20],[13,15],[12,22],[11,13],[22,24],[1,11],[6,14],[9,14]]
// [[9,14]]
// [[1,27]]

function mergeCheck(array1, array2) {
  let x = array1[0];
  let y = array1[1];

  let x2 = array2[0];
  let y2 = array2[1];

  if (y > x2) return [x, y2];
  if (x < y2) return [y, x2];
  return [array1, array2];
}
