# Accept a payment examples in React Native for Payment Element

## How to run locally

This is the React Native client for the sample and runs independently of the server.
Running a backend server is a requirement and a dependency for this React Native front-end to work. See the README in the root of the project for more details.

Collect your publishable key and secrect key from Hyperswitch Dashboard and update in .env file present in root folder of the app 

To run the client locally:

Install dependencies

From this directory run:

```sh
npm install
```

Start the backend server

```sh
npm run start-server
```

Start the metro server

```sh
npm start
```

build and install the application

for android:
```sh
npx react-native run-android
```

for ios:
```sh
cd ios && pod install 
npx react-native run-ios

```

