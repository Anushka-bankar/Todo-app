import React, { useEffect, useState } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";
import "./Todo.css";

export const Todo = () => {

    const [inputValue, setInputValue] = useState("");
    const [task, setTask] = useState([]); // to store data
    const [dateTime, setDateTime] = useState("");

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!inputValue) return;

        if (task.includes(inputValue)) return;

        setTask((prevTask) => [...prevTask, inputValue]);  // ...=> spread operator

        setInputValue("");
    };

    // todo Date and Time
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formattedDate = now.toLocaleDateString();
            const formattedTime = now.toLocaleTimeString();
            setDateTime(`${formattedDate} - ${formattedTime}`);
        }, 1000);

        return () => clearInterval(interval); // to save memory 
    }, []);

    // todo Delete Task
    const handleDeleteTodo = (value) => {
        // console.log(task);
        // console.log(value);
        const updatedTask = task.filter((curTask) => curTask !== value); 
        setTask(updatedTask);
    };

    const handleClearTodoData = () => {
        setTask([]);
    };

    return (
    <section className="todo-container">
        <header>
            <h1>Todo List</h1>
            <h2 className="date-time">{dateTime}</h2>
        </header>
        <section className="form">
            <form onSubmit={handleFormSubmit}>
                <div>
                    <input 
                        type="text" 
                        className="todo-input" 
                        autoComplete="off" 
                        value={inputValue}
                        onChange={(event) => handleInputChange(event.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" className="todo-btn">
                        Add Task
                    </button>
                </div>
            </form>
            <section className="myUnOrdList">
                <ul className="todo-list">
                    {task.map((curTask, index) => (
                        <li key={index} className="todo-item"> 
                            <span>{curTask}</span>
                            <button className="check-btn">
                                <MdCheck />
                            </button>
                            <button className="delete-btn" onClick={() => handleDeleteTodo(curTask)}> 
                                <MdDeleteForever />
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </section>

        <section>
            <button className="clear-btn" onClick={handleClearTodoData}>
                Clear All
            </button>
        </section>
    </section>
);
};
