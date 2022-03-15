# Teachables
This [student project](https://aa-group-project-teachables.herokuapp.com/) is a clone of [Instructables](https://www.instructables.com/), an app that allows users to post sets of instructions for building things. The project was made by [Ryan Bender](https://github.com/ryanbender34), [Jennifer Dijaili](https://github.com/jdijaili), [Yu Ra Kim](https://github.com/kim-yura), and [Nathaniel Tseng](https://github.com/ntseng) from February 7th 2022 to February 11th 2022.

Students were encouraged to plan during the week of January 31st 2022 to February 4th 2022, but were not given starting materials until the 4th.

## Local Viewing Instructions
1. Clone this repo
2. Create your PostgresQL database
3. Make a copy of `.env.example` and rename it to `.env`
4. Populate your `.env`
5. Run `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
6. Configure flask backend; from `/app` run the following:
   1. `pipenv shell`
   2. `flask db upgrade`
   3. `flask seed all`
7. Turn on the backend - `flask run`
8. Configure the react frontend; from `/react-app` run the following:
   1. `npm install`
9. Turn on the frontend - from `/react-app` run `npm start`
10. Go to `localhost:3000` in any browser

## Time Budget
Time Allotted: 160 person*hours

Completion of MVP: 183 person*hours (14.37% overtime)

## Links
- [Site Link](https://aa-group-project-teachables.herokuapp.com/)
- [Database Schema](https://github.com/jdijaili/w20-teachables-group-project/wiki/Database-Schema)
- [Wireframes](https://github.com/jdijaili/w20-teachables-group-project/wiki/Wireframes)
- [Feature List](https://github.com/jdijaili/w20-teachables-group-project/wiki/MVP-Feature-List)
