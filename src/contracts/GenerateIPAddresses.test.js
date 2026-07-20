import generateIPAddresses from "./GenerateIPAddresses.js";

describe("test generate one IP address", function () {
  it("test generateIPAddresses", function () {
    const input = "1938718066";
    const result = ["193.87.180.66"];
    expect(generateIPAddresses(input)).toEqual(result);
  });

  it("test generateIPAddresses", function () {
    const input = "25525511135";
    const result = ["255.255.11.135", "255.255.111.35"];
    expect(generateIPAddresses(input)).toEqual(result);
  });

  it("test generateIPAddresses", function () {
    const input = "3100210190";
    const result = ["3.100.210.190"];
    expect(generateIPAddresses(input)).toEqual(result);
  });
});
