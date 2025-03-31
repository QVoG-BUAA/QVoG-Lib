import { Value } from 'qvog-engine';

import { InvokeExpr } from '~/graph/Expressions';

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
    private _target: Value;
    private _value: Value;

    constructor(identifier: string, target: Value, value: Value) {
        super(identifier);
        this._target = target;
        this._value = value;
    }

    /**
     * Get the target of the assignment, which is the value that is being assigned to.
     *
     * @returns The target value.
     */
    public get target(): Value {
        return this._target;
    }

    /**
     * Get the value that is being assigned.
     *
     * @returns The value.
     */
    public get value(): Value {
        return this._value;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        for (const v of this._target.stream()) {
            yield v;
        }
        for (const v of this._value.stream()) {
            yield v;
        }
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
    private _expression: InvokeExpr;

    constructor(identifier: string, expression: InvokeExpr) {
        super(identifier);
        this._expression = expression;
    }

    /**
     * Get the invocation expression.
     *
     * @returns The invocation expression.
     */
    public get expression(): InvokeExpr {
        return this._expression;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        for (const v of this._expression.stream()) {
            yield v;
        }
    }
}

/**
 * Return statement with an optional return value.
 *
 * @category Graph
 */
export class ReturnStmt extends Statement {
    private _value?: Value;

    constructor(identifier: string, value?: Value) {
        super(identifier);
        this._value = value;
    }

    /**
     * Check if the return statement has a return value.
     *
     * @returns `true` if the return statement has a value, `false` otherwise.
     */
    hasValue(): boolean {
        return this._value !== undefined;
    }

    /**
     * Get the return value.
     *
     * @returns The return value, or undefined if there is no return value.
     */
    public get value(): Value | undefined {
        return this._value;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        if (this._value) {
            for (const v of this._value.stream()) {
                yield v;
            }
        }
    }
}

/**
 * If statement.
 *
 * @category Graph
 */
export class IfStmt extends Statement {
    private _condition: Value;

    constructor(identifier: string, condition: Value) {
        super(identifier);
        this._condition = condition;
    }

    /**
     * Get the condition expression.
     *
     * @returns The condition expression.
     */
    public get condition(): Value {
        return this._condition;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        for (const v of this._condition.stream()) {
            yield v;
        }
    }
}
