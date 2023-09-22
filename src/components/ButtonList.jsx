import Button from "./Button";
const buttons = [
  "Front-end",
  "Gaming",
  "Kapil Sharma",
  "Cricket",
  "F1",
  "Merge Sort",
  "Sliding Window",
  "Binary Search",
  "Songs",
  "Soccer",
  "JavaScript",
  "Dynamic Programming",
  "Bollywood",
  "Cyber security",
  "Chess",
  "One Piece",
  "Node.js",
];

export default function ButtonList() {
  return (
    <div className="flex gap-3 py-3 px-3 overflow-x-auto no-scrollbar fixed bg-[#0f0f0f] z-10 left-0 right-2">
      {buttons.map((ok, i) => (
        <Button key={i} name={ok} />
      ))}
    </div>
  );
}
