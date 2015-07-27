import React from 'react';

export default class Layer extends React.Component {
    _getCurrentTool() {
        return this.props.app.state.currentTool;
    }
    down(pointer) {
        let tool = this._getCurrentTool();
        tool.setLayer(this.props.layer);
        tool.down(pointer);
        this.forceUpdate();
    }
    move(pointer) {
        this._getCurrentTool().move(pointer);
        this.forceUpdate();
    }
    up(pointer) {
        this._getCurrentTool().up(pointer);
        this.forceUpdate();
    }
    render() {
        throw new Error('not implemented');
    }
};
