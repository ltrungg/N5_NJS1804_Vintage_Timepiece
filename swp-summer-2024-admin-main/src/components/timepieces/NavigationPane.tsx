export default function NavigationPane() {
  return (
    <div className="h-12 flex flex-row justify-end m-1">
      <div className="flex flex-row items-center justify-center gap-1">
        <button className="min-w-fit flex items-center gap-2 bg-green-600 text-white p-2 rounded-md border border-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
          </svg>
          Add a timepiece
        </button>
      </div>
    </div>
  );
}
