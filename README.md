# Demo Salesforce Widget

## Description

This project is to be used within GenesysCloud as a widget for the interactions. The goal is to provide a quick access widget for the agents to interact with Salesforce. 
It a very narrowed example of what could be achieved if necesary for presentation purposes. 

## Requirements

The app will need to be compiled and hosted. 
The way the widget is connected to GenesysCloud is mostly though queryString params. Through them, GenesysCloud would provide the app with all the contextual required parameters for the app.

Here is a list of the necessary query-params:
- gcClientId: oAuth implicint clientId
- gcTargetEnv: GenesysCloud environment the app will try to login to  (mypurecloud.de, mypurecloud.ie,...)
- gcConversationId: ConversationId so that the app can read the contact's number
- cContactAction: Salesforce data action id responsible of searching Contact data in SF
- cRelationsAction: Salesforce data action id responsible of querying found contact's relationships data.

## Framework

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
