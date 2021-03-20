import baseConfig, { typescriptLoader, sassLoader, getPages } from './webpack.config';
import * as webpack from 'webpack';
import HTMLPlugin from 'html-webpack-plugin';

const devConfig = async (): Promise<webpack.Configuration> => {
    const config = await baseConfig();
    const htmlPlugins = await getPages('./src/pages')
        .then(pages => pages
              .filter((page: string): boolean => !page.includes('vendor.ts'))
              .map((page: string): string => page.replace('.ts', '.html').replace('/src/pages', ''))
              .map((page: string): HTMLPlugin => new HTMLPlugin({ filename: page }))
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
                        'mini-css-extract-plugin',
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
        },
        output: {
            ...config.output,
            filename: '[name].bundle.js',
        },
        plugins: config.plugins!.concat(...htmlPlugins),
    };
};

export default devConfig;
