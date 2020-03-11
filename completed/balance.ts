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

class Test {
    public static results = [];

    static it(description: string, assertion: boolean): void {
        Test.results.push(assertion);
        console.log('It ' + description + ': ', assertion);
    }

    static report(): void {
        const failed = Test.results.filter(x => x === false).length;
        console.log(failed === 0 ? 'All tests passed.' : failed + ' tests failed.');
    }
}

function isBalanced(text: string = '', left: string = '(', right: string = ')'): boolean {
    if (left.length !== 1 || right.length !== 1) throw new RangeError('The left/right characters need to be 1 in length.');

    const r = new RegExp(`[${left}${right}]`, 'g');
    const parens = text.match(r);

    if (parens === null || parens.length === 0) return true;

    const stack = [];

    // Add and remove from the stack
    for (let index = 0; index < parens.length; index++) {
        if (parens[index] === left) {
            stack.push(1);
        } else if (parens[index] === right) {
            if (stack.length !== 0) {
                stack.pop()
            } else {
                stack.push(1)
            }
        }
    }

    return stack.length === 0;
}

Test.it(
    'is balanced if empty',
    isBalanced('') === true
);

Test.it(
    'is balanced if no left/right elements in text',
    isBalanced('lorem') === true
);

Test.it(
    'shows balanced for a sentence with single set of parenthesis',
    isBalanced('Lorem (ipsum) dolor.') === true
);

Test.it(
    'shows balanced for a sentence with multiple parenthesis',
    isBalanced('(if (zero? x) max (/ 1 x))') === true
);

Test.it(
    'shows balanced for two sentences with multiple parenthesis',
    isBalanced('I told him (that it’s not (yet) done). (But he wasn’t listening)') === true
);

Test.it(
    'is unbalanced for a smiley emoji',
    isBalanced(':-)') === false
);

Test.it(
    'is unbalanced for a series of mismatched parenthesis',
    isBalanced('())(') === false
);

Test.it(
    'shows balanced for a sentence with single set of custom elements',
    isBalanced('Lorem [ipsum] dolor.', '[', ']') === true
);

try {
    isBalanced('Lorem [ipsum] dolor.', 'foo', 'bar')
    Test.it('throws an error if left/right elements too long', false);
} catch (e) {
    Test.it('throws an error if left/right elements too long', true);
}

Test.report();