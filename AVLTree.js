import { Queue } from "./Queue.js";

class AVLNode {
    #height = 0;

    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    static removeNullChildren(node) {
        if (node === null) {
            return;
        }

        const leftNull = node.left !== null && node.left.value === null;
        const rightNull = node.right !== null && node.right.value === null;

        node.left = leftNull ? null : node.left;
        node.right = rightNull ? null : node.right;
    }

    static getChildDir(node, parent) {
        if (node === null || parent === null) {
            return null;
        }

        return node.value <= parent.value ? "left" : "right";
    }

    rotate(left = true) {
        // Leverage symmetry
        const dir = left ? "left" : "right";
        const opp = left ? "right" : "left";

        // Check if we can rotate
        if (this[opp] === null) {
            return;
        }

        // Swap the values
        let tmp = this.value;
        this.value = this[opp].value;
        this[opp].value = tmp;

        // Swap subtrees
        tmp = this[opp].left;
        this[opp].left = this[opp].right;
        this[opp].right = tmp;

        tmp = this[opp][dir];
        this[opp][dir] = this[dir];
        this[dir] = tmp;

        // Swap left and right child
        tmp = this.left;
        this.left = this.right;
        this.right = tmp;

        this[dir].updateHeight();
        this.updateHeight();
    }

    updateHeight() {
        const lHeight = this.left === null ? -1 : this.left.height();
        const rHeight = this.right === null ? -1 : this.right.height();

        this.#height = Math.max(lHeight, rHeight) + 1;
    }

    insert(value) {
        // Don't allow for duplicate keys
        if (value === this.value) {
            return;
        }

        // Recursively traverse the subtree and insert the node
        if (this.left !== null && value < this.value) {
            // Traverse left
            this.left.insert(value);
        } else if (this.right !== null && value > this.value) {
            // Traverse right
            this.right.insert(value);
        } else if (this.left === null && value <= this.value) {
            // Insert left
            this.left = new AVLNode(value);
        } else if (this.right === null && value > this.value) {
            // Insert right
            this.right = new AVLNode(value);
        }
        this.updateHeight();
        this.rebalance();
    }

    find(value) {
        if (this.value === value) {
            return this;
        }

        if (this.left !== null && value < this.value) {
            return this.left.find(value); // Traverse left
        } else if (this.right !== null && value > this.value) {
            return this.right.find(value); // Traverse right
        } else {
            return null; // Value not found
        }
    }

    // Returns the deleted node if it exists, and null if it doesn't exist.
    delete(value) {
        // Find the target value first
        if (this.value !== value) {
            const nextNode = value <= this.value ? this.left : this.right;

            // Node not found
            if (nextNode === null) {
                return null;
            }

            const deleted = nextNode.delete(value);
            AVLNode.removeNullChildren(this);
            this.updateHeight();
            this.rebalance();

            return deleted;
        }

        // When the value is found, null the value so we know when to remove it
        this.value = null;

        let deletedNode = null;

        // If this node is a leaf
        if (this.left === null && this.right === null) {
            deletedNode = this;
        }

        // If this node has exactly one non-empty subtree
        else if (this.left === null || this.right === null) {
            const target = this.left !== null ? this.left : this.right;

            // Swap the values
            this.value = target.value;
            target.value = value;

            this.left = target.left;
            this.right = target.right;

            deletedNode = target;
        }

        // If this node has exactly two non-empty subtrees
        else {
            // Find the maximum node of the left subtree (successor)
            // Push [node, nodeParent] pairs onto the stack.
            const stack = [[this.left, this]];

            let maxNode = this.left;
            let maxParent = this;
            while (maxNode.right !== null) {
                maxParent = maxNode;
                maxNode = maxNode.right;
                stack.push([maxNode, maxParent]);
            }

            // Swap the values
            this.value = maxNode.value;
            maxNode.value = value;
            deletedNode = maxNode.delete(value);

            // Update the heights of the nodes we traversed
            while (stack.length > 0) {
                const [node, parent] = stack.pop();
                AVLNode.removeNullChildren(parent);
                node.updateHeight();
                node.rebalance();
            }
        }

        this.updateHeight();
        this.rebalance();

        return deletedNode;
    }

    levelOrder(callback) {
        const queue = new Queue([this]);
        while (queue.size() > 0) {
            for (let i = 0; i < queue.size(); i++) {
                const node = queue.dequeue();
                callback(node);

                if (node.left !== null) {
                    queue.enqueue(node.left);
                }
                if (node.right !== null) {
                    queue.enqueue(node.right);
                }
            }
        }
    }

    inOrder(callback) {
        if (this.left !== null) {
            this.left.inOrder(callback);
        }
        callback(this);
        if (this.right !== null) {
            this.right.inOrder(callback);
        }
    }

    preOrder(callback) {
        callback(this);
        if (this.left !== null) {
            this.left.preOrder(callback);
        }
        if (this.right !== null) {
            this.right.preOrder(callback);
        }
    }

    postOrder(callback) {
        if (this.left !== null) {
            this.left.postOrder(callback);
        }
        if (this.right !== null) {
            this.right.postOrder(callback);
        }
        callback(this);
    }

    height() {
        return this.#height;
    }

    depth(value) {
        // Assumes that this node is the root to calculate the depth.
        // Returns -1 if the node is not found.
        const node = this.find(value);
        return node === null ? -1 : this.height() - node.height();
    }

    childHeightDifference() {
        // Returns the height difference between the right subtree and the left subtree.
        const lHeight = this.left === null ? -1 : this.left.height();
        const rHeight = this.right === null ? -1 : this.right.height();
        return rHeight - lHeight;
    }

    isBalanced() {
        let thisNodeBalanced = Math.abs(this.childHeightDifference()) <= 1;

        if (this.left !== null) {
            thisNodeBalanced &&= this.left.isBalanced();
        }

        if (this.right !== null) {
            thisNodeBalanced &&= this.right.isBalanced();
        }

        return thisNodeBalanced;
    }

    rebalance() {
        const delta = this.childHeightDifference();

        // this node is balanced, no need to rebalance this node.
        if (Math.abs(delta) <= 1) {
            return;
        }

        // Leverage symmetry
        const heavyDir = delta > 1 ? "right" : "left";

        const childDelta = this[heavyDir].childHeightDifference();
        const rotateLeft = delta > 1;

        const sameSideHeavy = childDelta * delta;
        // Same side heavy or balanced
        if (sameSideHeavy >= 0) {
            this.rotate(rotateLeft);
        }

        // Opposite side heavy
        else {
            this[heavyDir].rotate(!rotateLeft);
            this.rotate(rotateLeft);
        }
    }
}

export class AVLTree {
    constructor(values = []) {
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

    depth(value) {
        return this.root.depth(value);
    }

    isBalanced() {
        return this.root.isBalanced();
    }

    insert(value) {
        if (this.root === null) {
            this.root = new AVLNode(value);
        } else {
            this.root.insert(value);
        }
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
