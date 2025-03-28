/**
 * This file contains tests for the Constant values.
 * 
 * - [x] Constant
 *   - [x] BooleanConstant
 *   - [x] NumberConstant
 *   - [x] StringConstant
 *   - [x] NullConstant
 *   - [x] UndefinedConstant
 */

import { expect, test } from 'vitest';
import { ValueFactory } from 'qvog-engine';

import { Constant } from '../../src/graph/Constant';
import { ArkTsSpecification } from '../../src/language/arkts';

const BOOLEAN_CONSTANT_JSON = {
    '_identifier': 'BooleanConstant',
    'value': 'true',
    'type': {
        '_identifier': 'BooleanType',
        'name': 'boolean'
    }
};

const NUMBER_CONSTANT_JSON = {
    '_identifier': 'NumberConstant',
    'value': '1',
    'type': {
        '_identifier': 'NumberType',
        'name': 'number'
    }
};

const STRING_CONSTANT_JSON = {
    '_identifier': 'StringConstant',
    'value': 'hello there',
    'type': {
        '_identifier': 'StringType',
        'name': 'string'
    }
};

const NULL_CONSTANT_JSON = {
    '_identifier': 'NullConstant',
    'value': 'null',
    'type': {
        '_identifier': 'NullType',
        'name': 'null'
    }
};

const UNDEFINED_CONTSANT_JSON = {
    '_identifier': 'UndefinedConstant',
    'value': 'undefined',
    'type': {
        '_identifier': 'UndefinedType',
        'name': 'undefined'
    }
};

const factory = new ValueFactory(ArkTsSpecification);

test('Variable Parsing Test', () => {
    let constant: Constant;

    constant = factory.buildValue(BOOLEAN_CONSTANT_JSON);
    expect(constant instanceof Constant).toBe(true);
    expect(constant.booleanValue).toBe(true);

    constant = factory.buildValue(NUMBER_CONSTANT_JSON);
    expect(constant instanceof Constant).toBe(true);
    expect(constant.intValue).toBe(1);

    constant = factory.buildValue(STRING_CONSTANT_JSON);
    expect(constant instanceof Constant).toBe(true);
    expect(constant.stringValue).toBe('hello there');

    constant = factory.buildValue(NULL_CONSTANT_JSON);
    expect(constant instanceof Constant).toBe(true);
    expect(constant.value).toBe('null');

    constant = factory.buildValue(UNDEFINED_CONTSANT_JSON);
    expect(constant instanceof Constant).toBe(true);
    expect(constant.value).toBe('undefined');
});
