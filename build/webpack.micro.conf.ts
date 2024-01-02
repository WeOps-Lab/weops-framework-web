const path = require('path')
const glob = require('glob')
const utils = require('./utils.ts')
const webpack = require('webpack')
const config = require('../config/index.ts')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.ts')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = require('../config/prod.env.ts')

const entryFiles = glob.sync(path.join(__dirname, '../src/projects/*/microService/*.ts'))
    .reduce((entries, p) => {
        const name = path.basename(p, '.ts')
        return { ...entries, [name]: p }
    }, {})

const webpackConfig = merge(baseWebpackConfig, {
    entry: {
        ...entryFiles,
        'microRouter':'@/microRouter/index.ts'
    },
    output: {
        path: path.resolve(__dirname, '../build/static/dist_micro/'),
        filename: 'js/[name].js',
        libraryTarget: 'umd',
        library: 'microApp',
        publicPath: '{{webpackPublicPath}}'
    },
    externals: {
        'vue': 'vue',
        'vue-router': 'vue-router',
        'vuex': 'vuex'
    },
    module: {
        rules: [
            ...utils.styleLoaders({
                sourceMap: config.build.productionSourceMap,
                extract: false,
                usePostCSS: false
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
            ignoreOrder: true
        })
    ]
})

module.exports = webpackConfig
