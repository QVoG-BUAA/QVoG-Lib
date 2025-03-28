/**
 * This file contains parsing tests for variable.
 */

import { expect, test } from 'vitest';
import { ValueFactory } from 'qvog-engine';

import { NumberType } from '../../src/graph/Types';
import { Variable } from '../../src/graph/Variable';
import { ArkTsSpecification } from '../../src/language/arkts';

const VARIABLE_JSON = {
    '_identifier': 'Local',
    'name': 'value',
    'type': {
        '_identifier': 'NumberType',
        'name': 'number'
    }
};

const factory = new ValueFactory(ArkTsSpecification);

test('Variable Parsing Test', () => {
    const variable: Variable = factory.buildValue(VARIABLE_JSON);
    expect(variable instanceof Variable).toBe(true);
    expect(variable.name).toBe('value');
    expect(variable.type instanceof NumberType).toBe(true);
});
