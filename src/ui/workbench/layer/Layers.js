import React from 'react';
import $ from 'jquery';

import Pointer from '../../../model/omd/Pointer';

import OnePlainPolypaths from './OnePlainPolypaths';
import OnePlainPolypathsModel from '../../../model/omd/layer/OnePlainPolypaths';

export default class Layers extends React.Component {
    _getCurrentLayer() {
        return this.refs[this.props.app.state.currentLayerId];
    }
    _getPointerFromEvent(e) {
        let $layers = $(React.findDOMNode(this.refs.layers));
        let [offset, width, height] = [
            $layers.offset(),
            $layers.width(),
            $layers.height()
        ];
        return new Pointer(
            e.clientX - offset.left,
            e.clientY - offset.top
        );
    }
    down(e) {
        let currentLayer = this._getCurrentLayer();
        if (currentLayer) {
            currentLayer.down(this._getPointerFromEvent(e));
        }
    }
    move(e) {
        let currentLayer = this._getCurrentLayer();
        if (currentLayer) {
            currentLayer.move(this._getPointerFromEvent(e));
        }
    }
    up(e) {
        let currentLayer = this._getCurrentLayer();
        if (currentLayer) {
            currentLayer.up(this._getPointerFromEvent(e));
        }
    }
    render() {
        let {app} = this.props;
        let {omd} = app.state;
        let style = {
            width: omd.width,
            height: omd.height
        };
        let Layer;
        return <div ref="layers" className="layers" style={style}>{
            [for (layer of omd.layers)
                Layer = getRenderer(layer),
                <Layer ref={layer.id} key={layer.id} app={app} layer={layer}/>]
        }</div>;
    }
};

function getRenderer(layerModel) {
    if (layerModel instanceof OnePlainPolypathsModel) return OnePlainPolypaths;
    throw new Error('unknown layer type');
}
