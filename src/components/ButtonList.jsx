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
    <div className="flex gap-3 py-3 px-1 overflow-x-auto no-scrollbar relative">
      {buttons.map((ok, i) => (
        <Button key={i} name={ok} />
      ))}
    </div>
  );
}
