export function jojoMenacingScreenSize() {
  const menacing = "ゴ";
  const screenWidth = window.screen.availWidth;
  const screenHeight = window.screen.availHeight;
  const img = token?.document?.texture?.src;
  const scaleChange = 0.05;
  const duration = 5 * 1000;
  const chatWidth = chat.offsetWidth;
  const maxSize = 1.5;
  const sideDist = 0.3;
  const timeBetween = duration / 20;
  const menaceCount = 8;
  const shake = {
    ease: "easeInOutSine",
    duration: 200,
  };
  const style = {
    fill: ["#1b124a", "#c24784"],
    fontSize: 70,
    fontStyle: "italic",
    fontWeight: 800,
    strokeThickness: 3,
  };

  const seq = new Sequence();

  for (let i = 0; i < menaceCount; i++) {
    const delay = timeBetween * i;
    const xPos = i % 2 === 0 ? 0.3 : 0.9;
    seq
      .effect()
      .text(` ${menacing} `, style)
      .animateProperty("sprite", "position.y", {
        from: 0,
        to: -1.1 * screenHeight,
        duration,
      })
      .animateProperty("sprite", "position.x", {
        from: 0,
        to: -0.1 * screenWidth,
        duration,
      })
      .animateProperty("sprite", "scale.x", { from: 1, to: 1.5, duration })
      .animateProperty("sprite", "scale.y", { from: 1, to: 1.5, duration })
      .loopProperty("sprite", "position.x", {
        values: [0, 10, 0, -10, 0],
        duration: shake.duration,
        ease: shake.ease,
      })
      // .loopProperty("sprite", "position.y", { values: [0, 10, 0, -10, 0], duration: shake.duration, ease: shake.ease})
      //.loopProperty("sprite", "scale.x", { values: [1, 1 - scaleChange, 1, 1 + scaleChange, 1], duration: 150, ease: 'easeInOutSine'})
      //.loopProperty("sprite", "scale.y", { values: [1, 1 - scaleChange, 1, 1 + scaleChange, 1], duration: 150, ease: 'easeInOutSine'})
      .screenSpace()
      .screenSpaceAboveUI()
      .screenSpaceAnchor({ x: xPos, y: 0.9 })
      .screenSpacePosition({ x: -chatWidth, y: 0 })
      .delay(delay, delay + timeBetween / 4);
  }
  //.duration(5000)
  seq.play();
}
