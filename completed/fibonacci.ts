/*

Fibonacci

1,1,2,3,5,8,13,21,34

*/

function fib_brute(n: number): number {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return fib(n - 1) + fib(n - 2);
}

function fib(n: number): number {
    if (n <= 0) return 0;
    if (n <= 2) return 1;

    let x, xMinusOne = 1, xMinusTwo = 1;
    for (let i = 2; i < n; i++) {
        x = xMinusOne + xMinusTwo;
        
        // Update state by shifting numbers
        xMinusTwo = xMinusOne;
        xMinusOne = x;
    }

    return x;
}

console.log(
    'It returns zero if empty',
    fib(0) === 0
);

console.log(
    'It returns 1 as second number',
    fib(2) === 1
);

console.log(
    'It returns 2 as third number',
    fib(3) === 2
);

console.log(
    'It returns 21 as eighth number',
    fib(8) === 21
);

console.log(
    'It returns X as hundredth number',
    fib(100) === 354224848179262000000
);
