var config = {};
if (process.env.NODE_ENV === 'production') {
  config = {
    basename: '/',
    defaultPath: '/dashboard',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    ReCAPTCHASiteKey: '6LdMiOopAAAAAP4P8oN0RTD7ARW_4Y6TKJczPmXd'
  };
} else {
  config = {
    basename: '/',
    defaultPath: '/dashboard',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    ReCAPTCHASiteKey: '6LdMiOopAAAAAP4P8oN0RTD7ARW_4Y6TKJczPmXd'
  };
}

export default config;
