// middleware/cache.js
export default function (req, res, next) {
  const cacheControlHeader = 'public, max-age=31536000, immutable';
  if (req.url.match(/\.(jpg|jpeg|png|gif|svg|js|css|woff|woff2)$/)) {
    res.setHeader('Cache-Control', cacheControlHeader);
  }
  next();
}
