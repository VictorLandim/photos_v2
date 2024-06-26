export type AlbumMetadataItem = {
  name: string;
  altName: string;
  month: string;
  year: string;
  isFilm: boolean;
  description: string;
  featuredImagePath: string;
  count: number;
  country: string;
  pos?: [number, number];
};

const AMSTERDAM: AlbumMetadataItem = {
  name: "amsterdam",
  altName: "🌷 Exploring Holland",
  month: "March",
  year: "2024",
  isFilm: false,
  description: "Amsterdam. Ricoh GR IIIx",
  count: 56,
  featuredImagePath: "R0005842.JPG",
  country: "🇳🇱 The Netherlands",
  pos: [52.377956, 4.89707],
};
const CRETE: AlbumMetadataItem = {
  name: "crete",
  altName: "🏝️ Crete Island",
  month: "Jun",
  year: "2023",
  isFilm: false,
  description: "Crete, Balos, Elafonisi. Fuji XE-2 Velvia",
  count: 56,
  featuredImagePath: "DSCF3437.JPG",
  country: "🇬🇷 Greece",
  pos: [35.417416, 24.530005],
};

const SALVADOR: AlbumMetadataItem = {
  name: "salvador",
  altName: "☀️ Salvador summer",
  country: "🇧🇷 Brazil",
  month: "May",
  year: "2021",
  isFilm: false,
  description: "Salvador shot on Fuji Xtra 400",
  featuredImagePath: "b_10.jpg",
  count: 65,
  pos: [-12.974722, -38.476665],
};
const CHAPADA: AlbumMetadataItem = {
  name: "chapada",
  altName: "🌾 Chapada hike",
  country: "🇧🇷 Brazil",
  month: "May",
  year: "2024",
  isFilm: false,
  description: "Chapada dos Veadeiros. Ricoh GRIIIx",
  featuredImagePath: "R0006805.JPG",
  count: 40,
  pos: [-14.1336, -47.5215],
};

const FLORIPA: AlbumMetadataItem = {
  name: "floripa",
  altName: "🌊 Floripa waves",
  country: "🇧🇷 Brazil",
  month: "January",
  year: "2023",
  isFilm: true,
  description: `
    Florianópolis during New Years. Fuji Superia X-Tra 400.
  `,
  featuredImagePath: "34.jpg",
  count: 22,
  pos: [-27.5935, -48.55854],
};

const SANTA_MARTA: AlbumMetadataItem = {
  name: "santa-marta",
  country: "🇨🇴 Colombia",
  altName: "💛 Love in Colombia",
  month: "March",
  year: "2023",
  isFilm: true,
  description: `
    Santa Marta. Fuji Superia X-Tra 400.
  `,
  featuredImagePath: "1.jpg",
  count: 17,
  pos: [11.233, -74.2],
};

const PATAGONIA: AlbumMetadataItem = {
  name: "patagonia",
  country: "🇦🇷 Argentina",
  altName: "🏔️ Patagonia adventure",
  month: "April",
  year: "2023",
  isFilm: true,
  description: `
    El Calafate, El Chaltén. Kodak Vision 250D, Kodak Portra 400.
  `,
  featuredImagePath: "13.jpg",
  count: 18,
  pos: [-49.335876, -72.88192],
};

const MENDOZA: AlbumMetadataItem = {
  name: "mendoza-maragogi-chapada",
  country: "🇦🇷 Argentina",
  altName: "🍃 Spring sun",
  month: "April",
  year: "2023",
  isFilm: true,
  description: `
    Mendoza, Maragogi, Alto Paraíso. Kodak Vision 250D, Kodak Portra 400.
  `,
  featuredImagePath: "6.jpg",
  count: 15,
};

const NEA_KAMENI: AlbumMetadataItem = {
  name: "nea-kameni",
  country: "🇬🇷 Greece",
  altName: "🌋 Nea Kameni",
  month: "June",
  year: "2023",
  isFilm: false,
  description: `
      Nea Kameni Volcano, Santorini. Fuji XE2 - Velvia.
    `,
  featuredImagePath: "5.jpg",
  count: 29,
  pos: [36.405541, 25.395489],
};

const ANCIENT_THERA: AlbumMetadataItem = {
  name: "ancient-thera",
  country: "🇬🇷 Greece",
  altName: "🏛️ Ancient Thera Hike",
  month: "June",
  year: "2023",
  isFilm: false,
  description: `
    Ancient Thera, Santorini. Fuji XE2 - Velvia.
  `,
  featuredImagePath: "2.jpg",
  count: 35,
  pos: [36.393154, 25.46151],
};

const BARCELONA: AlbumMetadataItem = {
  name: "barcelona",
  country: "🇪🇸 Spain",
  altName: "☀️ Barcelona summer",
  month: "August",
  year: "2023",
  isFilm: false,
  description: `
    Barcelona. Ricoh GR IIIx.
  `,
  featuredImagePath: "8.jpg",
  count: 18,
  pos: [41.390205, 2.154007],
};

const LONDON: AlbumMetadataItem = {
  name: "london",
  country: "🇬🇧 United Kingdom",
  altName: "🕰️ First time in London",
  month: "October",
  year: "2023",
  isFilm: false,
  description: `
    London. Ricoh GR IIIx.
  `,
  featuredImagePath: "18.jpg",
  count: 34,
  pos: [51.509865, -0.118092],
};

const SUCEAVA: AlbumMetadataItem = {
  name: "suceava",
  country: "🇷🇴 Romania",
  altName: "🗻 Bukovina hike",
  month: "October",
  year: "2023",
  isFilm: false,
  description: `
    12 apostoli trail. Ricoh GR IIIx.
  `,
  featuredImagePath: "8.JPG",
  count: 40,
  pos: [47.63333, 26.25],
};

const FUNGI: AlbumMetadataItem = {
  name: "fungi",
  country: "",
  altName: "🍄 Cool mushrooms",
  month: "July",
  year: "2023",
  isFilm: false,
  description: `
    Mushrooms found in Romania. Ricoh GR IIIx.
  `,
  featuredImagePath: "R0001103.JPG",
  count: 51,
};

const BUENOS_AIRES: AlbumMetadataItem = {
  name: "buenos-aires",
  country: "🇦🇷 Argentina",
  altName: "🎞️ Buenos Aires Streets",
  month: "August",
  year: "2022",
  isFilm: false,
  description: `
    Buenos Aires. Fujifilm X-E2.
  `,
  featuredImagePath: "52.jpg",
  count: 39,
  pos: [-34.603722, -58.381592],
};

const albumMetadata: AlbumMetadataItem[] = [
  PATAGONIA,
  CRETE,
  AMSTERDAM,
  CHAPADA,
  FLORIPA,
  SUCEAVA,
  NEA_KAMENI,
  SANTA_MARTA,
  ANCIENT_THERA,
  BARCELONA,
  FUNGI,
  LONDON,
  SALVADOR,
  MENDOZA,
  BUENOS_AIRES,
];

export default albumMetadata;

export const albumNames = albumMetadata.map((album) => album.name);

export const FEATURED_ALBUM = "patagonia";
