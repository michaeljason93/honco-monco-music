/** The brand palette — see wwwroot/images/colour palette.png */
export type PaletteTheme =
  | 'navy'
  | 'blue'
  | 'purple'
  | 'coral'
  | 'peach'
  | 'cream'
  | 'yellow'
  | 'pink'
  | 'green';

/** Themes dark enough to need light type on top. Navy is the palette's only dark. */
const DARK_THEMES: PaletteTheme[] = ['navy'];

export const isDarkTheme = (theme: PaletteTheme): boolean => DARK_THEMES.includes(theme);
