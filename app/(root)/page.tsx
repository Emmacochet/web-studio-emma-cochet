// Static export: no server, so the browser language is detected client-side.
// Keep the supported locales in sync with lib/i18n/config.ts; the default (unsupported languages) is English.
// Without JavaScript, the <noscript> meta refresh in layout.tsx sends visitors to /en/.
const redirectScript = `
(function () {
  var locales = ["fr", "en"];
  var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
  var lang = "en";
  for (var i = 0; i < prefs.length; i++) {
    var code = String(prefs[i]).toLowerCase().split("-")[0];
    if (locales.indexOf(code) !== -1) { lang = code; break; }
  }
  window.location.replace("/" + lang + "/" + window.location.search + window.location.hash);
})();
`;

export default function RootPage() {
  return <script dangerouslySetInnerHTML={{ __html: redirectScript }} />;
}
