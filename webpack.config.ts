import path from "path";
import {Configuration} from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import {generateHeader} from "./plugins/userscript.plugin";

const config: Configuration = {
    mode: "none",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "userscript"),
        filename: "SAMScript.js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            minify: TerserPlugin.uglifyJsMinify,
            terserOptions: {
                output: {
                    preamble: generateHeader(),
                    comments: false
                },
            },
            extractComments: false
        })],
    },
};

export default config;
