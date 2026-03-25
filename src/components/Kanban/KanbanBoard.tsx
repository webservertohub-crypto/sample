import { useState, useEffect, useCallback } from "react";
import Column from "./Column";

// TYPES
type Task = {
  id: string;
  title: string;
  status: string;
};

type ActiveUser = {
  userId: string;
  taskId: string;
};

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  activeUsers: ActiveUser[];
};

const columns = [
  { key: "todo", title: "To Do" },
  { key: "inprogress", title: "In Progress" },
  { key: "review", title: "In Review" },
  { key: "done", title: "Done" },
];

export default function KanbanBoard({
  tasks,
  setTasks,
  activeUsers,
}: Props) {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback((e: PointerEvent) => {
    setDragPosition({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDrop = (status: string) => {
    if (!draggedTask) return;

    const updated = tasks.map((t) =>
      t.id === draggedTask.id ? { ...t, status } : t
    );

    setTasks(updated);
    setDraggedTask(null);
  };

  useEffect(() => {
    if (!draggedTask) return;

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [draggedTask, handlePointerMove]);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4 h-[calc(100vh-140px)]">
        {columns.map((col) => (
          <Column
            key={col.key}
            column={col}
            tasks={tasks}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            draggedTask={draggedTask}
            activeUsers={activeUsers}
          />
        ))}
      </div>

      {draggedTask && (
        <div
          className="fixed pointer-events-none z-50 bg-white p-3 rounded-lg shadow-lg opacity-80 text-black"
          style={{
            top: dragPosition.y,
            left: dragPosition.x,
            transform: "translate(-50%, -50%)",
          }}
        >
          {draggedTask.title}
        </div>
      )}
    </>
  );
}