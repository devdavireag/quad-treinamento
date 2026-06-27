export interface NucleoColorSet {
  bg: string;
  bg2: string;
  text: string;
  badge: string;
}

export const nucleoColors: Record<string, NucleoColorSet> = {
  ngg: {
    bg: "#797777",
    bg2: "#dbdbdb",
    text: "#666666",
    badge: "#e6e6e6",
  },
  nge: {
    bg: "#ff3131",
    bg2: "#800000",
    text: "#72243E",
    badge: "#FBEAF0",
  },
  nti: {
    bg: "#ffde59",
    bg2: "#ff914d",
    text: "#3C3489",
    badge: "#EEEDFE",
  },
  nre: {
    bg: "#004aad",
    bg2: "#5de0e6",
    text: "#085041",
    badge: "#E1F5EE",
  },
  nop: {
    bg: "#89d957",
    bg2: "#c9e265",
    text: "#085041",
    badge: "#E1F5EE",
  },
  npp: {
    bg: "#48004e",
    bg2: "#cb6ce6",
    text: "#72243E",
    badge: "#FBEAF0",
  },
};

export const defaultNucleoColors: NucleoColorSet = {
  bg: "#888780",
  bg2: "#8B0000",
  text: "#444441",
  badge: "#F1EFE8",
};

export function getNucleoColors(id: string): NucleoColorSet {
  return nucleoColors[id.toLowerCase()] ?? defaultNucleoColors;
}
