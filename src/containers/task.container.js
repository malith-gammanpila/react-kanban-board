import { useState } from "react";
import { createContainer } from "unstated-next";
import { v4 } from "uuid";

const useTask = () => {
    const [text, setText] = useState("");
    const [lanes, setLanes] = useState({
        q1: {
            title: "Q1",
            items: [
                {
                    id: v4(),
                    name: "Sample task name 1",
                    description:
                        "isdv sduhfsdc aoifhedsc oihfijawSFc aOFoiedc eosfiowef",
                },
                {
                    id: v4(),
                    name: "Sample task name 2",
                    description:
                        "isdv sduhfsdc aoifhedsc oihfijawSFc aOFoiedc eosfiowef",
                },
            ],
        },
        q2: {
            title: "Q2",
            items: [],
        },
        q3: {
            title: "Q3",
            items: [],
        },
        q4: {
            title: "Q4",
            items: [],
        },
    });

    return { text, setText, lanes, setLanes };
};

const TaskContainer = createContainer(useTask);

export default TaskContainer;
