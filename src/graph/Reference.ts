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
    private base: Value | string;
    private name: string;

    constructor(identifier: string, base: Value | string, name: string) {
        super(identifier);
        this.base = base;
        this.name = name;
    }

    /**
     * Check if the field reference is static.
     *
     * @returns `true` if the field reference is static, `false` otherwise.
     */
    isStatic(): boolean {
        return typeof this.base === 'string';
    }

    /**
     * Get the base object of the field reference.
     *
     * @returns Base object or class name.
     */
    getBase(): Value | string {
        return this.base;
    }

    /**
     * Get the name of the field.
     *
     * @returns The name of the field.
     */
    getName(): string {
        return this.name;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        if (this.base instanceof Value) {
            yield this.base;
        }
    }
}

/**
 * Reference to an element of an array.
 *
 * @category Graph
 */
export class ArrayReference extends Reference {
    private base: Value;
    private index: Value;

    constructor(identifier: string, base: Value, index: Value) {
        super(identifier);
        this.base = base;
        this.index = index;
    }

    /**
     * Get the base array.
     *
     * @returns The base array object.
     */
    getBase(): Value {
        return this.base;
    }

    /**
     * Get the index of the element.
     *
     * @returns The index of the element.
     */
    getIndex(): Value {
        return this.index;
    }

    protected *elements(): IterableIterator<Value> {
        yield this;
        yield this.base;
        yield this.index;
    }
}
