/*
From: https://www.hackerrank.com/challenges/repeated-string/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=warmup


Lilah has a string, s, of lowercase English letters that she repeated infinitely many times.

Given an integer, n, find and print the number of letter a's in the first  letters of Lilah's infinite string.

For example, if the string s = 'abcac' and n = 10, the substring we consider is abcacabcac, the first  characters of her infinite string. There are 4 occurrences of a in the substring.

Function Description

Complete the repeatedString function in the editor below. It should return an integer representing the number of occurrences of a in the prefix of length  in the infinitely repeating string.

repeatedString has the following parameter(s):

s: a string to repeat
n: the number of characters to consider

*/

function repeatedString(s = '', n = 1) {
    const text = s.split('');

    function findViaMultiplier() {
        let occurences = 0;
        let i;

        // get occurences for single text
        for (i = 0; i < text.length; i++) {
            if (text[i] === 'a') occurences += 1;
        }

        // find out how many times the repetition would occur
        const multiplier = Math.floor(n / text.length);
        const remaining = n - (multiplier * text.length);
        occurences = occurences * multiplier;

        // get occurences for remaining charachters
        for (i = 0; i < remaining; i++) {
            if (text[i] === 'a') occurences += 1;
        }

        return occurences;
    }

    function findViaLoop() {
        let occurences = 0;
        let i = 0, t;

        for (i; i < n; i++) {
            // adjust text index 't' to the position in the text
            t = i > (text.length - 1) ? i % text.length : i;
            if (text[t] === 'a') occurences += 1;
        }

        return occurences;
    }

    return findViaMultiplier();
}

console.log(
    'It counts the occurences of a single letter:',
    repeatedString('a') == 1
);

console.log(
    'It counts the occurences without a single repetition:',
    repeatedString('abcda', 5) === 2
);

console.log(
    'It counts the occurences of three repetitions and a single "a" charachter:',
    repeatedString('abc', 7) === 3
);

console.log(
    'It counts the occurences of two repetitions and two "a" characters:',
    repeatedString('abca', 8) === 4
);

console.log(
    'It counts the occurences of multiple repetitions and two "a" characters:',
    repeatedString('abca', 15) === 7
);
