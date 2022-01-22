# Code Challenges

This is a personal repository with my solutions for various code challenges. The purpose of solving these challenges is to have fun and to continuously practice (technical) problem-solving skills. 
The implementations are in TypeScript and are compiled and executed in Node. There is a comment with the description and source of the challenge at the top. Simple tests are executed at the end of the file for simplicity.
The tests use two simple functions describe and test:

```javascript
const describe = (name, fn) => console.log(`${name}:`) + fn();
const test = (name, fn) => console.log(`\t• ${name}:`, fn());
```
