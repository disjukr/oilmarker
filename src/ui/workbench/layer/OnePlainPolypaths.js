import React from 'react';

import PlainStrokeModel from '../../../model/omd/stroke/PlainStroke';
import PlainFillModel from '../../../model/omd/fill/PlainFill';

import Layer from './Layer';

export default class OnePlainPolypaths extends Layer {
    render() {
        let {layer} = this.props;
        let {stroke, fill} = layer;
        let attr = {};
        if (stroke instanceof PlainStrokeModel) {
            let strokeColor = stroke.fill.fillColor;
            attr.stroke = strokeColor.hex6;
            attr.strokeOpacity = strokeColor.opacity;
            attr.strokeWidth = stroke.width + 'px';
        } else {
            attr.stroke = 'none';
        }
        if (fill instanceof PlainFillModel) {
            let fillColor = fill.fillColor;
            attr.fill = fillColor.hex6;
            attr.fillOpacity = fillColor.opacity;
        } else {
            attr.fill = 'none';
        }
        return <svg className="layer" width="100%" height="100%">
            <path d={layer.d} {...attr}/>
        </svg>;
    }
};
