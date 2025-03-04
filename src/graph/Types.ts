import { Type } from 'qvog-engine';
import { InvalidType } from 'qvog-engine';

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
    private elementType: Type;
    private dimension: number;

    constructor(identifier: string, name: string, elementType: Type, dimension: number) {
        super(identifier, name);
        this.elementType = elementType;
        this.dimension = dimension;
    }

    /**
     * Get the element type of the array.
     * 
     * @returns The type of the elements in the array.
     */
    getElementType(): Type {
        return this.elementType;
    }

    /**
     * Get the dimension of the array.
     * 
     * @returns The number of dimensions of the array.
     */
    getDimension(): number {
        return this.dimension;
    }
}

/**
 * Tuple type is a composite type that contains elements of different types.
 * 
 * @category Graph
 */
export class TupleType extends Type {
    private elementTypes: Type[];

    constructor(identifier: string, name: string, elementTypes: Type[]) {
        super(identifier, name);
        this.elementTypes = elementTypes;
    }

    /**
     * Get the size of the tuple.
     * 
     * @returns The number of elements in the tuple.
     */
    getSize(): number {
        return this.elementTypes.length;
    }

    /**
     * Get all element types of the tuple.
     * 
     * @returns All element types of the tuple.
     */
    getElementTypes(): Type[] {
        return this.elementTypes;
    }

    /**
     * Get the type of the element at the given index.
     * 
     * @param index Index of the element type in the tuple.
     * @returns The type of the element at the given index.
     */
    getElementType(index: number): Type {
        return this.elementTypes[index];
    }
}

/**
 * Union type.
 * 
 * @category Graph
 */
export class UnionType extends Type {
    private types: Type[];

    constructor(identifier: string, name: string, types: Type[]) {
        super(identifier, name);
        this.types = types;
    }

    /**
     * Get the number of types in the union type.
     * 
     * @returns The number of types in the union type.
     */
    getTypesCount(): number {
        return this.types.length;
    }

    /**
     * Get all types in the union type.
     * 
     * @returns All types in the union type.
     */
    getTypes(): Type[] {
        return this.types;
    }

    /**
     * Get the type at the specified index.
     * 
     * This may not reflect the original order of the types in the union.
     * 
     * @param index Index of the type to get.
     * @returns The type at the specified index.
     */
    getType(index: number): Type {
        return this.types[index];
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
