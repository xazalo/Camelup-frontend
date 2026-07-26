type LogType = "LOG" | "ERROR" | "FINISHED" | "STARTED";

export type ParsedLog = {
  type: LogType;
  message: string;
};

export function parseGameLogs(data: string): ParsedLog[] {
  const regex = /\[(LOG|ERROR|FINISHED|STARTED)\]/g;

  const matches = [...data.matchAll(regex)];

  if (matches.length === 0) {
    return [];
  }

  return matches.map((match, index) => {
    const type = match[1] as LogType;
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? data.length;

    return {
      type,
      message: data.slice(start, end).trim(),
    };
  });
}