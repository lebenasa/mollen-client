import React from 'react';
import ReactDOM from 'react-dom';
import Index from '../components/page/Index';
import createPage from '../components/shared/Page';

ReactDOM.render(
    React.createElement(createPage(Index), {
        isLoggedIn: true,
        latestAppName: "Test App",
        onCreateApp: async () => {},
    }),
    document.querySelector('body'),
)