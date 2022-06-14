import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import chalk from 'chalk';
import prettyBytes from 'pretty-bytes';

function compress(fw) {
    for (const type of ['index', 'vendor']) {
        const file = path.join(`${fw.toLowerCase()}-todomvc`, `dist/${type}.js`);
        const src = fs.readFileSync(file);

        fs.writeFileSync(`${file}.brotli`, zlib.brotliCompressSync(src));
        fs.writeFileSync(`${file}.zlib`, zlib.gzipSync(src));
    }
}

function report(fw) {
    const dir = path.join(`${fw.toLowerCase()}-todomvc`, 'dist');

    console.log(`\n${chalk.greenBright(fw)}`);
    console.log(
        chalk.cyan('Component: '),
        chalk.dim(
            getFileSize(path.join(dir, 'index.js')),
            '/',
            `gzip: ${getFileSize(path.join(dir, 'index.js.zlib'))}`,
            '/',
            `brotli: ${getFileSize(path.join(dir, 'index.js.brotli'))}`,
        ),
    );
    console.log(
        chalk.cyan('Vendor:    '),
        chalk.dim(
            getFileSize(path.join(dir, 'vendor.js')),
            '/',
            `gzip: ${getFileSize(path.join(dir, 'vendor.js.zlib'))}`,
            '/',
            `brotli: ${getFileSize(path.join(dir, 'vendor.js.brotli'))}`,
        ),
    );
}

function getFileSize(path) {
    return prettyBytes(fs.statSync(path).size);
}

const fws = [
    'Preact',
    'React',
    'Solid',
    'Svelte',
    'Vue',
];

for (const fw of fws) {
    compress(fw);
    report(fw)
}
