/*
 Bribes
 From: https://www.hackerrank.com/challenges/new-year-chaos/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays 
*/

function findIndexOfNextBribe(line: readonly number[]): number {
    for (let index = 0; index < line.length; index++) {
        const originalPositionInLine = line[index];
        const currentPositionInLine = index + 1;
        if (originalPositionInLine !== currentPositionInLine) return currentPositionInLine - 1;
    }

    return -1;
}

console.log(
    'It returns -1 if no bribes where found:',
    findIndexOfNextBribe([1, 2, 3]) === -1
);

console.log(
    'It returns index 1 for bribe occurring at that spot:',
    findIndexOfNextBribe([1, 3, 2]) === 1
);

console.log(
    'It returns index 4 for bribe occurring at that spot:',
    findIndexOfNextBribe([1, 2, 3, 4, 6, 5]) === 4
);

function swap(x, y, list) {
    var b = list[y];
    list[y] = list[x];
    list[x] = b;
    return list;
}

console.log(
    'It swaps two elements in an array of 2:',
    swap(0, 1, [1, 2]).toString() === '2,1'
);

console.log(
    'It swaps two elements in an array of 6:',
    swap(0, 5, [1, 2, 3, 4, 5, 6]).toString() === '6,2,3,4,5,1'
);

function getPrevBribeState(line: readonly number[], indexOfBribe: number = 0): number[] {
    if (indexOfBribe < 0 || indexOfBribe > line.length) throw new RangeError('Index of bribe is out of bounds');

    const clone = [...line];

    // Check all the next in line if their spot is equal to the index of the bribe.
    for (let index = indexOfBribe + 1; index < line.length; index++) {
        const person = line[index];
        const indexOfPerson = person - 1;

        if (indexOfPerson === indexOfBribe) {
            // console.log(line[indexOfBribe] + ' switched places with ' + person);
            return swap(indexOfBribe, index, clone);
        }
    }

    return clone;
}

console.log(
    'It returns same array if no bribe state available:',
    getPrevBribeState([1, 2, 3, 4], 0).toString() === '1,2,3,4'
);

console.log(
    'It returns [1,2] for [2,1]:',
    getPrevBribeState([2, 1], 0).toString() === '1,2'
);

console.log(
    'It returns the previous bribery state:',
    getPrevBribeState([4, 1, 2, 3], 0).toString() === '1,4,2,3'
);

console.log(
    'It returns the previous bribery state:',
    getPrevBribeState([1, 4, 2, 3], 1).toString() === '1,2,4,3'
);

function minimumBribes(queueLength: number, queue: string): number {
    'use strict'; // So Object.freeze throws errors.
    
    const MAXIMUM_BRIBES_ALLOWED = 3;


    // Convert string to array of numbers
    const q: readonly number[] = Object.freeze(
        queue.split(' ').map(t => parseInt(t))
    );

    // Keep track of bribes per person
    interface PersonBribeCount {
        [key: number]: number;
    }
    const count: PersonBribeCount = {};
    q.forEach(person => count[person] = 0);

    let states = [];
    states.push(q);

    // Gather all the bribes that have taken place
    let indexOfNextBribe = findIndexOfNextBribe(states[states.length - 1]);
    while (indexOfNextBribe !== -1) {
        count[states[states.length - 1][indexOfNextBribe]] += 1;
        states.push(getPrevBribeState(states[states.length - 1], indexOfNextBribe));
        indexOfNextBribe = findIndexOfNextBribe(states[states.length - 1]);
    }

    // Check for maximum amount of bribes allowed
    for (const key in count) {
        if (count.hasOwnProperty(key) && count[key] > MAXIMUM_BRIBES_ALLOWED) throw new Error('Maximum amount of bribes exceeded');
    }

    // Return total amount of bribes
    let total = 0;
    for (const key in count) {
        if (count.hasOwnProperty(key)) total += count[key];
    }

    return total;
}

console.log(
    'It describes 0 bribes in a queue of 4:',
    minimumBribes(4, '1 2 3 4') === 0
);

console.log(
    'It describes 1 bribe in a queue of 2:',
    minimumBribes(2, '2 1') === 1
);

console.log(
    'It describes 2 bribes in a queue of 5, where each person bribed just once (2 bribed 1 and 5 bribed 4):',
    minimumBribes(5, '2 1 3 5 4') === 2
);

console.log(
    'It describes 3 bribes in a queue of 4, where person 4 bribed three times:',
    minimumBribes(4, '4 1 2 3') === 3
);

try {
    minimumBribes(5, '5 1 2 3 4')
    console.log('It throws an error if more than three bribes have happened.', false);
} catch (e) {
    console.log('It throws an error if more than three bribes have happened.', true);
}
