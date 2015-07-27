import React from 'react';

export default class MenuBar extends React.Component {
    render() {
        let {app} = this.props;
        let {omd} = app.state;
        return <div className="menu-bar">
            OilMarker <button onClick={e => {
                console.log(omd, JSON.stringify(omd));
            }}>log document</button>
        </div>;
    }
};
