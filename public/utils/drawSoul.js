const drawSoul = (ctx, { x, y, width, height, color }, isCurrentPlayer) => {
  ctx.beginPath();

  if (isCurrentPlayer) {
    const strokeLineWidth = 2;
    ctx.rect(
      x + strokeLineWidth,
      y + strokeLineWidth,
      width - strokeLineWidth - strokeLineWidth,
      height - strokeLineWidth - strokeLineWidth
    );
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = strokeLineWidth;
    ctx.strokeStyle = "rgb(229, 229, 229)";
    ctx.stroke();
  } else {
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
  }
};

export default drawSoul;
