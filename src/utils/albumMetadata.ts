export type AlbumMetadataItem = {
  name: string;
  altName: string;
  month: string;
  year: string;
  isFilm: boolean;
  description: string;
  featuredImagePath: string;
  count: number;
};

const albumMetadata: AlbumMetadataItem[] = [
  {
    name: "floripa",
    altName: "🇧🇷 Floripa",
    month: "January",
    year: "2023",
    isFilm: true,
    description: `
      Florianópolis - Brazil during New Years
      Fuji Superia X-Tra 400.
    `,
    featuredImagePath: "34.jpg",
    count: 22,
  },
  {
    name: "santa-marta",
    altName: "🇨🇴 Santa Marta",
    month: "March",
    year: "2023",
    isFilm: true,
    description: `
      Santa Marta - Colombia
      Fuji Superia X-Tra 400.
    `,
    featuredImagePath: "1.jpg",
    count: 17,
  },
  {
    name: "buenos-aires",
    altName: "🇦🇷 Buenos Aires",
    month: "August",
    year: "2022",
    isFilm: false,
    description: `
      Buenos Aires - Argentina
      Fujifilm X-E2.
    `,
    featuredImagePath: "52.jpg",
    count: 39,
  },
  {
    name: "patagonia",
    altName: "🇦🇷 Patagonia (film)",
    month: "April",
    year: "2023",
    isFilm: true,
    description: `
      El Calafate, El Chaltén - Argentina
      Kodak Vision 250D, Kodak Portra 400.
    `,
    featuredImagePath: "13.jpg",
    count: 18,
  },
  {
    name: "mendoza-maragogi-chapada",
    altName: "🇦🇷 Mendoza/Maragogi/Chapada",
    month: "April",
    year: "2023",
    isFilm: true,
    description: `
      Mendoza - Argentina, Maragogi, Alto Paraíso - Brazil
      Kodak Vision 250D, Kodak Portra 400.
    `,
    featuredImagePath: "6.jpg",
    count: 15,
  },
  {
    name: "nea-kameni",
    altName: "🇬🇷 Nea Kameni",
    month: "June",
    year: "2023",
    isFilm: false,
    description: `
      Nea Kameni Volcano, Santorini - Greece
      Fuji XE2 - Velvia.
    `,
    featuredImagePath: "5.jpg",
    count: 29,
  },
  {
    name: "ancient-thera",
    altName: "🇬🇷 Ancient Thera",
    month: "June",
    year: "2023",
    isFilm: false,
    description: `
      Ancient Thera, Santorini - Greece
      Fuji XE2 - Velvia.
    `,
    featuredImagePath: "2.jpg",
    count: 35,
  },
  {
    name: "barcelona",
    altName: "🇪🇸 Barcelona",
    month: "August",
    year: "2023",
    isFilm: false,
    description: `
      Barcelona - Spain
      Ricoh GR IIIx.
    `,
    featuredImagePath: "8.jpg",
    count: 18,
  },
  {
    name: "london",
    altName: "🇬🇧 London",
    month: "October",
    year: "2023",
    isFilm: false,
    description: `
      London - England
      Ricoh GR IIIx.
    `,
    featuredImagePath: "18.jpg",
    count: 34,
  },
  {
    name: "suceava",
    altName: "🇷🇴 Suceava",
    month: "October",
    year: "2023",
    isFilm: false,
    description: `
      Suceava - Romania
      Ricoh GR IIIx.
    `,
    featuredImagePath: "8.JPG",
    count: 40,
  },
  {
    name: "fungi",
    altName: "🍄 Fungi",
    month: "July",
    year: "2023",
    isFilm: false,
    description: `
      Mushrooms found in Romania
      Ricoh GR IIIx.
    `,
    featuredImagePath: "R0001103.JPG",
    count: 51,
  },
];

export default albumMetadata;

export const albumNames = albumMetadata.map((album) => album.name);

export const FEATURED_ALBUM = "london";
