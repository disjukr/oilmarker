import $ from 'jquery';

import React from 'react';
import Layers from './layer/Layers';

export default class Workbench extends React.Component {
    componentDidMount() {
        let $this = $(React.findDOMNode(this));
        let {layers} = this.refs;
        $this.on('pointerdown', e => {
            layers.down(e.originalEvent);
            $this.on('pointermove', move);
            $this.on('pointerup', up);
        });
        function move(e) {
            layers.move(e.originalEvent);
        }
        function up(e) {
            layers.up(e.originalEvent);
            $this.off('pointermove', move);
            $this.off('pointerup', up);
        }
    }
    componentWillUnmount() {
        let $this = $(React.findDOMNode(this));
        $this.off();
    }
    render() {
        let {app} = this.props;
        let {document} = app.state;
        return <div className="workbench">
            <Layers ref="layers" document={document}/>
        </div>;
    }
};
