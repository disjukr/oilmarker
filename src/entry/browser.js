import 'polyfill/browser';
import 'browser.styl';

import $ from 'jquery';
import React from 'react';

const app = $('#app')[0];

$(main);
async function main() {
    React.render(<div>Hello, World!</div>, app);
}
