/*
    Hourglass Sum
    From: https://www.hackerrank.com/challenges/2d-array/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays
*/

/**
* Return an array of numbers or empty array if not possible.
*/
function findHourGlassStartingAt(a: number[][], row: number, col: number): number[] {
    // We need two extra columns to the right and two extra rows to the bottom
    const hasHourGlassPossible = a[row + 2] !== undefined && a[row][col + 2] !== undefined;
    if (hasHourGlassPossible) {
        return [
            // Top row
            a[row][col],
            a[row][col + 1],
            a[row][col + 2],
            // Middle row
            a[row + 1][col + 1],
            // Bottom row
            a[row + 2][col],
            a[row + 2][col + 1],
            a[row + 2][col + 2]
        ];
    }

    return [];
}


/**
 * Complexity is O(n²)
 * 
 * @param a twodimensional array of values to find the hourglasses within.
 */
function highestSumFromPattern(
    a: number[][],
    patternStartingAt: (a: number[][], rowIndex: number, colIndex: number) => number[]
): number {
    let sums = [];

    for (let rowIndex = 0; rowIndex < a.length; rowIndex++) {
        const row = a[rowIndex];

        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const result = patternStartingAt(a, rowIndex, colIndex);

            if (result.length > 0) {
                const sum = result.reduce((a, b) => a + b, 0);
                sums.push(sum);
            }
        }
    }

    return Math.max(...sums);
}


const dummy = [
    [1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0],
    [0, 0, 2, 4, 4, 0],
    [0, 0, 0, 2, 0, 0],
    [0, 0, 1, 2, 4, 0],
];

console.log(
    'It finds the hourglass pattern starting at row 1 column 1:',
    findHourGlassStartingAt(dummy, 0, 0).toString() === '1,1,1,1,1,1,1'
);

console.log(
    'It finds the hourglass pattern starting at row 4 column 4:',
    findHourGlassStartingAt(dummy, 3, 3).toString() === '4,4,0,0,2,4,0'
);

console.log(
    'It returns an empty array if no pattern found:',
    findHourGlassStartingAt(dummy, 4, 0).length === 0
);

console.log(
    'It outputs the sum of the highest hourglass in a 6x6 matrix:',
    highestSumFromPattern(dummy, findHourGlassStartingAt) === 19
);
