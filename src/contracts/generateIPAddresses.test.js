import generateIPAddresses from "generateIPAddresses.js";

// 25525511135 -> [255.255.11.135, 255.255.111.35]
// 1938718066 -> [193.87.180.66]
// 3100210190 -> [3.100.210.190]

describe("test generate one IP address", function () {
  it("test generateIPAddresses", function () {
    const input = "1938718066";
    const result = "[193.87.180.66]";
    expect(generateIPAddresses(input).toBe(result));
  });
});
