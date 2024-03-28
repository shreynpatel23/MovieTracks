# MovieTracks

MovieTracks is an Express project that utilizes the free movie database API provided by TMDB to list all the top-rated and popular movies. Additionally, it provides details for each movie and a curated list of related albums from Spotify. With MovieTracks, users can explore their favorite movies and discover music inspired by them, creating a unique multimedia experience.

## Introduction

MovieTracks is a web application that combines the love for movies with the passion for music. By integrating movie data from TMDB and music data from Spotify, users can immerse themselves in a comprehensive entertainment experience. Whether you're a movie buff or a music aficionado, MovieTracks offers something exciting for everyone.

## Steps to Run the Project

To run MovieTracks locally on your machine, follow these steps:

1. **Clone the Repository:**
- git clone https://github.com/shreynpatel23/MovieTracks.git
2. **Install Dependencies:**
- cd MovieTracks
- npm install
3. **Set up Environment Variables:**
- Create a `.env` file in the root directory of the project and add the following environment variables:
- PORT=your_port
- movie_db_token=your_tmdb_api_key
- spotify_client_id=your_spotify_client_id
- spotify_client_secret=your_spotify_client_secret

  
Replace `your_tmdb_api_key`, `your_spotify_client_id`, and `your_spotify_client_secret` with your actual API keys obtained from TMDB and Spotify Developer Dashboard.

4. **Start the Server:**
Once the dependencies are installed and environment variables are set, start the server using the following command:
npm start

5. **Access the Application:**
Once the server is up and running, open your web browser and go to `http://localhost:${PORT}` to access MovieTracks.

## Contributing

Contributions to MovieTracks are welcome! If you have any suggestions, feature requests, or bug reports, feel free to open an issue or submit a pull request on GitHub.

## Acknowledgments

- TMDB for providing the free movie database API.
- Spotify for providing access to their music data through the Spotify API.


