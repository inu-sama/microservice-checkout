import { useState } from "react";

export default function Header() {
  const [output, setOutput] = useState("");
  const input = (event) => {
    setOutput(event.target.value);
  };
  return (
    <div className="bg-white sticky top-0">
      <h1>Header</h1>
    </div>
  );
}
