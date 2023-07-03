// @ts-nocheck
'use strict'
const utils = require('./utils.ts')
const webpack = require('webpack')
const config = require('../config/index.ts')
const { merge } = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf.ts')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.ts
    devServer: {
        client: {
            logging: 'warn',
            overlay: config.dev.errorOverlay
            ? {warnings: false, errors: true}
            : false,
        },
        historyApiFallback: {
            rewrites: [
                {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index-dev.html')}
            ]
        },
        hot: true,
        // contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        static: {
            publicPath: config.dev.assetsPublicPath,
        },
        proxy: config.dev.proxyTable,
        // quiet: true, // necessary for FriendlyErrorsPlugin
        // disableHostCheck: true
    },
    watchOptions: {
        poll: config.dev.poll
    },
    plugins: [

        new webpack.HotModuleReplacementPlugin(),

        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index-dev.html',
            template: 'index-dev.html',
            inject: true,
            chunks: ['app'],
            // chunksSortMode: 'dependency'  webpack5 里面chunksSortMode选项已经被移除，用chunkIds和moduleIds 默认配置更高效率
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        // copy custom static assets
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../dist'),
        //         to: config.dev.assetsSubDirectory,
        //         ignore: ['.*']
        //     }
        // ])
    ],
    optimization: {
        emitOnErrors: false
    }
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})
