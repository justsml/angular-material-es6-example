
export default function UploadMedia({file, media, onProgress = null}) {
  return new Promise(function(resolve, reject) {
    var xhr     = new XMLHttpRequest();
    var data    = new FormData();
    // Store File obj
    data.append('file', file);
    // Prep + store request fields
    Object.keys(media).forEach(fld => {
      data.append(fld, media[fld]);
    });
    console.error('FORM DATA', data);
    if (onProgress) { xhr.upload.addEventListener('progress', onProgress, false); }
    xhr.upload.addEventListener('load', resolve, false);
    xhr.upload.addEventListener('error', reject, false);
    xhr.open('POST', '/media/upload/?playlist=' + (media && media.parent && media.parent.id));
    // xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
    xhr.send(data);
    return xhr;
  });
}
