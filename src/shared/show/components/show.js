export function Show({ tagIf, tagElse, children }) {
  if (tagIf) return children || null;
  return tagElse || null;
}
