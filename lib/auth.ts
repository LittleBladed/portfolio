export function isAuthorized(password: string): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && password === expected;
}
