import del from 'del';
import path from 'path';
import yargs from 'yargs';
import webpack from 'webpack';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import OccurrenceOrderPlugin from 'webpack/lib/optimize/OccurrenceOrderPlugin';
import HotModuleReplacementPlugin from 'webpack/lib/HotModuleReplacementPlugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import WebpackDevServer from 'webpack-dev-server';

let argv = yargs.argv;
if (argv.clean) {
    let deletedFiles = del.sync([ path.join(__dirname, '../dist/*') ]);
    for (let deletedFile of deletedFiles)
        console.log('REMOVED: ' + deletedFile);
    process.exit(0);
}

let chars = 0;
function goToLineStart(nextMessage) {
    let str = '';
    for (; chars > nextMessage.length; --chars) {
        str += '\b \b';
    }
    chars = nextMessage.length;
    for (let i = 0; i < chars; ++i) {
        str += '\b';
    }
    if (str) process.stderr.write(str);
}

// webpack config

let jsLoader = {
    test: /\.jsx?$/,
    include: [ path.resolve(__dirname, '../src') ],
    loaders: ['babel']
};

let config = {
    entry: {
        browser: ['entry/browser'],
        browser_lib: [
            'handjs',
            'jquery',
            'react',
            'clipper-lib'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.min.js', '.jsx'],
        modulesDirectories: ['src', 'styl', 'node_modules']
    },
    node: {
        filename: true,
        global: true
    },
    module: {
        loaders: [
            jsLoader,
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            }
        ]
    },
    plugins: [
        new ProgressPlugin((percentage, msg) => {
            if(percentage < 1) {
                percentage = Math.floor(percentage * 100);
                msg = percentage + '% ' + msg;
                if(percentage < 100) {
                    msg = ' ' + msg;
                }
                if(percentage < 10) {
                    msg = ' ' + msg;
                }
            }
            goToLineStart(msg);
            process.stderr.write(msg);
        }),
        new webpack.optimize.CommonsChunkPlugin('browser_lib', 'browser_lib.js'),
        new WebpackNotifierPlugin({ title: 'oilmarker', alwaysNotify: true })
    ],
    stats: {
        chunks: true,
        modules: false,
        chunkModules: false,
        reasons: true,
        cached: true,
        cachedAssets: true,
        colors: true
    }
};

if (argv.production) {
    process.env.BABEL_ENV = 'production';
    config.plugins.push(new UglifyJsPlugin());
    config.plugins.push(new OccurrenceOrderPlugin());
} else {
    process.env.BABEL_ENV = 'development';
    config.debug = true;
    config.output.pathinfo = true;
    config.devtool = 'source-map';
}
if (argv.devserver) {
    jsLoader.loaders.unshift('react-hot');
    config.entry.browser.unshift('webpack/hot/dev-server');
    config.plugins.push(new HotModuleReplacementPlugin());
}

let compiler = webpack(config);
let lastHash = null;
function compilerCallback(err, stats) {
    if (!argv.watch) {
        compiler.purgeInputFileSystem();
    }
    if (err) {
        lastHash = null;
        console.error(err.stack || err);
        if (err.details) console.error(err.details);
        if (!argv.watch) {
            process.on('exit', function() {
                process.exit(1);
            });
        }
        return;
    }
    if (stats.hash !== lastHash) {
        lastHash = stats.hash;
        process.stdout.write(stats.toString(config.stats) + '\n');
    }
}
if (argv.watch) {
    compiler.watch({}, compilerCallback);
} else if (argv.devserver) {
    let server = new WebpackDevServer(compiler, {
        publicPath: '/dist/',
        hot: true,
        quiet: false,
        noInfo: false,
        lazy: false,
        stats: config.stats
    });
    let port = typeof argv.port === 'number' ? argv.port : 8080;
    server.listen(port, 'localhost');
} else {
    compiler.run(compilerCallback);
}
