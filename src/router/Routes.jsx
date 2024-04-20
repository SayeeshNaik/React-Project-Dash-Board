import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history';

import Projects from "../components/projects/Projects";
import FileViewer from "../components/projects/fileViewer/FileViewer";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Projects} />
                    <Route path="/file" component={FileViewer} />
                   
                </Switch>
            </Router>
        )
    }
}