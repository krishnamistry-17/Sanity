'use client';

type RandomQuoteButtonProps = {
  onClick: () => void | Promise<void>;
};

export default function RandomQuoteButton({
  onClick,
}: RandomQuoteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
    >
      Random Quote
    </button>
  );
}

