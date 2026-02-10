import type { Product, StreamEntry } from "./types";

type AccentColor = Product["accentColor"];
type EntryType = StreamEntry["type"];

interface ColorClasses {
  glowClass: string;
  borderClass: string;
  tagClass: string;
  statusClass: string;
  iconClass: string;
  dotClass: string;
}

const colorMap: Record<AccentColor, ColorClasses> = {
  "aurora-pink": {
    glowClass: "glow-pink",
    borderClass: "border-aurora-pink/30",
    tagClass: "bg-aurora-pink/10 text-aurora-pink",
    statusClass: "bg-aurora-pink/10 text-aurora-pink",
    iconClass: "text-aurora-pink",
    dotClass: "bg-aurora-pink",
  },
  "aurora-teal": {
    glowClass: "glow-teal",
    borderClass: "border-aurora-teal/30",
    tagClass: "bg-aurora-teal/10 text-aurora-teal",
    statusClass: "bg-aurora-teal/10 text-aurora-teal",
    iconClass: "text-aurora-teal",
    dotClass: "bg-aurora-teal",
  },
  "aurora-purple": {
    glowClass: "glow-purple",
    borderClass: "border-aurora-purple/30",
    tagClass: "bg-aurora-purple/10 text-aurora-purple",
    statusClass: "bg-aurora-purple/10 text-aurora-purple",
    iconClass: "text-aurora-purple",
    dotClass: "bg-aurora-purple",
  },
  "aurora-blue": {
    glowClass: "glow-blue",
    borderClass: "border-aurora-blue/30",
    tagClass: "bg-aurora-blue/10 text-aurora-blue",
    statusClass: "bg-aurora-blue/10 text-aurora-blue",
    iconClass: "text-aurora-blue",
    dotClass: "bg-aurora-blue",
  },
  "aurora-green": {
    glowClass: "glow-green",
    borderClass: "border-aurora-green/30",
    tagClass: "bg-aurora-green/10 text-aurora-green",
    statusClass: "bg-aurora-green/10 text-aurora-green",
    iconClass: "text-aurora-green",
    dotClass: "bg-aurora-green",
  },
  "aurora-cyan": {
    glowClass: "glow-cyan",
    borderClass: "border-aurora-cyan/30",
    tagClass: "bg-aurora-cyan/10 text-aurora-cyan",
    statusClass: "bg-aurora-cyan/10 text-aurora-cyan",
    iconClass: "text-aurora-cyan",
    dotClass: "bg-aurora-cyan",
  },
};

export function getColorClasses(accentColor: AccentColor): ColorClasses {
  return colorMap[accentColor] ?? colorMap["aurora-green"];
}

interface TypeStyleClasses {
  bg: string;
  dot: string;
}

const typeStyleMap: Record<EntryType, TypeStyleClasses> = {
  milestone: { bg: "bg-aurora-green/10 text-aurora-green", dot: "bg-aurora-green" },
  release: { bg: "bg-aurora-teal/10 text-aurora-teal", dot: "bg-aurora-teal" },
  announcement: { bg: "bg-aurora-purple/10 text-aurora-purple", dot: "bg-aurora-purple" },
  engineering: { bg: "bg-aurora-blue/10 text-aurora-blue", dot: "bg-aurora-blue" },
  research: { bg: "bg-aurora-pink/10 text-aurora-pink", dot: "bg-aurora-pink" },
};

export function getTypeStyles(type: string): TypeStyleClasses {
  return typeStyleMap[type as EntryType] ?? typeStyleMap.engineering;
}
