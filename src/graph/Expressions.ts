import { Value } from "qvog-engine";

/**
 * Base type for all expressions.
 * 
 * You can use `instanceof Expression` to match all expressions.
 * 
 * @category Graph
 */
export abstract class Expression extends Value {
}

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
 * Invocation expression, i.e. a function call.
 * 
 * @category Graph
 */
export class InvokeExpr extends Expression {
    private target: string;
    private args: Value[];

    constructor(identifier: string, target: string, args: Value[]) {
        super(identifier);
        this.target = target;
        this.args = args;
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
        for (const arg of this.args) {
            yield arg;
        }
    }
}
