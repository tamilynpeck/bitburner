/**
 * Generate IP Addresses
 *
 * Given the following string containing only digits, return an array with all possible valid IP address combinations that can be created from the string: 148203175241
 * Note that an octet cannot begin with a '0' unless the number itself is exactly '0'. For example, '192.168.010.1' is not a valid IP.
 * //https://www.geeksforgeeks.org/program-generate-possible-valid-ip-addresses-given-string/
 *
 * @param	{string} input
 * @return	{string[]}
 **/
export default function generateIPAddresses(input) {
  const result = [];
  const n = input.length;

  // Check if the length of the input string is valid for an IP address
  if (n < 4 || n > 12) {
    return result;
  }

  function isValidOctet(segment) {
    if (segment.length > 1 && segment[0] === '0') return false;
    const num = parseInt(segment, 10);
    return num >= 0 && num <= 255;
  }

  // Generate all possible combinations of segments
  for (let i = 1; i < Math.min(4, n - 2); i++) {
    for (let j = i + 1; j < Math.min(i + 4, n - 1); j++) {
      for (let k = j + 1; k < Math.min(j + 4, n); k++) {
        const segment1 = input.substring(0, i);
        const segment2 = input.substring(i, j);
        const segment3 = input.substring(j, k);
        const segment4 = input.substring(k);

        if (isValidOctet(segment1) && isValidOctet(segment2) && isValidOctet(segment3) && isValidOctet(segment4)) {
          result.push(`${segment1}.${segment2}.${segment3}.${segment4}`);
        }
      }
    }
  }

  return result;
}
