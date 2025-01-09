import { Configuration, Edge, FlowStream, OptionalFlowStep, Value } from "qvog-engine";

import { Flow } from "~/lib/flow/strategy/Flow";
import { TraverseStrategy } from "~/lib/flow/strategy/TraverseStrategy";

export class EulerFlow extends Flow {
    private getDbContext = Configuration.getDbContextCallback();

    private strategy!: TraverseStrategy;
    private visited: Set<number> = new Set<number>();
    private streams: FlowStream[] = [];
    private stream: OptionalFlowStep[] = [];    // stack

    apply(source: Value, strategy: TraverseStrategy): FlowStream[] {
        this.strategy = strategy;

        this.visited.clear();
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
            if (this.visited.has(edge.id)) {
                this.streams.push(new FlowStream(this.stream));
                continue;
            }
            this.visited.add(edge.id);
            this.stream.push([value, edge]);

            this.dfs(value);

            this.stream.pop();
            this.visited.delete(edge.id);
        }
    }
}