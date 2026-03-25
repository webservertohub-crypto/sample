import TaskCard from "./TaskCard";

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

type ColumnType = {
  key: string;
  title: string;
};

type Props = {
  column: ColumnType;
  tasks: Task[];
  onDrop: (status: string) => void;
  onDragStart: (task: Task) => void;
  draggedTask: Task | null;
  activeUsers: ActiveUser[];
};

export default function Column({
  column,
  tasks,
  onDrop,
  onDragStart,
  draggedTask,
  activeUsers,
}: Props) {
  const filtered = tasks.filter(
    (t) => t.status === column.key
  );

  const isActive = draggedTask !== null;

  return (
    <div
      onPointerUp={() => onDrop(column.key)}
      className={`bg-gray-800 rounded-2xl p-4 h-[80vh] flex flex-col shadow-lg transition
      ${isActive ? "bg-blue-900 scale-105" : ""}`}
    >
      <h2 className="font-bold mb-3 text-lg text-blue-400">
        {column.title} ({filtered.length})
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2">
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No tasks
          </p>
        ) : (
          filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={onDragStart}
              isDragging={draggedTask?.id === task.id}
              activeUsers={activeUsers}
            />
          ))
        )}
      </div>
    </div>
  );
}