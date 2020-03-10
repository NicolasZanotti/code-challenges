/*

From: https://www.hackerrank.com/challenges/counting-valleys/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=warmup

Gary is an avid hiker. He tracks his hikes meticulously, paying close attention to small details like topography. During his last hike he took exactly n steps. For every step he took, he noted if it was an uphill, U, or a downhill, D step. Gary's hikes start and end at sea level and each step up or down represents a 1 unit change in altitude. We define the following terms:

A mountain is a sequence of consecutive steps above sea level, starting with a step up from sea level and ending with a step down to sea level.
A valley is a sequence of consecutive steps below sea level, starting with a step down from sea level and ending with a step up to sea level.
Given Gary's sequence of up and down steps during his last hike, find and print the number of valleys he walked through.

For example, if Gary's path is s= [DDUUUUDD], he first enters a valley 2 units deep. Then he climbs out an up onto a mountain 2 units high. Finally, he returns to sea level and ends his hike.

Function Description

Complete the countingValleys function in the editor below. It must return an integer that denotes the number of valleys Gary traversed.

countingValleys has the following parameter(s):

n: the number of steps Gary takes
s: a string describing his path


*/


function countingValleys(n = 0, s = '') {
    if (n !== s.length) throw new TypeError('Steps taken not described');

    let sealevel = 0;
    let valleys = 0;
    const path = s.split('');

    path.forEach(step => {
        // update balance
        if (step === 'D') sealevel += 1;
        else if (step === 'U') sealevel -= 1;

        // count amount of times balance dips
        if (step === 'U' && sealevel === 0) valleys += 1;
    });

    if (sealevel !== 0) throw new Error('Hike does not end at sealevel');

    return valleys;
}



try {
    countingValleys(1, '');
} catch (e) {
    console.log(
        'It fails if mismatch between steps taken and steps described:',
        true
    );
}

console.log(
    'It should go through 1 valley:',
    countingValleys(4, 'DDUU') === 1
);

console.log(
    'It should go through 2 valleys:',
    countingValleys(12, 'DDUUDDDDUUUU') === 2
);

console.log(
    'It should go through 1 valley while also walking upwards in the valley:',
    countingValleys(6, 'DDUDUU') === 1
);

console.log(
    'It should go through 1 valleys and climb 1 mountain:',
    countingValleys(6, 'DDUUUD') === 1
)