/*
 Left rotation.
 From: https://www.hackerrank.com/challenges/ctci-array-left-rotation/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays
*/

/**
 * Complexity is O(n)
 * 
 * @param a 
 * @param n 
 */
function rotateLeftBruteForce(a: any[], n: number) {
    const rotated = [];

    a.forEach((element, index) => {
        rotated[(index + n) % a.length] = element;
    });

    return rotated;
}

/**
 * Complexity is O(l)
 * @param a 
 * @param n 
 */
function rotateLeft(a: any[], n: number) {
    if (n === 0) return a;
    if (n < 0) throw new Error('Rotation must be positive amount');

    return [...a.slice(a.length - n, a.length), ...a.slice(0, a.length - n)]
}

console.log(
    'It rotates an array of 1 element by 1 to the left.',
    rotateLeft([1], 1).toString() === '1'
);

console.log(
    'It rotates an array of 1 element by 5 to the left.',
    rotateLeft([1], 5).toString() === '1'
);

console.log(
    'It rotates an array of 3 elements by 1 to the left.',
    rotateLeft([1, 2, 3], 1).toString() === '3,1,2'
);

console.log(
    'It rotates an array of 3 elements by 3 to the left.',
    rotateLeft([1, 2, 3], 3).toString() === '1,2,3'
);

console.log(
    'It rotates an array of 10 elements by 2 to the left.',
    rotateLeft([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2).toString() === '9,10,1,2,3,4,5,6,7,8'
);
