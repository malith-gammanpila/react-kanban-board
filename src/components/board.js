import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import _ from "lodash";

import TaskContainer from "../containers/task.container";

const Board = () => {
    const { text, setText, lanes, setLanes } = TaskContainer.useContainer();

    const handleDragEnd = ({ destination, source }) => {
        if (!destination) {
            return;
        }

        if (
            destination.index === source.index &&
            destination.droppableId === source.droppableId
        ) {
            return;
        }

        // Creating a copy of item
        let temp = { ...lanes[source.droppableId].items[source.index] };

        setLanes((prev) => {
            prev = { ...prev };
            // Remove from previous
            prev[source.droppableId].items.splice(source.index, 1);

            // Adding new items
            prev[destination.droppableId].items.splice(
                destination.index,
                0,
                temp
            );

            return prev;
        });
    };

    const addItem = () => {
        setLanes((prev) => {
            return {
                ...prev,
                q1: {
                    title: "q1",
                    items: [
                        {
                            id: v4(),
                            name: text,
                        },
                        ...prev.q1.items,
                    ],
                },
            };
        });

        setText("");
    };

    // Todo
    // const removetask = (task) => {
    //     const index = array.indexOf(task);
    //     if (index > -1) {
    //         array.splice(index, 1);
    //     }

    //     setLanes((lanes) => lanes.filter((_, i) => i !== lanes.length - 1));
    // };

    return (
        <>
            <div>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button onClick={addItem}>Add</button>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                {_.map(lanes, (data, key) => {
                    return (
                        <div key={key} className={"column"}>
                            <h3>{data.title}</h3>
                            <Droppable droppableId={key}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={"droppable-col"}
                                        >
                                            {data.items.map(
                                                (element, index) => {
                                                    return (
                                                        <Draggable
                                                            key={element.id}
                                                            index={index}
                                                            draggableId={
                                                                element.id
                                                            }
                                                        >
                                                            {(
                                                                provided,
                                                                snapshot
                                                            ) => {
                                                                console.log(
                                                                    snapshot
                                                                ); // debug
                                                                return (
                                                                    <div
                                                                        className={`item ${
                                                                            snapshot.isDragging &&
                                                                            "dragging"
                                                                        }`}
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        {
                                                                            element.name
                                                                        }
                                                                        {
                                                                            element.description
                                                                        }
                                                                        <button
                                                                            onClick={
                                                                                (
                                                                                    e
                                                                                ) =>
                                                                                    console.log(
                                                                                        e
                                                                                    ) // debug
                                                                            }
                                                                        >
                                                                            Close
                                                                        </button>
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                }
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    );
                                }}
                            </Droppable>
                        </div>
                    );
                })}
            </DragDropContext>
        </>
    );
};

export default Board;
