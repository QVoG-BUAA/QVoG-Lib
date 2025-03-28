import { Type, Value } from 'qvog-engine';

/**
 * Base type for all expressions.
 *
 * You can use `instanceof Expression` to match all expressions.
 *
 * @category Graph
 */
export abstract class Expression extends Value {}

/**
 * Arithmetic binary operator in the program.
 *
 * @category Graph
 */
export class BinaryOperator extends Expression {
    private _leftOperand: Value;
    private _rightOperand: Value;
    private _operator: string;

    constructor(identifier: string, leftOperand: Value, rightOperand: Value, operator: string) {
        super(identifier);
        this._leftOperand = leftOperand;
        this._rightOperand = rightOperand;
        this._operator = operator;
    }

    /**
     * Get the left operand of the binary operator.
     *
     * @returns The left operand.
     */
    public get lhs(): Value {
        return this._leftOperand;
    }

    /**
     * Get the right operand of the binary operator.
     *
     * @returns The right operand.
     */
    public get rhs(): Value {
        return this._rightOperand;
    }

    /**
     * Get the operator of the binary operator.
     *
     * @returns The operator.
     */
    public get operator(): string {
        return this._operator;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        yield this._leftOperand;
        yield this._rightOperand;
    }
}

/**
 * Comparison binary operator in the program.
 *
 * @category Graph
 */
export class CompareOperator extends Expression {
    private _leftOperand: Value;
    private _rightOperand: Value;
    private _operator: string;

    constructor(identifier: string, leftOperand: Value, rightOperand: Value, operator: string) {
        super(identifier);
        this._leftOperand = leftOperand;
        this._rightOperand = rightOperand;
        this._operator = operator;
    }

    /**
     * Get the left operand of the comparison operator.
     *
     * @returns The left operand.
     */
    public get lhs(): Value {
        return this._leftOperand;
    }

    /**
     * Get the right operand of the comparison operator.
     *
     * @returns The right operand.
     */
    public get rhs(): Value {
        return this._rightOperand;
    }

    /**
     * Get the operator of the comparison operator.
     *
     * @returns The operator.
     */
    public get operator(): string {
        return this._operator;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        yield this._leftOperand;
        yield this._rightOperand;
    }
}

/**
 * Unary operator in the program.
 *
 * @category Graph
 */
export class UnaryOperator extends Expression {
    private _operand: Value;
    private _operator: string;

    constructor(identifier: string, operand: Value, operator: string) {
        super(identifier);
        this._operand = operand;
        this._operator = operator;
    }

    /**
     * Get the operand of the unary operator.
     *
     * @returns The operand.
     */
    public get operand(): Value {
        return this._operand;
    }

    /**
     * Get the operator of the unary operator.
     *
     * @returns The operator.
     */
    public get operator(): string {
        return this._operator;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        yield this._operand;
    }
}

/**
 * Invocation expression.
 *
 * This can be regular function call, or method call on an object.
 * If it is a method call, use {@link InvokeExpr.getBase | `getBase`} to get the
 * object, and {@link InvokeExpr.getTarget | `getTarget`} to get the method name.
 * Otherwise, {@link InvokeExpr.getBase | `getBase`} will return `undefined`, and
 * you can use {@link InvokeExpr.getTarget | `getTarget`} to get the function name.
 *
 * @category Graph
 */
export class InvokeExpr extends Expression {
    private _base?: Value;
    private _target: string;
    private _args: Value[];

    constructor(identifier: string, target: string, args: Value[], base?: Value) {
        super(identifier);
        this._base = base;
        this._target = target;
        this._args = args;
    }

    /**
     * Get the base object of the invocation, which is the object that the method
     * is called on.
     *
     * @returns The base object, or `undefined` if it is a regular function call.
     */
    public get base(): Value | undefined {
        return this._base;
    }

    /**
     * Get the target of the invocation, which is the function name that is being called.
     *
     * @returns The target function name.
     */
    public get target(): string {
        return this._target;
    }

    /**
     * Get the number of arguments passed to the function.
     *
     * @returns The number of arguments.
     */
    public get argCount(): number {
        return this._args.length;
    }

    /**
     * Get all arguments passed to the function.
     *
     * @returns The arguments passed to the function.
     */
    public get args(): Value[] {
        return this._args;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        if (this._base) {
            yield this._base;
        }
        for (const arg of this._args) {
            yield arg;
        }
    }
}

/**
 * New expression.
 *
 * Can be new object creation, or array creation.
 * If is an array creation, use {@link NewExpr.getSize | `getSize`} to get the size
 * of the array. Otherwise, {@link NewExpr.getSize | `getSize`} will return `undefined`.
 *
 * @category Graph
 */
export class NewExpr extends Expression {
    private _size?: Value;

    constructor(identifier: string, size?: Value) {
        super(identifier);
        this._size = size;
    }

    /**
     * Get the size of the array being created.
     *
     * @returns The size of the array, or `undefined` if it is an object creation.
     */
    public get size(): Value | undefined {
        return this._size;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        if (this._size) {
            yield this._size;
        }
    }
}

/**
 * @category Graph
 */
export class InstanceOfExpr extends Expression {
    private _object: Value;
    private _testType: Type;

    constructor(identifier: string, object: Value, testType: Type) {
        super(identifier);
        this._object = object;
        this._testType = testType;
    }

    /**
     * Get the object to test.
     *
     * @returns The object to test.
     */
    public get object(): Value {
        return this._object;
    }

    /**
     * Get the type to test against.
     *
     * @returns The type.
     */
    public get testType(): Type {
        return this._testType;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        yield this._object;
    }
}

/**
 * @category Graph
 */
export class TypeOfExpr extends Expression {
    private _operand: Value;

    constructor(identifier: string, operand: Value) {
        super(identifier);
        this._operand = operand;
    }

    /**
     * Get the operand of this typeof expression.
     *
     * @returns The operand.
     */
    public get operand(): Value {
        return this._operand;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        yield this._operand;
    }
}
