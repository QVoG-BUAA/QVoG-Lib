import {
    FilterDescriptor,
    FilterDescriptorBuilder,
    FlowPredicate,
    FlowPredicateFn,
    RowPredicate,
    RowPredicateFn,
    Value,
    ValuePredicate,
} from 'qvog-engine';
import { Predicate } from '~/lib/predicate';

/**
 * Simplify value where clause.
 *
 * @example
 *
 * The complete where clause would be:
 *
 * ```typescript
 * q.where(f => f.on('alias').where(ValuePredicate.of(predicate)))
 * ```
 *
 * This is equivalent to:
 *
 * ```typescript
 * where('alias', predicate)
 * ```
 *
 * @param table Table name.
 * @param predicate Value predicate.
 * @returns Filter descriptor.
 */
export function value<T extends Value = Value>(table: string, predicate: Predicate<T>): FilterDescriptor {
    const f = new FilterDescriptorBuilder();
    return f
        .on(table)
        .where(ValuePredicate.of((v) => predicate(v as T)))
        .build();
}

/**
 * Simplify row where clause.
 *
 * @see {@link value}.
 */
export function row(table: string, predicate: RowPredicateFn): FilterDescriptor {
    const f = new FilterDescriptorBuilder();
    return f.on(table).where(RowPredicate.of(predicate)).build();
}

/**
 * Simplify flow where clause.
 *
 * @see {@link value}.
 */
export function flow(table: string, predicate: FlowPredicateFn): FilterDescriptor {
    const f = new FilterDescriptorBuilder();
    return f.on(table).where(FlowPredicate.of(predicate)).build();
}
