import React from 'react';

import OnePlainShape from './OnePlainShape';
import OnePlainShapeModel from '../../../model/omd/layer/OnePlainShape';

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
    if (layerModel instanceof OnePlainShapeModel) return OnePlainShape;
    throw new Error('unknown layer type');
}
