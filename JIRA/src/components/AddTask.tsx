import { useState } from "react";

const AddTask = ({ handleCreateTask, handleClose }) => {
  const [task, setTask] = useState({
    id: "MPIO-1238",
    title: "",
    tag: "",
    storyPoints: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: name === "storyPoints" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    if(!task.title || !task.tag || task.storyPoints <= 0) {
      alert("Please fill in all fields with valid values.");
      return;
    }
    e.preventDefault();
    console.log("New Task Created: ", task);
    handleCreateTask(task);
  }

  return (
    <div className="add-task-modal-overlay">
      <dialog open id="add-task-modal" className="add-task-modal">
        <form method="dialog" className="add-task-form">
          <h2 className="form-header">Add New Task</h2>
          <label htmlFor="task-title">Title:</label>
          <input
            type="text"
            id="task-title"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="task-tag">Tag:</label>
          <input
            type="text"
            id="task-tag"
            name="tag"
            value={task.tag}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="story-points">Story Points:</label>
          <input
            type="number"
            id="story-points"
            name="storyPoints"
            value={task.storyPoints}
            onChange={handleInputChange}
            required
            min={1}
          />

          <div className="form-actions">
            <button type="submit" className="create-task-confirm-btn" onClick={handleSubmit}>
              Add Task
            </button>
            <button type="button" className="create-task-cancel-btn" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default AddTask;
