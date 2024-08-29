// csrfToken.js

export default function (req, res, next) {
  const csrfToken = req.cookies['csrfToken'];
  res.setHeader('X-CSRF-TOKEN', csrfToken);
  next();
}
