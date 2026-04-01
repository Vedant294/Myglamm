function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-[#f18526] text-white rounded hover:bg-orange-500 transition"
    >
       {children}
    </button>
  );
}

export default Button;
