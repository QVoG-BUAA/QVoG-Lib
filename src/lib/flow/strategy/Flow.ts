import { FlowStream, Value } from "qvog-engine";

import { TraverseStrategy } from "~/lib/flow/strategy/TraverseStrategy";

export abstract class Flow {
    abstract apply(source: Value, strategy: TraverseStrategy): FlowStream[];
}
