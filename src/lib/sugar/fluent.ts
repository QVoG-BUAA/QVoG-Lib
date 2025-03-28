import { CurrentQueryContext, ICanSetAlias, Value, ValuePredicateFn } from 'qvog-engine';

import { P, Predicate } from '~/lib/predicate';

/**
 * Simplify FromClause.
 *
 * Example:
 *
 * ```typescript
 * from(f => f.withData(v => v.stream().any(Predicate)).as('alias'))...
 * ```
 *
 * This is equivalent to:
 *
 * ```typescript
 * from(f => S.data(Predicate).as('alias'))...
 * ```
 *
 * Indeed, simplified, but you are unable to perform shallow test on AST root only.
 *
 * @category Sugar
 */
export class S {
    static data(predicate: ValuePredicateFn): ICanSetAlias {
        const f = CurrentQueryContext.fromDescriptor;
        return f.withData((v: Value) => v.stream().any(predicate));
    }

    static dataOf<T>(clazz: any, predicate: Predicate<T> = (v: T) => true): ICanSetAlias {
        const f = CurrentQueryContext.fromDescriptor;
        return f.withData((v: Value) =>
            v.stream().any(
                P<Value>((s: Value) => s instanceof clazz)
                    .and(predicate)
                    .done()
            )
        );
    }

    static predicate(predicate: ValuePredicateFn): ICanSetAlias {
        const f = CurrentQueryContext.fromDescriptor;
        return f.withPredicate(predicate);
    }

    static predicateOf<T>(clazz: any, predicate: Predicate<T> = (v: T) => true): ICanSetAlias {
        const f = CurrentQueryContext.fromDescriptor;
        return f.withPredicate((v: Value) =>
            v.stream().any(
                P<Value>((s: Value) => s instanceof clazz)
                    .and(predicate)
                    .done()
            )
        );
    }
}
