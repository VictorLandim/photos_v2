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
      Florianópolis - Brazil during New Years
      Fuji Superia X-Tra 400.
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
      Santa Marta - Colombia
      Fuji Superia X-Tra 400.
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
      Buenos Aires - Argentina
      Fujifilm X-E2.
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
      El Calafate, El Chaltén - Argentina
      Kodak Vision 250D, Kodak Portra 400.
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
      Mendoza - Argentina, Maragogi, Alto Paraíso - Brazil
      Kodak Vision 250D, Kodak Portra 400.
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
      Nea Kameni Volcano, Santorini - Greece
      Fuji XE2 - Velvia.
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
      Ancient Thera, Santorini - Greece
      Fuji XE2 - Velvia.
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
      Barcelona - Spain
      Ricoh GR IIIx.
    `,
    featuredImagePath: "8.jpg",
  },
  {
    name: "london",
    altName: "London",
    month: "10",
    year: "2023",
    isFilm: false,
    description: `
      London - England
      Ricoh GR IIIx.
    `,
    featuredImagePath: "18.jpg",
  },
  {
    name: "suceava",
    altName: "Suceava",
    month: "08",
    year: "2023",
    isFilm: false,
    description: `
      Suceava - Romania
      Ricoh GR IIIx.
    `,
    featuredImagePath: "8.JPG",
  },
];

export default albumMetadata;

export const albumNames = albumMetadata.map((album) => album.name);

export const FEATURED_ALBUM = "london";
