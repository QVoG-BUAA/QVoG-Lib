import { BaseFlow, Column, DataColumn, FlowPath, IFlowDescriptorBuilder, Table, Value } from "qvog-engine";

import { FlowFeatures } from "~/lib/flow/Defines";
import { EulerFlow, Flow } from "~/lib/flow/strategy";
import { CfgTraverse, DfgTraverse, TraverseStrategy } from "~/lib/flow/strategy/TraverseStrategy";

export interface TaintFlowFeatures extends FlowFeatures {
    dataFlow: Flow;
    dataFlowStrategy: TraverseStrategy;
    controlFlow: Flow;
    controlFlowStrategy: TraverseStrategy;
}

export interface TaintFlowFeatureOptions extends FlowFeatures {
    dataFlow?: Flow;
    dataFlowStrategy?: TraverseStrategy;
    controlFlow?: Flow;
    controlFlowStrategy?: TraverseStrategy;
}

export class TaintFlow extends BaseFlow {
    private features: TaintFlowFeatures = {
        dataFlow: new EulerFlow(),
        dataFlowStrategy: new DfgTraverse(),
        controlFlow: new EulerFlow(),
        controlFlowStrategy: new CfgTraverse()
    };

    configure(features: TaintFlowFeatureOptions): IFlowDescriptorBuilder {
        this.features = {
            dataFlow: features.dataFlow ?? this.features.dataFlow,
            dataFlowStrategy: features.dataFlowStrategy ?? this.features.dataFlowStrategy,
            controlFlow: features.controlFlow ?? this.features.controlFlow,
            controlFlowStrategy: features.controlFlowStrategy ?? this.features.controlFlowStrategy
        };
        return this;
    }

    protected exists(current: Value, source: Column, sink: Column, barrier: Column, result: Table): void {
        if (sink.isEmpty()) {
            return;
        }

        const narrowedSink = new DataColumn(sink.getName(), true);
        this.existsDataFlow(current, sink, narrowedSink);
        if (narrowedSink.isEmpty()) {
            return;
        }

        const narrowedBarrier = new DataColumn(barrier.getName(), true);
        this.existsDataFlow(current, barrier, narrowedBarrier);

        this.existsControlFlow(current, source, narrowedSink, narrowedBarrier, result);
    }

    private existsDataFlow(current: Value, loose: Column, narrow: Column): void {
        this.features.dataFlow.apply(current, this.features.dataFlowStrategy).forEach(stream => {
            for (const [value, _] of stream) {
                if (loose.containsValue(value)) {
                    narrow.addValue(value);
                }
            }
        });
    }

    private existsControlFlow(current: Value, source: Column, sink: Column, barrier: Column, result: Table) {
        this.features.controlFlow.apply(current, this.features.controlFlowStrategy).forEach(stream => {
            const path = new FlowPath();
            for (const [value, _] of stream) {
                path.add(value);
                if (barrier.containsValue(value)) {
                    break;
                } else if (sink.containsValue(value)) {
                    result.addRow(new Map<string, any>([
                        [this.property.sourceAlias, current],
                        [this.property.sinkAlias, value],
                        [this.alias, path.clone()]
                    ]));
                }
            }
        });
    }
}
