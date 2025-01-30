import { AVLTree, prettyPrint } from "./AVLTree.js";

const TEST_VALUES = [-2, 100, 20, 200, -5.5, 10, 30, 150, 300, -1000, -1001];

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

    console.log("\nRemoving a leaf node -1001...");
    root.delete(-1001);
    prettyPrint(root);

    console.log("\nRemoving a node with one non-empty subtree -1000...");
    root.delete(-1000);
    prettyPrint(root);

    console.log("\nRemoving a non-existant node 5...");
    root.delete(5);
    prettyPrint(root);

    const rootLevelOrdered = [];
    root.levelOrder((node) => {
        rootLevelOrdered.push(node.value);
    });
    console.log(`Level order of root node: ${rootLevelOrdered}`);

    const rootPreOrdered = [];
    root.preOrder((node) => {
        rootPreOrdered.push(node.value);
    });
    console.log(`Pre order of root node: ${rootPreOrdered}`);

    const rootInOrdered = [];
    root.inOrder((node) => {
        rootInOrdered.push(node.value);
    });
    console.log(`In order of root node: ${rootInOrdered}`);

    const rootPostOrdered = [];
    root.postOrder((node) => {
        rootPostOrdered.push(node.value);
    });
    console.log(`Post order of root node: ${rootPostOrdered}`);
}

testAVLTree();
