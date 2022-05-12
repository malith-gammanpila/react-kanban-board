import React, { useState } from "react";
import _ from "lodash";

import "./App.css";
import Board from "./components/board";
import TaskContainer from "./containers/task.container";

const App = () => {
    return (
        <div className="App">
            <TaskContainer.Provider>
                <Board />
            </TaskContainer.Provider>
        </div>
    );
};

export default App;
