/**
 * This file contains all AST specifications for the ArkTS language.
 */

import { AstJson } from "qvog-engine";

//////////////////////////////////////////////////////////////////////
//                           Values                                 //
//////////////////////////////////////////////////////////////////////

export interface VariableJson extends AstJson {
    name: string;
    type: AstJson;
}

export interface ConstantJson extends AstJson {
    // TODO: Add literal value field.
    type: AstJson;
}

//////////////////////////////////////////////////////////////////////
//                           Types                                  //
//////////////////////////////////////////////////////////////////////

/**
 * All types in ArkTS are represented by a name.
 * 
 * TODO: Support literal type, which need more information.
 */
export interface TypeJson extends AstJson {
    name: string;
}

//////////////////////////////////////////////////////////////////////
//                           Statements                             //
//////////////////////////////////////////////////////////////////////

export interface AssignStmtJson extends AstJson {
    leftOp: AstJson;
    rightOp: AstJson;
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
}

export interface UnaryOperatorJson extends AstJson {
    op: AstJson;
    operator: string;
}
