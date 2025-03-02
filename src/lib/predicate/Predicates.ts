/**
 * A generic predicate type.
 * 
 * It means by giving a value of type T, it returns a boolean indicating
 * whether the value satisfies the predicate.
 * 
 * @typeParam T The type of the value.
 * 
 * @category Predicate
 */
type Predicate<T> = (value: T) => boolean;

/**
 * A generic field function type.
 * 
 * It means by giving a value of type T, it returns field of value of type U.
 * 
 * @typeParam T The type of the value.
 * @typeParam U The type of the field.
 * 
 * @category Predicate
 */
type FieldFn<T, U> = (value: T) => U;

/**
 * Initial chainable predicate object.
 * 
 * @typeParam U The type of the value.
 * 
 * @category Predicate
 */
export class _P<U> {
    private predicate: Predicate<U>;

    constructor(predicate: Predicate<U>) {
        this.predicate = predicate;
    }

    /**
     * Apply the predicate to a value.
     * 
     * @param value The value to test.
     * @returns true if the value satisfies the predicate, otherwise false.
     */
    test(value: U): boolean {
        return this.predicate(value);
    }

    /**
     * Chain another predicate with AND operator.
     * 
     * If `field` is not provided, it will continue to use the current value
     * as the subject of the predicate.
     * 
     * @typeParam V The type of the field.
     * 
     * @param predicate Predicate.
     * @param field Field function.
     * @returns Chainable predicate object.
     */
    and<V>(predicate: _P<V> | _Q<V, V> | Predicate<V>, field?: FieldFn<U, V>): _Q<U, V> {
        if (!field) {
            field = (value: U) => value as unknown as V;
        }
        const fn = ((predicate instanceof _P) || (predicate instanceof _Q))
            ? (v: V) => predicate.test(v)
            : predicate;
        return new _Q<U, V>(
            (value: U) => this.predicate(value) && fn(field(value)),
            field
        );
    }

    /**
     * Chain another predicate with OR operator.
     * 
     * If `field` is not provided, it will continue to use the current value
     * as the subject of the predicate.
     * 
     * @typeParam V The type of the field.
     * 
     * @param predicate Predicate.
     * @param field Field function.
     * @returns Chainable predicate object.
     */
    or<V>(predicate: _P<V> | _Q<V, V> | Predicate<V>, field?: FieldFn<U, V>): _Q<U, V> {
        if (!field) {
            field = (value: U) => value as unknown as V;
        }
        const fn = ((predicate instanceof _P) || (predicate instanceof _Q))
            ? (v: V) => predicate.test(v)
            : predicate;
        return new _Q<U, V>(
            (value: U) => this.predicate(value) || fn(field(value)),
            field
        );
    }
}

/**
 * A chainable predicate object.
 * 
 * It support a predicate chain from type U to type V.
 * 
 * @typeParam U The initial type of the value.
 * @typeParam V The current type of the value.
 * 
 * @category Predicate
 */
export class _Q<U, V> {
    private predicate: Predicate<U>;
    private field: FieldFn<U, V>;

    constructor(predicate: Predicate<U>, field: FieldFn<U, V>) {
        this.predicate = predicate;
        this.field = field;
    }

    /**
     * Apply the predicate to a value.
     * 
     * @param value The value to test.
     * @returns true if the value satisfies the predicate, otherwise false.
     */
    test(value: U): boolean {
        return this.predicate(value);
    }

    /**
     * Chain another predicate with AND operator.
     * 
     * If `field` is not provided, it will continue to use the current value
     * as the subject of the predicate.
     * 
     * @typeParam W The type of the field.
     * 
     * @param predicate Predicate.
     * @param field Field function.
     * @returns Chainable predicate object.
     */
    and<W>(predicate: _P<W> | Predicate<W>, field?: FieldFn<V, W>): _Q<U, W> {
        if (!field) {
            field = (value: V) => value as unknown as W;
        }
        const fn = (predicate instanceof _P)
            ? (v: W) => predicate.test(v)
            : predicate;
        return new _Q<U, W>(
            (value: U) => this.predicate(value) && fn(field(this.field(value))),
            (value: U) => field(this.field(value))
        );
    }

    /**
     * Chain another predicate with OR operator.
     * 
     * If `field` is not provided, it will continue to use the current value
     * as the subject of the predicate.
     * 
     * @typeParam W The type of the field.
     * 
     * @param predicate Predicate.
     * @param field Field function.
     * @returns Chainable predicate object.
     */
    or<W>(predicate: _P<W> | Predicate<W>, field: FieldFn<V, W>): _Q<U, W> {
        if (!field) {
            field = (value: V) => value as unknown as W;
        }
        const fn = (predicate instanceof _P)
            ? (v: W) => predicate.test(v)
            : predicate;
        return new _Q<U, W>(
            (value: U) => this.predicate(value) || fn(field(this.field(value))),
            (value: U) => field(this.field(value))
        );
    }
}

/**
 * Function wrapper for chainable predicate object.
 * 
 * @param predicate The initial predicate.
 * @returns A chainable predicate object.
 */
export function P<U>(predicate: Predicate<U>): _P<U> {
    return new _P<U>(predicate);
}
