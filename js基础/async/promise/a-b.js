function log() {
  return Promise.resolve('log');
}

(async function () {
  const msg = await log();
  console.log(msg);
})();
