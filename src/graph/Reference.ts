import { Value } from 'qvog-engine';

/**
 * Wildcard class for all reference values.
 *
 * @category Graph
 */
export abstract class Reference extends Value {
    constructor(identifier: string) {
        super(identifier);
    }
}

/**
 * Reference to a field of an object.
 *
 * It can be both instance reference or static reference.
 * If it is a static reference, the base object is a string, representing the class name.
 * Otherwise, the base object is a `Value` representing the object.
 *
 * Use {@link FieldReference.isStatic | `isStatic`} to check if the field
 * reference is static.
 *
 * @category Graph
 */
export class FieldReference extends Reference {
    private _base: Value | string;
    private _name: string;

    constructor(identifier: string, base: Value | string, name: string) {
        super(identifier);
        this._base = base;
        this._name = name;
    }

    /**
     * Check if the field reference is static.
     *
     * @returns `true` if the field reference is static, `false` otherwise.
     */
    isStatic(): boolean {
        return typeof this._base === 'string';
    }

    /**
     * Get the base object of the field reference.
     *
     * @returns Base object or class name.
     */
    public get base(): Value | string {
        return this._base;
    }

    /**
     * Get the name of the field.
     *
     * @returns The name of the field.
     */
    public get name(): string {
        return this._name;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        if (this._base instanceof Value) {
            yield this._base;
        }
    }
}

/**
 * Reference to an element of an array.
 *
 * @category Graph
 */
export class ArrayReference extends Reference {
    private _base: Value;
    private _index: Value;

    constructor(identifier: string, base: Value, index: Value) {
        super(identifier);
        this._base = base;
        this._index = index;
    }

    /**
     * Get the base array.
     *
     * @returns The base array object.
     */
    public get base(): Value {
        return this._base;
    }

    /**
     * Get the index of the element.
     *
     * @returns The index of the element.
     */
    public get index(): Value {
        return this._index;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        yield this._base;
        yield this._index;
    }
}
