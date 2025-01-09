import { CodeNode, CodeNodePredicate, CodeNodePredicateFn, Configuration, Value, ValuePredicate } from "qvog-engine";

export function asCodeNode(predicate: CodeNodePredicate | CodeNodePredicateFn): ValuePredicate {
    return ValuePredicate.of(
        (value: Value) => {
            const node = Configuration.getContext().getNode(value);
            const func = (predicate instanceof CodeNodePredicate) ? predicate.test : predicate;
            return (node instanceof CodeNode) && func(node);
        });
}
