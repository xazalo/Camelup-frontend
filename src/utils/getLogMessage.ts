import { LOG_MESSAGE_KEYS } from "./logMessages";

export function getLogMessageKey(message: string): string {
  for (const key in LOG_MESSAGE_KEYS) {
    if (message.startsWith(key)) {
      return LOG_MESSAGE_KEYS[key] as string;
    }
  }

  return message;
}