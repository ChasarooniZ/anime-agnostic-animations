export function tokenImage(tokenDoc) {
  return (
    (tokenDoc.ring.enabled && tokenDoc.ring.subject.texture) ||
    tokenDoc.texture.src
  );
}
