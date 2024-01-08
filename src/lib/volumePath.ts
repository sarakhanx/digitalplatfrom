import path from "path";
const dev = process.env.NODE_ENV !== "production";

export default function volumePath(directory: string) {
  const prodPath = process.env.VOLUME_PATH || `/home/node/app/uploads`;
  return dev
    ? path.resolve(__dirname, `../../uploads/${directory}`)
    : path.resolve(prodPath, directory);
}