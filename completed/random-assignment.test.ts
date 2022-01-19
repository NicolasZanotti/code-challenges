import randomlyAssignPeopleToEachOther, { filterExclusions, filterOwnName, filterSelections, orderByPossibleSelections } from "./random-assignment.ts";

const describe = (name:string, fn:Function) => console.log(`${name}:`) + fn();
const test = (name:string, fn:Function) => console.log(`\t• ${name}:`, fn());

describe(
  'Filtering data of type Person.',
  () => {
    test(
      'It does not select the same person as giver and receiver.',
      () => filterOwnName([{ name: "A" }], { name: "A" }).toString() === ""
    );

    test(
      'It excludes one person if specified.',
      () => {
        const people = [{ name: "A", exclusions: ["B"] }, { name: "B" }];
        const results = filterExclusions(people, people[0]);
        return (
          results.length === 1 &&
          results[0].name === "A"
        );
      }
    )

    test(
      'It excludes two people if specified.',
      () => {
        const people = [{ name: "A", exclusions: ["B", "C"] }, { name: "B" }, { name: "C" }];
        const results = filterExclusions(people, people[0]);
        return (
          results.length === 1 &&
          results[0].name === "A"
        );
      }
    )

    test(
      'It does not exclude anybody if nobody is specified.',
      () => {
        const people = [{ name: "A" }, { name: "B" }];
        const results = filterExclusions(people, people[0]);
        return (
          results.length === 2 &&
          results[0].name === "A" &&
          results[1].name === "B"
        );
      }
    );

    test(
      'It does not include previous selections, including the own name.',
      () => {
        const previousSelections = ["B"];
        const people = [{ name: "A" }, { name: "B" }, { name: "C" }];
        const results = filterSelections(people, people[0], previousSelections);
        return (
          results.length === 1 &&
          results[0].name === "C"
        );
      }
    );
  }
);

describe(
  'Ordering data of type Person.',
  () => {
    test(
      'It orders people by available possible selections (e.g. Person "A" has four people to select from). Most limited to least limited.',
      () => {
        const people = [{ name: "A" }, { name: "B" }, { name: "C", exclusions: ["A"] }, { name: "D", exclusions: ["A", "B"] }];
        const result = orderByPossibleSelections(people);
        return (
          result.length === people.length &&
          result[0].name === "D" &&
          result[1].name === "C" &&
          result[2].name === "A" &&
          result[3].name === "B"
        );
      }
    );

    test(
      'It takes people into account that are excluded but not participating.',
      () => {
        const people = [{ name: "A" }, { name: "B" }, { name: "C", exclusions: ["A", "NOT_IN_ARRAY", "B"] }];
        const result = orderByPossibleSelections(people);
        return (
          result.length === people.length &&
          result[0]?.exclusions?.length === 2 &&
          result[0]?.exclusions[0] === "A" &&
          result[0]?.exclusions[1] === "B"
        );
      }
    );

  }
)

describe(
  'Assigning people.',
  () => {
    test(
      'It assigns people in order if no random assignment is set.',
      () => {
        const people = [{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }];
        const result = randomlyAssignPeopleToEachOther(people, length => 0);
        return (
          result.length === people.length &&
          result[0].name === "A" &&
          result[1].name === "B" &&
          result[2].name === "C" &&
          result[3].name === "D"
        );
      }
    );
  }
)