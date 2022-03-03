![logo_simple](https://user-images.githubusercontent.com/60504466/147557800-e908818f-5df0-4add-97c0-681d4b13eafe.png)

# Simple CRM Components

Simple CRM component is a project that consists in developing four (04) external components to be used on other platforms.


## Developed modules

- Agenda

- Planning

- Gantt

- Kanban


## Agenda component

The Calendar component is a component developed under VueJs version 2 and using the Toast UI Calendar library.

## Screenshots

![Calendar Screenshot](https://user-images.githubusercontent.com/60504466/147557630-f6557f7b-c734-464f-beed-0e6ff59129a1.png)

## Application Syntax

[Documentation](https://linktodocumentation)

## Props
We provide props for Options of Agenda Component. Additionally you can set schedules using schedules of prop.

| Name            | Type   | Default | Reactive | Description                                                                                                                                                     |
| --------------- | ------ | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API_KEY         | String | " "     | O        | API keys are handled by endpoints and used with applications and website interfaces usually referred to as projects by software developers.                     |
| URI             | String | " "     | O        | URIs allow Internet protocols to facilitate interactions between and among these resources. The URI is used here only for reading with the get() method.        |
| URI_ACTION      | String | " "     | O        | URI_ACTIONs allow Internet protocols to facilitate interactions between and among these resources. The URI_ACTION is used here for adding, modifying, deleting. |
| locale          | String | " "     | O        | The locale variable allows you to change the language of the texts associated to the date as example "fr" for french and "en" for english.                      |
| calendarList    | Array  | []      | O        | The "calendarList" variable is an array that contains the list of colors and the associated name.                                                               |
| scheduleList    | Array  | []      | O        | The "scheduleList" variable is an array that contains the list of tasks.                                                                                        |
| viewModeOptions | Array  | []      | O        | The "viewModeOptions" variable is an array that contains the list of options related to the view, for example the Day/Month/Year mode.                          |
| dateRange       | Array  | []      | O        | The "dateRange" variable is an array that contains parameters related to the chosen view by returning either the day, month or date range currently chosen .    |
| timezones       | Array  | []      | O        | The variable "timezones" is an array that contains the list of time zones. By default the time zone is Paris.                                                   |

## Agenda
With calendar component you can :
 [x] create a task by clicking on a date which opens a popup iframe
 [x] edit a task by clicking on a edit button on selected task which opens a popup iframe
 [x] delete a task
 [x] change the view mode
 [x] display by state, user, type, priority, etc.
 [x] sort by date range
 [x] sort by users
 [x] view historical data
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
