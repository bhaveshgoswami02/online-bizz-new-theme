const fs = require('fs-extra');

fs.rename('../dist/digitalCard/browser/index.html', '../dist/digitalCard/browser/index.original.html', function(err) {
    if ( err ) console.log('ERROR: ' + err);
});

(async() => {

    const src = '../dist';
    const copy = './dist';

    await fs.remove(copy);
    await fs.copy(src, copy);

})();