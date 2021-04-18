import React from 'react';
import ReactDOM from 'react-dom';
import Design from '../components/page/Design';
import createPage, { Layout } from '../components/shared/Page';

ReactDOM.render(
    React.createElement(createPage(Design, { layout: Layout.SingleColumn }), {
        isLoggedIn: true,
        latestAppName: "Style Guideline",
        onCreateApp: async () => {},
    }),
    document.querySelector('body'),
)
