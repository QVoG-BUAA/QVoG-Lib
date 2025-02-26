import { Value } from "qvog-engine";

/**
 * Base type for all expressions as a wildcard type.
 */
export abstract class Expression extends Value {
}


/**
 * Arithmetic binary operator in the program.
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
     * @returns The left operand.
     */
    getLeftOperand(): Value {
        return this.leftOperand;
    }

    /**
     * Get the right operand of the binary operator.
     * @returns The right operand.
     */
    getRightOperand(): Value {
        return this.rightOperand;
    }

    /**
     * Get the operator of the binary operator.
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
     * @returns The left operand.
     */
    getLeftOperand(): Value {
        return this.leftOperand;
    }

    /**
     * Get the right operand of the comparison operator.
     * @returns The right operand.
     */
    getRightOperand(): Value {
        return this.rightOperand;
    }

    /**
     * Get the operator of the comparison operator.
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
     * @returns The operand.
     */
    getOperand(): Value {
        return this.operand;
    }

    /**
     * Get the operator of the unary operator.
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
