// @ts-nocheck
'use strict'
const path = require('path')
const utils = require('./utils.ts')
const config = require('../config/index.ts')
const vueLoaderConfig = require('./vue-loader.conf.ts')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const fs = require('fs')
const CacheLoader = require('cache-loader')

const projectsDir = path.resolve(__dirname, '../src/projects')
const projects = fs.readdirSync(projectsDir)
const isCommonExists = projects.includes('common')
const extAlias = {}
projects.forEach(project => {
  const aliasName = `@${project}`
  const projectPath = path.resolve(projectsDir, project)
  extAlias[aliasName] = projectPath
})

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const isOpenEsLint = config.dev.useEslint && process.env.NODE_ENV !== 'production'

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

const createTsLintingRule = () => ({
    test: /\.(vue|ts|tsx)$/,
    exclude: /node_modules/,
    enforce: 'pre',
    use: [
        {
            loader: 'tslint-loader',
            options: {
                tsConfigFile: 'tsconfig.json'
            }
        }
    ]
})

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.ts'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts'],
        // modules: [
        //     resolve('src'),
        //     resolve('node_modules')
        //   ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            ...extAlias
        },
        fallback: {
            path: require.resolve('path-browserify'),
            dgram: false,
            fs: false,
            net: false,
            tls: false,
            child_process: false,
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new VueLoaderPlugin(),
        new StyleLintPlugin({
            files: ['src/**/*.{vue,htm,html,css,sss,less,scss,sass}'],
            exclude: [path.resolve(__dirname, '../node_modules/**')]
        }),
        new webpack.DefinePlugin({
            __COMMON_FOLDER_EXISTS__: JSON.stringify(isCommonExists)
        })
        // new HardSourceWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
                // use: [
                //     "thread-loader",
                //     "babel-loader"
                // ]
                use: [
                    /*
                      开启多进程打包。
                      进程启动大概为600ms，进程通信也有开销。
                      只有工作消耗时间比较长，才需要多进程打包
                    */
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 2 // 进程2个
                        }
                    },
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve('node_modules/.cache/cache-loader'), // 缓存目录
                        },
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            // presets: [
                            //     [
                            //         '@babel/preset-env',
                            //         {
                            //             useBuiltIns: 'usage',
                            //             corejs: 3,
                            //             targets: {
                            //                 chrome: '60',
                            //                 firefox: '50'
                            //             }
                            //         }
                            //     ]
                            // ],
                            // 开启babel缓存
                            // 第二次构建时，会读取之前的缓存
                            cacheDirectory: true
                        }
                    }
                ]
            },
            ...(isOpenEsLint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig,
                // include: [resolve('src')],
                // exclude: /node_modules\/(?!(autotrack|dom-utils))|vendor\.dll\.js/
            },
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
            //     exclude: /node_modules/,
            //     query: {
            //         cacheDirectory: true
            //     }
            // },
            {
                test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
                type: 'asset',
                parser:{
                    dataUrlCondition:{
                        maxSize : 10 * 1024
                    }
                },
                generator: {
                    filename: utils.assetsPath('img/[name].[contenthash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                type: 'asset',
                parser:{
                    dataUrlCondition:{
                        maxSize : 10 * 1024
                    }
                },
                generator: {
                    filename: utils.assetsPath('media/[name].[contenthash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset',
                parser:{
                    dataUrlCondition:{
                        maxSize : 10 * 1024
                    }
                },
                generator: {
                    filename: utils.assetsPath('fonts/[name].[contenthash:7].[ext]')
                }
            },
            // {
            //     test: /\.ts$/,
            //     exclude: /node_modules/,
            //     enforce: 'pre',
            //     loader: 'tslint-loader',
            //     options: {
            //         transpileOnly: true
            //     }
            // },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true,
                    happyPackMode: true
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        // setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        // dgram: 'empty',
        // fs: 'empty',
        // net: 'empty',
        // tls: 'empty',
        // child_process: 'empty'

    }
}
