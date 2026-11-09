type Messages = { [key: string]: unknown };

const isPlainObject = (value: unknown): value is Messages =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// Remote messages override local ones key by key, so a key missing remotely falls back to the
// bundle. Arrays (e.g. hero stats) are values: the remote one replaces the local one whole.
const mergeMessages = (local: Messages, remote: Messages): Messages => {
  const merged: Messages = { ...local };
  for (const [key, value] of Object.entries(remote)) {
    const base = merged[key];
    merged[key] = isPlainObject(value) && isPlainObject(base) ? mergeMessages(base, value) : value;
  }
  return merged;
};

export default mergeMessages;
