(function () {
  var canvas = document.getElementById('ascii-waves');
  var ctx = canvas.getContext('2d');
  var chars = ' .:-=+*#';
  var cell = 14;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cols;
  var rows;

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = cell + 'px monospace';
    ctx.textBaseline = 'top';
    cols = Math.ceil(window.innerWidth / (cell * 0.6));
    rows = Math.ceil(window.innerHeight / cell);
  }

  function draw(t) {
    var dark = document.documentElement.dataset.theme === 'dark';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = dark ? 'rgba(138, 180, 201, 0.35)' : 'rgba(54, 54, 54, 0.3)';
    for (var y = 0; y < rows; y++) {
      var line = '';
      for (var x = 0; x < cols; x++) {
        var v = Math.sin(x * 0.08 + t * 0.0006) + Math.sin(y * 0.25 + x * 0.04 - t * 0.0009) + Math.sin((x + y) * 0.05 + t * 0.0004);
        var i = Math.floor(((v + 3) / 6) * chars.length);
        line += chars[Math.min(chars.length - 1, Math.max(0, i))];
      }
      ctx.fillText(line, 0, y * cell);
    }
  }

  function frame(t) {
    draw(t);
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', function () {
    resize();
    draw(0);
  });
  resize();
  if (reduceMotion) {
    draw(0);
  } else {
    requestAnimationFrame(frame);
  }
})();
