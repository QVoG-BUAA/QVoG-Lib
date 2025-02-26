import { CodeNode, CodeNodePredicate, CodeNodePredicateFn, Configuration, Value, ValuePredicate } from "qvog-engine";

/**
 * Adapt predicate for code node to value predicate.
 * 
 * The predicates used in DSL API are mainly for `Value`, so this
 * function can be used to fit the code node predicate into the value predicate.
 * Simply wraps it around your code node predicate.
 * 
 * @param predicate The predicate to test the code node.
 * @returns Converted value predicate.
 * 
 * @category Predicates
 */
export function asCodeNode(predicate: CodeNodePredicate | CodeNodePredicateFn): ValuePredicate {
    return ValuePredicate.of(
        (value: Value) => {
            const node = Configuration.getContext().getNode(value);
            const func = (predicate instanceof CodeNodePredicate) ? predicate.test : predicate;
            return (node instanceof CodeNode) && func(node);
        });
}
