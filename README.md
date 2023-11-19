# Setting up Frontend

### Dependencies

Install NodeJS v18, it wil come with npm v9.

Install Docker, which comes with docker-compose, we'll use that to host mongodb on our local machine.

Install Expo Go app from https://expo.dev/client

### Set up

If setting up for the first time, change the terminal location to the Frontend folder and run `npm install` to install all the dependencies for the app.

To try running the app, run `npm start`, there should be a QR code in the terminal. Scan the QR code with Expo Go (Android) or the Camera app (iOS)

To close everything, just end the process on the terminal using ctrl+c.

## Steven's additional dependencies:

React Native paper, React Native Modal, 

React Native Example (Bar trend)

<h1 align="center"> :car: ParkN'Go :motorcycle:</h1>

```
CAN ADD DESCRIPTION HERE
```

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

<!-- - **Register/Login:** Users can register for an account, receive a confirmation code to confirm sign-up and login with necessary authentication. This was implemented using AWS Cognito for authentication. <br/>
<div align="center">
    <img src="https://github.com/weikangg/Ascendo/assets/95838788/74bcf124-dda1-4b74-b1ca-dc52a4235cbe" alt="Register" width="200" />
    <img src="https://github.com/weikangg/Ascendo/assets/95838788/8daa425c-26ef-4d6a-85ae-f7f9600ef951" alt="RegisterConfirm" width="200" style="margin-left:20px;"/>
    <img src="https://github.com/weikangg/Ascendo/assets/95838788/1f0c6744-6fa4-4804-b461-57059555f59d" alt="Login" width="200" style="margin-left:20px;" />
</div>

- **Community:** Users can connect with people within or outside their department! They can also upload posts or images of their pets to share achievements and connect with others. <br/>
<div align="center">
    <img src="https://github.com/weikangg/Ascendo/assets/95838788/fa91f4c0-98cf-4229-9ecb-c6eea5c85f3d" alt="HomeCommunity" width="200" />
</div>

- **Tasks:** Managers can add and assign tasks to employees while employees can check off the tasks that they have completed and even check the history of their tasks. <br/>
<div align="center">
    <img src="https://github.com/weikangg/Ascendo/assets/95838788/be8bbc85-3fcd-4d60-9467-fa6a6c656be6" alt="Tasks" width="200" />
    <img src="https://github.com/weikangg/Ascendo/assets/95838788/54b92c3e-8405-4b75-8329-9b1232824dea" alt="TasksAdd" width="200" style="margin-left:20px"; />
</div>

- **Games:** Users can play games with their team members to earn points and rewards before lunch time daily! Different games will be implemented for different departments within the organisation. Future improvements include an RPG game / 3D world for users to move their avatars and pets around to interact with other team members and complete certain quests together to earn the relevant points, thus improving team cohesion and fosters interaction.  <br/>

<div align="center">
    <img src="https://github.com/weikangg/Ascendo/assets/95838788/e8a9b14e-5b11-4836-a56c-49e440caf2d2" alt="GameLobby" width="200" />
    <img src="https://github.com/weikangg/Ascendo/assets/95838788/6be63b52-56db-4d97-abf8-f0f79f7fcde3" alt="GameCharades" width="200" style="margin-left:20px"; />
</div>

- **Gacha Capsule**: Users can spend the points they earn through completing tasks and winning team games on our gacha capsule to stand a chance at earning the legendary pet, the Snow Cat. Further improvements include evolving the pets and making the pets grow as they are fed. Pet food can be bought through a shop.<br/>
<div align="center">
    <img src="https://github.com/weikangg/Ascendo/assets/95838788/0c9ac14b-dddf-4058-a8df-429c5f63c56e" alt="Gacha " width="200"  />
    <img src="https://github.com/weikangg/Ascendo/assets/95838788/e0f94627-57da-47a1-9a6e-54afec976271" alt="GachaPrize" width="200" style="margin-left:20px"; />
</div>

- **Rewards**: Users can also spend the points they earn on redeeming real-life rewards if they desire.<br/>
<div align="center">
    <img src="https://github.com/weikangg/Ascendo/assets/95838788/7eb42353-4f5f-494b-97c3-ba6472ea2af6" alt="Rewards " width="200"  />
    <img src="https://github.com/weikangg/Ascendo/assets/95838788/accb519c-5948-4b07-acde-1feb9e8f4a1f" alt="RewardsItem" width="200" style="margin-left:20px"; />
    <img src="https://github.com/weikangg/Ascendo/assets/95838788/d1c54be4-663e-481c-9920-2067fb7bfec5" alt="RewardsItemRedeem" width="200" style="margin-left:20px"; />
</div>

- **Chatbot**: The pet which the user acquires from the gacha machine acts as the chatbot for users to interact with it to answer questions, help employees plan their time as well as HR solutions for them (when they face problems but do not feel like they can turn to anyone). It can also be used to do some day-to-day admin tasks such as coming up with emails for the user to apply for leave.<br/>
<div align="center">
    <img src="https://github.com/weikangg/Ascendo/assets/95838788/231427e6-0a92-4991-93bf-ed37ff8a6d99" alt="ChatBot" width="200" />
</div>

- **User Profile**: Users will have their own avatar and pet, which they can gain experience points through completing tasks and winning team games as well to increase their levels on Ascendo. This is to allow users to gain a sense of satisfaction and to see some progress as they complete the tasks which will make it seem less mundane.<br/><br/>
<div align="center">
    <img src="https://github.com/weikangg/Ascendo/assets/95838788/0975fe96-9ead-4c9b-a69b-b2fa546dca91" alt="Profile" width="200"/>
</div> -->

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
