
// 引入compression-webpack-plugin
const CompressionWebpackPlugin =require('compression-webpack-plugin')

module.exports = {
    chainWebpack: config => {
        //解决iview 按需引入babel转换问题
        config.module
            .rule("view-design")  //  我目前用的是新版本的iview ,旧版本的iview，用iview代替view-design
            .test(/view-design.src.*?js$/)
            .use("babel")
            .loader("babel-loader")
            .end();
    },
    productionSourceMap: false,
    configureWebpack: (config) => {
        config.plugins = [
            ...config.plugins,
            new  CompressionWebpackPlugin({
                test: /\.js$|\.html$|\.css/,
                threshold: 10240,
                deleteOriginalAssets: false,
                algorithm: 'gzip'
            })
        ]
    }
}