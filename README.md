# myfitness
A fitness app that I built to track my daily food intake and workouts



After debating for a while what my first big fullstack PERN project, I decided to build a fitness and food tracker that I could actually use to track my workouts and my calorier/protein intake. The basis of the app is that a user can log in and enter their food and workout for the day. The app uses react-calender so and each workout log / food log has an assocatiated date corresponding with it, so a user can either enter workouts or food for today or go back in the calender and enter data from previous days. The app as I mentioned uses PSQL as the database to store everything. Even though I have worked with PSQL on web apps before this was a good project as I had to dig deeper enter PSQL syntax and commands, but also database structure and join/linking different databases. Most of other smaller PSQL projects I did had very simple SELECT and DELETE commands, however in this project I had to implement JOINS, UNIONS and more complex searches. The app also has a user authentication aspect to it. For that process I decided to use JWT (jsonwebtoken), which was my first time implementing it in a project. Introducing user authentication made it slightly more difficult for database storing and retreiving but it was good practice. On top of that the app also uses react-toastiy, axios, cors and react-router. 

![Screen Shot 2021-06-14 at 12 28 50 PM](https://user-images.githubusercontent.com/66892358/121950804-f3e46580-cd0e-11eb-9115-e39788c68e00.png)

![Screen Shot 2021-06-14 at 12 32 53 PM](https://user-images.githubusercontent.com/66892358/121950827-fa72dd00-cd0e-11eb-808d-2de261035e1d.png)

