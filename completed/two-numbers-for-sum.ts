/*
  https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

  const a = [1,3,4,5,7,10,11]; // target is 9
*/
function findTwoNumbersForSum(values: number[], target: number) {
  if (values.length < 2) throw new TypeError("Invalid input. Needs at least two numbers.");

  let offset = Math.floor(values.length / 2),
    pointer,
    outerElement,
    innerElement;

  for (let i = 0; i < values.length; i++) {
    pointer = (i + offset) % values.length;
    outerElement = values[pointer];

    for (let j = 0; j < values.length; j++) {
      innerElement = values[j];

      if (innerElement !== outerElement && innerElement + outerElement === target) {
        return innerElement > outerElement ? [outerElement, innerElement] : [innerElement, outerElement];
      }
    }
  }

  return [];
}

const describe = (name: string, fn: Function) => console.log(`${name}:`) + fn();
const test = (name: string, fn: Function) => console.log(`\t• ${name}:`, fn());

describe("finds sum of two", () => {
  test("throws error if empty", () => {
    const values = [1];
    let hasError = false;
    try {
      findTwoNumbersForSum(values, 0);
    } catch (error) {
      hasError = true;
    }
    return hasError;
  });

  test("has empty array if no results found", () => {
    const result = findTwoNumbersForSum([1, 2], 1);
    return Array.isArray(result) && result.length === 0;
  });

  test("has result of 4 + 5 = 9", () => {
    const values = [1, 3, 4, 5, 7, 10, 11];
    const target = 9;
    const result = findTwoNumbersForSum(values, target);
    return result[0] === 4 && result[1] === 5;
  });

  test("has result of 7 + 12 = 19", () => {
    const values = [1, 3, 6, 7, 8, 12, 14, 19, 20];
    const target = 19;
    const result = findTwoNumbersForSum(values, target);
    return result[0] === 7 && result[1] === 12;
  });

  test("has result of -1 + 2 = 1", () => {
    const values = [-3, -1, 1, 2, 5];
    const target = 1;
    const result = findTwoNumbersForSum(values, target);
    return result[0] === -1 && result[1] === 2;
  });
});
