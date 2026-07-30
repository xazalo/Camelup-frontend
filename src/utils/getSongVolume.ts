const songVolumes: Record<string, number> = {
  "atlas.mp3": 0.7,
  "king.mp3": 0.5,
  "desert.mp3": 0.7,
  "egypt.mp3": 0.6,
  "oasis.mp3": 0.7,
};

const fxVolumes: Record<string, number> = {
  "bet": 0.5,
  "loser": 0.5,
  "place-tile": 0.5,
  "winner": 0.7,
  "roll-dice": 0.5,
  "your-turn": 0.35,
};

export function getSongVolume(path: string): number {
  const file = (path.split("/").pop() ?? "").replace(/-[A-Za-z0-9_-]{8,}(?=\.(mp3|ogg|wav)$)/, "");

  return songVolumes[file] ?? 1;
}

export function getFxVolume(path: string): number {
  const file = (path.split("/").pop() ?? "").replace(/-[A-Za-z0-9_-]{8,}(?=\.(mp3|ogg|wav)$)/, "");

  return fxVolumes[file] ?? 1;
}
