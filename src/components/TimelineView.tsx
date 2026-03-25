type Task = {
  id: string;
  title: string;
  status: string;
  priority?: string;
  startDate?: number;
  dueDate?: number;
};

type Props = {
  tasks: Task[];
};

export default function TimelineView({ tasks }: Props) {
  const daysInMonth = 30;

  const today = new Date().getDate();

  const getPosition = (date: number) => {
    return ((date - 1) / daysInMonth) * 100;
  };

  return (
    <div className="p-4 overflow-x-auto">
      <div className="relative min-w-[800px] border border-gray-700 h-[400px]">

        {/* TODAY LINE */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-red-500"
          style={{ left: `${getPosition(today)}%` }}
        />

        {/* TASK BARS */}
        {tasks.map((task, i) => {
          const start = task.startDate ?? task.dueDate ?? 1;
          const end = task.dueDate ?? start;

          const left = getPosition(start);
          const width = Math.max(2, getPosition(end) - getPosition(start));

          return (
            <div
              key={task.id}
              className="absolute h-6 rounded text-xs text-white flex items-center px-2"
              style={{
                top: `${i * 30}px`,
                left: `${left}%`,
                width: `${width}%`,
                backgroundColor: getColor(task.priority),
              }}
            >
              {task.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// helper
const getColor = (priority?: string) => {
  if (priority === "high") return "red";
  if (priority === "medium") return "orange";
  return "green";
};