import path from 'path';

export default function ({plugins, config}) {
  return (done) => {
    plugins.del.sync(config.outputPath+'/**', {force: true})
    done();
  }
}




