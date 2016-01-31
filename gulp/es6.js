
export default function ({gulp, plugins, config}) {
  return () => {
    let file = 'index.js';
    let bundler = plugins.browserify({
      entries:      config.build.es6Src,
      ignore:       [ 'angular', 'moment', 'jquery', 'lodash' ],
      external:     [ 'angular', 'moment', 'jquery', 'lodash' ],
      exclude:      [ 'angular', 'moment', 'jquery', 'lodash' ],
      noParse:      [ 'angular', 'moment', 'jquery', 'lodash' ],
      debug:        config.debug,
      cache:        {},
      packageCache: {},
      fullPaths:    true
    });

    // if ( config.watch ) {
    //   bundler = plugins.watchify(bundler);
    //   bundler.on('update', function() {
    //     rebundle();
    //     plugins.util.log('Rebundle...');
    //   });
    // }

    applyTransforms();

    function rebundle() {
      const streamBundler = bundler.bundle();
      const sourceMapLocation = config.debug ? './' : '';

      return streamBundler
        // .on('error', err => { console.error('CUSTOM ERR HANDLER', err); })
        .on('error', plugins.util.log)
        // .pipe(streamBundler)
        .pipe(plugins.source(file))
        .pipe(plugins.if(config.debug, plugins.buffer()))
        .pipe(plugins.if(config.debug, plugins.sourcemaps.init({ loadMaps: true })))
        .pipe(plugins.if(config.debug, plugins.sourcemaps.write(sourceMapLocation)))
        .pipe(gulp.dest(config.outputPath+'/js/'))
    }
    function applyTransforms() {
      const transforms = [
        { 'name': 'babelify',
          'options': {
            'ignore': /node_modules/,
            'sourceMaps': true,
            'presets': ["es2015", "stage-0", "react"]
          }
        },
        { 'name': 'jadeify',               'options': {} },
        { 'name': 'browserify-ngannotate', 'options': {} },
      ];
      transforms.forEach(transform => bundler.transform(transform.name, transform.options));
      return bundler;
    }
    return rebundle();
  }

}

