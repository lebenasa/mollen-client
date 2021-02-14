import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as webpack from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';

async function getPages(dirname: string): Promise<string[]> {
    const contents = await fs.promises.readdir(dirname, { withFileTypes: true });
    const pages = contents
        .filter(content => !content.isDirectory())
        .map(content => `${dirname}/${content.name}`)
        .filter(filename => filename.slice(-3) === '.ts' || filename.slice(-4) === '.tsx');

    const dirs = contents
        .filter(content => content.isDirectory())
        .map(content => `${dirname}/${content.name}`);
    const innerPagesPromises = await Promise.all(dirs.map(dir => getPages(dir)));
    const innerPages = Array(innerPagesPromises).flat().flat();

    return pages.concat(innerPages);
}

export const typescriptLoader = {
    test: /\.tsx?$/,
    use: {
        loader: 'ts-loader',
        options: {
            configFile: 'tsconfig.json',
        },
    },
    exclude: /node_modules/,
};

export const sassLoader = {
    test: /\.s[ac]ss$/,
    use: [
        'mini-css-extract-plugin',
        'css-loader',
        'sass-loader',
    ],
};

async function baseConfig(): Promise<webpack.Configuration> {
    const pages = await getPages('./src/pages/');
    const pageEntries = Object.fromEntries(
        pages.map(page => {
            const nonentryNames = [
                ...os.homedir().split('/'),
                '.', 'src', 'pages',
                '',
            ];
            const entry = page.split('/')
                .slice(0, -1)
                .filter(pathname => nonentryNames.every(n => n !== pathname))
                .join('/')
            return [entry === '' ? 'index' : entry, page];
        }),
    );

    return {
        mode: 'production',
        module: {
            rules: [
                typescriptLoader,
                sassLoader,
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.sass'],
        },
        entry: {
            ...pageEntries,
            vendor: './src/vendor.ts',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].bundle.js',
        },
        plugins: [
            new ESLintPlugin(),
        ],
    }
};

export default baseConfig;

