/*---------------------MOVIE MODULE--------------------------------------*
/**
 *Implementing Module pattern
 *@return {Object} 
 */
var movieDB = (function (){
	
	/**
 	 *Function that use an XMLHttpRequest to get an json file från local computer with movie objects 
     *@return {Array} - return array of movie objects
     */
	function loadJSON(callback) {   

		var xobj = new XMLHttpRequest();
			xobj.overrideMimeType("application/json");
			xobj.open('GET', 'js/top-rated-movies-01.json', true); 
			xobj.onreadystatechange = function () {
			  if (xobj.readyState == 4 && xobj.status == "200") {
				// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
				callback(xobj.responseText);

			  }
		};
		xobj.send(null);  
 	};
	
	/**
 	 *Function that save our movie database to local storage for future use
     *@param {Array} movieDatabase - Array of movie objects
     */	
	function saveToLocalStorage(movieDatabase) {

		localStorage.setItem("movies", JSON.stringify(movieDatabase));
	}
	
	return {
		
		//Function that initialise our app by supplying our app with movie databse from local file
		getInit: function(){
			
			if(!localStorage.getItem('movies')) {
				
				loadJSON(function(response) {		
				
					var movieDatabase = [];

					// Parse JSON string into object
					movieDatabase = JSON.parse(response);				
					saveToLocalStorage(movieDatabase);
					return movieDatabase;
				});
			}; 

		},
		//Loading movie database array from local storage
		readDB: function () {
			
			var movieDatabaseFromLocalStorage = JSON.parse(localStorage.getItem("movies"));
			
			return movieDatabaseFromLocalStorage;
		
		},
		//Function that save an new movie to local stored movie database
		saveNewMovie: function (newMovie) {
			
			var newMovies = JSON.parse(localStorage.getItem("movies"));
			newMovies.push(newMovie);
			localStorage.setItem("movies", JSON.stringify(newMovies));
			//refreshing current document
			location.reload();
		},
		//Method that update movie database array stored in local //storage
		updateLocalStorage(updatedMovieDatabase){
			
			saveToLocalStorage(updatedMovieDatabase);
		}
		
	};
})();
/*-------------------------------------------------------------------*/
/*-----------------MOVIE CONSTRUCTOR--------------------------------*/
/**
 *Constructor function for our movie object
 *@param {Array} prop1, prop2, prp3 - arrays of collected data from our form
 */
var objFilm = function(prop1, prop2, prop3){
	var movieId = movieDB.readDB().length +1 ;
	this.id = movieId;
	this.title = prop1[0];
	this.year = prop1[1];
	this.runtime = prop1[2];
	this.ratings = [];
	this.genres = prop2;	
	this.actors = prop3[0];
	this.languages = prop3[1];
	this.country = prop3[2];
	this.storyline = prop1[4];
	this.posterurl = prop1[5];
	
	this.rateFilm = function(grade){
		this.ratings.push(grade);
	}

};
/*-------------------------------------------------------------------*/

/*-------------SINGLETON RATING MODULE ------------------------*/
/**
 * RateSingleton - namespace that store rating modules variables and methods 
 *@return {Function} getInstance - instance of ReateSingleton
 */
var RateSingleton = (function(){
	
	// We store reference to our Singleton into instance variable
	var instance;
	//Initialize our RateSingleton module
	function init(){
		//Function that collect given rate and save it
		function collectStarNumber(){
			
			var numberOfStars = document.getElementById('starScore').innerHTML;
			
			//saving given rate
			rateMovie(numberOfStars);
			
			//closing collapse
			$('.collapse').collapse('hide');
			var currentChoice = localStorage.getItem('currentChoice');
			
			
			console.log(currentChoice);
			$('#movieDetailsModal').on('hidden.bs.modal', function () {
				
				if(currentChoice === 'randomMovies'){
					
					window.location.reload(true);
					
				}else if(currentChoice === 'filterMoviesByGenre'){
					
					var currentGenre = localStorage.getItem('currentGenre');
					console.log(currentYear);
					filterMoviesByGenre(currentGenre);
					
				}else if(currentChoice === 'filterMoviesByYear'){
					var currentYear = localStorage.getItem('currentYear');
					
					filterMoviesByYear(currentYear);
				}else if(currentChoice === 'getWorstRatedMovie'){
					
					getWorstRatedMovie();
				}else if(currentChoice === 'getTopRatedMovie'){
					
					getTopRatedMovie();
				}else{
					
					showAllMovies();
				}
				
				
			})
			
	 
		}
		//Showing current rate on fired mouseover event
		function showCurrentRate(){
			
			var numberOfStars = document.getElementById('starScore');
			
			var rating = this.getAttribute('data-rating');
						
			document.getElementById("starScore").innerHTML = rating;
			
					
		}
			//add event listner to star elements
			var stars = document.querySelectorAll('.stars .star');

			for(var i = 0; i < stars.length; i++){

				stars[i].addEventListener('click', collectStarNumber);

				stars[i].addEventListener('mouseenter', showCurrentRate);

			}
		
		//return {};
	};
	
	return {
		//Public method that expose init()
		getInstance: function() {
			
			if (!instance) {
				instance = init();
			}
			
			return instance;
		}
	};
})();
/*------------------------------------------------------*/

/*----------------GENRES MODULE---------------------------*/
/**
 *Our Genres Module which show current movie genres and update movie *genres with changes
 *@return {Object}
 */
var genresModule = (function(){
	
	var checkboxes = document.getElementsByName('uppdateGenres[]')
	var n = checkboxes.length;
		
	
	return {
		//populating genres checkboxes with movies genres
		initGenresModule: function(movie){
			
			var m = movie[0].genres.length;
			
			for(var j = 0; j<m; j++){
				for(var i=0;i<n;i++) {
					
					if(checkboxes[i].value === movie[0].genres[j]){
						
						checkboxes[i].checked = true;
					}
				}
				
			}
	
		},
		//Function that update changes made on genres
		updateGenres: function(){
			
			var addedGenres = [].filter.call(checkboxes, (genre) => genre.checked).map(genre => genre.value);


			var movieDatabaseFromLocalStorage = movieDB.readDB();    
			var movieId = parseInt(localStorage.getItem('tempMovieId'));

			//updating genres array
			 var updatedGenres = movieDatabaseFromLocalStorage[movieId-1].genres.concat(addedGenres).filter((elem, index, arr)=>arr.indexOf(elem) === index);

			//replacing old genres array with updated genres array
			movieDatabaseFromLocalStorage[movieId-1].genres = updatedGenres;


			console.log(movieDatabaseFromLocalStorage[movieId-1].genres);

			//saving updated movieDatabaseti Local Storage
			movieDB.updateLocalStorage(movieDatabaseFromLocalStorage);
			
			//closing collapse
			$('.collapse').collapse('hide');
	
		}
	}
})();

/*--------------------------------------------------------*/
/**
 * Function that temporary save current chioce to filter movies in Local Storage
 *@param {String} vurrentChoice
*/
function temporarySaveCurrentChoice(currentChoice){
		
	localStorage.setItem('currentChoice', currentChoice);
	
}
function temporarySaveCurrentGenre(currentGenre){
		
	localStorage.setItem('currentGenre', currentGenre);
	
}
function temporarySaveCurrentYear(currentYear){
		
	localStorage.setItem('currentYear', currentYear);
	
}
/**
 * Function that remove temporay currentChoice from Local Storage 
 * and refresh index page
*/
function cleanCurrentChoiceFromLocalStorage(){
	
	//removinig local stored temporary movie id
	localStorage.removeItem('currentChoice');
	localStorage.removeItem('currentGenre');
	localStorage.removeItem('currentYear');
	
}
/**
 * Function that return by id chosed movie object
 *@param {Integer} movieId
 *@return {Object} movieByID - chosed movie object
 */
function getMovieById(movieId){
		
	var movieByID = movieDB.readDB();
	return movieByID.filter((mov) => mov.id === movieId);
	
}
/**
 * Function that temporary save movieId in Local Storage
 *@param {Integer} movieId
*/
function temporarySaveMovieId(movieId){
		
	localStorage.setItem('tempMovieId', movieId);
	
}
/**
 * Function that remove temporay movieId from Local Storage 
 * and refresh index page
*/
function cleanLocalStorage(){
	
	//removinig local stored temporary movie id
	localStorage.removeItem('tempMovieId');
	
	//refreshing current document
	//location.reload();
}
/**
 * Function that give us averige rating
 *@param {Array} ratingsArray
*/
function getAverigeRating(ratingsArray){
	let averigeRating = 0;
	let ratingSum = 0;
	for(var i = 0; i < ratingsArray.length; i++){
		ratingSum += ratingsArray[i];
	}
	var wholeAverigeRating = ratingSum/ratingsArray.length;
	return averigeRating = wholeAverigeRating.toFixed(1);
}
/**
 * Function that list movies according chosed production year
 *@param {Integer} year
 */
function filterMoviesByYear(year){
	
	initMovieDatabase();
	
	cleanCurrentChoiceFromLocalStorage();	
	
	temporarySaveCurrentChoice('filterMoviesByYear');
	
	temporarySaveCurrentYear(year);
	
	var movies = movieDB.readDB();
	
	var moviesByYear = movies.filter((mov) => mov.year === year);
	
	renderMovies(moviesByYear, 'firstRow', 3);
	
	
}
/**
 * Function that list movies according chosed genre
 *@param {String} genre
 */
function filterMoviesByGenre(genre){
	
	initMovieDatabase();
	
	cleanCurrentChoiceFromLocalStorage();
		
	temporarySaveCurrentChoice('filterMoviesByGenre');
	temporarySaveCurrentGenre(genre);
	
	var movies = movieDB.readDB();
	
	var moviesByGenre = movies.filter(function(mov){
		
		var foundGenre = mov.genres.filter((gen)=>gen === genre);
		
		if(foundGenre.length > 0){
			return true;
		}else{
			return false;
		}
	});
		
		
	renderMovies(moviesByGenre, 'firstRow', 3);
	
}