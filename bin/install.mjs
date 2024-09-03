#!/usr/bin/env node

import { promisify } from "util";
import cp from "child_process";
import path from "path";
import fs from "fs";
import readline from "readline";
import cliSpinners from "cli-spinners";

// Convert libraries to promises
const exec = promisify(cp.exec);
const rm = promisify(fs.rm);

// Spinner setup
const spinner = cliSpinners.dots;
const spinnerInterval = 100;
let spinnerIntervalId;

// Function to start the spinner
function startSpinner() {
  let frame = 0;
  spinnerIntervalId = setInterval(() => {
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${spinner.frames[frame]} ${spinner.text}`);
    frame = (frame + 1) % spinner.frames.length;
  }, spinnerInterval);
}

// Function to stop the spinner
function stopSpinner() {
  clearInterval(spinnerIntervalId);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write("Done!                   \n");
}

if (process.argv.length < 3) {
  console.log("You have to provide a name to your app.");
  console.log("For example:");
  console.log("    npx create-express-api my-app");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);

const gitRepo = "https://github.com/joaobuzato/express-api-boilerplate.git";

if (fs.existsSync(projectPath)) {
  console.log(
    `The file ${projectName} already exists in the current directory. Please choose another name.`
  );
  process.exit(1);
} else {
  fs.mkdirSync(projectPath);
}

try {
  startSpinner();
  await exec(`git clone --depth 1 ${gitRepo} ${projectPath} --quiet`);

  const rmGit = rm(path.join(projectPath, ".git"), {
    recursive: true,
    force: true,
  });

  const rmBin = rm(path.join(projectPath, "bin"), {
    recursive: true,
    force: true,
  });

  await Promise.all([rmGit, rmBin]);

  process.chdir(projectPath);

  await exec("npm install");

  stopSpinner();

  console.log("The installation is done!");
  console.log("You can now run your app with:");
  console.log(`    cd ${projectName}`);
  console.log("    npm run start");
} catch (error) {
  stopSpinner();
  fs.rmSync(projectPath, { recursive: true, force: true });
  console.error("An error occurred:", error);
}
