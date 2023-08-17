export type AlbumMetadataItem = {
  name: string;
  altName: string;
  month: string;
  year: string;
  isFilm: boolean;
  description: string;
  featuredImagePath: string;
};

const albumMetadata: AlbumMetadataItem[] = [
  {
    name: "floripa",
    altName: "Floripa",
    month: "01",
    year: "2023",
    isFilm: true,
    description: `
      Fuji Superia X-Tra 400.
      Florianópolis - Brazil during New Years.
    `,
    featuredImagePath: "34.jpg",
  },
  {
    name: "santa-marta",
    altName: "Santa Marta",
    month: "03",
    year: "2023",
    isFilm: true,
    description: `
      Fuji Superia X-Tra 400.
      Santa Marta - Colombia.
    `,
    featuredImagePath: "1.jpg",
  },
  {
    name: "buenos-aires",
    altName: "Buenos Aires 2022",
    month: "08",
    year: "2022",
    isFilm: false,
    description: `
      Fujifilm X-E2.
      Buenos Aires - Argentina.
    `,
    featuredImagePath: "52.jpg",
  },
  {
    name: "patagonia",
    altName: "Patagonia (film)",
    month: "04",
    year: "2023",
    isFilm: true,
    description: `
      Kodak Vision 250D, Kodak Portra 400.
      El Calafate, El Chaltén - Argentina.
    `,
    featuredImagePath: "13.jpg",
  },
  {
    name: "mendoza-maragogi-chapada",
    altName: "Mendoza/Maragogi/Chapada",
    month: "04",
    year: "2023",
    isFilm: true,
    description: `
      Kodak Vision 250D, Kodak Portra 400.
      Mendoza - Argentina, Maragogi, Alto Paraíso - Brazil.
    `,
    featuredImagePath: "6.jpg",
  },
  {
    name: "nea-kameni",
    altName: "Nea Kameni",
    month: "06",
    year: "2023",
    isFilm: false,
    description: `
      Fuji XE2 - Velvia.
      Nea Kameni Volcano, Santorini - Greece.
    `,
    featuredImagePath: "5.jpg",
  },
  {
    name: "ancient-thera",
    altName: "Ancient Thera",
    month: "06",
    year: "2023",
    isFilm: false,
    description: `
      Fuji XE2 - Velvia.
      Ancient Thera Hike, Santorini - Greece.
    `,
    featuredImagePath: "2.jpg",
  },
  {
    name: "barcelona",
    altName: "Barcelona",
    month: "08",
    year: "2023",
    isFilm: false,
    description: `
      Ricoh GR IIIx
      Barcelona - Spain.
    `,
    featuredImagePath: "8.jpg",
  },
];

export default albumMetadata;

export const albumNames = albumMetadata.map((album) => album.name);

export const FEATURED_ALBUM = "nea-kameni";
