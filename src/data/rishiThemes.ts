export type ThemeMode = 'system' | 'light' | 'dark';
export type ResolvedAppearance = 'light' | 'dark';

export type ThemeId =
  | 'minimal-dark'
  | 'minimal-light'
  | 'midnight-cyan'
  | 'emerald-forest'
  | 'royal-purple'
  | 'arctic-teal'
  | 'sunset-ember'
  | 'neon-rose'
  | 'solar-gold'
  | 'monochrome';

export interface ThemeColors {
  /** Canvas / desktop wallpaper background tone */
  background: string;
  /** Primary card, window and panel surface */
  surface: string;
  /** Primary brand & interactive accent tone */
  accent: string;
  /** High-contrast primary typography tone */
  text: string;
  /** Elevated cards, floating popovers and modal surfaces */
  elevated: string;
  /** Inset background for text inputs, code boxes and well areas */
  inset: string;
  /** Subdued secondary typography tone (contrast checked) */
  secondaryText: string;
  /** Soft tertiary / muted typography tone */
  mutedText: string;
  /** High-contrast ink for text placed on top of solid accent buttons */
  accentInk: string;
  /** Brighter accent highlight for gradients and active glows */
  accentSecondary: string;
  /** Glow halo box-shadow rgba color */
  accentGlow: string;
  /** Focused or active border rgba color */
  accentBorder: string;
  /** Translucent chip and pill background */
  accentSoft: string;
  /** Subtle surface divider hairline border */
  border: string;
  /** Prominent window edge and focus ring border */
  borderStrong: string;
}

export interface OsTheme {
  id: ThemeId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  appearance?: ResolvedAppearance;
  colors: ThemeColors;
}

export const DEFAULT_THEME_MODE: ThemeMode = 'system';
export const DEFAULT_THEME_ID: ThemeId = 'minimal-dark';

export const OS_THEMES: readonly OsTheme[] = [
  {
    id: 'minimal-dark',
    name: 'Modern Minimal Dark',
    shortName: 'Graphite Dark',
    tagline: 'Adaptive Dark · Soft Graphite',
    description: 'Soft graphite surfaces with clean neutral typography, subtle hairline borders, and muted amber accents.',
    appearance: 'dark',
    colors: {
      background: '#141517',
      surface: '#1F2023',
      accent: '#F59E0B',
      text: '#F4F4F5',
      elevated: '#28292E',
      inset: '#18191B',
      secondaryText: '#A1A1AA',
      mutedText: '#71717A',
      accentInk: '#141517',
      accentSecondary: '#FBBF24',
      accentGlow: 'rgba(245, 158, 11, 0.18)',
      accentBorder: 'rgba(245, 158, 11, 0.40)',
      accentSoft: 'rgba(245, 158, 11, 0.12)',
      border: 'rgba(255, 255, 255, 0.08)',
      borderStrong: 'rgba(255, 255, 255, 0.16)',
    },
  },
  {
    id: 'minimal-light',
    name: 'Modern Minimal Light',
    shortName: 'Warm Light',
    tagline: 'Adaptive Light · Warm Neutral',
    description: 'Warm parchment neutral surfaces with clean stone typography and refined muted amber accents.',
    appearance: 'light',
    colors: {
      background: '#F5F4F0',
      surface: '#FFFFFF',
      accent: '#D97706',
      text: '#1C1917',
      elevated: '#FFFFFF',
      inset: '#EFEFEA',
      secondaryText: '#57534E',
      mutedText: '#78716C',
      accentInk: '#FFFFFF',
      accentSecondary: '#B45309',
      accentGlow: 'rgba(217, 119, 6, 0.15)',
      accentBorder: 'rgba(217, 119, 6, 0.35)',
      accentSoft: 'rgba(217, 119, 6, 0.10)',
      border: 'rgba(28, 25, 23, 0.09)',
      borderStrong: 'rgba(28, 25, 23, 0.18)',
    },
  },
  {
    id: 'midnight-cyan',
    name: 'Midnight Cyan',
    shortName: 'Cyan',
    tagline: 'Default · Deep Cyber Depth',
    description: 'Deep obsidian navy with high-luminance cyan glow and crisp ice-white typography.',
    colors: {
      background: '#071426',
      surface: '#10243A',
      accent: '#22D3EE',
      text: '#E6F3FF',
      elevated: '#183350',
      inset: '#050e1b',
      secondaryText: '#93B2D0',
      mutedText: '#6C8CAE',
      accentInk: '#071426',
      accentSecondary: '#67E8F9',
      accentGlow: 'rgba(34, 211, 238, 0.28)',
      accentBorder: 'rgba(34, 211, 238, 0.38)',
      accentSoft: 'rgba(34, 211, 238, 0.14)',
      border: 'rgba(34, 211, 238, 0.18)',
      borderStrong: 'rgba(34, 211, 238, 0.38)',
    },
  },
  {
    id: 'emerald-forest',
    name: 'Emerald Forest',
    shortName: 'Emerald',
    tagline: 'Nordic Moss · Biosphere Matrix',
    description: 'Lush pine obsidian with luminous emerald highlights and balanced organic contrast.',
    colors: {
      background: '#14221C',
      surface: '#20382C',
      accent: '#6EE7A0',
      text: '#E5F5EA',
      elevated: '#294838',
      inset: '#0D1713',
      secondaryText: '#98C9A8',
      mutedText: '#719E81',
      accentInk: '#0C1812',
      accentSecondary: '#86EFAC',
      accentGlow: 'rgba(110, 231, 160, 0.28)',
      accentBorder: 'rgba(110, 231, 160, 0.38)',
      accentSoft: 'rgba(110, 231, 160, 0.14)',
      border: 'rgba(110, 231, 160, 0.18)',
      borderStrong: 'rgba(110, 231, 160, 0.38)',
    },
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    shortName: 'Purple',
    tagline: 'Neo-Amethyst · Galactic Synth',
    description: 'Deep twilight violet with radiant lilac accenting and velvety elevated surfaces.',
    colors: {
      background: '#19152B',
      surface: '#2A2145',
      accent: '#A78BFA',
      text: '#F0EAFE',
      elevated: '#372C59',
      inset: '#110E1D',
      secondaryText: '#B9ABDB',
      mutedText: '#8D7EB3',
      accentInk: '#120E21',
      accentSecondary: '#C4B5FD',
      accentGlow: 'rgba(167, 139, 250, 0.28)',
      accentBorder: 'rgba(167, 139, 250, 0.38)',
      accentSoft: 'rgba(167, 139, 250, 0.14)',
      border: 'rgba(167, 139, 250, 0.18)',
      borderStrong: 'rgba(167, 139, 250, 0.38)',
    },
  },
  {
    id: 'arctic-teal',
    name: 'Arctic Teal',
    shortName: 'Teal',
    tagline: 'Glacial Tide · Precision Glass',
    description: 'Cold oceanic cyan-teal with crystalline highlights and crisp mineral tones.',
    colors: {
      background: '#142323',
      surface: '#203A39',
      accent: '#2DD4BF',
      text: '#E2F7F4',
      elevated: '#294B4A',
      inset: '#0D1818',
      secondaryText: '#92CDC5',
      mutedText: '#6EA39C',
      accentInk: '#0A1616',
      accentSecondary: '#5EEAD4',
      accentGlow: 'rgba(45, 212, 191, 0.28)',
      accentBorder: 'rgba(45, 212, 191, 0.38)',
      accentSoft: 'rgba(45, 212, 191, 0.14)',
      border: 'rgba(45, 212, 191, 0.18)',
      borderStrong: 'rgba(45, 212, 191, 0.38)',
    },
  },
  {
    id: 'sunset-ember',
    name: 'Sunset Ember',
    shortName: 'Ember',
    tagline: 'Molten Dusk · Warm Terminal',
    description: 'Charcoal-espresso canvas ignited by fiery amber-orange accents and warm parchment text.',
    colors: {
      background: '#261817',
      surface: '#3B2725',
      accent: '#FB923C',
      text: '#FFF0E5',
      elevated: '#4D3330',
      inset: '#190F0E',
      secondaryText: '#D8AC9D',
      mutedText: '#B08375',
      accentInk: '#1C0F0E',
      accentSecondary: '#FDBA74',
      accentGlow: 'rgba(251, 146, 60, 0.28)',
      accentBorder: 'rgba(251, 146, 60, 0.38)',
      accentSoft: 'rgba(251, 146, 60, 0.14)',
      border: 'rgba(251, 146, 60, 0.18)',
      borderStrong: 'rgba(251, 146, 60, 0.38)',
    },
  },
  {
    id: 'neon-rose',
    name: 'Neon Rose',
    shortName: 'Rose',
    tagline: 'Cyberpunk Magenta · Velvet Glow',
    description: 'Rich plum-violet shadows paired with vibrant electric rose and blushing typography.',
    colors: {
      background: '#241727',
      surface: '#38243D',
      accent: '#F472B6',
      text: '#FCE7F3',
      elevated: '#4A3051',
      inset: '#180E1A',
      secondaryText: '#D5A6C8',
      mutedText: '#AA7BA0',
      accentInk: '#1A0D1D',
      accentSecondary: '#F9A8D4',
      accentGlow: 'rgba(244, 114, 182, 0.28)',
      accentBorder: 'rgba(244, 114, 182, 0.38)',
      accentSoft: 'rgba(244, 114, 182, 0.14)',
      border: 'rgba(244, 114, 182, 0.18)',
      borderStrong: 'rgba(244, 114, 182, 0.38)',
    },
  },
  {
    id: 'solar-gold',
    name: 'Solar Gold',
    shortName: 'Gold',
    tagline: 'Starlight Foundry · Warm Precision',
    description: 'Deep gunmetal slate punctuated by high-visibility solar yellow and warm bone-white type.',
    colors: {
      background: '#202329',
      surface: '#30343D',
      accent: '#FACC15',
      text: '#FFF8DB',
      elevated: '#3F444F',
      inset: '#14161A',
      secondaryText: '#CFBE97',
      mutedText: '#A29370',
      accentInk: '#17191E',
      accentSecondary: '#FDE047',
      accentGlow: 'rgba(250, 204, 21, 0.28)',
      accentBorder: 'rgba(250, 204, 21, 0.38)',
      accentSoft: 'rgba(250, 204, 21, 0.14)',
      border: 'rgba(250, 204, 21, 0.18)',
      borderStrong: 'rgba(250, 204, 21, 0.38)',
    },
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    shortName: 'Mono',
    tagline: 'Architectural Minimal · Pure Obsidian',
    description: 'High-discipline carbon grayscale with platinum white accents and timeless terminal minimalism.',
    colors: {
      background: '#17191D',
      surface: '#292D33',
      accent: '#E5E7EB',
      text: '#FFFFFF',
      elevated: '#373C44',
      inset: '#0F1013',
      secondaryText: '#B0B4BC',
      mutedText: '#838790',
      accentInk: '#111317',
      accentSecondary: '#F3F4F6',
      accentGlow: 'rgba(229, 231, 235, 0.28)',
      accentBorder: 'rgba(229, 231, 235, 0.38)',
      accentSoft: 'rgba(229, 231, 235, 0.14)',
      border: 'rgba(229, 231, 235, 0.18)',
      borderStrong: 'rgba(229, 231, 235, 0.38)',
    },
  },
];

export function isValidThemeMode(value: unknown): value is ThemeMode {
  return value === 'system' || value === 'light' || value === 'dark';
}

export function isValidThemeId(value: unknown): value is ThemeId {
  return (
    typeof value === 'string' &&
    OS_THEMES.some((theme) => theme.id === value)
  );
}

export function resolveThemeFromMode(
  mode: ThemeMode,
  systemPref: ResolvedAppearance,
  customThemeId?: ThemeId | null
): ThemeId {
  if (customThemeId && isValidThemeId(customThemeId)) {
    return customThemeId;
  }
  if (mode === 'light') {
    return 'minimal-light';
  }
  if (mode === 'dark') {
    return 'minimal-dark';
  }
  return systemPref === 'dark' ? 'minimal-dark' : 'minimal-light';
}

export function getResolvedAppearance(
  mode: ThemeMode,
  systemPref: ResolvedAppearance,
  activeThemeId?: ThemeId
): ResolvedAppearance {
  if (activeThemeId) {
    const theme = getThemeConfig(activeThemeId);
    if (theme.appearance) return theme.appearance;
  }
  if (mode === 'light') return 'light';
  if (mode === 'dark') return 'dark';
  return systemPref;
}

export function getThemeConfig(id: ThemeId): OsTheme {
  const match = OS_THEMES.find((theme) => theme.id === id);
  return match ?? (OS_THEMES[0] as OsTheme);
}
