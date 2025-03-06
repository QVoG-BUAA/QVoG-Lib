import { expect, test } from 'vitest';

import { P } from '../../src/lib/predicate';

class A {
    public b: B;
    public value: number;

    constructor(x: number, y: number, z: number) {
        this.value = x;
        this.b = new B(y, z);
    }
}

class B {
    public c: C;
    public value: number;

    constructor(y: number, z: number) {
        this.value = y;
        this.c = new C(z);
    }
}

class C {
    public value: number = 0;

    constructor(z: number) {
        this.value = z;
    }
}

test('Predicate test', () => {
    const a1 = new A(1, 2, 3);
    const a2 = new A(4, 5, 6);

    const predicate = P<A>(a => a.value > 0)
        .and<B>(
            P<B>(b => b.value < 0).or(b => b.value > 3),
            a => a.b
        ).and<C>(
            c => c.value > 0,
            b => b.c
        );

    expect(predicate.test(a1)).toBe(false);
    expect(predicate.test(a2)).toBe(true);
});
