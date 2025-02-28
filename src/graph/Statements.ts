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
