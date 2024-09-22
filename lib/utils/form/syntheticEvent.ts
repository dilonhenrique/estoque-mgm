export function syntheticChangeEvent(name?: string, value?: any) {
  const event = {
    target: {
      value,
      name,
    },
    currentTarget: {
      name,
      value,
    },
    preventDefault: () => {},
    stopPropagation: () => {},
    nativeEvent: {} as Event,
  } as React.ChangeEvent<HTMLInputElement>;

  return event;
}
