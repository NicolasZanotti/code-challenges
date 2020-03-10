/*

From: https://www.hackerrank.com/challenges/jumping-on-the-clouds/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=warmup

Emma is playing a new mobile game that starts with consecutively numbered clouds. Some of the clouds are thunderheads and others are cumulus. She can jump on any cumulus cloud having a number that is equal to the number of the current cloud plus 1 or 2. She must avoid the thunderheads. Determine the minimum number of jumps it will take Emma to jump from her starting postion to the last cloud. It is always possible to win the game.

For each game, Emma will get an array of clouds numbered 0 if they are safe or 1 if they must be avoided. For example, c=[0,1,0,0,0,1,0] indexed from 0 ... 6. The number on each cloud is its index in the list so she must avoid the clouds at indexes 1 and 5. She could follow the following two paths: 0-2-4-6 or 0-2-3-4-6. The first path takes 3 jumps while the second takes 4.

Function Description

Complete the jumpingOnClouds function in the editor below. It should return the minimum number of jumps required, as an integer.

jumpingOnClouds has the following parameter(s):

c: an array of binary integers


*/

/** 
 * array clouds with 0 being good and 1 being bad
*/
function jumpingOnClouds(clouds = [0, 0]) {
    if (clouds.length < 2) throw new Error('Minimum amount of clouds per level is 2. One starting cloud and one destination cloud');

    if (clouds[0] === 1) throw new Error('First cloud must be safe.')

    const totalClouds = clouds.length;
    let index = 0;
    let jumps = 0;

    // as long as there a next step available in the level
    while (index + 1 < totalClouds) {
        const oneAhead = clouds[index + 1];
        const twoAhead = clouds[index + 2];

        // Skip two if possible
        if (twoAhead === 0) {
            index += 2;
            jumps += 1;
        } else if (oneAhead === 0) {
            index += 1;
            jumps += 1;
        } else if (oneAhead === 1) throw new Error('Game unbeatable');
    }

    return jumps;
}

try {
    jumpingOnClouds([0]);
} catch (e) {
    console.log('It requires at least two clouds.');
}

try {
    jumpingOnClouds([1, 0]);
} catch (e) {
    console.log('It requires first cloud to be safe.');
}

console.log(
    'It skips to the next cloud:',
    jumpingOnClouds([0, 0]) === 1
);


console.log(
    'It skips a thunderhead cloud:',
    jumpingOnClouds([0, 1, 0]) === 1
);

console.log(
    'It skips two thunderhead clouds:',
    jumpingOnClouds([0, 1, 0, 1, 0]) === 2
);

try {
    jumpingOnClouds([0, 1, 1, 0]);
} catch (e) {
    console.log('It requires the level to be beatable.');
}

console.log(
    'It skips multiple thunderhead clouds:',
    jumpingOnClouds([0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0]) === 6
);
