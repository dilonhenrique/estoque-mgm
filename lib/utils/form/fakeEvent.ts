export function fakeEvent(name: string, value?: any) {
  return { target: { value, name } };
}
