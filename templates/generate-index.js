const generateRoot = require('./core/generate-root.js');

module.exports = (options) => {
  const {
    name, framework, type, bundler,
  } = options;

  const metaTags = type.indexOf('pwa') >= 0 || type.indexOf('web') >= 0 ? `
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <!-- include icons -->
  `.trim() : '';

  const manifest = type.indexOf('pwa') >= 0 ? `
  <!-- include manifest -->
  `.trim() : '';

  const webStart = type.indexOf('cordova') >= 0 && (metaTags || manifest) ? `
  <!-- web-start -->
  ` : '';
  const webEnd = webStart ? `
  <!-- web-end -->
  ` : '';

  const styles = bundler === 'webpack' ? `
  <link rel="stylesheet" href="css/app.css">
  `.trim() : `
  <link rel="stylesheet" href="framework7/css/framework7.bundle.min.css">
  <link rel="stylesheet" href="css/icons.css">
  <link rel="stylesheet" href="css/app.css">
  `.trim();

  const rootContent = framework === 'core'
    ? generateRoot(options)
    : '';

  const cordovaScript = type.indexOf('cordova') >= 0 ? `
  <!-- cordova-start -->
  <script src="cordova.js"></script>
  <!-- cordova-end -->
  `.trim() : '';

  const scripts = bundler ? `
  <!-- App scripts -->
  <script src="js/app.js"></script>
  `.trim() : `
  <!-- Framework7 library -->
  <script src="framework7/js/framework7.bundle.min.js"></script>
  <!-- App routes -->
  <script src="js/routes.js"></script>
  <!-- App scripts -->
  <script src="js/app.js"></script>
  `.trim();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <!--
  Customize this policy to fit your own app's needs. For more guidance, see:
      https://github.com/apache/cordova-plugin-whitelist/blob/master/README.md#content-security-policy
  Some notes:
    * gap: is required only on iOS (when using UIWebView) and is needed for JS->native communication
    * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly
    * Disables use of inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:
      * Enable inline JS: add 'unsafe-inline' to default-src
  -->
  <meta http-equiv="Content-Security-Policy" content="default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: gap: content:">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui, viewport-fit=cover">

  <meta name="theme-color" content="#2196f3">
  <meta name="format-detection" content="telephone=no">
  <meta name="msapplication-tap-highlight" content="no">
  <title>${name}</title>
  ${webStart}
  ${metaTags}
  ${manifest}
  ${webEnd}
  ${styles}
</head>
<body>
  <div id="app">${rootContent}</div>
  ${cordovaScript}
  ${scripts}
</body>
</html>
  `.trim();
};
