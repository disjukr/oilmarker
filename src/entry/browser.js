import 'polyfill/browser';
import 'browser.styl';

import $ from 'jquery';
import React from 'react';

import App from '../ui/App';
const app = $('#app')[0];

$(main);
async function main() {
    React.render(<App/>, app);
}
