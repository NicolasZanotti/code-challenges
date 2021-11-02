/* 
  From: https://leetcode.com/problems/invert-binary-tree/

  Given the root of a binary tree, invert the tree, and return its root.
*/

function logDepth(tree: number[]): number[] {
  let nodesAtThisDepth = 1;
  console.log("nodesAtThisDepth", nodesAtThisDepth);
  console.log("tree[depthIndex]", tree[0]);

  for (let treeIndex = 0; treeIndex < tree.length; treeIndex += nodesAtThisDepth) {
    nodesAtThisDepth *= 2;
    console.log("nodesAtThisDepth", nodesAtThisDepth);

    let depthIndex = nodesAtThisDepth;
    if (tree[depthIndex - 1] !== undefined) {
      for (depthIndex; depthIndex < nodesAtThisDepth * 2; depthIndex++) {
        console.log("tree[depthIndex]", tree[depthIndex - 1]);
      }
    }
  }

  return [];
}

function invertTreeDirty(tree: any[]): any[] {
  if (tree.length === 0) return [];

  let result = [];

  // First element
  let nodesAtThisDepth = 1;
  result.push(tree[0]);

  for (let treeIndex = 0; treeIndex < tree.length; treeIndex += nodesAtThisDepth) {
    nodesAtThisDepth *= 2;
    console.log("nodesAtThisDepth", nodesAtThisDepth);

    if (tree[nodesAtThisDepth - 1] !== undefined) {
      let nodes = [];

      for (let depthIndex = nodesAtThisDepth; depthIndex < nodesAtThisDepth * 2; depthIndex++) {
        console.log("tree[depthIndex]", tree[depthIndex - 1]);
        nodes.push(tree[depthIndex - 1]);
      }

      nodes.reverse();
      for (let index = 0; index < nodes.length; index++) {
        result.push(nodes[index]);
      }
    }
  }

  return result;
}

function invertTree(tree: any[]): any[] {
  if (tree.length === 0) return [];

  // First element
  let nodesAtThisDepth = 1;
  const result = [tree[0]];

  for (let treeIndex = 0; treeIndex < tree.length; treeIndex += nodesAtThisDepth) {
    nodesAtThisDepth *= 2;
    if (tree[nodesAtThisDepth - 1] === undefined) break;

    // Count down from the end of this chunk
    for (let chunkIndex = nodesAtThisDepth * 2 - 1; chunkIndex >= nodesAtThisDepth; chunkIndex--) {
      result.push(tree[chunkIndex - 1]);
    }
  }

  return result;
}

console.log("It does nothing with an empty array", invertTree([]).toString() === [].toString());

console.log(
  "It inverts a simple binary tree structure",
  invertTree([2, 1, 3]).toString() === [2, 3, 1].toString()
);

console.log(
  "It inverts a binary tree structure with a depth of three.",
  invertTree([4, 2, 7, 1, 3, 6, 9]).toString() === [4, 7, 2, 9, 6, 3, 1].toString()
);

console.log(
  "It inverts a binary tree structure with a depth of four.",
  invertTree("ABCDEFGHIJKLMNO".split("")).toString() === "A,C,B,G,F,E,D,O,N,M,L,K,J,I,H"
);
