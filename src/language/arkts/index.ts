import { LanguageSpecification } from "qvog-engine";

import { AnyTypeRule, AssignmentRule, BinaryOperatorRule, BooleanTypeRule, CompareOperatorRule, ConstantRule, NullTypeRule, NumberTypeRule, StringTypeRule, UnaryOperatorRule, UndefinedTypeRule, UnknownTypeRule, VariableRule } from "./Rules";

export * from "./Specifications";

const ArkTsSpecification: LanguageSpecification = {
    valueRules: [
        VariableRule,
        ConstantRule,
        AssignmentRule,
        BinaryOperatorRule, CompareOperatorRule, UnaryOperatorRule
    ],
    typeRules: [
        AnyTypeRule,
        UnknownTypeRule,
        BooleanTypeRule, NumberTypeRule, StringTypeRule, NullTypeRule, UndefinedTypeRule
    ]
};

export { ArkTsSpecification };
