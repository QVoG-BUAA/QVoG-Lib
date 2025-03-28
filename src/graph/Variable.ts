import { Value } from 'qvog-engine';

/**
 * Local variable defined in the program.
 *
 * @category Graph
 */
export class Variable extends Value {
    private _name: string;

    constructor(identifier: string, name: string) {
        super(identifier);
        this._name = name;
    }

    /**
     * Get the name of the variable.
     *
     * @returns The name.
     */
    public get name(): string {
        return this._name;
    }
}
