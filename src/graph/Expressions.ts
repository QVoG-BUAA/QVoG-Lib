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
    private leftOperand: Value;
    private rightOperand: Value;
    private operator: string;

    constructor(identifier: string, leftOperand: Value, rightOperand: Value, operator: string) {
        super(identifier);
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.operator = operator;
    }

    /**
     * Get the left operand of the binary operator.
     *
     * @returns The left operand.
     */
    getLeftOperand(): Value {
        return this.leftOperand;
    }

    /**
     * Get the right operand of the binary operator.
     *
     * @returns The right operand.
     */
    getRightOperand(): Value {
        return this.rightOperand;
    }

    /**
     * Get the operator of the binary operator.
     *
     * @returns The operator.
     */
    getOperator(): string {
        return this.operator;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        yield this.leftOperand;
        yield this.rightOperand;
    }
}

/**
 * Comparison binary operator in the program.
 *
 * @category Graph
 */
export class CompareOperator extends Expression {
    private leftOperand: Value;
    private rightOperand: Value;
    private operator: string;

    constructor(identifier: string, leftOperand: Value, rightOperand: Value, operator: string) {
        super(identifier);
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.operator = operator;
    }

    /**
     * Get the left operand of the comparison operator.
     *
     * @returns The left operand.
     */
    getLeftOperand(): Value {
        return this.leftOperand;
    }

    /**
     * Get the right operand of the comparison operator.
     *
     * @returns The right operand.
     */
    getRightOperand(): Value {
        return this.rightOperand;
    }

    /**
     * Get the operator of the comparison operator.
     *
     * @returns The operator.
     */
    getOperator(): string {
        return this.operator;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        yield this.leftOperand;
        yield this.rightOperand;
    }
}

/**
 * Unary operator in the program.
 *
 * @category Graph
 */
export class UnaryOperator extends Expression {
    private operand: Value;
    private operator: string;

    constructor(identifier: string, operand: Value, operator: string) {
        super(identifier);
        this.operand = operand;
        this.operator = operator;
    }

    /**
     * Get the operand of the unary operator.
     *
     * @returns The operand.
     */
    getOperand(): Value {
        return this.operand;
    }

    /**
     * Get the operator of the unary operator.
     *
     * @returns The operator.
     */
    getOperator(): string {
        return this.operator;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        yield this.operand;
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
    private base?: Value;
    private target: string;
    private args: Value[];

    constructor(identifier: string, target: string, args: Value[], base?: Value) {
        super(identifier);
        this.base = base;
        this.target = target;
        this.args = args;
    }

    /**
     * Get the base object of the invocation, which is the object that the method
     * is called on.
     *
     * @returns The base object, or `undefined` if it is a regular function call.
     */
    getBase(): Value | undefined {
        return this.base;
    }

    /**
     * Get the target of the invocation, which is the function name that is being called.
     *
     * @returns The target function name.
     */
    getTarget(): string {
        return this.target;
    }

    /**
     * Get the number of arguments passed to the function.
     *
     * @returns The number of arguments.
     */
    getArgsCount(): number {
        return this.args.length;
    }

    /**
     * Get all arguments passed to the function.
     *
     * @returns The arguments passed to the function.
     */
    getArgs(): Value[] {
        return this.args;
    }

    /**
     * Get the argument at the specified index.
     *
     * @param index Index of the argument to get.
     * @returns The argument at the specified index.
     */
    getArg(index: number): Value {
        return this.args[index];
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        if (this.base) {
            yield this.base;
        }
        for (const arg of this.args) {
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
    private size?: Value;

    constructor(identifier: string, size?: Value) {
        super(identifier);
        this.size = size;
    }

    /**
     * Get the size of the array being created.
     *
     * @returns The size of the array, or `undefined` if it is an object creation.
     */
    getSize(): Value | undefined {
        return this.size;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        if (this.size) {
            yield this.size;
        }
    }
}

/**
 * @category Graph
 */
export class InstanceOfExpr extends Expression {
    private object: Value;
    private testType: Type;

    constructor(identifier: string, object: Value, testType: Type) {
        super(identifier);
        this.object = object;
        this.testType = testType;
    }

    /**
     * Get the object to test.
     *
     * @returns The object to test.
     */
    getObject(): Value {
        return this.object;
    }

    /**
     * Get the type to test against.
     *
     * @returns The type.
     */
    getTestType(): Type {
        return this.testType;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        yield this.object;
    }
}

/**
 * @category Graph
 */
export class TypeOfExpr extends Expression {
    private operand: Value;

    constructor(identifier: string, operand: Value) {
        super(identifier);
        this.operand = operand;
    }

    /**
     * Get the operand of this typeof expression.
     *
     * @returns The operand.
     */
    getOperand(): Value {
        return this.operand;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        yield this.operand;
    }
}
