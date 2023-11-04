import { CopyButton } from "../components/CopyButton";
import { removeFirstWord } from "./remove-first-word";

export function parseString(inputString: string) {
  const segments = inputString.split("```");
  const parsedElements = [];

  for (let i = 0; i < segments.length; i++) {
    if (i % 2 === 0) {
      // Text outside backticks, treat it as normal text
      parsedElements.push(
        <p className="font-sans" key={i}>
          {segments[i]}
        </p>
      );
    } else {
      // Text inside backticks, treat it as code
      parsedElements.push(
        <div
          key={i}
          className="flex flex-row justify-between rounded-md p-2 border bg-black my-4"
        >
          <pre>
            <code>{removeFirstWord(segments[i])}</code>
          </pre>
          <CopyButton text={removeFirstWord(segments[i])} />
        </div>
      );
    }
  }

  return <div className="flex flex-col">{parsedElements}</div>;
}
