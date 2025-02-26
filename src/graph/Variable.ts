import { Value } from "qvog-engine";

/**
 * Local variable defined in the program.
 */
export class Variable extends Value {
    private name: string;

    constructor(identifier: string, name: string) {
        super(identifier);
        this.name = name;
    }

    /**
     * Get the name of the variable.
     * @returns The name.
     */
    getName(): string {
        return this.name;
    }
}
