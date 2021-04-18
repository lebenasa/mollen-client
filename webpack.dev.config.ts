import baseConfig, { typescriptLoader, sassLoader, getPages } from './webpack.config';
import * as webpack from 'webpack';
import HTMLPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const devConfig = async (): Promise<webpack.Configuration> => {
    const config = await baseConfig();
    const htmlPlugins = await getPages('./src/pages')
        .then(pages => pages
              .filter((page: string): boolean => !page.includes('vendor.ts'))
              .map((page: string): string => page.replace('./src/pages/', ''))
              .map((entry: string): HTMLPlugin => new HTMLPlugin({
                  chunks: ['vendor', entry],
                  filename: entry.replace('.ts', '.html'),
              }))
        );
    return {
        ...config,
        mode: 'development',
        module: {
            rules: [
                {
                    ...typescriptLoader,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.dev.json',
                        },
                    },
                },
                {
                    ...sassLoader,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
            ],
        },
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
            hot: true,
        },
        output: {
            ...config.output,
            filename: '[name].bundle.js',
        },
        plugins: config.plugins!.concat(...htmlPlugins),
    };
};

export default devConfig;
