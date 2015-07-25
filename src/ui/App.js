import React from 'react';

import MenuBar from './menu-bar/MenuBar';
import Workbench from './workbench/Workbench';

import Document from '../model/omd/Document';
import OnePlainShape from '../model/omd/layer/OnePlainShape';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        let omd = new Document();
        omd.width = 640;
        omd.height = 480;
        omd.layers.pushLayer(new OnePlainShape());
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
