import { BaseFlow, Column, FlowPath, IFlowDescriptorBuilder, Table, Value } from 'qvog-engine';

import { Flow } from '~/lib/flow/strategy';
import { FlowFeatures } from '~/lib/flow/Defines';
import { HamiltonFlow } from '~/lib/flow/strategy/HamiltonFlow';
import { DfgTraverse, TraverseStrategy } from '~/lib/flow/strategy/TraverseStrategy';

/**
 * Features for data flow.
 *
 * @category Flow
 */
export interface DataFlowFeatures extends FlowFeatures {
    flow: Flow;
    strategy: TraverseStrategy;
}

/**
 * @category Flow
 */
export interface DataFlowFeatureOptions extends FlowFeatures {
    flow?: Flow;
    strategy?: TraverseStrategy;
}

/**
 * Data flow descriptor.
 *
 * By default, it uses {@link HamiltonFlow | `HamiltonFlow`} to traverse the graph.
 *
 * @category Flow
 */
export class DataFlow extends BaseFlow {
    private features: DataFlowFeatures = {
        flow: new HamiltonFlow(),
        strategy: new DfgTraverse(),
    };

    configure(features: DataFlowFeatureOptions): IFlowDescriptorBuilder {
        this.features = {
            flow: features.flow ?? this.features.flow,
            strategy: features.strategy ?? this.features.strategy,
        };
        return this;
    }

    protected exists(current: Value, source: Column, sink: Column, barrier: Column, result: Table): void {
        if (sink.isEmpty()) {
            return;
        }

        this.features.flow.apply(current, this.features.strategy).forEach((stream) => {
            const path = new FlowPath();
            for (const [value, _] of stream) {
                path.add(value);
                if (barrier.containsValue(value)) {
                    break;
                } else if (sink.containsValue(value)) {
                    result.addRow(
                        new Map<string, any>([
                            [this.property.sourceAlias, current],
                            [this.property.sinkAlias, value],
                            [this.alias, path.clone()],
                        ])
                    );
                }
            }
        });
    }
}
