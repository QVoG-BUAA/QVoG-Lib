import { Value } from 'qvog-engine';

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
    private _value: string;

    constructor(identifier: string, value: string) {
        super(identifier);
        this._value = value;
    }

    /**
     * Get the value of the constant.
     *
     * @returns The value.
     */
    public get value(): string {
        return this._value;
    }

    /**
     * @returns Boolean value of the constant.
     */
    public get booleanValue(): boolean {
        return this._value === 'true';
    }

    /**
     * @returns Integer value of the constant.
     */
    public get intValue(): number {
        return parseInt(this._value);
    }

    /**
     * @returns Float value of the constant.
     */
    public get numberValue(): number {
        return parseFloat(this._value);
    }

    /**
     * This is the same as {@link getValue | `getValue`}.
     *
     * @returns String value of the constant.
     */
    public get stringValue(): string {
        return this._value;
    }
}
