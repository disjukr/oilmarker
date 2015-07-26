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
        let testLayer = new OnePlainPolypaths('레이어 1', new PlainStroke(PlainFill.black, 3), Fill.none);
        let Circle = require('../model/omd/geom/Circle');
        let Pill = require('../model/omd/geom/Pill');
        let start = new Circle(100, 100, 30);
        let end = new Circle(170, 200, 100);
        let pill = new Pill(start, end);
        testLayer.paint(pill);
        omd.layers.pushLayer(testLayer);
        this.state = {
            document: omd
        };
    }
    render() {
        return <div className="app">
            <MenuBar ref="menu-bar" app={this}/>
            <Workbench ref="workbench" app={this}/>
        </div>;
    }
};
