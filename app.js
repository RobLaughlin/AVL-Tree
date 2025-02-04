import { AVLTree, prettyPrint } from "./AVLTree.js";

const NUM_RANGE = [-100, 100];
const NUM_VALUES = 25;
const NUM_TO_REMOVE = 10;
const NUM_UNBALANCED_VALUES = 25;

function genRandomNumbers(length, range) {
    const [rMin, rMax] = range;

    return Array.from({ length: length }, () => {
        const delta = rMax - rMin;
        return Math.floor(Math.random() * delta + rMin);
    });
}

function testAVLTree() {
    let nums = genRandomNumbers(NUM_VALUES, NUM_RANGE);
    const tree = new AVLTree();

    // Test insert operation
    nums.forEach((n) => {
        console.log(`Inserting ${n}...`);
        tree.insert(n);
    });

    const root = tree.root;
    prettyPrint(root);
    console.log(`Balanced: ${root.isBalanced()}`);

    // Test remove operation
    for (let i = 0; i < NUM_TO_REMOVE; i++) {
        console.log(`Removing ${nums[i]}...`);
        root.delete(nums[i]);
    }
    nums = nums.slice(NUM_TO_REMOVE, nums.length);
    prettyPrint(root);
    console.log(`Balanced: ${root.isBalanced()}`);

    // Test find operation
    const [rMin, rMax] = NUM_RANGE;
    const found = [];
    console.log(`Checking all integers [${rMin}, ${rMax}] are in the tree`);
    for (let i = rMin; i < rMax; i++) {
        if (root.find(i) !== null) {
            found.push(i);
        }
    }

    const comparator = (a, b) => {
        return a - b;
    };

    const uniqueNums = [...new Set(nums)];
    found.sort(comparator);
    uniqueNums.sort(comparator);
    console.log(`Found:    ${found}`);
    console.log(`Expected: ${uniqueNums}\n`);

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

    prettyPrint(root);
    console.log("Heights of nodes in level order");
    const heights = [];
    root.levelOrder((node) => {
        heights.push(`value: ${node.value}, height: ${node.height()}`);
    });
    console.log(heights);

    console.log("Depths of nodes in level order");
    const depths = [];
    root.levelOrder((node) => {
        depths.push(`value: ${node.value}, depth: ${tree.depth(node.value)}`);
    });
    console.log(depths);

    console.log("Inserting more nodes... Tree should autobalance...");
    const unbalancedNums = genRandomNumbers(NUM_UNBALANCED_VALUES, [
        rMax,
        2 * rMax,
    ]);
    unbalancedNums.forEach((n) => {
        console.log(`Inserting ${n}...`);
        root.insert(n, false);
    });
    prettyPrint(root);
    console.log(`Balanced: ${tree.isBalanced()}\n`);

    // const tree = new AVLTree(TEST_VALUES);
    // const root = tree.root;
    // console.log("Current tree:");
    // prettyPrint(root);
    // console.log(`Is the tree balanced: ${tree.isBalanced()}`);

    // console.log("Heights of nodes in level order");
    // let heights = [];
    // root.levelOrder((node) => {
    //     heights.push(`value: ${node.value}, height: ${node.height()}`);
    // });

    // console.log("Depths of nodes in level order");
    // let depths = [];
    // root.levelOrder((node) => {
    //     depths.push(`value: ${node.value}, depth: ${tree.depth(node.value)}`);
    // });

    // console.log(depths);
    // console.log(heights);
    // console.log("\nDeleting -2...");
    // root.delete(-2);
    // prettyPrint(root);
    // console.log(`Is the tree balanced: ${tree.isBalanced()}`);

    // console.log("\nDeleting -5.5...");
    // root.delete(-5.5);
    // prettyPrint(root);
    // console.log(`Is the tree balanced: ${tree.isBalanced()}`);

    // console.log("\nRemoving a leaf node -1001...");
    // root.delete(-1001);
    // prettyPrint(root);
    // console.log(`Is the tree balanced: ${tree.isBalanced()}`);

    // console.log("\nRemoving a node with one non-empty subtree -1000...");
    // root.delete(-1000);
    // prettyPrint(root);
    // console.log(`Is the tree balanced: ${tree.isBalanced()}`);

    // console.log("\nRemoving a non-existant node 5...");
    // root.delete(5);
    // prettyPrint(root);
    // console.log(`Is the tree balanced: ${tree.isBalanced()}`);

    // const rootLevelOrdered = [];
    // root.levelOrder((node) => {
    //     rootLevelOrdered.push(node.value);
    // });
    // console.log(`Level order of root node: ${rootLevelOrdered}`);

    // const rootPreOrdered = [];
    // root.preOrder((node) => {
    //     rootPreOrdered.push(node.value);
    // });
    // console.log(`Pre order of root node: ${rootPreOrdered}`);

    // const rootInOrdered = [];
    // root.inOrder((node) => {
    //     rootInOrdered.push(node.value);
    // });
    // console.log(`In order of root node: ${rootInOrdered}`);

    // const rootPostOrdered = [];
    // root.postOrder((node) => {
    //     rootPostOrdered.push(node.value);
    // });
    // console.log(`Post order of root node: ${rootPostOrdered}`);

    // console.log("Heights of nodes in level order");
    // heights = [];
    // root.levelOrder((node) => {
    //     heights.push(`value: ${node.value}, height: ${node.height()}`);
    // });
    // console.log(heights);

    // console.log("Depths of nodes in level order");
    // depths = [];
    // root.levelOrder((node) => {
    //     depths.push(`value: ${node.value}, depth: ${tree.depth(node.value)}`);
    // });
    // console.log(depths);
}

testAVLTree();
