# Forecastly (weather app)

Assignment of Zoltan Radics (zoltan.radics@gmail.com)

You can try the final app deployed here: https://forecastly-46d2c.firebaseapp.com/

---

### Components

#### Frontend

The frontend is written in Javascript ES2015+, built with React + Redux. I haven't used Create React App and used the least amount of necessary dependencies, because this app is simple and it was very easy to configure a build process right exactly for the requirements of this project with Laravel Mix. The live demo is a production build (so files are processed) but I left composeWithDevTools enabled so you guys can inspect the Redux store easily with Redux DevTools.

#### Backend

The backend is written in Javascript ES2015+, built with ExpressJS. I created the backend from scratch, so I haven't used any scaffolding tool. I like those tools but they usually comes with complexity which was not needed now. Also kept the dependencies on the minimum.
