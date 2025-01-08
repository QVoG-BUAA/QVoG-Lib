import { Configuration, FlowStream, OptionalFlowStep, Value } from "qvog-engine";

import { Flow } from "~/lib/flow/strategy/Flow";
import { TraverseStrategy } from "~/lib/flow/strategy/TraverseStrategy";

export class HamiltonFlow extends Flow {
    private getDbContext = Configuration.getDbContextCallback();

    private strategy!: TraverseStrategy;
    private visited: number[] = [];     // stack
    private streams: FlowStream[] = [];
    private stream: OptionalFlowStep[] = [];    // stack

    apply(source: Value, strategy: TraverseStrategy): FlowStream[] {
        this.strategy = strategy;

        this.visited = [source.getId()];
        this.streams = [];
        this.stream = [[source, undefined]];

        this.dfs(source);

        return this.streams;
    }

    private dfs(current: Value): void {
        const neighbors = this.strategy.getNeighbors(this.getDbContext().getGremlinConnection().g(), current.getId());
        if (neighbors.length === 0) {
            this.streams.push(new FlowStream(this.stream));
            return;
        }

        for (const [value, edge] of neighbors) {
            if (value.getId() in this.visited) {
                this.streams.push(new FlowStream(this.stream));
                return;
            }
            this.visited.push(value.getId());
            this.stream.push([value, edge]);

            this.dfs(value);

            this.stream.pop();
            this.visited.pop();
        }
    }
}