import { Type } from "qvog-engine";

export class AnyType extends Type {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

export class UnknownType extends Type {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

/**
 * Represents built-in types like `number`, `string`, etc.
 */
export abstract class PrimitiveType extends Type {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

export class BooleanType extends PrimitiveType {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

export class NumberType extends PrimitiveType {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

export class StringType extends PrimitiveType {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

export class NullType extends PrimitiveType {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

export class UndefinedType extends PrimitiveType {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}
