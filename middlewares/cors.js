const allowedCors = [
  'http://localhost:3000',
  'https://balmary.nomoredomains.club',
  'https://balmary.nomoredomains.club/api',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const cors = (req, res, next) => {
  const { method, headers: { origin } } = req;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    const requestHeaders = req.headers['access-control-request-headers'];
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    return res.end();
  }
  return next();
};

module.exports = cors;
