'use client';

type MoodFilterProps = {
  moods: string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
};

export default function MoodFilter({
  moods,
  selected,
  onSelect,
}: MoodFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {moods.map((mood) => {
        const isActive = selected === mood;
        return (
          <button
            key={mood}
            type="button"
            className={`rounded-full px-4 py-1 text-sm transition ${
              isActive
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => onSelect(mood)}
          >
            {mood}
          </button>
        );
      })}
      <button
        type="button"
        className={`rounded-full px-4 py-1 text-sm transition ${
          selected === null
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => onSelect(null)}
      >
        All
      </button>
    </div>
  );
}

