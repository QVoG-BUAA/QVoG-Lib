/**
 * This file contains all AST specifications for the ArkTS language.
 */

import { AstJson } from 'qvog-engine';

//////////////////////////////////////////////////////////////////////
//                           Values                                 //
//////////////////////////////////////////////////////////////////////

export interface VariableJson extends AstJson {
    name: string;
    type: AstJson;
}

export interface ConstantJson extends AstJson {
    value: string;
    type: AstJson;
}

export interface FieldReferenceJson extends AstJson {
    base: AstJson | string;
    name: string;
    type: AstJson;
}

export interface ArrayReferenceJson extends AstJson {
    base: AstJson;
    index: AstJson;
    type: AstJson;
}

//////////////////////////////////////////////////////////////////////
//                           Types                                  //
//////////////////////////////////////////////////////////////////////

/**
 * Basic types in ArkTS are represented by a name.
 */
export interface TypeJson extends AstJson {
    name: string;
}

// ArrayType has no name.
export interface ArrayTypeJson extends AstJson {
    baseType: AstJson;
    dimension: number;
}

export interface TupleTypeJson extends TypeJson {
    types: AstJson[];
}

export interface UnionTypeJson extends TypeJson {
    types: AstJson[];
}

//////////////////////////////////////////////////////////////////////
//                           Statements                             //
//////////////////////////////////////////////////////////////////////

export interface AssignStmtJson extends AstJson {
    leftOp: AstJson;
    rightOp: AstJson;
}

export interface InvokeStmtJson extends AstJson {
    invokeExpr: InvokeExprJson;
}

export interface ReturnStmtJson extends AstJson {
    op?: AstJson;
}

export interface IfStmtJson extends AstJson {
    conditionExpr: AstJson;
}

//////////////////////////////////////////////////////////////////////
//                           Expressions                            //
//////////////////////////////////////////////////////////////////////

/**
 * Can be used for both arithmetic and comparison binary operators.
 */
export interface BinaryOperatorJson extends AstJson {
    op1: AstJson;
    op2: AstJson;
    operator: string;
    type: AstJson;
}

export interface UnaryOperatorJson extends AstJson {
    op: AstJson;
    operator: string;
    type: AstJson;
}

/**
 * There is actually three types of invocation statements in ArkTS:
 *
 * - PtrInvoke
 * - StaticInvoke
 * - InstanceInvoke
 *
 * However, we omit the distinction between these types in the AST for simplicity.
 */
export interface InvokeExprJson extends AstJson {
    base?: AstJson;
    name: string;
    args: AstJson[];
    type: AstJson;
}

export interface NewExprJson extends AstJson {
    type: AstJson;
    size?: AstJson;
}

export interface InstanceOfExprJson extends AstJson {
    op: AstJson;
    checkType: AstJson;
    type: AstJson;
}

export interface TypeOfExprJson extends AstJson {
    op: AstJson;
    type: AstJson;
}
