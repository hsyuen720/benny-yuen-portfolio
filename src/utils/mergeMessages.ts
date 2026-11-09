type Messages = { [key: string]: string | Messages };

// Remote messages override local ones key by key, so a key missing remotely falls back to the bundle
const mergeMessages = (local: Messages, remote: Messages): Messages => {
  const merged: Messages = { ...local };
  for (const [key, value] of Object.entries(remote)) {
    const base = merged[key];
    merged[key] =
      typeof value === "object" && typeof base === "object" ? mergeMessages(base, value) : value;
  }
  return merged;
};

export default mergeMessages;
