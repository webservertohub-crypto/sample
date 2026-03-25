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
  task: Task;
  onDragStart: (task: Task) => void;
  isDragging: boolean;
  activeUsers: ActiveUser[];
};

export default function TaskCard({
  task,
  onDragStart,
  isDragging,
  activeUsers,
}: Props) {
  const usersOnThisTask = activeUsers.filter(
    (u) => u.taskId === task.id
  );

  return (
    <div
      onPointerDown={() => onDragStart(task)}
      className={`p-3 rounded-xl shadow-md bg-gray-700 hover:bg-gray-600 transition cursor-pointer
      ${isDragging ? "opacity-40 scale-95" : ""}`}
    >
      <p>{task.title}</p>

      <div className="flex mt-2">
        {usersOnThisTask.map((u) => (
          <div
            key={u.userId}
            className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center -ml-2 ${getUserColor(
              u.userId
            )}`}
          >
            {u.userId}
          </div>
        ))}
      </div>
    </div>
  );
}

// helper
const getUserColor = (id: string) => {
  if (id === "u1") return "bg-red-500";
  if (id === "u2") return "bg-green-500";
  return "bg-blue-500";
};