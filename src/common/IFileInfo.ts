import fs from 'fs';
export interface IFileInfo {
  path: string;
  name: string;
  stats: fs.Stats;
}
