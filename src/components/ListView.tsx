import { useState } from "react";

// TYPES
type Task = {
  id: string;
  title: string;
  status: string;
};

type Props = {
  tasks: Task[];
};

const ROW_HEIGHT = 60;
const BUFFER = 5;

export default function ListView({ tasks }: Props) {
  const [scrollTop, setScrollTop] = useState(0);

  const containerHeight = 400;

  const totalHeight = tasks.length * ROW_HEIGHT;

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ROW_HEIGHT) - BUFFER
  );

  const endIndex = Math.min(
    tasks.length,
    Math.ceil((scrollTop + containerHeight) / ROW_HEIGHT) + BUFFER
  );

  const visibleTasks = tasks.slice(startIndex, endIndex);

  return (
    <div
      className="h-[400px] overflow-y-auto border border-gray-700"
      onScroll={(e: React.UIEvent<HTMLDivElement>) =>
        setScrollTop(e.currentTarget.scrollTop)
      }
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleTasks.map((task, i) => {
          const index = startIndex + i;

          return (
            <div
              key={task.id}
              className="absolute left-0 right-0 border-b border-gray-700 p-3 bg-gray-800"
              style={{
                top: index * ROW_HEIGHT,
                height: ROW_HEIGHT,
              }}
            >
              <p className="font-semibold text-white">
                {task.title}
              </p>
              <p className="text-sm text-gray-400">
                {task.status}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}