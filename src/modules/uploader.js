// import querystring from 'querystring';
export default function UploadMedia({file, media, onProgress = null}) {
  return new Promise(function(resolve, reject) {
    try {
      var xhr     = new XMLHttpRequest();
      var data    = new FormData();
      // Prep + store request fields
      Object.keys(media).forEach(fld => {
        data.append(fld, media[fld]);
      });
      // File must be added after fields or server can't parse it properly
      data.append('file', file); // Store File obj
      if (onProgress) { xhr.upload.addEventListener('progress', onProgress, false); }
      xhr.upload.addEventListener('load', (state) => {
        let data = null;
        if ( /^{/.test(xhr.response) ) {
          data = JSON.parse(xhr.response);
        }
        if ( xhr.status !== 200 ) {
          reject(new Error(data && data.message || 'Invalid RESPONSE!'));
        } else {
          resolve(data);
        }
      }, false);
      xhr.upload.addEventListener('error', reject, false);
      xhr.upload.addEventListener('abort', reject, false);
      xhr.open('POST', '/media/upload/?')// + querystring.stringify(media));
      xhr.send(data);
    } catch(err) {
      return reject(err)
    }
  });
}
