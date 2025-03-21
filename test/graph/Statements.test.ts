/**
 * This file contains parsing tests for statements.
 * 
 * Some statements may not actually appear in the extracted graph.
 * - [x] Assignment
 * - [x] Invoke
 * - [x] Return
 * - [x] Return void
 * - [x] If
 * - [ ] Switch (unable to support)
 * - [ ] Throw
 */

import { expect, test } from 'vitest';
import { ValueFactory } from 'qvog-engine';

import { expectStream } from './util';
import { Constant } from '../../src/graph/Constant';
import { Variable } from '../../src/graph/Variable';
import { NumberType, VoidType } from '../../src/graph/Types';
import { ArkTsSpecification } from '../../src/language/arkts';
import { CompareOperator, InvokeExpr } from '../../src/graph/Expressions';
import { AssignStmt, IfStmt, InvokeStmt, ReturnStmt } from '../../src/graph/Statements';

const ASSIGNMENT_JSON = {
    '_identifier': 'ArkAssignStmt',
    'leftOp': {
        '_identifier': 'Local',
        'name': '_1',
        'type': {
            '_identifier': 'NumberType',
            'name': 'number'
        }
    },
    'rightOp': {
        '_identifier': 'NumberConstant',
        'value': '1',
        'type': {
            '_identifier': 'NumberType',
            'name': 'number'
        }
    }
};

const INVOKE_STATEMENT_JSON = {
    '_identifier': 'ArkInvokeStmt',
    'invokeExpr': {
        '_identifier': 'ArkPtrInvokeExpr',
        'name': 'foo',
        'args': [
            {
                '_identifier': 'NumberConstant',
                'type': {
                    '_identifier': 'NumberType',
                    'name': 'number'
                }
            },
            {
                '_identifier': 'StringConstant',
                'type': {
                    '_identifier': 'StringType',
                    'name': 'string'
                }
            }
        ],
        'funPtrLocal': {
            '_identifier': 'Local',
            'name': 'foo',
            'type': {
                '_identifier': 'FunctionType',
                'name': '@easytest/file.ts: %dflt.%AM1(number, string)'
            }
        },
        'type': {
            '_identifier': 'UnknownType',
            'name': 'unknown'
        }
    }
};

const RETURN_VOID_JSON = {
    '_identifier': 'ArkReturnVoidStmt',
};

const RETURN_JSON = {
    '_identifier': 'ArkReturnStmt',
    'op': {
        '_identifier': 'NumberConstant',
        'value': '1',
        'type': {
            '_identifier': 'NumberType',
            'name': 'number'
        }
    },
};

const IF_STMT = {
    '_identifier': 'ArkIfStmt',
    'conditionExpr': {
        '_identifier': 'ArkConditionExpr',
        'op1': {
            '_identifier': 'Local',
            'name': 'a',
            'type': {
                '_identifier': 'NumberType',
                'name': 'number'
            }
        },
        'op2': {
            '_identifier': 'NumberConstant',
            'type': {
                '_identifier': 'NumberType',
                'name': 'number'
            }
        },
        'operator': '!=',
        'type': {
            '_identifier': 'BooleanType',
            'name': 'boolean'
        }
    }
};

const factory = new ValueFactory(ArkTsSpecification);

test('Variable Parsing Test', () => {
    expectStream(factory.buildValue(ASSIGNMENT_JSON), [
        (v) => { // self
            expect(v instanceof AssignStmt).toBe(true);
            expect((v as AssignStmt).getTarget() instanceof Variable).toBe(true);
            expect(((v as AssignStmt).getTarget() as Variable).getName()).toBe('_1');
            expect((v as AssignStmt).getValue() instanceof Constant).toBe(true);
            expect(((v as AssignStmt).getValue() as Constant).getIntValue()).toBe(1);
        },
        (v) => { // target
            expect(v instanceof Variable).toBe(true);
            expect((v as Variable).getName()).toBe('_1');
        },
        (v) => { // value
            expect(v instanceof Constant).toBe(true);
            expect((v as Constant).getIntValue()).toBe(1);
        }
    ]);

    const invoke: InvokeStmt = factory.buildValue(INVOKE_STATEMENT_JSON);
    expect(invoke instanceof InvokeStmt).toBe(true);
    expect(invoke.getExpression() instanceof InvokeExpr).toBe(true);
    // invoke expression in expression test

    let returnStmt: ReturnStmt;

    returnStmt = factory.buildValue(RETURN_VOID_JSON);
    expect(returnStmt instanceof ReturnStmt).toBe(true);
    expect(returnStmt.getType() instanceof VoidType).toBe(true);

    returnStmt = factory.buildValue(RETURN_JSON);
    expect(returnStmt instanceof ReturnStmt).toBe(true);
    expect(returnStmt.getType() instanceof NumberType).toBe(true);
    expect(returnStmt.getValue() instanceof Constant).toBe(true);

    const ifStmt: IfStmt = factory.buildValue(IF_STMT);
    expect(ifStmt instanceof IfStmt).toBe(true);
    expect(ifStmt.getCondition() instanceof CompareOperator).toBe(true);
    // condition expression in expression test
});
