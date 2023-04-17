import * as fs from "fs";
import * as path from "path";
import * as shell from "shelljs";

const backupDir = "/home/backup";
const sourceDir = "/home/app/data";

const now = new Date();
const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
const backupFile = path.join(backupDir, `backup-${date}.tar.gz`);

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

const command = `tar -zcvf ${backupFile} ${sourceDir}`;
shell.exec(command);

// shell.exec("find /home/backup -mtime +7 -type f -delete");

// 0 0 * * * /usr/bin/node /home/app/scripts/backup.js > /home/backup/.log
