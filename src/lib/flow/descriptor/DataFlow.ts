import { AnyColumn, Column, Configuration, DataColumn, FlowDescriptor, FlowDescriptorBuilder, FlowPath, IFlowDescriptorBuilder, PredicateColumn, Row, Table, Value, ValuePredicate } from "qvog-engine";

import { FlowFeatures } from "~/lib/flow/Defines";
import { HamiltonFlow } from "~/lib/flow/strategy/HamiltonFlow";
import { DfgTraverse } from "~/lib/flow/strategy/TraverseStrategy";

export class DataFlow extends FlowDescriptorBuilder {
    private features: FlowFeatures = {
        flow: new HamiltonFlow(),
        strategy: new DfgTraverse()
    };

    configure(features: FlowFeatures): IFlowDescriptorBuilder {
        this.features = features;
        return this;
    }

    build(): FlowDescriptor {
        return new FlowDescriptor(this.alias, this.property,
            (source: Table, sink: Table, barrier?: Table) => this.apply(source, sink, barrier)
        );
    }

    private apply(source: Table, sink: Table, barrier?: Table): Table {
        const sourceColumn = source.asColumn();
        const sinkColumn = sink.asColumn();
        const barrierColumn = barrier ? barrier.asColumn() : new PredicateColumn("", ValuePredicate.none());

        const result = new Table(this.alias);
        result.addColumn(new DataColumn(this.property.sourceAlias, true));
        result.addColumn(new DataColumn(this.property.sinkAlias, true));
        if (this.property.barrierAlias) {
            result.addColumn(new DataColumn(this.property.barrierAlias, true));
        }
        result.addColumn(new AnyColumn(this.alias));

        this.exists(sourceColumn, sinkColumn, barrierColumn, result);

        return result;
    }

    private exists(source: Column, sink: Column, barrier: Column, result: Table): void {
        Configuration.getLogger("DataFlow").debug(`Running DataFlow: Source[${source.getSize()}] -> Barrier[${barrier.getSize()}] -> Sink[${sink.getSize()}]`);
        for (const value of source) {
            this.existsImpl(value, source, sink, barrier, result);
        }
    }

    private existsImpl(current: Value, source: Column, sink: Column, barrier: Column, result: Table): void {
        this.features.flow.apply(current, this.features.strategy).forEach((stream) => {
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
