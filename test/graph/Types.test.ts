/**
 * This test file contains parsing tests for all types.
 * 
 * Some types may not actually appear in the extracted graph.
 * 
 * - [x] Any: any
 * - [ ] Unknown: unknown
 * - [x] Primitive types:
 *   - [x] boolean
 *   - [x] number
 *   - [x] string
 *   - [x] null
 *   - [x] undefined
 *   - [ ] literal: string | number | boolean
 * - [x] array
 * - [x] tuple
 * - [x] union
 * - [x] function
 * - [x] class
 * - [ ] void
 * - [ ] never
 * - [ ] alias
 * - [ ] generic
 * - [ ] annotation
*/

import { expect, test } from 'vitest';
import { ValueFactory } from 'qvog-engine';

import { ArkTsSpecification } from '../../src/language/arkts';
import { AnyType, ArrayType, BooleanType, ClassType, FunctionType, NullType, NumberType, StringType, TupleType, UndefinedType, UnionType } from '../../src/graph/Types';

const ANY_TYPE_JSON = {
    '_identifier': 'AnyType',
    'name': 'any'
};

const BOOLEAN_TYPE_JSON = {
    '_identifier': 'BooleanType',
    'name': 'boolean'
};

const NUMBER_TYPE_JSON = {
    '_identifier': 'NumberType',
    'name': 'number'
};

const STRING_TYPE_JSON = {
    '_identifier': 'StringType',
    'name': 'string'
};

const NULL_TYPE_JSON = {
    '_identifier': 'NullType',
    'name': 'null'
};

const UNDEFINED_TYPE_JSON = {
    '_identifier': 'UndefinedType',
    'name': 'undefined'
};

const ARRAY_TYPE_JSON = {
    '_identifier': 'ArrayType',
    'baseType': {
        '_identifier': 'AnyType',
        'name': 'any'
    },
    'dimension': 1
};

const TUPLE_TYPE_JSON = {
    '_identifier': 'TupleType',
    'types': [
        {
            '_identifier': 'NumberType',
            'name': 'number'
        },
        {
            '_identifier': 'StringType',
            'name': 'string'
        }
    ]
};

const UNION_TYPE_JSON = {
    '_identifier': 'UnionType',
    'types': [
        {
            '_identifier': 'NumberType',
            'name': 'number'
        },
        {
            '_identifier': 'StringType',
            'name': 'string'
        }
    ],
    'currType': {}
};

const FUNCTION_TYPE_JSON = {
    '_identifier': 'FunctionType',
    'name': '@easytest/file.ts: %dflt.%AM0()'
};

const CLASS_TYPE_JSON = {
    '_identifier': 'ClassType',
    'name': '@easytest/file.ts: TestObject'
};

const factory = new ValueFactory(ArkTsSpecification);

test('Type Parsing Test', () => {
    expect(factory.buildType(ANY_TYPE_JSON) instanceof AnyType).toBe(true);

    expect(factory.buildType(BOOLEAN_TYPE_JSON) instanceof BooleanType).toBe(true);
    expect(factory.buildType(NUMBER_TYPE_JSON) instanceof NumberType).toBe(true);
    expect(factory.buildType(STRING_TYPE_JSON) instanceof StringType).toBe(true);
    expect(factory.buildType(NULL_TYPE_JSON) instanceof NullType).toBe(true);
    expect(factory.buildType(UNDEFINED_TYPE_JSON) instanceof UndefinedType).toBe(true);

    const arrayType: ArrayType = factory.buildType(ARRAY_TYPE_JSON);
    expect(arrayType instanceof ArrayType).toBe(true);
    expect(arrayType.getElementType() instanceof AnyType).toBe(true);
    expect(arrayType.getDimension()).toBe(1);

    const tupleType: TupleType = factory.buildType(TUPLE_TYPE_JSON);
    expect(tupleType instanceof TupleType).toBe(true);
    expect(tupleType.getElementTypes().length).toBe(2);
    expect(tupleType.getElementType(0) instanceof NumberType).toBe(true);
    expect(tupleType.getElementType(1) instanceof StringType).toBe(true);

    const unionType: UnionType = factory.buildType(UNION_TYPE_JSON);
    expect(unionType instanceof UnionType).toBe(true);
    expect(unionType.getTypes().length).toBe(2);
    expect(unionType.getType(0) instanceof NumberType).toBe(true);
    expect(unionType.getType(1) instanceof StringType).toBe(true);

    const functionType: FunctionType = factory.buildType(FUNCTION_TYPE_JSON);
    expect(functionType instanceof FunctionType).toBe(true);
    expect(functionType.getName()).toBe('@easytest/file.ts: %dflt.%AM0()');

    const classType = factory.buildType(CLASS_TYPE_JSON);
    expect(classType instanceof ClassType).toBe(true);
    expect(classType.getName()).toBe('@easytest/file.ts: TestObject');
});