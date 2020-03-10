/*

Staircase problem: https://www.youtube.com/watch?v=5o-kdjv7FD0

Find amount of steps necessary to go up steps. Allows 1 or 2 steps.

Write function num_ways(N) that returns the total steps of steps possible.

Example num_ways(2) === 2

*/
function num_ways(steps: number = 1, stepsAllowedToTake: number[] = [1, 2]): number {
    if (steps === 0 || stepsAllowedToTake.length === 0) return 0;

    // FIXME for debugging purposes
    // stepsAllowedToTake.sort().reverse();

    const stepsToVariations = {};

    function makeStep(stepsLeft: number, totalVariations: number = 0) {
        if (stepsToVariations.hasOwnProperty(stepsLeft)) {
            return totalVariations + stepsToVariations[stepsLeft];
        }

        let variations = 0;
        for (let i = 0; i < stepsAllowedToTake.length; i++) {
            let currentStep = stepsAllowedToTake[i];

            // We can make the step if available
            if (currentStep <= stepsLeft) {
                let nextStepsLeft = stepsLeft - currentStep;

                if (nextStepsLeft === 0) {
                    variations += 1;
                } else {
                    stepsToVariations[nextStepsLeft] = makeStep(nextStepsLeft, totalVariations);
                    variations += stepsToVariations[nextStepsLeft];
                }
            }
        }

        return totalVariations + variations;
    }

    return makeStep(steps);
}

console.log(
    'It shows zero possibilities for no steps:',
    num_ways(0) === 0
);

console.log(
    'It shows zero possibilities for no allowed steps to take:',
    num_ways(1, []) === 0
);

console.log(
    'It shows 1 possibility for 1 step while jumping 1 or 2:',
    num_ways(1) === 1
);

console.log(
    'It shows 2 possibilities for 2 steps while jumping 1 or 2:',
    num_ways(2) === 2
);

console.log(
    'It shows 3 possibilities for 3 steps while jumping 1 or 2:',
    num_ways(3) === 3
);

console.log(
    'It allows 1 possibility for 3 steps while jumping 3:',
    num_ways(3, [3]) === 1
);

console.log(
    'It allows 4 possibilities for 3 steps while jumping 1, 2 or 3:',
    num_ways(3, [1, 2, 3]) === 4
);

console.log(
    'It allows 81 possibilities for 8 steps while jumping 1, 2 or 3:',
    num_ways(8, [1, 2, 3]) === 81
);
