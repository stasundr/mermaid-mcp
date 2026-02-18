import { THEMES, type RenderOptions } from "beautiful-mermaid";

export const themeNames = Object.keys(THEMES);

export function resolveTheme(
  themeName?: string,
  bg?: string,
  fg?: string,
  transparent?: boolean,
): RenderOptions {
  const base = themeName ? THEMES[themeName] : undefined;
  return {
    ...base,
    ...(bg && { bg }),
    ...(fg && { fg }),
    ...(transparent && { transparent }),
  };
}
