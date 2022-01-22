/**
 * Challenge: assign a group of people to each other for Secret Santa 
 * and allow excluding specific people that already gave each other presents.
 * 
 * 
 * @example
 * const assignment = randomlyAssignPeopleToEachOther([
 * { name: "Tintin" },
 * { name: "Haddock", exclusions: ["Bianca"] },
 * { name: "Thomson" },
 * { name: "Calculus" },
 * { name: "Nestor", exclusions: ["Haddock"] },
 * { name: "Bianca" },
 * ]);
 * assignment.forEach(p => console.log(`${p.name} is assigned to ${p.selection}`));
 */
export type Person = {
  name: string;
  selection?: string;
  exclusions?: string[];
};

export type RandomIndex = (length: number) => number;

export function filterOwnName(people: Person[], person: Person): Person[] {
  return people.filter(p => p.name !== person.name);
}

export function filterExclusions(people: Person[], person: Person): Person[] {
  return people.filter(p => !person.exclusions?.includes(p.name));
}

export function filterSelections(people: Person[], person: Person, selections: string[]): Person[] {
  return people.filter(p => p.name !== person.name && !selections.includes(p.name));
}

export function orderByPossibleSelections(people: Person[]) {
  const participants = people.map(p => p.name);
  const withoutUnknownSelections = people.map(p => {
    return {
      name: p.name,
      exclusions: p.exclusions?.filter(excludedPerson => participants.includes(excludedPerson))
    } as Person;
  });

  return withoutUnknownSelections.sort(
    (a, b) => (b.exclusions?.length ?? 0) - (a.exclusions?.length ?? 0)
  );
}

export default function randomlyAssignPeopleToEachOther(
  people: Person[],
  randomIndex: RandomIndex = length => Math.floor(Math.random() * length),
  tries: number = 5
) {
  function assign(triesCount:number):Person[] {
    const results = orderByPossibleSelections(people);
    const selections: string[] = [];

    for (let person of results) {
      const withoutOwnName = filterOwnName(people, person);

      const withoutExclusions = filterExclusions(withoutOwnName, person);
      if (withoutExclusions.length === 0) throw new Error(`Cannot select anybody for ${person.name}. Check if too many people are excluded from their selection.`);

      const withoutSelections = filterSelections(withoutExclusions, person, selections);
      if (withoutSelections.length === 0) {
        if (triesCount === 0) throw new Error(`Nobody left to assign to ${person.name} after ${tries}`);

        return assign(triesCount - 1);
      } else {
        const i = randomIndex(withoutSelections.length);
        if (i < 0 || i > withoutSelections.length) throw new Error(`The random index function is out of bounds with ${i}. Check your randomIndex function.`);
        person.selection = withoutSelections[i]?.name;
        selections.push(person.selection);
      }
    }

    return results;
  }

  return assign(tries);
}


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