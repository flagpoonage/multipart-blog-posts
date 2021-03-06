type ClassNameItem = string | Record<string, boolean> | undefined | null;

export function classnames(...values: ClassNameItem[]): string {
  return values
    .reduce((acc, val) => {
      if (!val) {
        return acc;
      }
      if (typeof val === 'string') {
        acc.push(val);
        return acc;
      }
      return acc.concat(
        Object.entries(val).reduce((addedKeys, [className, isAllowed]) => {
          if (isAllowed) {
            addedKeys.push(className);
          }
          return addedKeys;
        }, [] as string[])
      );
    }, [] as string[])
    .join(' ');
}
