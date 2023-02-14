# FINDTHINGS

## PROBLEM STATEMENT

Develop a web application that will keep track of all the items in the sta-tionery, their prices, distance from the student’s current location. We planto develop a system that does the same and much more like, students canreview the stationery, They will be able to compare the prices of the selecteditem between different stationeries, buyer can choose their stationery alongwith the price of the item and time of buyer’s arrival, once they confirm, a notification will be sent to the chosen stationery owner, notification will con-tain the information about the buyer, item required and total price, and oncethe seller confirms the order, the buyer can come at the time they specifiedand get their items.

> Find everything at one place!
>>Compare prices of items between different stationeries and buy everything at a reasonable price and pick them up at your own chosen time.

## FEATURES

1. Login/ Signup for both Buyer and seller.
1. View Feedback option for both buyer and seller.
1. Order products, Give Feedback, View history, Options for the buyer.
1. Add Products, Update stocks, Accepting/Rejecting orders, Options for the Seller.
1. Notification System.

### TECHNOLOGY USED

1. #### HTML

   HTML is the standard markup language for creating Web pages. It standsfor Hyper Text Markup Language. It describes the structure of a Web page using elements. elements tell the browser how to display the content.We used Html to structure our pages.

1. #### CSS and Bootstrap

   we use CSS to style a Web page. It stands for Cascadingstyle sheet. It describes how HTML elements are to be displayed on screen. It can be used to control the layout of multiple pages if needed. Bootstrap is the most popular CSS Framework for developing responsive andmobile-first websites.CSS and Bootstrap is used to style the pages.

1. #### React JS

    React is a free and open-source front-end JavaScript library for building userinterfaces or UI components.React is used to make interactive UI design.

1. #### Rest API

   REST API(also known as RESTful API) is an application programminginterface (API or web API) that conforms to the constraints of REST archi-tectural style and allows for interaction with RESTful web services. RESTstands for representational state transfer.

1. #### Java Spring

   The Spring Frameworkis an application framework and inversion of con-trol container for the Java  platform. The framework’s core features can beused by any Java application.Java Spring is used for backend.

1. #### Mysql

   Mysql a relational database management system based on maria db. In contrast to many other database management systems, Mysql is not aclient–server database engine. Rather, it is embedded into the end program. We have used hibernate to do mapping from
   table to object relation.

1. #### JavaScript

   It is used for Dynamic content on a website.

## DELIVERABLES

- [x] Notification System
- [x] Review System
- [x] Google Map

## SOFTWARE REQUIREMENTS

1. Any code editor
1. Spring boot
1. Mysql
1. React setup

## HOW TO OPERATE

### BACKEND SETUP

   After cloning the backend code (named as findthings-backend in git repository), Open terminal and open the folder in which you cloned the project.

   Run command:
   `./gradlew bootRun`

   This will Launch the backend successfully if no error is encountered.

### FRONTEND SETUP

   After cloning frontend code (named as findthings-frontend in git repository), Open terminal and open the folder in which you cloned the project.

### Run commands in sequence


npm install

npm start


   _This will launch the Frontend successfully if no error is encountered. If error occured, please follow the following instructions._
   (https://askubuntu.com/questions/426750/how-can-i-update-my-nodejs-to-the-latest-version)
 

### TO SETUP THE DATABASE

   *Open Terminal.*

   Run commands in sequence:

  ``` npmmysql
   Sudo Mysql

   Enter Your Password for Mysql

   CREATE USER 'test'@'localhost' IDENTIFIED BY 'newpassword';

   GRANT ALL PRIVILEGES ON finsthings.* To 'test'@'localhost' 

   IDENTIFIED BY 'newpassword';
   ```

   USE findthings;
   

   Now, you can use the database successfully.

## PRIMARY STAKEHOLDERS OF THE PRODUCT/SERVICE BUILT

1. Students of IIT Bombay
1. Stationary shop owners around IIT Bombay

## TEAM DETAILS AND CONTRIBUTION

1. Sagar Poudel (213051001) -> Handled backend and also helped in frontend
1. Aditya Barua (213050006) -> Handled Database and Styling
1. Pooja Rawat Meena (213050085) -> Handled Frontend and Documentation

## PATH TO CODE DOCUMENTATION

### Frontend Documentation

/findthings_frontend/docs/index.html

### Backend Documentation

/findthing-backend/build/docs/javadoc/index.html