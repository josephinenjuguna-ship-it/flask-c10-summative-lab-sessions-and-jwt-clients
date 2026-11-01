import React, { useEffect, useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  function fetchTasks() {
    fetch("/tasks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => response.json())
      .then((data) => setTasks(data.tasks));
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (editingTask) {
      fetch(`/tasks/${editingTask.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ title, description })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Could not update task");
          }

          setTitle("");
          setDescription("");
          setEditingTask(null);
          fetchTasks();
        })
        .catch((error) => console.error(error));
    } else {
      fetch("/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ title, description })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Could not create task");
          }

          setTitle("");
          setDescription("");
          fetchTasks();
        })
        .catch((error) => console.error(error));
    }
  }

  function handleComplete(task) {
    fetch(`/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        completed: !task.completed
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not update task");
        }

        fetchTasks();
      })
      .catch((error) => console.error(error));
  }

  function handleDelete(taskId) {
    fetch(`/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not delete task");
        }

        fetchTasks();
      })
      .catch((error) => console.error(error));
  }

  function handleEdit(task) {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || "");
  }

  function handleCancelEdit() {
    setEditingTask(null);
    setTitle("");
    setDescription("");
  }

  return (
    <div>
      <h2>My Tasks</h2>

      <h3>{editingTask ? "Edit Task" : "Add a New Task"}</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>
            Status: {task.completed ? "Completed" : "Pending"}
          </p>

          <button onClick={() => handleComplete(task)}>
            {task.completed ? "Mark as Pending" : "Mark as Completed"}
          </button>

          <button onClick={() => handleEdit(task)}>
            Edit
          </button>

          <button onClick={() => handleDelete(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
