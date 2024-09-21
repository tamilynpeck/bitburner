import { mergeOverlapingIntervals } from "./contracts/MergeOverlapingIntervals.js";

describe("test generate one IP address", function () {
  it("test mergeOverlapingIntervals", function () {
    const input = [
      [1, 3],
      [8, 10],
      [2, 6],
      [10, 16],
    ];
    const result = [
      [1, 6],
      [8, 16],
    ];
    expect(mergeOverlapingIntervals(input).toBe(result));
  });
});
