import baseConfig, { typescriptLoader, sassLoader } from './webpack.config';
import * as webpack from 'webpack';

const devConfig = async (): Promise<webpack.Configuration> => {
    const config = await baseConfig();
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
        output: {
            ...config.output,
            filename: '[name].bundle.js',
        },
    };
};

export default devConfig;
