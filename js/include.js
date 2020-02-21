function loadScript(url) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
};
loadScript(jquery.js);
loadScript(Unit.js);