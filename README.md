# Forecastly (weather app)

Assignment of Zoltan Radics (zoltan.radics@gmail.com)

You can try the final app deployed here: https://forecastly-46d2c.firebaseapp.com/

---

### Components

#### Frontend

The frontend is written in Javascript ES2015+, built with React + Redux. I haven't used Create React App and used the least amount of necessary dependencies, because this app is simple and it was easy to configure a build process to meet the requirements of this project with Laravel Mix. The live demo is a production build (so files are post-processed) but I left composeWithDevTools enabled so you guys can inspect the Redux store easily with Redux DevTools.

#### Backend

The backend is written in Javascript ES2015+, built with ExpressJS. I created the backend from scratch, so I haven't used any scaffolding tool. I like those tools but they usually comes with complexity which was not needed for this case and also kept the dependencies on the minimum. The backend have been deployed to Firebase Cloud functions this is where the demo runs. The backend uses 3 external APIs:

- IpAPI to identify user's location by IP address
- DarkSky API to get weather data by location (this was recommended in the assignment description by you)
- OpenCage API to get location suggestions

##### Notes

- Frontend wasn't tested on IE, I think it would fail around IE11 as I am not sure if Axios HTTP library supports it
- I am sorry for my CSS! :) It's maybe not my greatest skill
- There is always space to improve so I am sure I could workout the assignment even more but I though the provided code will give you enough overview of my work
