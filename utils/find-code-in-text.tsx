import { CopyButton } from "../components/CopyButton";
import { removeFirstWord } from "./remove-first-word";

export function parseString(inputString: string) {
  const segments = inputString.split("```");
  const parsedElements = [];

  for (let i = 0; i < segments.length; i++) {
    if (i % 2 === 0) {
      // Text outside backticks, treat it as normal text
      parsedElements.push(
        <pre className="font-sans whitespace-pre-wrap" key={`basic-text-${i}`}>
          {segments[i]}
        </pre>
      );
    } else {
      // Text inside backticks, treat it as code
      parsedElements.push(
        <div
          key={`code-block-${i}`}
          className="flex flex-row justify-between rounded-md p-2 border bg-black my-4"
        >
          <pre className="whitespace-pre-wrap">
            <code>{removeFirstWord(segments[i])}</code>
          </pre>
          <CopyButton text={removeFirstWord(segments[i])} />
        </div>
      );
    }
  }

  return <div className="flex flex-col">{parsedElements}</div>;
}
