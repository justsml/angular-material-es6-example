import gulp from 'gulp';

export default function ({plugins, config}) {
  return (done) => {
    gulp.watch(config.build.lessSrc, ['less']);
    gulp.watch(config.build.jadeSrc, ['jade']);
    gulp.watch(conf.vendor.src, ['vendor']);
    gulp.watch('./client/js/**/*.js', ['angular']);
    done();
  }
}
