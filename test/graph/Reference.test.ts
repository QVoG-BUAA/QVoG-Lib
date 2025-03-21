/**
 * This file contains tests for the Reference values.
 */

import { expect, test } from 'vitest';
import { ValueFactory } from 'qvog-engine';

import { ArrayReference, FieldReference } from '../../src/graph/Reference';
import { ArkTsSpecification } from '../../src/language/arkts';
import { execPath } from 'process';
import { Variable } from '../../src/graph/Variable';
import { ArrayType, ClassType, NumberType } from '../../src/graph/Types';
import { Constant } from '../../src/graph/Constant';

const INSTANCE_FIELD_REFERENCE_JSON = {
    '_identifier': 'ArkInstanceFieldRef',
    'name': 'a',
    'base': {
        '_identifier': 'Local',
        'name': 'obj',
        'type': {
            '_identifier': 'ClassType',
            'name': '@easytest/file.ts: %AC$%dflt$refSpec$0'
        }
    },
    'type': {
        '_identifier': 'NumberType',
        'name': 'number'
    }
};

const STATIC_FILED_REFERENCE_JSON = {
    '_identifier': 'ArkStaticFieldRef',
    'name': 'a',
    'base': 'StaticField',
    'type': {
        '_identifier': 'NumberType',
        'name': 'number'
    }
};

const ARRAY_REFERENCE = {
    '_identifier': 'ArkArrayRef',
    'base': {
        '_identifier': 'Local',
        'name': 'array',
        'type': {
            '_identifier': 'ArrayType',
            'baseType': {
                '_identifier': 'NumberType',
                'name': 'number'
            },
            'dimension': 1
        }
    },
    'index': {
        '_identifier': 'NumberConstant',
        'value': '3',
        'type': {
            '_identifier': 'NumberType',
            'name': 'number'
        }
    },
    'type': {
        '_identifier': 'NumberType',
        'name': 'number'
    }
};

const factory = new ValueFactory(ArkTsSpecification);

test('Reference Parsing Test', () => {
    let reference: FieldReference;

    reference = factory.buildValue(INSTANCE_FIELD_REFERENCE_JSON);
    expect(reference instanceof FieldReference).toBe(true);
    expect(reference.isStatic()).toBe(false);
    expect(reference.getName()).toBe('a');
    expect(reference.getType() instanceof NumberType).toBe(true);
    expect(reference.getBase() instanceof Variable).toBe(true);
    expect((reference.getBase() as Variable).getName()).toBe('obj');
    expect((reference.getBase() as Variable).getType() instanceof ClassType).toBe(true);

    reference = factory.buildValue(STATIC_FILED_REFERENCE_JSON);
    expect(reference instanceof FieldReference).toBe(true);
    expect(reference.isStatic()).toBe(true);
    expect(reference.getName()).toBe('a');
    expect(reference.getType() instanceof NumberType).toBe(true);
    expect(reference.getBase()).toBe('StaticField');

    const arrayRef: ArrayReference = factory.buildValue(ARRAY_REFERENCE);
    expect(arrayRef instanceof ArrayReference).toBe(true);
    expect(arrayRef.getType() instanceof NumberType).toBe(true);
    expect(arrayRef.getBase() instanceof Variable).toBe(true);
    expect((arrayRef.getBase() as Variable).getType() instanceof ArrayType).toBe(true);
    expect(arrayRef.getIndex() instanceof Constant).toBe(true);
    expect((arrayRef.getIndex() as Constant).getIntValue()).toBe(3);
});