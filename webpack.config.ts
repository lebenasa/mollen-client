import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as webpack from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export async function getPages(dirname: string): Promise<string[]> {
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
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
    ],
};

async function baseConfig(): Promise<webpack.Configuration> {
    const pages = await getPages('./src/pages');
    const nonentryNames = [
        ...os.homedir().split('/'),
        '.', 'src', 'pages',
        '',
    ];
    const pageEntries = Object.fromEntries(
        pages.map(page => {
            const entry = page.split('/')
                .filter(pathname => nonentryNames.every(n => n !== pathname))
                .join('/');
            const options = {
                import: page,
                dependOn: 'vendor',
            };
            return [entry === '' ? 'index' : entry, options];
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
        context: __dirname,
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
            new MiniCssExtractPlugin(),
        ],
    }
};

export default baseConfig;

