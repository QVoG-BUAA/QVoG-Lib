import { Type } from 'qvog-engine';

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

/**
 * Array type is a composite type that contains elements of a specific type.
 *
 * @category Graph
 */
export class ArrayType extends Type {
    private _elementType: Type;
    private _dimension: number;

    constructor(identifier: string, name: string, elementType: Type, dimension: number) {
        super(identifier, name);
        this._elementType = elementType;
        this._dimension = dimension;
    }

    /**
     * Get the element type of the array.
     *
     * @returns The type of the elements in the array.
     */
    public get elementType(): Type {
        return this._elementType;
    }

    /**
     * Get the dimension of the array.
     *
     * @returns The number of dimensions of the array.
     */
    public get dimension(): number {
        return this._dimension;
    }
}

/**
 * Tuple type is a composite type that contains elements of different types.
 *
 * @category Graph
 */
export class TupleType extends Type {
    private _elementTypes: Type[];

    constructor(identifier: string, name: string, elementTypes: Type[]) {
        super(identifier, name);
        this._elementTypes = elementTypes;
    }

    /**
     * Get the size of the tuple.
     *
     * @returns The number of elements in the tuple.
     */
    public get count(): number {
        return this._elementTypes.length;
    }

    /**
     * Get all element types of the tuple.
     *
     * @returns All element types of the tuple.
     */
    public get elementTypes(): Type[] {
        return this._elementTypes;
    }
}

/**
 * Union type.
 *
 * @category Graph
 */
export class UnionType extends Type {
    private _types: Type[];

    constructor(identifier: string, name: string, types: Type[]) {
        super(identifier, name);
        this._types = types;
    }

    /**
     * Get the number of types in the union type.
     *
     * @returns The number of types in the union type.
     */
    public get count(): number {
        return this._types.length;
    }

    /**
     * Get all types in the union type.
     *
     * @returns All types in the union type.
     */
    public get types(): Type[] {
        return this._types;
    }
}

/**
 * Function type represents a function signature.
 *
 * Currently is empty.
 *
 * @category Graph
 */
export class FunctionType extends Type {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

/**
 * Class type is the name of the class.
 *
 * @category Graph
 */
export class ClassType extends Type {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}

/**
 * Void type.
 *
 * @category Graph
 */
export class VoidType extends Type {
    constructor(identifier: string, name: string) {
        super(identifier, name);
    }
}
