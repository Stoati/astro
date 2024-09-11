export default function stoatiDecode(code: string) {
  const splitted = code.split("#");

  if (splitted.length !== 2) {
    throw new Error("The given code is not correct " + code);
  }

  return {
    templateCode: splitted[0],
    templateAttributeCode: splitted[1],
  };
}
