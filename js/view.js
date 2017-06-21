/**
 * Functtion that clear DOM from previosly chosed option
 */
function initMovieDatabase(){
	if(document.getElementById('firstRow')){
		var movieContainer = document.getElementById('movieContainer');
		var firstRow = document.getElementById('firstRow');
		//movieContainer.removeChild(firstRow);
		firstRow.innerHTML = "";
	}

}
function showAddNewMovieForm(){
	$('#newMovieForm').show();
}
/**
 * Function that render movies to stage deppending on send criteria
*/
/*function renderMovies(objToRender){	
	
	
	
	var row = document.createElement('div');
	row.setAttribute('class', 'row');
	row.setAttribute('id', 'firstRow');

for(var i = 0; i < objToRender.length; i++){


	var cardHolder = document.createElement("div");
	cardHolder.setAttribute("class", "col-xs-12 col-sm-4 col-md-3 card mb-5 ml-5");

	var posterImg = document.createElement("img");
	var cardBlock = document.createElement("div");
	var movieTitel = document.createElement("h4");
	var textNodeH4 = document.createTextNode(objToRender[i].title);
	var movieStoryline = document.createElement("p");
	var cardFooter = document.createElement("div");
	var textNodeP = document.createTextNode(objToRender[i].storyline);
	var readMore = document.createElement("small");
	var textNodeReadMore = document.createTextNode("Read more");
	var movieYear = document.createElement("p");
	var textNodeYear = document.createTextNode(objToRender[i].year);
	var starIcon = document.createElement("p");
	var textNodeRaiting = document.createTextNode(getAverigeRating(objToRender[i].ratings));
	var holderYearRaitings = document.createElement("div");


	movieTitel.appendChild(textNodeH4);
	movieStoryline.appendChild(textNodeP);
	readMore.appendChild(textNodeReadMore);
	movieYear.appendChild(textNodeYear);
	starIcon.appendChild(textNodeRaiting);

	cardBlock.setAttribute("class", "card-block");
	movieTitel.setAttribute("class", "card-title");
	movieStoryline.setAttribute("id", "storyline");
	movieStoryline.setAttribute("class", "card-text overflow-ellipsis");
	cardFooter.setAttribute("class", "card-footer");
	posterImg.setAttribute("src", objToRender[i].posterurl);
	posterImg.setAttribute('class', 'img-fluid card-img-top img-movie');
	readMore.setAttribute("class", "text-muted");
	readMore.setAttribute("data-movieid", objToRender[i].id)
	movieYear.setAttribute("class", "card-text");
	movieYear.setAttribute("dir", "rtl");
	starIcon.setAttribute("class", "fa fa-star");
	holderYearRaitings.setAttribute("class", "card-block");
	
	let movieId = objToRender[i].id
	cardFooter.addEventListener( "click", function () {
		showMovieDeatals(movieId);
		
	});

	row.appendChild(cardHolder);
	cardHolder.appendChild(posterImg);
	cardHolder.appendChild(cardBlock);	
	cardBlock.appendChild(movieTitel);
	cardBlock.appendChild(movieStoryline);
	cardHolder.appendChild(cardFooter);
	//cardBlock.appendChild(starIcon);
	holderYearRaitings.appendChild(starIcon);
	holderYearRaitings.appendChild(movieYear);
	cardBlock.appendChild(holderYearRaitings);
	cardFooter.appendChild(readMore);

	document.getElementById("movieContainer").appendChild(row);
	}
			
}*/
/**
 * Function that give us movie details
 * Supplie our modal with movie data
 *@param {Object} - movieById
*/
function renderMovieByIdModal(movieById){
	
	var movieModal = $('#movieDetailsModal');
	
	movieModal.find('#movieImage').attr('src', movieById[0].posterurl);
	
	movieModal.find('.card-title').text(`${movieById[0].title}(${movieById[0].year})`);
	
	movieModal.find('#duration').text(`${movieById[0].duration} - ${movieById[0].genres.map((gen)=> (` ${gen} `))}`);
	
	movieModal.find('#score').text(`Score: ${(movieById[0].ratings.reduce((a,b)=> a+b)/movieById[0].ratings.length).toFixed(1)}/10 (${movieById[0].ratings.length} reviews)`);
	
	movieModal.find('#story').text(movieById[0].storyline);
	movieModal.modal('show');
	
}
/**
 * Function that render index page with random movies
*/
function renderMovies(objToRender, section, numberOfMovisInRow){
	
	var beerHolder = document.getElementById(section);
	
	for(var i = 0; i<objToRender.length; i++){
		
			beerHolder.innerHTML += `<div class="movie-holder col-xs-12 col-sm-6 col-md-${numberOfMovisInRow}">
 			<div class="img-holder">
 				<img class="img-fluid img-movie" src="${objToRender[i].posterurl}" alt="movie-poster">
 			</div>
 			<div class="content-holder">
 				<h1>${objToRender[i].title}</h1>
 				<h2><i class="fa fa-star" aria-hidden="true"></i>${getAverigeRating(objToRender[i].ratings)} - ${objToRender[i].year}</h2>
 				<p id="storyline" class="overflow-ellipsis">${objToRender[i].storyline}</p>
 			</div>
 			<div class="footer">
 				<h5 onclick=showMovieDeatals(${objToRender[i].id})>READ MORE</h5>
 			</div>
 		</div>`;
		
	}
	
}