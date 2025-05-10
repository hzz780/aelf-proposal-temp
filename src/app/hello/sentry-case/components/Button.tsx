export default function SButton ({ onClick, children }: any) {
  return <>
    <button
      type="button"
      className="cursor-pointer bg-purple-600 rounded-4 border-none text-white text-14 m-1 p-3 rounded-md"
      onClick={onClick}
    >
      {children}
    </button>
  </>
}
