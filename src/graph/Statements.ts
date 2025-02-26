import { Value } from "qvog-engine";

/**
 * Base type for all statements.
 * 
 * You can use `instanceof Statement` to match all statements.
 * 
 * @category Graph
 */
export class Statement extends Value {
    constructor(identifier: string) {
        super(identifier);
    }
}

/**
 * Assignment statement.
 * 
 * @category Graph
 */
export class Assignment extends Statement {
    private target: Value;
    private value: Value;

    constructor(identifier: string, target: Value, value: Value) {
        super(identifier);
        this.target = target;
        this.value = value;
    }

    /**
     * Get the target of the assignment, which is the value that is being assigned to.
     * 
     * @returns The target value.
     */
    getTarget(): Value {
        return this.target;
    }

    /**
     * Get the value that is being assigned.
     * 
     * @returns The value.
     */
    getValue(): Value {
        return this.value;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        yield this.target;
        yield this.value;
    }
}