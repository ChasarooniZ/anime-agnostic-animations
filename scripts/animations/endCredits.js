export async function endCredits(credits) {
  const lines = Array.isArray(credits)
    ? credits
    : credits.split(/\r?\n|\r|\n/g);
  const background = true;
  const factor = 60;

  const duration = factor * 1000;
  const delay = factor * 20;

  const seq = new Sequence();

  if (background) {
    seq
      .effect()
      .shape("rectangle", {
        fillColor: "#000000",
        fillAlpha: 0.5,
        width: 1,
        height: 1,
      })
      .screenSpace()
      .screenSpaceAboveUI()
      //.screenSpacePosition({ x: 0, y: 0 })
      .screenSpaceAnchor({ x: 0, y: 0 })
      .screenSpaceScale({
        x: 2,
        y: 2,
        fitX: true,
        fitY: true,
        ratioX: false,
        ratioY: false,
      })
      .opacity(0.5)
      .zIndex(0)
      .duration(lines.length * delay);
  }

  let i = 0;
  for (let line of lines) {
    if (line.trim() !== "") {
      seq
        .effect()
        .text(line, {
          fill: "white",
          fontFamily: "Arial Black",
          fontSize: 28,
          strokeThickness: 4,
        })
        .screenSpace()
        .screenSpaceAboveUI()
        .screenSpacePosition({ x: 0, y: 0 })
        .screenSpaceAnchor({ x: 0.5, y: 1.05 })
        //.screenSpaceScale({x: 1, y: 1, fitX: false, fitY: false, ratioX: false, ratioY:false})
        .animateProperty("sprite", "position.y", {
          from: 0,
          to: -3000,
          duration: duration,
        })
        .duration(duration)
        .delay(i * delay)
        .zIndex(1);
    }
    i++;
  }
  await seq.play();
}
