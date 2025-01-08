import { Flow } from "~/lib/flow/strategy/Flow";
import { TraverseStrategy } from "~/lib/flow/strategy/TraverseStrategy";

export type FlowFeatures = {
    flow: Flow,
    strategy: TraverseStrategy,
};
