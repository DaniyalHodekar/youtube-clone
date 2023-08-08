import Button from "./Button"

const buttons = [
  "All",
  "Gaming",
  "Kapil Sharma",
  "Cricket",
  "F1",
  "Algorithms",
  "Songs",
  "Soccer"
];

export default function ButtonList() {
  return (
    <div className="flex gap-3 p-3 overflow-x-auto no-scrollbar relative">
      {buttons.map((ok,i) => (
        <Button key={i} name={ok} />
      ))}
    </div>
  );
}
