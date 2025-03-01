import { LanguageSpecification } from "qvog-engine";

import { AnyTypeRule, ArrayTypeRule, AssignStmtRule, BinaryOperatorRule, BooleanTypeRule, ClassTypeRule, CompareOperatorRule, ConstantRule, DefaultTypeRule, FunctionTypeRule, InstanceOfExprRule, InvokeExprRule, InvokeStmtRule, NewExprRule, NullTypeRule, NumberTypeRule, ReturnStmtRule, StringTypeRule, TupleTypeRule, UnaryOperatorRule, UndefinedTypeRule, UnknownTypeRule, VariableRule } from "./Rules";

export * from "./Specifications";

/**
 * Specification for Ark TypeScript language.
 * 
 * @category Language
 */
const ArkTsSpecification: LanguageSpecification = {
    valueRules: [
        VariableRule,
        ConstantRule,
        AssignStmtRule,
        BinaryOperatorRule, CompareOperatorRule, UnaryOperatorRule,
        InvokeStmtRule, InvokeExprRule, NewExprRule, InstanceOfExprRule,
        ReturnStmtRule
    ],
    typeRules: [
        AnyTypeRule,
        UnknownTypeRule,
        BooleanTypeRule, NumberTypeRule, StringTypeRule, NullTypeRule, UndefinedTypeRule,
        ArrayTypeRule, TupleTypeRule,
        FunctionTypeRule, ClassTypeRule,
        DefaultTypeRule
    ]
};

export { ArkTsSpecification };
