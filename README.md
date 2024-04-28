# EVENTS HUB
A web application for managing events

![logo](./client/assets/img/subwaylogor.png)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Admin](#admin)
- [Client](#client)
- [Contact](#contact)


## Features

- Event Registration
- Event Cancellation
- Organization member management
- User registration
- Attendance tracking via QR
- Feedback management

## Installation

**Prerequisites:** 
- XAMPP: [Download](https://www.apachefriends.org/download.html)
- Git: [Download](https://git-scm.com/downloads)
- Node.js: [Download](https://nodejs.org/en/download/)



#### 1. Navigate to your XAMPP installation directory, then go to the htdocs folder
```bash
cd /path/to/xampp/htdocs
```


#### 2. Clone the repository into the 'htdocs' folder.
```bash
git clone https://github.com/franzxsu/webtek.git
```

#### 3. Import the database schema into MySQL.
```bash
1. create a new database in phpmyadmin
2. import the file from database/EMPTYDATABASE_DEC22.sql
```

#### 4. Open the XAMPP control panel and start the Apache and MySQL servers.

### ADMIN

- to run the admin module, go to the the project directory and go to the admin directory
```bash
cd admin
```
- run the nodejs server
```bash
npm start
```

- open the server module in your web browser
```bash
http://127.0.0.1:3000/index
```

### CLIENT
- to run the client module, open the client module in your web browser, ensure that the Apache server is runnning
```bash
http://127.0.0.1/webtek/client/index.php
```

## Contact

For any questions, feedback, or support, feel free to reach out:

- Email: [2225292@slu.edu.ph](mailto:2225292@slu.edu.ph)
- Contact No: +63 926 699 5418

