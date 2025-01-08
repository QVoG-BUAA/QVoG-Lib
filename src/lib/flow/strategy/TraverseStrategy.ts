import deasync from "deasync";
import { Configuration, FlowStep, process } from "qvog-engine";

export abstract class TraverseStrategy {
    abstract getNeighbors(g: process.GraphTraversalSource, id: number): FlowStep[];
}

export class DfgTraverse extends TraverseStrategy {
    private getContext = Configuration.getContextCallback();
    getNeighbors(g: process.GraphTraversalSource, id: number): FlowStep[] {
        const steps: FlowStep[] = [];
        let blocked = true;
        g.V(id).inE("dfg").dedup()
            .project("e", "v")
            .by().by(process.statics.outV()).toList()
            .then((results: any) => {
                results.forEach((result: Map<string, any>) => {
                    const value = this.getContext().getValue(result.get("v"));
                    const edge = result.get("e");
                    steps.push([value, edge]);
                });
                blocked = false;
            });
        deasync.loopWhile(() => blocked);
        return steps;
    }
}
