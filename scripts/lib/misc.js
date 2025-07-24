export function tokenImage(tokenDoc) {
  return (
    (tokenDoc.ring.enabled && tokenDoc.ring.subject.texture) ||
    tokenDoc.texture.src
  );
}


/**
 * Get all users that can see the token
 * @param {*} tok Token trying to be seen
 * @returns Returns list of user ids that can see the token
 */
export function getVisibleUsers(tok) {
  let list = game.users.filter((u) => u.isGM).map((u) => u.id);
  if (tok?.document) {
      tok = tok.document;
  }
  if (!tok?.hidden) {
      // check vision if pf2e perception active
      if (game.modules.get("pf2e-perception")?.active) {
          let cantSee = [];
          for (const key in tok?.flags?.["pf2e-perception"]?.data) {
              if (["undetected", "unnoticed"].includes(tok?.flags?.["pf2e-perception"]?.data?.[key]?.visibility)) {
                  cantSee.push(canvas.tokens.get(key)?.actor?.uuid);
              }
          }
          list = list.concat(
              game.users.players.filter((u) => !cantSee.includes(u?.character?.uuid)).map((u) => u.id)
          );
      } else {
          list = game.users.map((u) => u.id);
      }
  }
  return list;
}