/**
 * 异步回调地狱的问题
 */

const fs = require('fs');
const path = require('path');

function findLargest(dir, cb) {
  fs.readdir(dir, function (err, files) {
    if (err) return cb(err);
    let counter = files.length;
    let errored = false;
    let stats = [];
    files.forEach(function (file, index) {
      fs.stat(path.join(dir, file), (err, stat) => {
        if (errored) return;
        if (err) {
          errored = true;
          return cb(er);
        }
        stats[index] = stat;
        if (--counter === 0) {
          let largest = stats
            .filter(stat => stat.isFile())
            .reduce((prevFile, curFile) => {
              if (prevFile.size > curFile.size) return prevFile;
              return curFile;
            }, -1);
          cb(null, files[stats.indexOf(largest)]);
        }
      });
    });
  });
}

findLargest('./', (...args) => {
  console.log(args);
});
