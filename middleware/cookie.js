// middleware/cookie.js

export default function ({ req, res, app }) {
  // Проверка, выполняется ли код на стороне сервера
  if (process.server) {
    const cookies = req.headers.cookie;

    // Проверка, существует ли кука и не имеет ли она уже SameSite и Secure атрибуты
    if (cookies && cookies.includes('your_cookie_name=') && !cookies.includes('SameSite=None') && !cookies.includes('Secure')) {
      // Устанавливаем атрибуты SameSite=None и Secure
      res.setHeader('Set-Cookie', 'your_cookie_name=your_cookie_value; SameSite=None; Secure');
    }
  }
}
