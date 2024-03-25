//Loads the express module
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const axios = require("axios");

// configure dotenv to use the env variables
dotenv.config();

// initialize the express app
const app = express();
// get port or add default port
const port = process.env.PORT || 3000;

// configure the views folder for rendering the views
app.set("views", path.join(__dirname, "views"));
// set up app to use EJS as template engine
app.set("view engine", "ejs");

// Serves static files (we need it to import a css file)
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// SET UP FOR EASIER FORM DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Render the home page
app.get("/", (_, res) => {
  res.render("./pages/index");
});

// if the url consist only movies
// redirect it to top_rated movies
app.get("/movies", (_, res) => {
  res.redirect("/movies/top_rated/1");
});

// render the list of movies based on category
// category can be either top_rated or popular
app.get("/movies/:movieCategory/:page", async (req, res) => {

  // because The total number of pages that the movies database is sending is large
  // I am limitting the total number of pages to 10 here
  const totalPages = 10;

  // get the type of movie list the user want and the current page number from query params
  const { movieCategory, page } = req.params;

  // get the list of all movies order by popularity
  const { formatedMoviesData: movies } = await getMovies(movieCategory, page);

  // render the movies list
  res.render("./pages/movieList", {
    paginationUrl: `/movies/${movieCategory}`,
    movies,
    totalPages,
    currentPage: Number(page),
    topRatedClassNane:
      movieCategory === "top_rated" ? "active_filter" : "filter",
    popularTabClassName:
      movieCategory === "popular" ? "active_filter" : "filter",
  });
});

// render the details of the movie
app.get("/movie/:movieId", async (req, res) => {
  const { movieId } = req.params;
  const movieApiUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const { data: movieData } = await axios.get(movieApiUrl, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.movie_db_token}`,
    },
  });
  let USDollar = new Intl.NumberFormat("en-US");
  const formatedMovieData = {
    id: movieData.id,
    title: movieData.title,
    description: movieData.overview,
    postarImage: movieData.poster_path,
    releaseDate: movieData.release_date,
    status: movieData.status,
    movieType: movieData.adult ? "Adult" : "Family",
    totalVotes: movieData.vote_count,
    voteAverage: Math.ceil(movieData.vote_average),
    budget: USDollar.format(movieData.budget),
    revenue: USDollar.format(movieData.revenue),
    genres: movieData.genres.map((genre) => genre.name),
    productionCountries: movieData.production_countries.map(
      (country) => country.name
    ),
    productionCompanies: movieData.production_companies.map(
      (company) => company.name
    ),
  };

  // get all related songs for movie name from spotify
  const tracks = await getAllTracks(movieData.title);
  res.render("./pages/movieDetails", { movieData: formatedMovieData, tracks });
});

app.listen(port, () =>
  console.log(`App listening to http://localhost:${port}`)
);

// get all movies based on the category and page number
async function getMovies(type, page) {
  // get the list of all movies order by popularity
  const movieApiUrl = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page}&region=CAN`;
  const { data: movieData } = await axios.get(movieApiUrl, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.movie_db_token}`,
    },
  });

  const formatedMoviesData = movieData.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    backDropImage: movie.backdrop_path,
    postarImage: movie.poster_path,
    releaseDate: movie.release_date,
    movieType: movie.adult ? "Adult" : "Family",
    totalVotes: movie.vote_count,
    voteAverage: Math.ceil(movie.vote_average),
  }));

  return { formatedMoviesData };
}

// get access token for spotify apis
async function getAccessToken() {
  const url = "https://accounts.spotify.com/api/token";
  const response = await fetch(url, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.spotify_client_id +
            ":" +
            process.env.spotify_client_secret
        ).toString("base64"),
    },
  });

  return await response.json();
}

// fetch all the related tracks for a particular movie
async function getAllTracks(search) {
  const { access_token } = await getAccessToken();
  const { data } = await axios.get(
    `https://api.spotify.com/v1/search?q=${search}&type=track`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const tracks = data.tracks.items.map((res) => ({
    id: res.id,
    name: res.name,
    popularity: res.popularity,
    totalTracks: res.album.total_tracks,
    releaseDate: res.album.release_date,
    image: res.album.images[0].url,
    audioUrl: res.preview_url,
  }));
  return tracks;
}
