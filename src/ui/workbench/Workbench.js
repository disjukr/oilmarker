import React from 'react';
import Layers from './layer/Layers';

export default class Workbench extends React.Component {
    render() {
        let {app} = this.props;
        let {document} = app.state;
        return <div className="workbench">
            <Layers document={document}/>
        </div>;
    }
};
