class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    insert(value) {
        // Recursively traverse the subtree and insert the node
        if (this.left !== null && value <= this.value) {
            // Traverse left
            this.left.insert(value);
        } else if (this.right !== null && value > this.value) {
            // Traverse right
            this.right.insert(value);
        } else if (this.left === null && value <= this.value) {
            // Insert left
            this.left = new AVLNode(value);
        } else {
            // Insert right
            this.right = new AVLNode(value);
        }
    }
}

export class AVLTree {
    constructor(values) {
        this.root = AVLTree.buildTree(values);
    }

    static buildTree(values) {
        const root = values.length === 0 ? null : new AVLNode(values[0]);
        for (let i = 1; i < values.length; i++) {
            const val = values[i];
            root.insert(val);
        }

        return root;
    }
}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};
