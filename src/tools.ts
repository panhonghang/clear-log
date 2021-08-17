import { lstatSync, readFileSync, writeFileSync, existsSync, readdirSync, stat } from 'fs';
import { join, basename, extname } from 'path';

const isDir = (path: string): boolean => {
    const stat = lstatSync(path);
    return stat.isDirectory();
}
export {
    readFileSync, 
    writeFileSync, 
    existsSync, 
    readdirSync, 
    join, 
    basename, 
    extname,
    isDir,
}