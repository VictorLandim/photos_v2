export type AlbumMetadataItem = {
  name: string;
  altName: string;
  month: string;
  year: string;
  isFilm: boolean;
  description: string;
  featuredIndex: number;
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
    featuredIndex: 31,
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
    featuredIndex: 0,
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
    featuredIndex: 52,
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
    featuredIndex: 13,
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
    featuredIndex: 6,
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
    featuredIndex: 5,
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
    featuredIndex: 2,
  },
];

export default albumMetadata;

export const FEATURED_ALBUM = "nea-kameni";
