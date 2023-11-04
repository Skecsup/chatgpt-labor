import { FaRegCopy } from "react-icons/fa";

export function CopyButton({ text }: { text: string }) {
  const handleCopyClick = () => {
    // Copy the text to the clipboard
    navigator.clipboard.writeText(text);
  };

  return (
    <button className={" text-white"} onClick={handleCopyClick}>
      <FaRegCopy />
    </button>
  );
}
