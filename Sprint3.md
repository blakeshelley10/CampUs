## Frontend Work Completed:


## Backend Work Completed:


### Frontend Unit Test:


## Backend Unit Test:


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

## Video Link: [Sprint 3 - CampUs]()

## Github Link: [CampUs Github](https://github.com/blakeshelley10/CampUs)