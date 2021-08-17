import {
    join,
    isDir,
    extname,
    basename,
    existsSync,
    readdirSync,
    readFileSync, 
    writeFileSync,
} from './tools';
import {
    un_match,
    allow_match_map,
    exclude_dir_set,
    include_file_type_set,
} from './config';

const handler = (path: string, type: number = un_match): boolean => {
    if (type === un_match) return false;
    if (!existsSync(path)) return false;
    try {
        // 传入的是一个目录
        if (isDir(path)) {
            // 无需匹配的文件目录就直接返回
            if (exclude_dir_set.has(basename(path))) return true;
            // 是允许的目录的话就直接递归
            const files: string[] = readdirSync(path);
            files.forEach(name => handler(join(path, name), type))
        } else {
            // 无需匹配的文件类型
            if (!include_file_type_set.has(extname(path))) return true;
            // 读取文件，逐行替换
            const content: string = readFileSync(path, { encoding: 'utf-8' });
            const lines: string[] = content.split(/^\/n/);
            const handledLines: string[] = [];
            // 逐行删除console和debugger
            for (const line of lines) {
                let handledLine: string = '';
                switch (type) {
                    case (allow_match_map.get('console')):
                        handledLine = line.replace(/console\..*\(.*\)( )*;?/g, '');
                        break;
                    case (allow_match_map.get('debugger')):
                        handledLine = line.replace(/debugger( )*;?/g, '');
                        break;
                    default:
                        handledLine = line;
                        break;
                }
                if (handledLine === line || !/^( )*$/.test(handledLine)) {
                    handledLines.push(handledLine);
                }
            }
            let newContent: string = handledLines.join('\n');
            // 文件写入，当然如果文件没有发生变更，则不需要写入
            if (newContent !== content) {
                writeFileSync(path, newContent, { encoding: 'utf-8' });
            }
        }
        return true;
    } catch (err) {
        return false;
    }
}

export { handler };