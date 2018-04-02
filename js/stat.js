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
  var histogramHeigth = 150; // px;
  var ratio = histogramHeigth / getMaxElement(times); // px;
  var initialX = 140; // px;
  var initialY = 250; // px;
  var barWidth = 40; // px;
  var indent = 90; // px;
  var lineHeight = 20; // px;

  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var color = [0, 0, 255, parseFloat(Math.random().toFixed(1)) + 0.1];
      ctx.fillStyle = 'rgba' + '(' + color + ')';
    }
    ctx.fillRect(initialX + indent * i, initialY, barWidth, -times[i] * ratio);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], initialX + indent * i, initialY + lineHeight);
    ctx.fillText(Math.round(times[i]), initialX + indent * i, initialY - times[i] * ratio - lineHeight / 2);
  }
};
