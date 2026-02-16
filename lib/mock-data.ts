import { Movie, Genre } from '@/types';

export const GENRES: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

export const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    overview:
      'A skilled thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    poster_path: '/8IB1eC33cPJy9kSwaJAVjeZ0QUX.jpg',
    backdrop_path: '/s3TBrFFdzs0UQrLhgQ51JwWE2q5.jpg',
    release_date: '2010-07-16',
    vote_average: 8.8,
    vote_count: 33891,
    popularity: 66.418,
    genre_ids: [28, 12, 14, 878],
    runtime: 148,
    genres: [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 14, name: 'Fantasy' },
      { id: 878, name: 'Science Fiction' },
    ],
  },
  {
    id: 2,
    title: 'The Dark Knight',
    overview:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests, to fight injustice.',
    poster_path: '/1hqwGsGvuAG4r5drnS3nYFD6N4J.jpg',
    backdrop_path: '/RxAuWusDU24G2atAYiCfB9V2oM2.jpg',
    release_date: '2008-07-18',
    vote_average: 9.0,
    vote_count: 28892,
    popularity: 98.265,
    genre_ids: [28, 80, 18, 53],
    runtime: 152,
    genres: [
      { id: 28, name: 'Action' },
      { id: 80, name: 'Crime' },
      { id: 18, name: 'Drama' },
      { id: 53, name: 'Thriller' },
    ],
  },
  {
    id: 3,
    title: 'Interstellar',
    overview:
      'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop_path: '/xu3iMXf26sAF4r9PJ7gfnXn7Rqj.jpg',
    release_date: '2014-11-05',
    vote_average: 8.6,
    vote_count: 34299,
    popularity: 79.452,
    genre_ids: [12, 18, 878],
    runtime: 169,
    genres: [
      { id: 12, name: 'Adventure' },
      { id: 18, name: 'Drama' },
      { id: 878, name: 'Science Fiction' },
    ],
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    overview:
      'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    poster_path: '/dM2w364MScsjFjitElcnv2cfGv.jpg',
    backdrop_path: '/sKh1jdS5yVXlFX32lJwg36QI7b2.jpg',
    release_date: '1994-10-14',
    vote_average: 8.9,
    vote_count: 25628,
    popularity: 75.234,
    genre_ids: [80, 18, 53],
    runtime: 154,
    genres: [
      { id: 80, name: 'Crime' },
      { id: 18, name: 'Drama' },
      { id: 53, name: 'Thriller' },
    ],
  },
  {
    id: 5,
    title: 'The Shawshank Redemption',
    overview:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster_path: '/q6725aR8Zs4IwGMC89fbyduQiPf.jpg',
    backdrop_path: '/czJMF45axeQuvlEQQXbzot6I4d0.jpg',
    release_date: '1994-09-23',
    vote_average: 9.3,
    vote_count: 27199,
    popularity: 72.165,
    genre_ids: [18, 80],
    runtime: 142,
    genres: [
      { id: 18, name: 'Drama' },
      { id: 80, name: 'Crime' },
    ],
  },
  {
    id: 6,
    title: 'The Matrix',
    overview:
      'A computer programmer discovers that reality as he knows it is a simulated world created by machines.',
    poster_path: '/f89U3ADr1oiB1s9GkdPOSfyWK37.jpg',
    backdrop_path: '/n6bUvigpRFqSwmPp1PbtYVdQDKm.jpg',
    release_date: '1999-03-31',
    vote_average: 8.7,
    vote_count: 32841,
    popularity: 98.756,
    genre_ids: [28, 12, 878],
    runtime: 136,
    genres: [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 878, name: 'Science Fiction' },
    ],
  },
  {
    id: 7,
    title: 'Forrest Gump',
    overview:
      'The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man with an IQ of 75.',
    poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    backdrop_path: '/rAiEn1aPGnheFgr2i3pXJ9zcVdN.jpg',
    release_date: '1994-07-06',
    vote_average: 8.8,
    vote_count: 25827,
    popularity: 58.934,
    genre_ids: [35, 18],
    runtime: 142,
    genres: [
      { id: 35, name: 'Comedy' },
      { id: 18, name: 'Drama' },
    ],
  },
  {
    id: 8,
    title: 'Avatar',
    overview:
      'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    poster_path: '/jRXYj3MZSJ7acHP3I6i0h8V6Ett.jpg',
    backdrop_path: '/igvnXd3BPEzKNMXUL06T7sKf67H.jpg',
    release_date: '2009-12-18',
    vote_average: 7.8,
    vote_count: 33827,
    popularity: 102.345,
    genre_ids: [28, 12, 14, 878],
    runtime: 162,
    genres: [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 14, name: 'Fantasy' },
      { id: 878, name: 'Science Fiction' },
    ],
  },
  {
    id: 9,
    title: 'Gladiator',
    overview:
      'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
    poster_path: '/ewUqXnwiMHkSvp2X10GTLaxNjWl.jpg',
    backdrop_path: '/AjCRxxU8VjI8D4sNQlAz1K9yGIo.jpg',
    release_date: '2000-05-05',
    vote_average: 8.5,
    vote_count: 22343,
    popularity: 58.764,
    genre_ids: [28, 18, 37],
    runtime: 155,
    genres: [
      { id: 28, name: 'Action' },
      { id: 18, name: 'Drama' },
      { id: 37, name: 'Western' },
    ],
  },
  {
    id: 10,
    title: 'The Godfather',
    overview:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.',
    poster_path: '/3bhkrj58Vtu7enYsRolD1fmnbJ1.jpg',
    backdrop_path: '/hkBaDl7juozsbg7nXc7VnTZYRUc.jpg',
    release_date: '1972-03-14',
    vote_average: 9.2,
    vote_count: 19589,
    popularity: 72.987,
    genre_ids: [18, 80],
    runtime: 175,
    genres: [
      { id: 18, name: 'Drama' },
      { id: 80, name: 'Crime' },
    ],
  },
  {
    id: 11,
    title: 'Oppenheimer',
    overview:
      'The story of J. Robert Oppenheimer\'s role in the development of the atomic bomb during World War II.',
    poster_path: '/8Gxv8gSZDMT7VIQsQyvA5tLw1f1.jpg',
    backdrop_path: '/bU6B3MImøe1OnujLc3Ssnwm7Qlt.jpg',
    release_date: '2023-07-21',
    vote_average: 8.1,
    vote_count: 12543,
    popularity: 85.432,
    genre_ids: [18],
    runtime: 180,
    genres: [{ id: 18, name: 'Drama' }],
  },
  {
    id: 12,
    title: 'Dune: Part Two',
    overview:
      'Paul Atreides travels to the dangerous planet Arrakis to ensure the future of his family and people.',
    poster_path: '/czJMF45axeQuvlEQQXbzot6I4d0.jpg',
    backdrop_path: '/n6bUvigpRFqSwmPp1PbtYVdQDKm.jpg',
    release_date: '2024-02-28',
    vote_average: 8.3,
    vote_count: 9821,
    popularity: 95.234,
    genre_ids: [28, 12, 878],
    runtime: 166,
    genres: [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 878, name: 'Science Fiction' },
    ],
  },
];

export const TRENDING_MOVIES = MOCK_MOVIES.slice(0, 6).map((m) => ({
  ...m,
  popularity: Math.random() * 100 + 50,
})).sort((a, b) => b.popularity - a.popularity);

export const TOP_RATED_MOVIES = [...MOCK_MOVIES]
  .sort((a, b) => b.vote_average - a.vote_average)
  .slice(0, 6);

export const NOW_PLAYING_MOVIES = MOCK_MOVIES.slice(0, 8);
