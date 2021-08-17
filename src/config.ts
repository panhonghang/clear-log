// 无法匹配的类型值
const un_match: number = 0;
// 允许匹配的类型
const allow_match_map: Map<string, number> = new Map<string, number>([
    ['console', 1],
    ['debugger', 2],
]);
// 无需匹配的文件
const exclude_dir_set: Set<string> = new Set<string>([
    'node_modules',
    'test',
    'dist',
]);
// 可以匹配的文件类型后缀
const include_file_type_set: Set<string> = new Set<string>([
    '.jsx',
    '.tsx',
    '.js',
    '.ts',
    '.vue',
])
export {
    un_match,
    allow_match_map,
    exclude_dir_set,
    include_file_type_set,
}