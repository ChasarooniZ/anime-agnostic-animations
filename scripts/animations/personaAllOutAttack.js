// All out attack Phases
// 0 Intro - The intro (IE smoke comes in all the player characters go up, screen cracks)
// 1 Party Cut Ins - Characters all flash on the screen in little cut outs
// 2 Silhoute Attack - Silhoutes of the enemies are slowly zoomed out to with black slashes goign through them and sparkles on top, before flashing (star zoom in) to the next scene
// 3 Land - Start on red screen, Character lands from above in front, enemies show up on tilted screen behind in silhoute
// 4 Face Card - Character gets zoomed in on (Middle Right), their symbol (if it exists) appears behidn the enemies, Blood Splashes out of the enemies in the BG, The character Logo appears on the left side goin top to bottom

const CUT_IN_POLY = [
  [
    [0.24, 0.52],
    [0.29, 0.16],
    [0.32, 0],
    [0, 0],
    [0, 0.53],
  ],
  [
    [0.4, 0.25],
    [0.44, 0],
    [0.66, 0],
    [0.91, 0.08],
    [0.52, 0.42],
  ],
  [
    [0.02, 0.76],
    [0.17, 0.59],
    [0.32, 0.69],
    [0.35, 0.98],
    [0.13, 0.98],
    [0.04, 0.79],
  ],
  [
    [0.92, 0.13],
    [1, 0.19],
    [1, 0.94],
    [0.66, 0.66],
    [0.69, 0.32],
  ],
  [
    [0.61, 0.69],
    [0.69, 0.91],
    [0.67, 1],
    [0.39, 1],
    [0.4, 0.76],
  ],
];
const ANCHORS = [
  {
    x: -0.36,
    y: -0.26,
  },
  {
    x: 0.09,
    y: -0.32,
  },
  {
    x: -0.33,
    y: 0.3,
  },
  {
    x: 0.38,
    y: 0.05,
  },
  {
    x: 0.05,
    y: 0.37,
  },
];
const SCALES = [0.65, 0.65, 0.6, 0.81, 0.6];
const SCALE = 1;

function partyCutIn() {
  console.log(SCALES);
  let cnt = 0;
  const duration = 4000;
  console.log("-----");
  const allies = Sequencer.Helpers.shuffle_array(game.actors.party.members);
  const seq = new Sequence()
    //Color BG
    .effect()
    .screenSpace()
    .screenSpaceAboveUI()
    .shape("rectangle", {
      width: window.innerWidth,
      height: window.innerHeight,
      fillAlpha: 1,
      fillColor: "#FF0000",
      anchor: { x: 0.5, y: 0.5 },
    })
    .duration(duration)
    .zIndex(0)
    //BG Glass
    .effect()
    .file("pics/black_mirror.webp")
    .screenSpace()
    .screenSpaceAboveUI()
    .zIndex(1)
    .duration(duration)
    .screenSpaceScale({ fitY: true, fitX: true });

  for (const member of allies) {
    const art = getTokenArt(member.prototypeToken); //member.img;
    const tokenScale = 1; //getTokenScale(member.prototypeToken)
    const anchor = ANCHORS[cnt % CUT_IN_POLY.length];
    const poly = centerPoints(CUT_IN_POLY[cnt % CUT_IN_POLY.length]);
    const polyScale = SCALES[cnt % CUT_IN_POLY.length];
    // console.log({ polyScale, tokenScale, anchor });
    seq
      .effect()
      .screenSpace()
      .screenSpaceAboveUI()
      .zIndex(4)
      .shape("polygon", {
        points: poly,
        // lineSize: 4,
        // lineColor: "#FF0000",
        isMask: true,
      })
      .animateProperty("sprite", "position.x", {
        from: 0,
        to: anchor.x,
        duration: duration / 3,
        screenSpace: true,
        ease: "easeOutQuint",
      })
      .animateProperty("sprite", "position.y", {
        from: 0,
        to: anchor.y,
        duration: duration / 3,
        screenSpace: true,
        ease: "easeOutQuint",
      })

      // .spriteAnchor({x: 0.5, y: 0.5})
      .file(art)
      // .screenSpaceScale({ fitY: true, ratioX: true })
      // .spriteScale(SCALE)
      .size(((SCALE * polyScale) / tokenScale) * window.innerHeight)
      // .screenSpaceAnchor(0)
      .duration(duration)
      //BG Color
      .effect()
      .screenSpace()
      .screenSpaceAboveUI()
      .zIndex(3)
      .shape("polygon", {
        points: poly,
        lineSize: 0,
        fillAlpha: 1,
        fillColor: "#FF0000",
        // isMask: true,
      })
      .duration(duration);
    cnt++;
  }
  seq.play();
}

function centerPoints(polygon) {
  return polygon.map(([x, y]) => [
    (x * window.innerWidth - window.innerWidth / 2) * 1.1,
    (y * window.innerHeight - window.innerHeight / 2) * 1.1,
  ]);
}

function getArtAnchor(array) {
  return {
    x:
      array.reduce(function (avg, value, _, { length }) {
        return avg + value[0] / length;
      }, 0) - 0.5,
    y:
      array.reduce(function (avg, value, _, { length }) {
        return avg + value[1] / length;
      }, 0) - 0.5,
  };
}

function getArtScale(array) {
  const xs = array.map((pt) => pt[0]);
  const ys = array.map((pt) => pt[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const max = Math.max(maxX - minX, maxY - minY);
  const avg = (maxX - minX + maxY - minY) / 2;
  const ydiff = maxY - minY;
  return max;
}

function getTokenArt(token) {
  return token.ring.enabled
    ? token.ring.subject.texture || token.texture.src
    : token.texture.src;
}

function getTokenScale(token) {
  return Math.abs(
    token.texture.scaleX, // / (token.ring.enabled ? token.ring.subject.scale : 1),
  );
}

const maxDistance = 0.2;

const baddieAnchorsSlash = [
  {
    x: 0.5,
    y: 0.5,
  },
  {
    x: 0.65,
    y: 0.76,
  },
  {
    x: 0.35,
    y: 0.76,
  },
  {
    x: 0.2,
    y: 0.5,
  },
  {
    x: 0.35,
    y: 0.24,
  },
  {
    x: 0.65,
    y: 0.24,
  },
  {
    x: 0.8,
    y: 0.5,
  },
];

function slashedThrough(targets) {
  const seq = new Sequence();
  const scale = 0.35;
  const duration = 2000;
  const shakeAmt = 10;
  const anchors = Sequencer.Helpers.shuffle_array(baddieAnchorsSlash);
  let cnt = 0;
  for (const target of targets) {
    const art = target.actor.img;
    const anchor = anchors[cnt];
    seq
      .effect()
      .screenSpace()
      .screenSpaceAboveUI()
      .screenSpaceScale({ fitY: true, ratioX: true })
      .scale(scale)
      .file(art)
      .filter("ColorMatrix", { brightness: 0 })
      .screenSpaceAnchor(anchor)
      .loopProperty("sprite", "position.x", {
        from: -shakeAmt * Math.random(),
        to: shakeAmt * Math.random(),
        duration: 150,
        delay: 250,
        pingPong: true,
      })
      .loopProperty("sprite", "position.y", {
        from: -shakeAmt * Math.random(),
        to: shakeAmt * Math.random(),
        duration: 150,
        delay: 250,
        pingPong: true,
      })
      .duration(duration);
    cnt++;
  }
  seq.play();
}

//lines.split("\n").map(i => i.split(", ").map((x, cnt) => cnt === 0 ? Math.round(Number(x) /1337 * 100)/100 : Math.round(Number(x) / 758 * 100)/100))
const char = token;
const targets = [...game.user.targets];
//partyCutIn();
slashedThrough(targets);
