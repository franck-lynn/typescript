import path from "path"
import { writeFile } from "fs/promises"
import { PATH_CWD } from "../constants"

export const write2File = async () => {
  await writeFile(path.join(PATH_CWD, "./src/fs/00.my-writedFile.txt"), "abcd", { encoding: "utf-8" })
}
