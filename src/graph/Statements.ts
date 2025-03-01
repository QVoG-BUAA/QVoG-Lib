import { Value } from "qvog-engine";
import { InvokeExpr } from "./Expressions";

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
export class AssignStmt extends Statement {
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

/**
 * Invocation statement, i.e. a function call.
 * 
 * FIXME: Can we assume that invoke statement only contains invoke expression?
 * 
 * @category Graph
 */
export class InvokeStmt extends Statement {
    private expression: InvokeExpr;

    constructor(identifier: string, expression: InvokeExpr) {
        super(identifier);
        this.expression = expression;
    }

    /**
     * Get the invocation expression.
     * 
     * @returns The invocation expression.
     */
    getExpression(): InvokeExpr {
        return this.expression;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        yield this.expression;
    }
}

/**
 * Return statement with an optional return value.
 * 
 * @category Graph
 */
export class ReturnStmt extends Statement {
    private value?: Value;

    constructor(identifier: string, value?: Value) {
        super(identifier);
        this.value = value;
    }

    /**
     * Check if the return statement has a return value.
     * 
     * @returns true if the return statement has a value, false otherwise.
     */
    hasValue(): boolean {
        return this.value !== undefined;
    }

    /**
     * Get the return value.
     * 
     * @returns The return value, or undefined if there is no return value.
     */
    getValue(): Value | undefined {
        return this.value;
    }
}
