import { Queue } from "./Queue.js";

class AVLNode {
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
            let maxNode = this.left;
            let maxParent = this;
            while (maxNode.right !== null) {
                maxParent = maxNode;
                maxNode = maxNode.right;
            }

            // Swap the values
            this.value = maxNode.value;
            maxNode.value = value;

            deletedNode = maxNode.delete(value);

            AVLNode.removeNullChildren(maxParent);
        }

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
