import { LanguageSpecification } from 'qvog-engine';

import * as RULE from './Rules';

export * from './Specifications';

/**
 * Specification for Ark TypeScript language.
 *
 * @category Language
 */
const ArkTsSpecification: LanguageSpecification = {
    valueRules: [
        RULE.VariableRule,
        RULE.ConstantRule,
        RULE.FieldReferenceRule,
        RULE.ArrayReferenceRule,
        RULE.AssignStmtRule,
        RULE.InvokeStmtRule,
        RULE.ReturnStmtRule,
        RULE.IfStmtRule,
        RULE.BinaryOperatorRule,
        RULE.CompareOperatorRule,
        RULE.UnaryOperatorRule,
        RULE.InvokeExprRule,
        RULE.NewExprRule,
        RULE.InstanceOfExprRule,
        RULE.TypeOfExprRule,
    ],
    typeRules: [
        RULE.AnyTypeRule,
        RULE.UnknownTypeRule,
        RULE.BooleanTypeRule,
        RULE.NumberTypeRule,
        RULE.StringTypeRule,
        RULE.NullTypeRule,
        RULE.UndefinedTypeRule,
        RULE.ArrayTypeRule,
        RULE.TupleTypeRule,
        RULE.UnionTypeRule,
        RULE.FunctionTypeRule,
        RULE.ClassTypeRule,
        RULE.DefaultTypeRule,
    ],
};

export { ArkTsSpecification };
