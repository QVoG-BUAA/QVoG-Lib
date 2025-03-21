/**
 * This file contains parsing tests for expressions.
 * 
 * - [x] Binary Operator
 * - [x] Compare Operator
 * - [x] Unary Operator
 * - [x] Invoke
 * - [x] New
 * - [x] New Arrary
 * - [ ] Delete
 * - [ ] Await
 * - [ ] Yield
 * - [x] Type of
 * - [x] Instance of
 * - [ ] Cast
 */

import { expect, test } from 'vitest';
import { ValueFactory } from 'qvog-engine';

import { ArrayType, BooleanType, ClassType, NumberType, UnknownType } from '../../src/graph/Types';
import { Variable } from '../../src/graph/Variable';
import { Constant } from '../../src/graph/Constant';
import { ArkTsSpecification } from '../../src/language/arkts';
import { BinaryOperator, CompareOperator, InstanceOfExpr, InvokeExpr, NewExpr, TypeOfExpr, UnaryOperator } from '../../src/graph/Expressions';
import { expectStream } from './util';

const BINARY_OPERATOR_JSON = {
    '_identifier': 'ArkNormalBinopExpr',
    'op1': {
        '_identifier': 'Local',
        'name': '_1',
        'type': {
            '_identifier': 'NumberType',
            'name': 'number'
        }
    },
    'op2': {
        '_identifier': 'Local',
        'name': '_2',
        'type': {
            '_identifier': 'NumberType',
            'name': 'number'
        }
    },
    'operator': '+',
    'type': {
        '_identifier': 'NumberType',
        'name': 'number'
    }
};

const COMPARE_OPERATOR_JSON = {
    '_identifier': 'ArkConditionExpr',
    'op1': {
        '_identifier': 'Local',
        'name': '_1',
        'type': {
            '_identifier': 'NumberType',
            'name': 'number'
        }
    },
    'op2': {
        '_identifier': 'Local',
        'name': '_2',
        'type': {
            '_identifier': 'NumberType',
            'name': 'number'
        }
    },
    'operator': '<',
    'type': {
        '_identifier': 'BooleanType',
        'name': 'boolean'
    }
};

const UNARY_OPERATOR_JSON = {
    '_identifier': 'ArkUnopExpr',
    'op': {
        '_identifier': 'Local',
        'name': '_1',
        'type': {
            '_identifier': 'NumberType',
            'name': 'number'
        }
    },
    'operator': '!',
    'type': {
        '_identifier': 'NumberType',
        'name': 'number'
    }
};

const INSTANCE_INVOKE_JSON = {
    '_identifier': 'ArkInstanceInvokeExpr',
    'name': 'd',
    'args': [
        {
            '_identifier': 'NumberConstant',
            'value': '1',
            'type': {
                '_identifier': 'NumberType',
                'name': 'number'
            }
        },
        {
            '_identifier': 'StringConstant',
            'value': 'hello',
            'type': {
                '_identifier': 'StringType',
                'name': 'string'
            }
        }
    ],
    'base': {
        '_identifier': 'Local',
        'name': 'baz',
        'type': {
            '_identifier': 'ClassType',
            'name': '@easytest/file.ts: %AC$%dflt$invokeSpec$0'
        }
    },
    'type': {
        '_identifier': 'UnknownType',
        'name': 'unknown'
    }
};

const STATIC_INVOKE_JSON = {
    '_identifier': 'ArkStaticInvokeExpr',
    'name': '%0',
    'args': [
        {
            '_identifier': 'NumberConstant',
            'value': '1',
            'type': {
                '_identifier': 'NumberType',
                'name': 'number'
            }
        },
        {
            '_identifier': 'StringConstant',
            'value': 'hello',
            'type': {
                '_identifier': 'StringType',
                'name': 'string'
            }
        }
    ],
    'type': {
        '_identifier': 'UnknownType',
        'name': 'unknown'
    }
};

const NEW_JSON = {
    '_identifier': 'ArkNewExpr',
    'classType': {
        '_identifier': 'ClassType',
        'name': '@easytest/file.ts: %AC$%dflt$statementSpec$0'
    },
    'type': {
        '_identifier': 'ClassType',
        'name': '@easytest/file.ts: %AC$%dflt$statementSpec$0'
    }
};

const NEW_ARRAY_JSON = {
    '_identifier': 'ArkNewArrayExpr',
    'baseType': {
        '_identifier': 'NumberType',
        'name': 'number'
    },
    'size': {
        '_identifier': 'NumberConstant',
        'value': '3',
        'type': {
            '_identifier': 'NumberType',
            'name': 'number'
        }
    },
    'type': {
        '_identifier': 'ArrayType',
        'baseType': {
            '_identifier': 'NumberType',
            'name': 'number'
        },
        'dimension': 1
    }
};

const TYPE_OF_JSON = {
    '_identifier': 'ArkTypeOfExpr',
    'type': {
        '_identifier': 'ClassType',
        'name': '@%unk/%unk: TestObject'
    },
    'op': {
        '_identifier': 'Local',
        'type': {
            '_identifier': 'ClassType',
            'name': '@%unk/%unk: TestObject'
        },
        'name': 'obj'
    }
};

const INSTANCE_OF_JSON = {
    '_identifier': 'ArkInstanceOfExpr',
    'op': {
        '_identifier': 'Local',
        'name': 'obj',
        'type': {
            '_identifier': 'ClassType',
        }
    },
    'checkType': {
        '_identifier': 'UnclearReferenceType',
        'name': 'TestObject'
    },
    'type': {
        '_identifier': 'BooleanType',
        'name': 'boolean'
    }
};

const factory = new ValueFactory(ArkTsSpecification);

test('Variable Parsing Test', () => {
    expectStream(factory.buildValue(BINARY_OPERATOR_JSON), [
        (v) => { // self
            expect(v instanceof BinaryOperator).toBe(true);
            expect((v as BinaryOperator).getOperator()).toBe('+');
            expect(v.getType() instanceof NumberType).toBe(true);
        },
        (v) => { // left operand
            expect(v instanceof Variable).toBe(true);
            expect((v as Variable).getName()).toBe('_1');
        },
        (v) => { // right operand
            expect(v instanceof Variable).toBe(true);
            expect((v as Variable).getName()).toBe('_2');
        }
    ]);

    expectStream(factory.buildValue(COMPARE_OPERATOR_JSON), [
        (v) => { // self
            expect(v instanceof CompareOperator).toBe(true);
            expect((v as CompareOperator).getOperator()).toBe('<');
            expect(v.getType().getName()).toBe('boolean');
        },
        (v) => { // left operand
            expect(v instanceof Variable).toBe(true);
            expect((v as Variable).getName()).toBe('_1');
        },
        (v) => { // right operand
            expect(v instanceof Variable).toBe(true);
            expect((v as Variable).getName()).toBe('_2');
        }
    ]);

    expectStream(factory.buildValue(UNARY_OPERATOR_JSON), [
        (v) => { // self
            expect(v instanceof UnaryOperator).toBe(true);
            expect((v as UnaryOperator).getOperator()).toBe('!');
            expect(v.getType().getName()).toBe('number');
        },
        (v) => { // operand
            expect(v instanceof Variable).toBe(true);
            expect((v as Variable).getName()).toBe('_1');
        }
    ]);

    expectStream(factory.buildValue(INSTANCE_INVOKE_JSON), [
        (v) => { // self
            expect(v instanceof InvokeExpr).toBe(true);
            expect(v.getType() instanceof UnknownType).toBe(true);
            expect((v as InvokeExpr).getTarget()).toBe('d');
        },
        (v) => { // base
            expect(v instanceof Variable).toBe(true);
            expect((v as Variable).getName()).toBe('baz');
            expect(v.getType() instanceof ClassType).toBe(true);
        },
        (v) => { // arg 1
            expect(v instanceof Constant).toBe(true);
            expect((v as Constant).getIntValue()).toBe(1);
        },
        (v) => { // arg 2
            expect(v instanceof Constant).toBe(true);
            expect((v as Constant).getStringValue()).toBe('hello');
        }
    ]);

    expectStream(factory.buildValue(STATIC_INVOKE_JSON), [
        (v) => { // self
            expect(v instanceof InvokeExpr).toBe(true);
            expect(v.getType() instanceof UnknownType).toBe(true);
            expect((v as InvokeExpr).getTarget()).toBe('%0');
        },
        (v) => { // arg 1
            expect(v instanceof Constant).toBe(true);
            expect((v as Constant).getIntValue()).toBe(1);
        },
        (v) => { // arg 2
            expect(v instanceof Constant).toBe(true);
            expect((v as Constant).getStringValue()).toBe('hello');
        }
    ]);

    expectStream(factory.buildValue(NEW_JSON), [
        (v) => { // self
            expect(v instanceof NewExpr).toBe(true);
            expect(v.getType() instanceof ClassType).toBe(true);
            expect(v.getType().getName()).toBe('@easytest/file.ts: %AC$%dflt$statementSpec$0');
        }
    ]);

    expectStream(factory.buildValue(NEW_ARRAY_JSON), [
        (v) => { // self
            expect(v instanceof NewExpr).toBe(true);
            expect(v.getType() instanceof ArrayType).toBe(true);
            expect((v.getType() as ArrayType).getElementType() instanceof NumberType).toBe(true);
            expect((v.getType() as ArrayType).getDimension()).toBe(1);
        },
        (v) => { // size
            expect(v instanceof Constant).toBe(true);
            expect((v as Constant).getIntValue()).toBe(3);
        }
    ]);

    expectStream(factory.buildValue(TYPE_OF_JSON), [
        (v) => { // self
            expect(v instanceof TypeOfExpr).toBe(true);
            expect(v.getType() instanceof ClassType).toBe(true);
            expect(v.getType().getName()).toBe('@%unk/%unk: TestObject');
        },
        (v) => { // operand
            expect(v instanceof Variable).toBe(true);
            expect((v as Variable).getName()).toBe('obj');
            expect(v.getType() instanceof ClassType).toBe(true);
            expect(v.getType().getName()).toBe('@%unk/%unk: TestObject');
        }
    ]);

    expectStream(factory.buildValue(INSTANCE_OF_JSON), [
        (v) => { // self
            expect(v instanceof InstanceOfExpr).toBe(true);
            expect(v.getType() instanceof BooleanType).toBe(true);
            expect((v as InstanceOfExpr).getTestType().getName()).toBe('TestObject');
        },
        (v) => { // operand
            expect(v instanceof Variable).toBe(true);
            expect((v as Variable).getName()).toBe('obj');
            expect(v.getType() instanceof ClassType).toBe(true);
        }
    ]);
});

