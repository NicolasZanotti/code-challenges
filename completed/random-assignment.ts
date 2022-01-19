/**
 * This script assigns people to each other at random.
 * It is possible to exclude people to ensure they are not assigned.
 * 
 * A use-case is to randomly assign people to each other for Secret Santa.
 * The exclusions would be for people that already are giving each other presents.
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
