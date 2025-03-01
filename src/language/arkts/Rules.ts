import { AstJson, LanguageTypeRule, LanguageValueRule, ValueFactory } from "qvog-engine";

import { AssignStmt, Constant, InvokeStmt, Variable } from "~/graph";
import { BinaryOperator, CompareOperator, InvokeExpr, NewExpr, UnaryOperator } from "~/graph/Expressions";
import { AnyType, ArrayType, BooleanType, ClassType, FunctionType, NullType, NumberType, StringType, TupleType, UndefinedType, UnknownType } from "~/graph/Types";

import { ArrayTypeJson, AssignStmtJson, BinaryOperatorJson, ConstantJson, InvokeExprJson, InvokeStmtJson, NewExprJson, TupleTypeJson, TypeJson, UnaryOperatorJson, VariableJson } from "./Specifications";

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

export const NumberTypeRule: LanguageTypeRule<NumberType> = {
    types: "NumberType",
    build(json: TypeJson, factory: ValueFactory): NumberType {
        return new NumberType(json._identifier, json.name);
    }
};

export const StringTypeRule: LanguageTypeRule<StringType> = {
    types: "StringType",
    build(json: TypeJson, factory: ValueFactory): StringType {
        return new StringType(json._identifier, json.name);
    }
};

export const NullTypeRule: LanguageTypeRule<NullType> = {
    types: "NullType",
    build(json: TypeJson, factory: ValueFactory): NullType {
        return new NullType(json._identifier, json.name);
    }
};

export const UndefinedTypeRule: LanguageTypeRule<UndefinedType> = {
    types: "UndefinedType",
    build(json: TypeJson, factory: ValueFactory): UndefinedType {
        return new UndefinedType(json._identifier, json.name);
    }
};

export const ArrayTypeRule: LanguageTypeRule<ArrayType> = {
    types: "ArrayType",
    build(json: ArrayTypeJson, factory: ValueFactory): ArrayType {
        const elementType = factory.buildType(json.baseType);
        return new ArrayType(json._identifier, json.name, elementType, json.dimensions);
    }
};

export const TupleTypeRule: LanguageTypeRule<TupleType> = {
    types: "TupleType",
    build(json: TupleTypeJson, factory: ValueFactory): TupleType {
        const elementTypes = json.types.map((type: AstJson) => factory.buildType(type));
        return new TupleType(json._identifier, json.name, elementTypes);
    }
};

export const FunctionTypeRule: LanguageTypeRule<FunctionType> = {
    types: "FunctionType",
    build(json: TypeJson, factory: ValueFactory): FunctionType {
        return new FunctionType(json._identifier, json.name);
    }
};

export const ClassTypeRule: LanguageTypeRule<ClassType> = {
    types: "ClassType",
    build(json: TypeJson, factory: ValueFactory): ClassType {
        return new ClassType(json._identifier, json.name);
    }
};

//////////////////////////////////////////////////////////////////////
//                           Statements                             //
//////////////////////////////////////////////////////////////////////

export const AssignStmtRule: LanguageValueRule<AssignStmt> = {
    types: "ArkAssignStmt",
    build(json: AssignStmtJson, factory: ValueFactory): AssignStmt {
        const target = factory.buildValue(json.leftOp);
        const value = factory.buildValue(json.rightOp);
        return new AssignStmt(json._identifier, target, value);
    }
};

export const InvokeStmtRule: LanguageValueRule<InvokeStmt> = {
    types: "ArkInvokeStmt",
    build(json: InvokeStmtJson, factory: ValueFactory): InvokeStmt {
        const expression = factory.buildValue<InvokeExpr>(json.invokeExpr);
        return new InvokeStmt(json._identifier, expression);
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

export const InvokeExprRule: LanguageValueRule<InvokeExpr> = {
    types: ["ArkPtrInvokeExpr", "ArkStaticInvokeExpr", "ArkInstanceInvokeExpr"],
    build(json: InvokeExprJson, factory: ValueFactory): InvokeExpr {
        const args = json.args.map((arg: AstJson) => factory.buildValue(arg));
        const expression = new InvokeExpr(json._identifier, json.name, args);
        expression.setType(factory.buildType(json.type));
        return expression;
    }
};

export const NewExprRule: LanguageValueRule<NewExpr> = {
    types: "ArkNewExpr",
    build(json: NewExprJson, factory: ValueFactory): NewExpr {
        const expression = new NewExpr(json._identifier);
        expression.setType(factory.buildType(json.type));
        return expression;
    }
};
