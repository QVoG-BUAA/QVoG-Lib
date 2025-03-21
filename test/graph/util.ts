/**
 * This file provides some util functions.
 */

import { Value } from 'qvog-engine';

export type StreamActionFn = (value: Value) => void;

export function expectStream(value, actions: StreamActionFn[]) {
    let index = 0;
    for (const v of value.stream()) {
        if (index >= actions.length) {
            throw new Error('Too many values to unpack');
        }
        actions[index++](v);
    }
    if (index < actions.length) {
        throw new Error('Not enough values to unpack');
    }
}
