<h1 align="center"> :car: ParkN'Go :motorcycle:</h1>


ParkN'Go is a mobile application designed to help drivers find parking spaces effortlessly. Using real-time data from APIs, ParkN'Go provides the latest updates on available car park lots. ParkN'Go provides features such as colour-coded car park location pins on the map, detailed car park information, nearby places around the car park and navigation to desired car park location.


<h2 align = "center"> Table Of Contents </h2>

- [Prerequisites](#prerequisites) <br/>
- [Setup](#setup) <br/>
- [Key Features](#key-features) <br/>
- [Tech Stack](#tech-stack) <br/>
- [Contributors](#contributors) <br/>

<h2 align="center" id = "prerequisites"> :axe:	Prerequisites</h2>

> The app works on all device types, but is optimised for IOS and IpadOS

#### Internet Connectivity Required
#### Location Required
> Prerequsite software
* NodeJS (v18+)
  + Download from https://nodejs.org/en/
* Expo CLI
  + To install the EXPO CLI, once NodeJS has been installed, run the command `npm install expo`. 
* Expo GO mobile app
  + Install from play store or app store 

    
> Prerequsite API Keys Required
* Google API Key

<h2 align="center" id = "setup"> :hammer_and_wrench:	Setup</h2>

>Setup

* Create a file name `.env` in the root folder of the project and copy the contents of the `.env.example` file into it, this will hold your secret API Key and IP address.
* Paste your private Google API key and local IP address into the `.env` where indicated.
* Open a terminal in the root folder, and run the command `npm install` to install all the dependencies.
* Ensure the backend server is set up and running successfully.
* Run the frontend using the command `npm start`
  + For Android - Scan the generated QR code with the Expo GO app.
  + For IOS/IpadOS - Scan the generated QR code with the camera app.

<h2 align="center" id = "key-features"> :old_key:	Key Features</h2>

- **Car Park List and Map:** Users can view nearby car parks around their location and can favourite car parks using the heart icon. Users can also move the map around to update car park list. <br/><br/>
<div align="center">
  <img src="https://github.com/syed0059/SC2006-SWE-Frontend/blob/a2e9c6d444d438705fa63d0257d458bb4b241367/assets/screenshots/AvailableCarparkList.PNG" width="300">
</div>

- **Car Park Information:** Users can view car park information after clicking on a car park on the list. <br/><br/>
<div align="center">
  <img src="https://github.com/syed0059/SC2006-SWE-Frontend/blob/a2e9c6d444d438705fa63d0257d458bb4b241367/assets/screenshots/CarparkInformation.PNG" width="300">
</div>
<div align="center">
  <img src="https://github.com/syed0059/SC2006-SWE-Frontend/blob/a2e9c6d444d438705fa63d0257d458bb4b241367/assets/screenshots/Trends.PNG" width="300">
</div>

- **Navigation:** ParkN'Go provides a navigation route to the desired car park location. <br/><br/>
<div align="center">
  <img src="https://github.com/syed0059/SC2006-SWE-Frontend/blob/a2e9c6d444d438705fa63d0257d458bb4b241367/assets/screenshots/Navigation.PNG" width="300">
</div>

- **Price Calculator:** ParkN'Go provides a parking fee calculator that uses arrival and departure times. It also factors in the time of day and what it currently is. <br/><br/>
<div align="center">
  <img src="https://github.com/syed0059/SC2006-SWE-Frontend/blob/a2e9c6d444d438705fa63d0257d458bb4b241367/assets/screenshots/CarparkPriceCalculator.PNG" width="300">
</div>

- **Favourite List:** Users can view their favourite car parks, and the map will only show pins of their favourite car parks. <br/><br/>
<div align="center">
  <img src="https://github.com/syed0059/SC2006-SWE-Frontend/blob/a2e9c6d444d438705fa63d0257d458bb4b241367/assets/screenshots/FavoritedCarparks.PNG" width="300">
</div>

- **Notification System:** Users can click on the bell icon, and there will be a notification alert whenever the car park availability status has changed. <br/><br/>
<div align="center">
  <img src="https://github.com/syed0059/SC2006-SWE-Frontend/blob/a2e9c6d444d438705fa63d0257d458bb4b241367/assets/screenshots/CarparkNotification.PNG" width="300">
</div>

- **Search by Location:** Users can search for locations in Singapore, and the map will take them to that location and car park list would be updated. <br/><br/>
<div align="center">
  <img src="https://github.com/syed0059/SC2006-SWE-Frontend/blob/a2e9c6d444d438705fa63d0257d458bb4b241367/assets/screenshots/SearchedCarparkList.PNG" width="300">
</div>

- **Settings:** Users edit the search radius for nearby car parks in the settings. It scales from 1km to 3km. <br/><br/>
<div align="center">
  <img src="https://github.com/syed0059/SC2006-SWE-Frontend/blob/a2e9c6d444d438705fa63d0257d458bb4b241367/assets/screenshots/Settings.PNG" width="300">
</div>

<h2 align="center" id = "tech-stack"> 🛠 Tech Stack:</h2>

<div align="center">
  <h3>Frontend</h3>
  <p>
    <a href="https://skillicons.dev">
      <img src="https://skillicons.dev/icons?i=react,nodejs" height=150 width=150/>
    </a>
  </p>
  <h3>Backend</h3>
  <p>
    <a href="https://skillicons.dev">
      <img src="https://skillicons.dev/icons?i=express,docker,mongodb" height=250 width=250 />
    </a>
  </p>
  <br />
</div>

<h2 align="center" id = "contributors"> :family_man_man_boy_boy: Contributors:</h2>

<div align="center">
    <table>
        <tbody>
            <tr>
                <th>Profile</th>
                <td><a href='https://github.com/syed0059' title='Syed'> <img src='https://github.com/syed0059.png' height='50' width='50'/></a></td>
                <td><a href='https://github.com/ayyshish' title='Ashish'> <img src='https://github.com/ayyshish.png' height='50' width='50'/></a></td>
                <td><a href='https://github.com/wjkenneth' title='Kenneth'> <img src='https://github.com/wjkenneth.png' height='50' width='50'/></a></td>
                <td><a href='https://github.com/curd45' title='Param'> <img src='https://github.com/curd45.png' height='50' width='50'/></a></td>
                <td><a href='https://github.com/hiimstevenzhu' title='Steven'> <img src='https://github.com/hiimstevenzhu.png' height='50' width='50'/></a></td>
                <td><a href='https://github.com/JaredNgwj' title='Steven'> <img src='https://github.com/JaredNgwj.png' height='50' width='50'/></a></td>
            </tr>
            <tr>
                <th>Name</th>
                <td>Syed</td>
                <td>Ashish</td>
                <td>Kenneth</td>
                <td>Param</td>
                <td>Steven</td>
                <td>Jared</td>
            </tr>
        </tbody>
    </table>
</div>
