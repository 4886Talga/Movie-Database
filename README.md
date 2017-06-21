# Movie Database
***

###### **Samir Talic, JavaScript2, Fend 16 @Nackademin** ######

##### Schoolproject in JavaScript2,  [Design Patterns Assignment - Movie Database](https://github.com/FEND16/javascript2/blob/master/assignment_design_pattern.md)

 ##### My site is published at:<https://4886talga.github.io/Movie-Database/index.html>
 
 ##### GitHub Repo: <https://github.com/4886Talga/Movie-Database>
 
 
 **App description**
 ***
 
 We should create an application in JavaScript which is a movie database.
 We should create data structures and functions to manage a local "database" with movies. All movies are store in an JSON file.
 
 
 **Functionality**
 ***
 
 ##### **User allows**
 
 + Add new movie
 + Add rating to movies
 + Add/delete genres
 + Fillter movies by
   + all movies
   + top rated movies(ratings)
   + worst rated movies(ratings)
   + year
   + genres
   
  
 **Workflow**
 ***
 
 My plan was to organize this project according to MVC pattern, where in model I put my modules that take care of the logic that is behind the functionality. Controller is used as listener and responds to user requests. In View, I have functionality that manipulates DOM.
 
 Then in the Movie and Genres module I have used Module Pattern and in my Rating module I use the Singleton Pattern. Throughout the project, I tried to program according to Functional Programming, where I built my functions to take care of an task only and that they did not contaminate global space.
 
 In addition to being tested with different JavaScript Patterns, I've learned a lot about how to handle saving of changes (add a new movie, ratings, etc.). I have chosen to solve that problem using the LocalStorage variable.
  
 In the project I have tested programming with ES6.
 The project was very instructive and I greatly expanded my knowledge of JS.
 

**TODO**
***

Add AJAX call with uppdating of genres and ratings to get asynchronous update of moviemodal.
 
 
 
 
 

