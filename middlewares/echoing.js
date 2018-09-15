exports = module.exports = function echoing (opts = {}) {
  return function echoingHandler (req, res, next) {
    const prefix = (opts.prefix || 'x-echo').toLowerCase();
    Object.keys(req.headers).forEach(function (name) {
      const key = name.toLowerCase();
      if (key.startsWith(prefix)) {
        res.setHeader(key, req.headers[key]);
      }
    });

    next()
  }
}
