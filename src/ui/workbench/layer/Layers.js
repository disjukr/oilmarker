import React from 'react';

import OnePlainPolypaths from './OnePlainPolypaths';
import OnePlainPolypathsModel from '../../../model/omd/layer/OnePlainPolypaths';

export default class Layers extends React.Component {
    render() {
        let {document} = this.props;
        let style = {
            width: document.width,
            height: document.height
        };
        let Layer;
        return <div className="layers" style={style}>{
            [for (layer of document.layers)
                Layer = getRenderer(layer),
                <Layer key={layer.id} layer={layer}/>]
        }</div>;
    }
};

function getRenderer(layerModel) {
    if (layerModel instanceof OnePlainPolypathsModel) return OnePlainPolypaths;
    throw new Error('unknown layer type');
}
