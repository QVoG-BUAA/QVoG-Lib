import { Type } from "qvog-engine";
import { InvalidType } from "qvog-engine";

/**
 * In some languages, e.g. TypeScript, there is `any` type that can be anything.
 * 
 * @category Graph
 */
export class AnyType extends Type {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

/**
 * Unknown type represents a type that cannot be determined.
 * 
 * It is not `InvalidType`, which cannot be parsed from
 * the AST JSON.
 * 
 * @category Graph
 */
export class UnknownType extends Type {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

/**
 * Represents built-in types like `number`, `string`, etc.
 * 
 * @category Graph
 */
export abstract class PrimitiveType extends Type {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

/**
 * @category Graph
 */
export class BooleanType extends PrimitiveType {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

/**
 * @category Graph
 */
export class NumberType extends PrimitiveType {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

/**
 * @category Graph
 */
export class StringType extends PrimitiveType {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

/**
 * @category Graph
 */
export class NullType extends PrimitiveType {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

/**
 * @category Graph
 */
export class UndefinedType extends PrimitiveType {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}
