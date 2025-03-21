# Hopsital Web Application

<p align="center">This is the demonstration of <b>Hospital Web Application</b></p>
<p align="center">Video Demonstration : </p>

## Table of Contents

- Background
- Tech Stack & Features
- Version
- Assumption
- Quick Start

## Background

This is a web application demonstration built with NextJS, TypeScript, Tailwind CSS, PostgreSQL and so on. The patient can review and make appointment with doctor after signin whereas doctor can review and make report after appointment.

### Search Result
![search](./public/hospital-ss-search.png)

### Patient's View
![patientview](./public/hospital-ss-patientview.png)

### Doctor's View
![doctorview](./public/hospital-ss-doctorview.png)

Images source : FreePik, https://www.freepik.com/

## Tech Stack & Features

1. NextJS
2. TypeScript
3. Prisma + PostgreSQL
4. Tailwind CSS
5. JWT

## Version

1. NextJS - 15.2.2
2. TypeScript - 5.7.3
3. React - 19.0.0
4. Tailwind - 4.0
5. Prisma - 6.5.0

### Assumption

- Patient's account is for making appointment and viewing or modifying appointments  
- Doctor's account is for viewing appointment and making medical reports  
- Doctor needs to activate the account first before patient can make appointment with doctor

### Page
 - MainPage ✅
 - Find Doctor Page ✅
 - Make Appointment Page ✅
 - My Appointment ✅
 - Doctor Detail Page ✅
 - Doctor Appointment ✅
 - Doctor Report Page ✅

## Quick Start

Make sure you have the following installed on your machine:
- NodeJS
- npm (Node Package Manager)
- Git

### Cloning the Repository
 > git clone https://github.com/YeonTHY95/Hospital-Services_Full-Stack-Web-Application.git
 > 
 > cd Hospital-Services_Full-Stack-Web-Application

### Installation

Install the project dependencies using npm:

> npm install

Create a new file named .env in the root of your project and add the following content:

> DATABASE_URL="postgresql://username:password@hostname:port/databasename?schema=public"
> 
> SESSION_SECRET="CookiesBIGSecret"

### Seeding Database

To populate database with Doctor Info from file seed.ts

> npx prisma db seed

### Running the Project

> npm run dev

Open http://localhost:3000 in your browser to view the project.

