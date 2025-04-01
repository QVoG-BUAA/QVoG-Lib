import { Value } from 'qvog-engine';

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
export type Predicate<T> = (value: T) => boolean;

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
export class PImpl<U> {
    private predicate: Predicate<U>;

    constructor(predicate: Predicate<U>) {
        this.predicate = predicate;
    }

    /**
     * Apply the predicate to a value.
     *
     * @param value The value to test.
     * @returns `true` if the value satisfies the predicate, otherwise `false`.
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
     * If `clazz` is provided, it will check if the field is an instance of the class or not first before
     * applying the predicate, saving you from an extra type check before this call.
     *
     * @typeParam V The type of the field.
     *
     * @param predicate Predicate.
     * @param field Field function.
     * @param clazz Class type.
     * @returns Chainable predicate object.
     */
    and<V = U>(predicate: PImpl<V> | Predicate<V>, field?: FieldFn<U, V>, clazz?: new (...args: any) => V): PImpl<U> {
        if (!field) {
            field = (value: U): V => value as unknown as V;
        }
        const fn = predicate instanceof PImpl ? (v: V): boolean => predicate.test(v) : predicate;
        if (clazz) {
            const typedFn = (v: V): boolean => v instanceof clazz && fn(v);
            return new PImpl<U>((v: U) => this.predicate(v) && typedFn(field(v)));
        }
        return new PImpl<U>((v: U) => this.predicate(v) && fn(field(v)));
    }

    /**
     * Chain another predicate with OR operator.
     *
     * If `field` is not provided, it will continue to use the current value
     * as the subject of the predicate.
     * 
     * If `clazz` is provided, it will check if the field is an instance of the class or not first before
     * applying the predicate, saving you from an extra type check before this call.
     *
     * @typeParam V The type of the field.
     *
     * @param predicate Predicate.
     * @param field Field function.
     * @param clazz Class type.
     * @returns Chainable predicate object.
     */
    or<V = U>(predicate: PImpl<V> | Predicate<V>, field?: FieldFn<U, any>, clazz?: new (...args: any) => V): PImpl<U> {
        if (!field) {
            field = (value: U): V => value as unknown as V;
        }
        const fn = predicate instanceof PImpl ? (v: V): boolean => predicate.test(v) : predicate;
        if (clazz) {
            const typedFn = (v: V): boolean => v instanceof clazz && fn(v);
            return new PImpl<U>((v: U) => this.predicate(v) && typedFn(field(v)));
        }
        return new PImpl<U>((v: U) => this.predicate(v) || fn(field(v)));
    }

    /**
     * Get the chained predicate.
     *
     * @returns The predicate function.
     */
    done(): Predicate<U> {
        return this.predicate;
    }
}

/**
 * Function wrapper for chainable predicate object.
 *
 * @typeParam T The type of the value.
 *
 * @param predicate The initial predicate.
 * @returns A chainable predicate object.
 */
export function P<T = Value>(predicate: Predicate<T>): PImpl<T> {
    return new PImpl<T>(predicate);
}

/**
 * Provides extra type checking for the predicate.
 *
 * @typeParam T The type of the desired value.
 * @typeParam U The type of the actual value.
 *
 * @param clazz The desired class type.
 * @param predicate The predicate to test desired class type.
 * @returns `true` if the value is an instance of the class and satisfies the predicate, otherwise `false`.
 */
export function Q<T, U = Value>(
    clazz: new (...args: any) => T,
    predicate: Predicate<T> = () => true,
    field?: (v: U) => any
): Predicate<U> {
    if (field) {
        return (value: U): boolean => {
            const f = field(value);
            if (f instanceof clazz) {
                return predicate(f);
            }
            return false;
        };
    }

    return (value: U): boolean => {
        if (value instanceof clazz) {
            return predicate(value as T);
        }
        return false;
    };
}
