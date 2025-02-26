import { InvalidType, LanguageTypeRule, LanguageValueRule, ValueFactory } from "qvog-engine";

import { Assignment, Constant, Variable } from "~/graph";

import { AssignStmtJson, BinaryOperatorJson, ConstantJson, TypeJson, UnaryOperatorJson, VariableJson } from "./Specifications";
import { AnyType, BooleanType, UnknownType } from "~/graph/Types";
import { BinaryOperator, CompareOperator, UnaryOperator } from "~/graph/Expressions";

//////////////////////////////////////////////////////////////////////
//                           Values                                 //
//////////////////////////////////////////////////////////////////////

export const VariableRule: LanguageValueRule<Variable> = {
    types: "Local",
    build(json: VariableJson, factory: ValueFactory): Variable {
        const value = new Variable(json._identifier, json.name);
        value.setType(factory.buildType(json.type));
        return value;
    }
};

export const ConstantRule: LanguageValueRule<Constant> = {
    types: ["BooleanConstant", "NumberConstant", "StringConstant", "NullConstant", "UndefinedConstant"],
    build(json: ConstantJson, factory: ValueFactory): Constant {
        const value = new Constant(json._identifier);
        value.setType(factory.buildType(json.type));
        return value;
    }
};

//////////////////////////////////////////////////////////////////////
//                           Types                                  //
//////////////////////////////////////////////////////////////////////

export const AnyTypeRule: LanguageTypeRule<AnyType> = {
    types: "AnyType",
    build(json: TypeJson, factory: ValueFactory): AnyType {
        return new AnyType(json._identifier, json.name);
    }
};

export const UnknownTypeRule: LanguageTypeRule<UnknownType> = {
    types: "UnknownType",
    build(json: TypeJson, factory: ValueFactory): UnknownType {
        return new UnknownType(json._identifier, json.name);
    }
};

export const BooleanTypeRule: LanguageTypeRule<BooleanType> = {
    types: "BooleanType",
    build(json: TypeJson, factory: ValueFactory): BooleanType {
        return new BooleanType(json._identifier, json.name);
    }
};

export const NumberTypeRule: LanguageTypeRule<InvalidType> = {
    types: "NumberType",
    build(json: TypeJson, factory: ValueFactory): InvalidType {
        return new InvalidType(json._identifier, json.name);
    }
};

export const StringTypeRule: LanguageTypeRule<InvalidType> = {
    types: "StringType",
    build(json: TypeJson, factory: ValueFactory): InvalidType {
        return new InvalidType(json._identifier, json.name);
    }
};

export const NullTypeRule: LanguageTypeRule<InvalidType> = {
    types: "NullType",
    build(json: TypeJson, factory: ValueFactory): InvalidType {
        return new InvalidType(json._identifier, json.name);
    }
};

export const UndefinedTypeRule: LanguageTypeRule<InvalidType> = {
    types: "UndefinedType",
    build(json: TypeJson, factory: ValueFactory): InvalidType {
        return new InvalidType(json._identifier, json.name);
    }
};

//////////////////////////////////////////////////////////////////////
//                           Statements                             //
//////////////////////////////////////////////////////////////////////

export const AssignmentRule: LanguageValueRule<Assignment> = {
    types: "ArkAssignStmt",
    build(json: AssignStmtJson, factory: ValueFactory): Assignment {
        const target = factory.buildValue(json.leftOp);
        const value = factory.buildValue(json.rightOp);
        return new Assignment(json._identifier, target, value);
    }
};

//////////////////////////////////////////////////////////////////////
//                           Expressions                            //
//////////////////////////////////////////////////////////////////////

export const BinaryOperatorRule: LanguageValueRule<BinaryOperator> = {
    types: "ArkNormalBinopExpr",
    build(json: BinaryOperatorJson, factory: ValueFactory): BinaryOperator {
        const leftOperand = factory.buildValue(json.op1);
        const rightOperand = factory.buildValue(json.op2);
        return new BinaryOperator(json._identifier, leftOperand, rightOperand, json.operator);
    }
};

export const CompareOperatorRule: LanguageValueRule<CompareOperator> = {
    types: "ArkConditionExpr",
    build(json: BinaryOperatorJson, factory: ValueFactory): CompareOperator {
        const leftOperand = factory.buildValue(json.op1);
        const rightOperand = factory.buildValue(json.op2);
        return new CompareOperator(json._identifier, leftOperand, rightOperand, json.operator);
    }
};

export const UnaryOperatorRule: LanguageValueRule<UnaryOperator> = {
    types: "ArkUnaryOperator",
    build(json: UnaryOperatorJson, factory: ValueFactory): UnaryOperator {
        const operand = factory.buildValue(json.op);
        return new UnaryOperator(json._identifier, operand, json.operator);
    }
};
