#!/usr/bin/env node
import fs from "fs/promises";

const filePath = process.argv[2];
const wordPath = process?.argv[3]?.toLocaleLowerCase();
const file1data = await fs.readFile(filePath, "utf-8");
const wordArray = file1data.split(/\W/).filter((w) => w);

export const map = new Map();
wordArray.forEach((word) => {
  if (wordPath) {
    if (word.toLocaleLowerCase() === wordPath) {
      map.set(wordPath, (map.get(wordPath) || 0) + 1);
    }
  } else {
    map.set(word, (map.get(word) || 0) + 1);
  }
});
console.log(map)

