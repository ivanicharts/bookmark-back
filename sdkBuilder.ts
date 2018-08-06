import * as fs from 'fs';
import * as glob from 'glob';

let currentFolder = './';

const rules = [
    // '**/user.+(entity|facade).ts',
    '**/user.+(interface|entity|facade).ts',
    '**/auth.+(interface|entity|facade).ts',
    // '**/*.interface.ts',
    // '**/*.entity.ts',
];


init(rules);


async function init (rules: string[]): Promise<void> {
    const paths = (await getFilespaths(rules)).reduce((acc: string[], files: string[]) => (acc.push(...files), acc), []);
    const content = generateContent(paths);
    fs.writeFileSync('api.sdk.ts', content);
}

function getFileNameFromPath (filepath: string): string {
    return filepath
        .split('/')
        .pop()
        .replace(/\./g, '_');
}

function generateContent (paths: string[]): string {
    const entities: string[] = [];
    const filenames = [];

    const imports = paths.reduce((acc: string, p: string): string => {
        const fileName: string = getFileNameFromPath(p);
        filenames.push(fileName);
        return acc + `import * as ${fileName} from '${p}' \n`;
    }, '');

    const groupedFiles = filenames.reduce((acc, filename) => {
        const [entityName, fileType] = filename.split('_');
        acc[entityName] = acc[entityName] || {};
        acc[entityName][fileType] = filename;
        return acc;
    }, {});

    console.log(groupedFiles)

    const exports = `export default ${stringify(groupedFiles)};\n`;

    return `${imports} \n\n${exports}`;
}

// function stringify (obj) {
//     const entries = Object.entries(obj);
//     const res = entries.reduce((acc, [key, val]) => {
//         if (typeof val === 'object') {
//             return acc + `${key}: ${stringify(val)},`;
//         }
//         return acc + `${key}: ${val}, `;
//     }, '');
//     return `{ ${res} }`;
// }

function stringify (obj) {
    const entries = Object.entries(obj);
    const res = entries.reduce((acc, [key, val]) => {

        return acc + `${key}: ${destructurize(val, key)}, `;
    }, '');
    return `{ ${res} }`;
}

function destructurize (obj, preffix) {
    const keys = Object.keys(obj).map(k => '...' + `${preffix}_${k}`);
    return `{${keys}}`
}

function traverse (currentPath, paths, rules) {

}

function getFilepaths (rule: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        glob(rule, (err, files) => {
            if (err) return reject(err);
            return resolve(files.map(f => {
                const formattedFilepath = f.split('.');
                formattedFilepath.pop();
                return './' + formattedFilepath.join('.');
            }));
        });
    });
}

function getFilespaths (rules): Promise<any[]> {
    return Promise.all(rules.map(rule => getFilepaths(rule)));
}
