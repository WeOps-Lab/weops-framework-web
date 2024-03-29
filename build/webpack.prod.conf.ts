// @ts-nocheck
'use strict'
const path = require('path')
const utils = require('./utils.ts')
const webpack = require('webpack')
const config = require('../config/index.ts')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.ts')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ReplaceTemplateStaticUrlPlugin = require('./replace-template-static-url-plugin.ts')
const date = new Date()
const time = `${date.getFullYear()}${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        publicPath: './',
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    optimization: {
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
        // 压缩
        minimize: true,

        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: ['default', {
                      discardComments: { removeAll: true },
                    }],
                  },
                parallel: true
            }),
            new TerserPlugin({
                parallel: true, // 多进程并发运行
                extractComments: false, // 不将注释剥离到单独的文件
                // cache: true // 缓存
            })
        ],

        runtimeChunk: {
            name: 'manifest'
        },

        splitChunks: {
            // 表示从哪些 chunks 里面提取代码，除了三个可选字符串值 initial、async、all 之外，还可以通过函数来过滤所需的 chunks
            // async: 针对异步加载的 chunk 做分割，默认值
            // initial: 针对同步 chunk
            // all: 针对所有 chunk
            chunks: 'all',
            // 表示提取出来的文件在压缩前的最小大小，默认为 200kb
            minSize: 200 * 1024,
            // 表示提取出来的文件在压缩前的最大大小，默认为 0，表示不限制最大大小
            maxSize: 0,
            // 表示被引用次数，默认为 1
            minChunks: 1,
            // 最多有 5 个异步加载请求该 module
            maxAsyncRequests: 5,
            // 初始化的时候最多有 3 个请求该 module
            maxInitialRequests: 3,
            // chunk 的名字，如果设成 true，会根据被提取的 chunk 自动生成
            cacheGroups: {
                // 提取 chunk-bk-magic-vue 代码块
                bkMagicVue: {
                    chunks: 'all',
                    // 单独将 bkMagicVue 拆包
                    name: 'chunk-bk-magic-vue',
                    // 权重
                    priority: 5,
                    // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被提取出去了，那么将不会重新生成新的。
                    reuseExistingChunk: true,
                    test: module => {
                        return /cw-magic-vue/.test(module.context)
                    }
                },
                // 所有 node_modules 的模块被不同的 chunk 引入超过 1 次的提取为 twice
                // 如果去掉 test 那么提取的就是所有模块被不同的 chunk 引入超过 1 次的
                twice: {
                    // test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'twice',
                    priority: 6,
                    minChunks: 2
                },
                // default 和 vendors 是默认缓存组，可通过 optimization.splitChunks.cacheGroups.default: false 来禁用
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    priority: -20
                }
            }
        }
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    plugins: [
        ...utils.getDllManifest(),

        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[chunkhash].css'),
            chunkFilename: utils.assetsPath('css/[name].[chunkhash].css'),
            ignoreOrder: true
        }),

        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        // new OptimizeCSSPlugin({
        //     cssProcessorOptions: config.build.productionSourceMap
        //         ? {safe: true, map: {inline: false}}
        //         : {safe: true}
        // }),

        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            sourceMap: true,
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            // chunksSortMode: 'dependency',
            staticUrl: '{{ STATIC_URL }}',
            timeStamp: time
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.ids.HashedModuleIdsPlugin(),

        // copy custom static assets
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../dist'),
        //         to: config.build.assetsSubDirectory,
        //         ignore: ['.*']
        //     },
        //     // 本地按需加载markdown样式
        //     // {
        //     //     from: 'node_modules/mavon-editor/dist/highlightjs',
        //     //     to: path.resolve(__dirname, config.build.assetsRoot, './static/highlightjs')
        //     // },
        //     // {
        //     //     from: 'node_modules/mavon-editor/dist/markdown',
        //     //     to: path.resolve(__dirname, config.build.assetsRoot, './static/markdown')
        //     // }, {
        //     //     from: 'node_modules/mavon-editor/dist/katex',
        //     //     to: path.resolve(__dirname, config.build.assetsRoot, './static/katex')
        //     // }
        // ]),

        new ReplaceTemplateStaticUrlPlugin()
    ]
})

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
