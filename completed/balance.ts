/*

From: https://www.coursera.org/learn/progfun1

Write a function which verifies the balancing of parentheses in a string, which we represent as a List[Char] not a String.

For example, the function should return true for the following strings:
    "(if (zero? x) max (/ 1 x))"
    "I told him (that it’s not (yet) done). (But he wasn’t listening)"

The function should return false for the following strings:
    ":-)"
    "())("

*/

function isBalanced(text: string = '', left: string = '(', right: string = ')'): boolean {
    if (left.length !== 1 || right.length !== 1) throw new RangeError('The left/right characters need to be 1 in length.');

    const r = new RegExp(`[${left}${right}]`, 'g');
    const parens = text.match(r);

    if (parens === null || parens.length === 0) return true;

    // Add and remove from the balance
    let balance = 0;
    for (let index = 0; index < parens.length; index++) {
        if (parens[index] === left) {
            balance += 1;
        } else if (parens[index] === right) {
            if (balance !== 0) balance -= 1;
            else balance += 1;
        }
    }

    return balance === 0;
}

const describe = (name, fn) => console.log(`${name}:`) + fn();
const test = (name, fn) => console.log(`\t• ${name}:`, fn());

describe(
    'Function isBalanced',
    () => {
        test(
            'It is balanced if empty.',
            () => isBalanced('') === true
        );

        test(
            'It is balanced if no left/right elements in text',
            () => isBalanced('lorem') === true
        );

        test(
            'It shows balanced for a sentence with single set of parenthesis',
            () => isBalanced('Lorem (ipsum) dolor.') === true
        );

        test(
            'It shows balanced for a sentence with multiple parenthesis',
            () => isBalanced('(if (zero? x) max (/ 1 x))') === true
        );

        test(
            'It shows balanced for two sentences with multiple parenthesis',
            () => isBalanced('I told him (that it’s not (yet) done). (But he wasn’t listening)') === true
        );

        test(
            'It is unbalanced for a smiley emoji',
            () => isBalanced(':-)') === false
        );

        test(
            'It is unbalanced for a series of mismatched parenthesis',
            () => isBalanced('())(') === false
        );

        test(
            'It shows balanced for a sentence with single set of custom elements',
            () => isBalanced('Lorem [ipsum] dolor.', '[', ']') === true
        );

        try {
            isBalanced('Lorem [ipsum] dolor.', 'foo', 'bar')
            test('It throws an error if left/right elements too long', () => false);
        } catch (e) {
            test('It throws an error if left/right elements too long', () => true);
        }
    }
);
