import React from 'react';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Splash from './components/Splash/Splash';

import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = () => (
    <Router>
        <Route path='/' exact component={Splash} />
        <Route path='/chat' component={Chat} />
        <Route path='/splash' component={Splash} />
    </Router>
);

export default App;