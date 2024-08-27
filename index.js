// Node.js program to clear clutter inside of a directory and organize the contents of that directory into different folders


import fs from "fs/promises";
import fsn from "fs";
import path from "path";

// Check if a base path is provided as a command-line argument
if (process.argv.length < 3) {
  console.log("Please provide the base path as a command-line argument.");
  process.exit(1);
}

const basepath = process.argv[2];

let files = await fs.readdir(basepath);

for (const item of files) {
  console.log("Running for", item);
  let ext = item.split(".")[item.split(".").length - 1];
  if (ext !== "js" && ext !== "json" && item.split(".").length > 1) {
    if (fsn.existsSync(path.join(basepath, ext))) {
      // Move the file to this directory if it's not a .js or .json file
      await fs.rename(path.join(basepath, item), path.join(basepath, ext, item));
    } else {
      await fs.mkdir(path.join(basepath, ext));
      await fs.rename(path.join(basepath, item), path.join(basepath, ext, item));
    }
  }
}