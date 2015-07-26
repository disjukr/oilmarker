import React from 'react';

export default class MenuBar extends React.Component {
    render() {
        let {app} = this.props;
        let {document} = app.state;
        return <div className="menu-bar">
            OilMarker <button onClick={e => {
                console.log(document, JSON.stringify(document));
            }}>log document</button>
        </div>;
    }
};
