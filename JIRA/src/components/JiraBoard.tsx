import { DragDropProvider } from "@dnd-kit/react";
import { useState, useMemo } from "react";

import TodoList from "./TodoList";
import InProgressList from "./InProgressList";
import ReviewList from "./ReviewList";
import DoneList from "./DoneList";
import { containerMapping } from "../constants";
import AddTask from "./AddTask";

const JiraBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "MPIO-1234",
      title: "Task 1",
      tag: "KTLO Feature 1",
      storyPoints: 3,
      status: "backlog",
    },
    {
      id: "MPIO-1235",
      title: "Task 2",
      tag: "KTLO Feature 2",
      storyPoints: 5,
      status: "backlog",
    },
  ]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const handleDragEnd = (event: any) => {
    if (event.cancelled) return;

    const { source, target } = event.operation;
    console.log("drag ended, target: ", target.id, "source: ", source.id);

    const tempTasks = tasks.map((task) => {
      if (task.id === source.id) {
        const newStatus =
          containerMapping[target.id as keyof typeof containerMapping];
        console.log("new status: ", newStatus);
        return { ...task, status: newStatus };
      }
      return task;
    });

    setTasks(tempTasks);
  };

  const backlogTasks = useMemo(
    () => tasks.filter((task) => task.status === "backlog"),
    [tasks],
  );
  const inProgressTasks = useMemo(
    () => tasks.filter((task) => task.status === "inProgress"),
    [tasks],
  );
  const reviewTasks = useMemo(
    () => tasks.filter((task) => task.status === "review"),
    [tasks],
  );
  const doneTasks = useMemo(
    () => tasks.filter((task) => task.status === "done"),
    [tasks],
  );

  const handleAddTask = () => {
    setShowAddTaskModal(true);
  };

  const handleCreateTask = (newTask: Omit<Task, "status">) => {
    const taskWithStatus: Task = { ...newTask, status: "backlog" };
    setTasks((prev) => [...prev, taskWithStatus]);
    setShowAddTaskModal(false);
  };

  return (
    <>
      {showAddTaskModal ? (
        <AddTask
          handleCreateTask={handleCreateTask}
          handleClose={() => setShowAddTaskModal(false)}
        />
      ) : null}
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="jira-board">
          <h1 className="title">jira board</h1>
          <div className="button-actions-container">
            <button className="add-task-btn" onClick={handleAddTask}>
              Add Task
            </button>
          </div>
          <hr />
          <div className="jira-dashboard-container">
            <TodoList tasks={backlogTasks} />
            <InProgressList tasks={inProgressTasks} />
            <ReviewList tasks={reviewTasks} />
            <DoneList tasks={doneTasks} />
          </div>
        </div>
      </DragDropProvider>
    </>
  );
};

export default JiraBoard;
