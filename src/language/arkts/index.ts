import { LanguageSpecification } from "qvog-engine";

import { AnyTypeRule, ArrayTypeRule, AssignStmtRule, BinaryOperatorRule, BooleanTypeRule, CompareOperatorRule, ConstantRule, FunctionTypeRule, InvokeExprRule, InvokeStmtRule, NullTypeRule, NumberTypeRule, StringTypeRule, TupleTypeRule, UnaryOperatorRule, UndefinedTypeRule, UnknownTypeRule, VariableRule } from "./Rules";

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
        InvokeStmtRule, InvokeExprRule
    ],
    typeRules: [
        AnyTypeRule,
        UnknownTypeRule,
        BooleanTypeRule, NumberTypeRule, StringTypeRule, NullTypeRule, UndefinedTypeRule,
        ArrayTypeRule, TupleTypeRule,
        FunctionTypeRule
    ]
};

export { ArkTsSpecification };
