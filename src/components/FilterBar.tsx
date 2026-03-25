type Filters = {
  status: string[];
};

type Props = {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export default function FilterBar({ setFilters }: Props) {
  return (
    <div className="p-4">
      <select
        className="px-3 py-2 rounded bg-gray-700 text-white"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setFilters({
            status: e.target.value ? [e.target.value] : [],
          })
        }
      >
        <option value="">All</option>
        <option value="todo">To Do</option>
        <option value="inprogress">In Progress</option>
        <option value="review">In Review</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}