## Frontend Work Completed:
- Added profile page. Allows users to observe their own account details and change their personal account information such as profile pictures, bio, and observe previous posts. Users are additionally able to  upload a custom profile picture via file upload.
- Added search page. Allows users to search the database of current posts with keywords. Displays all events that had relation to the users searched keyword.
- Updated navigation bar on login and register pages. Added profile picture instead of a user icon next to the profile portion of the navigation bar.
- Create post takes in user input to create an event post. It would allow users to insert a valid time and date as well as an image file and would.
- Allowed users to upload an image from their device. This image would be sent to the backend in a seperate post request which would create an individual folder with the image, then add the image path to the associated event.
- Created tools folder for creating individual post components. Then on initializing the home page, a function will iterate through each event in the data base and create a post component for each event to display in the front end. Events without an image would display a default image while events with an image displayed the specific image that was uploaded.
- Save button allowed users to save a specific event for later viewing.
## Backend Work Completed:
- Added a CreateUserEvent route which allows users to create an event and store their event id under their account. 
- Added a GetAllUserEvents route which allows the frontend to get all event structs created by a certain user.
- Added a SaveEvents route which allows users to save other user created events in order to look back at them later.
- Added a GetAllUserSavedEvents route which allows the frontend to get all event stucts saved by a certain user.
- Added an UploadUserEventPicture route which allows a user to upload a picture that will be saved with the event they create.
- Added a GetUserEventPicture route which allows the frontend to have access to the event's picture path in order to display it on the website.
- Added new backend tests for user-created and user-saved events. These tests go along with the simpler CRUD operation tests to allow us to test our back end functionality as we develop new backend routes. 
- Fixed a backend testing bug from sprint 2 which didn't properly test functions that used mux variables. We used the "SetURLVars" function present in the github.com/gorilla/mux api to directly inject mux variables into the test http request, fixing the bug.

## Frontend Unit Tests Added:
- Test to observe if the Profile component is created and functions correctly on initialization.
- Test to observe if the Search component is created and functions correctly on initialization.
## Backend Unit Tests Added :
### Mux Varibles Injection Tests (Bug Fix)
- Updated the get, update, and delete CRUD operations for both the user and event objects. Previously, since these routes utilize mux, we were not able to test them properly as the routes could not access the mux varibles present in a typical URL. However, because of the "SetURLVars" function from the github.com/gorilla/mux api, we are able to directly inject mux variables into the http request This allows us to simulate a typical URL and http request without having to use normal mux routing. 

### User Created and User Saved Tests
- Since the CreateUserEvent route and SaveEvents route are more useful for the frontend than the basic CRUD routes, it's important to have testing routes to test them alongside the other routes. These new tests make use of test events already created through CRUD routes but further test the backend functionality by sending usernames and event names as mux variables and searching the database for both users and events.

## Backend API Documentation:
### User CRUD Routes
- Integrated a GetAllUsers function which receives a GET request. This function allows the backend team to receive all the users who have created an account in our website. The function creates an empty User struct and then uses the "Find" GORM function to find all structs in the database containing the same format as User. It then responds with JSON data with a 200 status code.
- Integrated a GetUser function which receives a GET request. This function allows the backend team to receive a specific user who has created an account in our website. The function uses the "mux.Vars(r)" function to extract the variables from the incoming request's URL. The variables are returned as a map where the keys are the variable names defined in the URL path and the values are the actual values specified in the request. The function then finds the value containing the key similar to the username passed in the URL and uses the "findUser" function to find that user in the database. If successful, the function responds with a status code 200 and the user's data. If not, it returns nothing. 
- Integrated a CreateUser function which receives a POST request. This function allows the backend team to create new users and store them in the database. The function creates a new empty User struct, decodes the information received as an http.Request, and stores this information in the new empty User struct. It then hashes the password in the database and saves the entire struct inside the database. Finally, it returns a 201 status code if successful.
- Integrated an UpdateUser function which receives a POST request. This function allows the backend to update a user already stored in the database. The function uses the "mux.Vars(r)" function to extract the variables from the incoming request's URL. The variables are returned as a map where the keys are the variable names defined in the URL path and the values are the actual values specified in the request. The function then finds the value containing the key similar to the username passed in the URL and uses the "findUser" function to find that user in the database. Once found, the function will then decode the information sent through the http.Request and replace the data in the old struct with the data that it decoded. It then saves that updated struct and returns a 201 status code.
- Integrated a DeleteUser function which receives a POST request. This function allows the backend to delete a user already stored in the database. This function allows the backend to update a user already stored in the database. The function uses the "mux.Vars(r)" function to extract the variables from the incoming request's URL. The variables are returned as a map where the keys are the variable names defined in the URL path and the values are the actual values specified in the request. The function then finds the value containing the key similar to the username passed in the URL and uses the "findUser" function to find that user in the database. Once found, it uses the "Delete" function to remove that struct from the database and returns a 200 status code.
- Integrated a findUser function used by the backend team to find a user in the other functions listed above and below this document. The function creates an empty User Struct and uses the "Find" function to locate a user in the database through their username. It then stores that user's information in the newly created User struct and returns a reference to that struct which other functions will utilize.

### User Authentication Routes
- Integrated a RegisterUser function which receives a POST request. This function allows users to create an account on our website using their first name, last name, email, username, and password. The function is similar to the function CreateUser, except after hashing the password, the function checks whether this username already exists in the database through the "Where" function. If the username has already been taken by another user, the website will prompt the user to try registering again with a different username. After the user successfully registers their account, the backend will store this information in a User struct inside the website's database.   
- Integrated a LogIn function which receives a POST request. This function allows users to login to their account that they previously signed up with. The function is similar to the function CreateUser, except after hashing the password, the function checks whether this username already exists in the database through the "Where" function. When the user logs in, if their username or password is incorrect, or if it does not even exist in the database, the website will tell the user that one of the fields (username or passoword) is incorrect and prompt the user to try logging in again.

### Event CRUD Routes
- Integrated a GetAllEvents function which receives a GET request. This function allows the backend team to receive all the users who have created an account in our website. The function creates an empty User struct and then uses the "Find" GORM function to find all structs in the database containing the same format as User. It then responds with JSON data with a 200 status code.
- Integrated a GetEvent function which receives a GET request. This function allows the backend team to receive a specific user who has created an account in our website. The function uses the "mux.Vars(r)" function to extract the variables from the incoming request's URL. The variables are returned as a map where the keys are the variable names defined in the URL path and the values are the actual values specified in the request. The function then finds the value containing the key similar to the event name passed in the URL and uses the "findEvent" function to find that user in the database. If successful, the function responds with a status code 200 and the user's data. If not, it returns nothing. 
- Integrated a CreateEvent function which receives a POST request. This function allows the backend team to create new events and store them in the database. The function creates a new empty Event struct, decodes the information received as an http.Request, and stores this information in the new empty Event struct.
- Integrated an UpdateEvent function which receives a POST request. This function allows the backend to update an event already stored in the database. The function uses the "mux.Vars(r)" function to extract the variables from the incoming request's URL. The variables are returned as a map where the keys are the variable names defined in the URL path and the values are the actual values specified in the request. The function then finds the value containing the key similar to the name passed in the URL and uses the "findEvent" function to find that user in the database. Once found, the function will then decode the information sent through the http.Request and replace the data in the old struct with the data that it decoded. It then saves that updated struct and returns a 201 status code.
- Integrated a DeleteEvent function which receives a POST request. This function allows the backend to delete a user already stored in the database. This function allows the backend to update a user already stored in the database. The function uses the "mux.Vars(r)" function to extract the variables from the incoming request's URL. The variables are returned as a map where the keys are the variable names defined in the URL path and the values are the actual values specified in the request. The function then finds the value containing the key similar to the username passed in the URL and uses the "findUser" function to find that user in the database. Once found, it uses the "Delete" function to remove that struct from the database and returns a 200 status code.
- Integrated a findEvent function used by the backend team to find an event in the other functions listed above and below this document. The function creates an empty Event Struct and uses the "Find" function to locate an event in the database by its name. It then stores that event's information in the newly created Event struct and returns a reference to that struct which other functions will utilize.
- Integrated a SearchEvent function that can be used to find other events similar to a target event. The function takes in an event struct and uses that struct to build a gorm "where" clause based off of that event's characteristics. It then uses that where clause and the gorm "Find" function to search the database for events that are similar to the target event. It then returns a 200 statusOK and an array of similar events in a JSON package.
- Integrated a CreateUserEvent function which receives a POST request. This function is used to allow a user to create their event on the website and store it in the database. Unlike the CreateEvent function, the CreateUserEvent function not only saves the event in the database, but also saves the event id in a string array under the user's username in the database. This is to allow the user to be able to see all the events they have created so that they can update or delete them later on. The function creates a new empty Event struct, decodes the information received as an http.Request, and stores this information in the new empty Event struct. It also reads in the username from the receiving url and uses it in order to save the new events id under that struct.
- Integrated a GetAllUserEvents function which receives a GET request. This functions allows the frontend to get all the events saved by the user in order to properly display it to the user themselves. It uses mux.Vars(r) to read the username from the url, creates a event struct slice, for loops into the string array saving all the event ids, and then appends them to the event struct slice, which is then sent to the frontend to use.
- Integrated a SaveEvents function which receives a POST request. This function allows the user to save events on the website which they would like to refer back to later on, similar to popular social media platforms like Instagram, Tik Tok, Facebook, etc. The function uses mux.Vars(r) to read in the username of the person saving the event and the event id of the event being saved. It then appends the eventid to the element in the struct (string array) and updates the user struct. 
- Integrated a GetAllUserSavedEvents function which receives a POST request. This function sends the frontend all the saved events saved by the user in order to display it to the user themselves. The function uses mux.Vars(r) to read the username of the user in order to find them in the database, creates an events struct slice, for loops in the element storing the saved event ids, appends them to the event struct slice, and returnes the slice to the frontend.

### File Upload Routes 
- Integrated an UploadFile function which will be used to allow users to upload a file while signed into their account. The backend parses a multipart form data and saves it inside a folder called "uploaded-file" under the filename by using the os.Create and the io.Copy functions.
- Integrated an UploadUserPFP function which will be used to specifically allow users to upload their profile pictures under their account. It is similar to the UploadFile function, however, it has a few more steps. Firstly, it will extract the user's username from the receiving url and use this to store their profile picture under a folder named after that. After parsing the multipart data form, the function will save it under the path "./user-profile-images/username/handler.Filename", where the username is the user's actual username and the handler.Filename is the name of the profile picture that was uploaded by that user. In addition to using the os.Create and io.Copy functions to save the image, it will also use the os.MkdirAll function to actually create a subfolder titled the user's username.
- Integrated an UploadUserEventPicture which receives a POST request. This function allows users to save a picture of the event they are creating in order for it to be more visually appealing to other users. The function is an exact replica to the UploadUserPFP function mentioned above except for the fact that it saves the image under the path "./event-profile-images/eventid/handler.Filename", where the eventid is the event's identification and the handler.Filename is the name of the profile picture that was uploaded by that user. In addition to using the os.Create and io.Copy functions to save the image, it will also use the os.MkdirAll function to actually create a subfolder titled the user's username.
- Integrated a GetUserEventPicture which receives a GET request. This function sends the frontend the path in which an events picture is located in order for it to be displayed on the website. The function uses mux.Vars(r) to read the event id from the URL and uses it to find the event in the database. It then locates the element storing the path in the struct and sends that path to the frontend.

### Password Helper Functions
- Used the crypto/bcrypt GoLang library in order to hash passwords entered by the user. Two functions were created called HashPassword and CheckPasswordHash which hashes the user's password when registering for an account and checks if the user's password is correct when loging in, respectively. The first function uses the bcrypt.GenerateFromPassword to hash the password and the second function uses the bcrypt.CompareHashAndPassword to check if the inputted password is correct.
- Created a function called "Password" which is used when registering a user in order to check for password entropy. It checks if the password has an upper case letter, lower case letter, number, symbol, and is greater than eight letters.

## Video Link: [Sprint 4 - CampUs](https://youtu.be/Q9zL3a3XOUE)

## Github Link: [CampUs Github](https://github.com/blakeshelley10/CampUs)