import process from "node:process";

export const getEnv = (str: string) => {
  return process.env[str] ?? null;
}