/**
 * Function that collect inputs from add new movie form
 * @return {Array} shortFilmProperties, longFilmProperties, checkedGenres
 */
function collectUsersInput() {
		
	var shortFilmProperties = Array.prototype.map.call(document.querySelectorAll('input[type=text]'), prop => prop.value);
	
	var longFilmProperties= [].map.call(document.querySelectorAll('textarea'), propLong => propLong.value.split(',').map(item => item.trim()));
	
	var checkedGenres = [].filter.call(document.getElementsByName('genres[]'), (genre) => genre.checked).map(genre => genre.value);
	
	//Add new movie by calling Movie constructor
	addNewMovie(shortFilmProperties, checkedGenres, longFilmProperties);
};
/**
 * Function that add new movie in our database
 * First takes 3 paramiters av collected data fromform and call our constructor.
 * Here we call function that save new movie object to our movieDatabase array.
 *@param {Array} prop1, prop2, prop3 - arrays of collect data from our new movie form
 */
function addNewMovie(prop1, prop2, prop3){
	
	
	var newMovieObject = new objFilm(prop1,prop2,prop3);
	
	newMovieObject.rateFilm(prop1[3]);
	
	movieDB.saveNewMovie(newMovieObject);
}
/**
 * Function that give us movie details
 *@param {Integer} movieId
 */
function showMovieDeatals(movieId){
	
	//temporary saving movie id in Local Storage variabel for future using for rating //of chosed movie
	temporarySaveMovieId(movieId);
	
	var movieById = getMovieById(movieId);
	//Representing chosed movie in an modal
	renderMovieByIdModal(movieById);
	genresModule.initGenresModule(movieById);
	RateSingleton.getInstance();
}
/**
 * Function that take your rating and update movieDatabase in Local Storage
 @param {Integer} rating
 */
function rateMovie(rating){
	
	var givenRate = parseInt(rating);
	var movieDatabaseFromLocalStorage = movieDB.readDB();    
 	var movieId = parseInt(localStorage.getItem('tempMovieId'));
	
	//updating ratings array
	movieDatabaseFromLocalStorage[movieId-1].ratings.push(givenRate);
	console.log(movieDatabaseFromLocalStorage[movieId-1].ratings);
	//saving updated movieDatabaseti Local Storage
	movieDB.updateLocalStorage(movieDatabaseFromLocalStorage);
	
}
/**
 * Function that list all movies in our movie database
 */

function showAllMovies(){
	
	cleanCurrentChoiceFromLocalStorage();
	
	initMovieDatabase();
	
	temporarySaveCurrentChoice('showAllMovies')
	
	renderMovies(movieDB.readDB(),"firstRow",3);
	//console.log(localStorage.getItem('movies'));
	
}
/**
 * Function that list movies with highest averige rating
*/
function getTopRatedMovie(){
	
	cleanCurrentChoiceFromLocalStorage();
	
	initMovieDatabase();
	
	var movies = movieDB.readDB();
	
	var topRatedMovie = movies.sort(function(a, b){return getAverigeRating(b.ratings)-getAverigeRating(a.ratings)});
	
	temporarySaveCurrentChoice('getTopRatedMovie')
	
	renderMovies(topRatedMovie, 'firstRow', 3);
}

/**
 * Function that list movies with lowest averige rating
*/
function getWorstRatedMovie(){
	
	cleanCurrentChoiceFromLocalStorage();
	
	initMovieDatabase();
	
	var movies = movieDB.readDB();
	
	var worstRatedMovie = movies.sort(function(a, b){return getAverigeRating(a.ratings)-getAverigeRating(b.ratings)});
	
	temporarySaveCurrentChoice('getWorstRatedMovie')
	
	renderMovies(worstRatedMovie, 'firstRow', 3);
}
/**
 * Function that filter movies by year of production
*/
$('#moviesByYear > a.dropdown-item').click(function() {
    console.log( $(this).text() );
	filterMoviesByYear($(this).text());
});
/**
 * Function that filter movies by movie genre
*/
$('#movieByGenre > a.dropdown-item').click(function() {
  	//console.log( $(this).text() );
	filterMoviesByGenre($(this).text());
});