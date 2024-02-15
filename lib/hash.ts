export const hash = async (msg: string): Promise<string> => {
  const msgUint8 = new TextEncoder().encode(msg);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

// export const hashSync = (msg: string): string => {
//   let resp = "";
//   hash(msg).then((data) => (resp = data));
//   return resp;
// };
