import React from 'react';

import MenuBar from './menu-bar/MenuBar';
import Workbench from './workbench/Workbench';

import Document from '../model/omd/Document';
import OnePlainPolypaths from '../model/omd/layer/OnePlainPolypaths';

import PlainStroke from '../model/omd/stroke/PlainStroke';
import Fill from '../model/omd/fill/Fill';
import PlainFill from '../model/omd/fill/PlainFill';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        let omd = new Document();
        omd.width = 640;
        omd.height = 480;
        let testLayer = new OnePlainPolypaths(
            '테스트 레이어',
            new PlainStroke(PlainFill.red, 3),
            PlainFill.black
        );
        omd.layers.pushLayer(testLayer);
        let CircleBrush = require('../model/omd/tool/brush/CircleBrush');
        this.state = {
            omd: omd,
            currentLayerId: testLayer.id,
            currentTool: new CircleBrush(5)
        };
    }
    render() {
        return <div className="app">
            <MenuBar ref="menu-bar" app={this}/>
            <Workbench ref="workbench" app={this}/>
        </div>;
    }
};
