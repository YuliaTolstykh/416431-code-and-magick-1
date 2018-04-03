'use strict';

window.renderStatistics = function (ctx, names, times) {
  var roundCorners = function (color, x0, y0, radius, width, height) {
    var x = [x0, x0 + width - 2 * radius, x0 + width - 2 * radius, x0];
    var y = [y0, y0, y0 + height - 2 * radius, y0 + height - 2 * radius];
    ctx.beginPath();
    ctx.fillStyle = color;
    for (var k = 0; k <= 3; k++) {
      ctx.arc(x[k], y[k], radius, Math.PI * (1 + k / 2), Math.PI / 2 * (3 + k));
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  roundCorners('rgba(0, 0, 0, 0.7)', 130, 40, 20, 420, 270);
  roundCorners('rgba(256, 256, 256, 1.0)', 120, 30, 20, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);
  var getMaxElement = function (array) {
    var max = -1;
    for (var j = 0; j < array.length; j++) {
      var element = array[j];
      if (element > max) {
        max = element;
      }
    }
    return max;
  };

  var HISTOGRAM_HEIGTH = 150; // px;
  var INITIAL_X = 140; // px;
  var INITIAL_Y = 250; // px;
  var BAR_WIDTH = 40; // px;
  var INDENT = 90; // px;
  var LINE_HEIGHT = 20; // px;
  var ratio = HISTOGRAM_HEIGTH / getMaxElement(times); // px;
  var drawRect = function (n) {
    ctx.fillRect(INITIAL_X + INDENT * n, INITIAL_Y, BAR_WIDTH, -times[n] * ratio);
  };
  var typeText = function (n) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[n], INITIAL_X + INDENT * n, INITIAL_Y + LINE_HEIGHT);
    ctx.fillText(Math.round(times[n]), INITIAL_X + INDENT * n, INITIAL_Y - times[n] * ratio - LINE_HEIGHT / 2);
  };

  for (var i = 0; i < times.length; i++) {
    var color = [0, 0, 255, parseFloat(Math.random().toFixed(1)) + 0.1];
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba' + '(' + color + ')';
    drawRect(i);
    typeText(i);
  }
};
