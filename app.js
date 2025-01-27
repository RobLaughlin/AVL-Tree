import { AVLTree, prettyPrint } from "./AVLTree.js";

const TEST_VALUES = [
    5, 10, -2, 2.223, 3.3, 100, 10, 5, -100, -1000, -5.5, 3.34, 2,
];
const tree = new AVLTree(TEST_VALUES);
prettyPrint(tree.root);
