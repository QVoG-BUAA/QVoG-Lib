import { Value } from "qvog-engine";

/**
 * All constant values in the program.
 * 
 * The value of the constant is stored as a string, you can call specific
 * functions to convert it to the desired type.
 * Before accessing the value with concrete type, you may want to use `getType()`
 * to check the type of the constant.
 * 
 * @category Graph
 */
export class Constant extends Value {
    private value: string;

    constructor(identifier: string, value: string) {
        super(identifier);
        this.value = value;
    }

    /**
     * Get the value of the constant.
     * 
     * @returns The value.
     */
    getValue(): string {
        return this.value;
    }

    /**
     * @returns Boolean value of the constant.
     */
    getBooleanValue(): boolean {
        return this.value === "true";
    }

    /**
     * @returns Integer value of the constant.
     */
    getIntValue(): number {
        return parseInt(this.value);
    }

    /**
     * @returns Float value of the constant.
     */
    getNumberValue(): number {
        return parseFloat(this.value);
    }

    /**
     * This is the same as {@link getValue | `getValue`}.
     * 
     * @returns String value of the constant.
     */
    getStringValue(): string {
        return this.value;
    }
}
