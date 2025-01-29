import { AVLTree, prettyPrint } from "./AVLTree.js";

const TEST_VALUES = [
    5, 10, -2, 2.223, 3.3, 100, 10, 5, -100, -1000, -5.5, 3.34, 2,
];

function testAVLTree() {
    const tree = new AVLTree(TEST_VALUES);
    const root = tree.root;
    console.log("Current tree:");
    prettyPrint(root);

    console.log("\nDeleting -2...");
    root.delete(-2);
    prettyPrint(root);

    console.log("\nDeleting -5.5...");
    root.delete(-5.5);
    prettyPrint(root);

    console.log("\nRemoving a leaf node -1000...");
    root.delete(-1000);
    prettyPrint(root);

    console.log("\nRemoving a node with one non-empty subtree 3.3...");
    root.delete(3.3);
    prettyPrint(root);

    console.log("\nRemoving a duplicate node 5...");
    root.delete(5);
    prettyPrint(root);
}

testAVLTree();
