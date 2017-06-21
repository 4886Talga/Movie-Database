/**
 *Function that initialize our app by loading json file with movie objects
 */
movieDB.getInit();

/**
 * Function that list random movies 
 */
(function(){
	
	cleanCurrentChoiceFromLocalStorage();
	
	
	temporarySaveCurrentChoice('randomMovies');
	
	let numberOfRandomMovies = 3;
	let numberOfMoviesInRow = 5
	let randomMovies = [];
	
	let movies = movieDB.readDB();
	
	for(var i = 0; i<numberOfRandomMovies; i++){
		
		randomMovies.push(movies[rmdGenerator()-1]);
				
	}
		renderMovies(randomMovies, 'firstRow', numberOfMoviesInRow - 1);
})();


/**
 * Random generator
 */

function rmdGenerator() {	
		
		return (Math.floor((Math.random() * 122) + 1));

}