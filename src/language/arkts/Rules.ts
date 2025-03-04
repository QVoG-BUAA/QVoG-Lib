import { AstJson, InvalidType, LanguageTypeRule, LanguageValueRule, ValueFactory } from 'qvog-engine';

import { ArrayReference, AssignStmt, Constant, FieldReference, IfStmt, InvokeStmt, ReturnStmt, Variable } from '~/graph';
import { BinaryOperator, CompareOperator, InstanceOfExpr, InvokeExpr, NewExpr, UnaryOperator } from '~/graph/Expressions';
import { AnyType, ArrayType, BooleanType, ClassType, FunctionType, NullType, NumberType, StringType, TupleType, UndefinedType, UnionType, UnknownType } from '~/graph/Types';

import * as JSON from './Specifications';

export const DefaultTypeRule: LanguageTypeRule<InvalidType> = {
    types: '*',
    build(json: JSON.TypeJson, factory: ValueFactory): InvalidType {
        return new InvalidType(json._identifier, json.name);
    }
};

//////////////////////////////////////////////////////////////////////
//                           Values                                 //
//////////////////////////////////////////////////////////////////////

export const VariableRule: LanguageValueRule<Variable> = {
    types: 'Local',
    build(json: JSON.VariableJson, factory: ValueFactory): Variable {
        const value = new Variable(json._identifier, json.name);
        value.setType(factory.buildType(json.type));
        return value;
    }
};

export const ConstantRule: LanguageValueRule<Constant> = {
    types: ['BooleanConstant', 'NumberConstant', 'StringConstant', 'NullConstant', 'UndefinedConstant'],
    build(json: JSON.ConstantJson, factory: ValueFactory): Constant {
        const value = new Constant(json._identifier, json.value);
        value.setType(factory.buildType(json.type));
        return value;
    }
};

export const FieldReferenceRule: LanguageValueRule<FieldReference> = {
    types: 'ArkInstanceFieldRef',
    build(json: JSON.FieldReferenceJson, factory: ValueFactory): FieldReference {
        const base = (typeof json.base === 'string') ? json.base : factory.buildValue(json.base);
        const value = new FieldReference(json._identifier, base, json.name);
        value.setType(factory.buildType(json.type));
        return value;
    }
};

export const ArrayReferenceRule: LanguageValueRule<ArrayReference> = {
    types: 'ArkArrayRef',
    build(json: JSON.ArrayReferenceJson, factory: ValueFactory): ArrayReference {
        const base = factory.buildValue(json.base);
        const index = factory.buildValue(json.index);
        const value = new ArrayReference(json._identifier, base, index);
        value.setType(factory.buildType(json.type));
        return value;
    }
};

//////////////////////////////////////////////////////////////////////
//                           Types                                  //
//////////////////////////////////////////////////////////////////////

export const AnyTypeRule: LanguageTypeRule<AnyType> = {
    types: 'AnyType',
    build(json: JSON.TypeJson, factory: ValueFactory): AnyType {
        return new AnyType(json._identifier, json.name);
    }
};

export const UnknownTypeRule: LanguageTypeRule<UnknownType> = {
    types: 'UnknownType',
    build(json: JSON.TypeJson, factory: ValueFactory): UnknownType {
        return new UnknownType(json._identifier, json.name);
    }
};

export const BooleanTypeRule: LanguageTypeRule<BooleanType> = {
    types: 'BooleanType',
    build(json: JSON.TypeJson, factory: ValueFactory): BooleanType {
        return new BooleanType(json._identifier, json.name);
    }
};

export const NumberTypeRule: LanguageTypeRule<NumberType> = {
    types: 'NumberType',
    build(json: JSON.TypeJson, factory: ValueFactory): NumberType {
        return new NumberType(json._identifier, json.name);
    }
};

export const StringTypeRule: LanguageTypeRule<StringType> = {
    types: 'StringType',
    build(json: JSON.TypeJson, factory: ValueFactory): StringType {
        return new StringType(json._identifier, json.name);
    }
};

export const NullTypeRule: LanguageTypeRule<NullType> = {
    types: 'NullType',
    build(json: JSON.TypeJson, factory: ValueFactory): NullType {
        return new NullType(json._identifier, json.name);
    }
};

export const UndefinedTypeRule: LanguageTypeRule<UndefinedType> = {
    types: 'UndefinedType',
    build(json: JSON.TypeJson, factory: ValueFactory): UndefinedType {
        return new UndefinedType(json._identifier, json.name);
    }
};

export const ArrayTypeRule: LanguageTypeRule<ArrayType> = {
    types: 'ArrayType',
    build(json: JSON.ArrayTypeJson, factory: ValueFactory): ArrayType {
        const elementType = factory.buildType(json.baseType);
        return new ArrayType(json._identifier, json.name, elementType, json.dimensions);
    }
};

export const TupleTypeRule: LanguageTypeRule<TupleType> = {
    types: 'TupleType',
    build(json: JSON.TupleTypeJson, factory: ValueFactory): TupleType {
        const elementTypes = json.types.map((type: AstJson) => factory.buildType(type));
        return new TupleType(json._identifier, json.name, elementTypes);
    }
};

export const UnionTypeRule: LanguageTypeRule<UnionType> = {
    types: 'UnionType',
    build(json: JSON.UnionTypeJson, factory: ValueFactory): UnionType {
        const types = json.types.map((type: AstJson) => factory.buildType(type));
        return new UnionType(json._identifier, json.name, types);
    }
};

export const FunctionTypeRule: LanguageTypeRule<FunctionType> = {
    types: 'FunctionType',
    build(json: JSON.TypeJson, factory: ValueFactory): FunctionType {
        return new FunctionType(json._identifier, json.name);
    }
};

export const ClassTypeRule: LanguageTypeRule<ClassType> = {
    types: 'ClassType',
    build(json: JSON.TypeJson, factory: ValueFactory): ClassType {
        return new ClassType(json._identifier, json.name);
    }
};

//////////////////////////////////////////////////////////////////////
//                           Statements                             //
//////////////////////////////////////////////////////////////////////

export const AssignStmtRule: LanguageValueRule<AssignStmt> = {
    types: 'ArkAssignStmt',
    build(json: JSON.AssignStmtJson, factory: ValueFactory): AssignStmt {
        const target = factory.buildValue(json.leftOp);
        const value = factory.buildValue(json.rightOp);
        return new AssignStmt(json._identifier, target, value);
    }
};

export const InvokeStmtRule: LanguageValueRule<InvokeStmt> = {
    types: 'ArkInvokeStmt',
    build(json: JSON.InvokeStmtJson, factory: ValueFactory): InvokeStmt {
        const expression = factory.buildValue<InvokeExpr>(json.invokeExpr);
        return new InvokeStmt(json._identifier, expression);
    }
};

export const ReturnStmtRule: LanguageValueRule<ReturnStmt> = {
    types: ['ArkReturnVoidStmt', 'ArkReturnStmt'],
    build(json: JSON.ReturnStmtJson, factory: ValueFactory): ReturnStmt {
        if (json.op) {
            return new ReturnStmt(json._identifier, factory.buildValue(json.op));
        }
        return new ReturnStmt(json._identifier);
    }
};

export const IfStmtRule: LanguageValueRule<IfStmt> = {
    types: 'ArkIfStmt',
    build(json: JSON.IfStmtJson, factory: ValueFactory): IfStmt {
        return new IfStmt(json._identifier, factory.buildValue(json.conditionExpr));
    }
};

//////////////////////////////////////////////////////////////////////
//                           Expressions                            //
//////////////////////////////////////////////////////////////////////

export const BinaryOperatorRule: LanguageValueRule<BinaryOperator> = {
    types: 'ArkNormalBinopExpr',
    build(json: JSON.BinaryOperatorJson, factory: ValueFactory): BinaryOperator {
        const leftOperand = factory.buildValue(json.op1);
        const rightOperand = factory.buildValue(json.op2);
        return new BinaryOperator(json._identifier, leftOperand, rightOperand, json.operator);
    }
};

export const CompareOperatorRule: LanguageValueRule<CompareOperator> = {
    types: 'ArkConditionExpr',
    build(json: JSON.BinaryOperatorJson, factory: ValueFactory): CompareOperator {
        const leftOperand = factory.buildValue(json.op1);
        const rightOperand = factory.buildValue(json.op2);
        return new CompareOperator(json._identifier, leftOperand, rightOperand, json.operator);
    }
};

export const UnaryOperatorRule: LanguageValueRule<UnaryOperator> = {
    types: 'ArkUnaryOperator',
    build(json: JSON.UnaryOperatorJson, factory: ValueFactory): UnaryOperator {
        const operand = factory.buildValue(json.op);
        return new UnaryOperator(json._identifier, operand, json.operator);
    }
};

export const InvokeExprRule: LanguageValueRule<InvokeExpr> = {
    types: ['ArkPtrInvokeExpr', 'ArkStaticInvokeExpr', 'ArkInstanceInvokeExpr'],
    build(json: JSON.InvokeExprJson, factory: ValueFactory): InvokeExpr {
        const base = json.base ? factory.buildValue(json.base) : undefined;
        const args = json.args.map((arg: AstJson) => factory.buildValue(arg));
        const expression = new InvokeExpr(json._identifier, json.name, args, base);
        expression.setType(factory.buildType(json.type));
        return expression;
    }
};

export const NewExprRule: LanguageValueRule<NewExpr> = {
    types: ['ArkNewExpr', 'ArkNewArrayExpr'],
    build(json: JSON.NewExprJson, factory: ValueFactory): NewExpr {
        const size = json.size ? factory.buildValue(json.size) : undefined;
        const expression = new NewExpr(json._identifier, size);
        expression.setType(factory.buildType(json.type));
        return expression;
    }
};

export const InstanceOfExprRule: LanguageValueRule<InstanceOfExpr> = {
    types: 'ArkInstanceOfExpr',
    build(json: JSON.InstanceOfExprJson, factory: ValueFactory): InstanceOfExpr {
        const op = factory.buildValue(json.op);
        const checkType = factory.buildType(json.checkType);
        const expression = new InstanceOfExpr(json._identifier, op, checkType);
        expression.setType(factory.buildType(json.type));
        return expression;
    }
};
