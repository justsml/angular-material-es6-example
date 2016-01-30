export default function ({plugins, config}) {
  return () => {
    return plugins.del(config.outputPath+'/*')
  }
}




