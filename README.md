# LiftLogic.AI

**LiftLogic.AI** is a web application designed for individuals engaged in physical training, especially those embarking on their journey into strength training. The application offers various functionalities, including the creation of personalized, easily comprehensible training plans, monitoring, visualization, and prediction of future training progress using AI technology. In addition to these features, the app serves as a multifunctional platform, acting as a social network and incorporating machine learning and artificial intelligence techniques to enhance movement patterns for exercises.
The application simplifies the process of crafting clear training plans. Through the monitoring of movement patterns and analysis of training plans using AI technology, it contributes to making strength training safer and more accessible, particularly for beginners. By enabling users to track their progress, the app facilitates in-depth analysis of workouts, providing valuable insights into individual training sessions.

**Deployed site:** [LiftLogic.AI](https://liftlogicai.onrender.com/) 
*(First page load may take w while)* 

<div align="center">
  <img align="center" src="https://github.com/Frosenow/RedPlanetScout/assets/75395761/622ce522-2de1-435a-a964-9d2611f3c70e" alt="Mockup of the site" />
</div>

## Main functionalities 

**Tech used:** React.js, JavaScript, TypeScript, Node.js, Chart.js, Ml5.js, GraphQL, MongoDB  

* **Social Network** - The social network, accessible to registered application users, allows them to share achievements, comment on, and respond to others' content. Functionality is organized under separate URL paths, with the social network located at "/Home." Each URL is protected, redirecting non-logged-in users to the "/Register" page. Logged-in users, having passed authorization, can:
  * Add comments to their or others' content.
  * Delete their comments; non-owners lack this option.
    Add unlimited content.
  * React to content; previous reactions can be revoked.
  * Delete their content; non-owners lack this option.
All operations are executed through the implemented GraphQL API.

<div float="left" align="center">
  <img align="center" width="45%" src="https://github.com/Frosenow/RedPlanetScout/assets/75395761/bddf5397-9a8d-4f19-92d6-576e226160e9" alt="Home site with all of the posts" />
  <img align="center" width="45%" src="https://github.com/Frosenow/RedPlanetScout/assets/75395761/c5b8bf77-e530-485f-8f89-0a3909d6ef44" alt="Individual sub-page for post" />
  <img align="center" src="https://github.com/Frosenow/RedPlanetScout/assets/75395761/ced3b7a2-297c-4eda-a3a2-0f69895e7454" alt="Mockup of the site" />
</div>

* **Workout's plan organizer** - The training plan organizer enables users to create unlimited individual workout plans, stored in the database. Logged-in users access the "Workouts" tab at "/Workouts" to create plans using a user-friendly graphical interface. After plan creation, users customize their weekly schedule with the following form options:
  * Choose training days, creating corresponding slots for selected days and assigned exercises.
  * Select exercises from a drop-down list using the "exercise atlas" dictionary.
  * Specify the number of sets and repetitions for each exercise, with dynamic columns generated based on the series selected.
Note: It is not possible to create a plan with the same day occurring twice but having different sets of exercises.

<div float="left" align="center">
  <img width="400px" heigth="400px" src="https://github.com/Frosenow/RedPlanetScout/assets/75395761/a8976c9f-5e6f-49ba-aba9-e8fe5c5b0faa" alt="Workout organizer" />
  <img width="400px" heigth="400px" src="https://github.com/Frosenow/RedPlanetScout/assets/75395761/3c968f5a-7792-4095-9cd5-52cbc5b77c80" alt="Workout organizer" />
  <img width="400px" heigth="400px" src="https://github.com/Frosenow/RedPlanetScout/assets/75395761/4c58aaea-7b86-449e-9445-549bc39c9835" alt="Workout organizer" />
  <img width="400px" heigth="400px" src="https://github.com/Frosenow/RedPlanetScout/assets/75395761/4ceeb496-99c8-4410-b4ab-2429c960154c" alt="Workout organizer" />
</div>

* **Plan analysis, progress tracking and prediction** - After creating a training plan, users can analyze it through generated charts showcasing the focused muscle parts. The ability to compare multiple plans is also available. Plan analysis is facilitated by an "exercise dictionary," suggesting exercise names and providing hidden information on muscle groups engaged. Dynamic charts, powered by the Chart.js library, visualize the data.

<div float="left" align="center">
  <img src="https://github.com/Frosenow/RedPlanetScout/assets/75395761/77ae4547-2698-43e6-aabd-810794b12ce9" alt="Spider chart" />
</div>

Each user-added exercise in the plan includes a progress-tracking feature. "Progress" refers to series, repetitions, and loads on a given day, creating a training volume. User-recorded progress is stored in the database, allowing users to view their progress on a line graph. A graph illustrating volume progress over time is generated for each exercise with recorded training progress. 

<div float="left" align="center">
  <img src="https://github.com/Frosenow/RedPlanetScout/assets/75395761/50f13428-3d4a-4787-af83-d8830f89c6c1" alt="Spider chart" />
</div>

* **AI-Powered Joint Position Detection for Precise Repetition Counting** - Using Tensorflow.js and the PoseNet model, all characteristic points of the human body can be identified. Repetition counts are then derived based on the flexion angle between three selected joints. To prevent excessive counting, it was crucial to identify active joints in the exercise. The assumption was made that either the arms or legs perform the movement with the correct technique.
As both legs and hands have three defined joints per limb, detecting the relatively more active limb involved in the exercise was essential. This was achieved by storing consecutive coordinates of joints in a buffer and checking displacement differences. Treating each joint as a 2D point (x, y), the atan2() trigonometric function was used to calculate the angle between vectors.
The "calculateAngleBetweenJoints" function labels joints as follows:
  * Joint A: Represents the end of a body segment (e.g., shoulder).
  * Joint B: The center point for flexion (e.g., elbow).
  * Joint C: Represents the endpoint of a body segment (e.g., wrist).
The X-axis of the captured image corresponds to a horizontal line on the screen.

## Lessons Learned:

* Handling features like a social network, data visualization, and pose detection, I honed my skills in full-stack development, understanding the intricate connection between frontend and backend components. This journey allowed me to grasp the complexities of social networking implementation, covering user profiles and interactive elements like comments and reactions.

* Data visualization became a focal point, and I learned to present information dynamically using charts and graphs. This not only deepened my understanding of user behavior but also enhanced my UX design skills as I iteratively refined the interface based on interactions with different features.

* The incorporation of machine learning, particularly pose detection using TensorFlow.js, opened up new horizons in real-time user interactions. Navigating through challenges in this space broadened my knowledge of machine learning applications in app development.

* Managing backend services, designing databases, and ensuring security measures became integral aspects of the project. I discovered the significance of APIs in facilitating smooth communication between frontend and backend components.

## Examples:
Take a look at these couple examples that I have in my portfolio:

**AI Sudoku Solver:** https://github.com/Frosenow/AI-Sudoku-Solver/tree/main

**Dictionary Autcompletion Using Trie Data Structure:** https://github.com/Frosenow/Dictionary-Autocompletion-Using-Trie

**Locatobia - Guide for busy tourists**: https://github.com/Frosenow/Locatobia





