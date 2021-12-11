# Steps

- ng new my-app
- cd my-app

## Pick your UI library or UI framework

- ng bootstrap
- angular material
- prime ng

## Create pages and routers

#### Setting up the routers is a one time setup.

#### Future pages will be registered in your router.

- npm i -D prettier
- create a module for the hero feature's code splitting ./src/features/hero/hero.module.ts
- create a module for the hero feature's code splitting ./src/features/hero/hero.module.ts
- create a page ./src/features/hero/containers/heroes/heroes.component.ts and say hello world
- create a module, app-routing.module.ts, to register the pages
- 
- run the application and navigate to different pages using the URL field of the browser
- create another component for routing and name it LazyRoutes.tsx
- register the pages in the LazyRoutes
- use the LazyRoutes component in the App.tsx with BrowserRouter
- run the application and navigate to different pages using the URL field of the browser

## Create navigation bar

- create a component, NavigationBar.tsx
- Add links/menus for different pages in the NavigationBar
- run the application and try to navigate using the menus
- create styling for the navigation bar
- create a views folder, ./src/views/
- create a layout template for the pages and put it in the ./src/views/MainLayout.tsx
- run the application to see if it works

## Model/Schema

- create ./src/models/todoType.ts or ./src/models/todoModel.ts
- create other models if needed

## Set up axios for API calls

- npm i axios
- create ./src/api/axiosConfig.ts
- this is also where interceptors will be added for header authorization if needed

## Set up generic http services

- create ./src/api/genericApiCalls.ts

## Set up json-server and concurrently

- npm i -D json-server concurrently
- create ./src/json-server/db.json and ./src/json-server/routes.json
- add proxy in the packages.json
- update the scripts

## Create the page that will render the list of todos

- create ./src/pages/WorkTodosPage.tsx
- write the local states for the page
- write a function to fetch the todos
- add the fetch function to the useEffect hook
- run the application, npm run start:fullstack, and see the network tab of DevTools if response is 200ok
- use the map array utility to render all the todos.

## Set up React Testing Library

- create ./src/test-utils/testing-library-util.tsx that will be a copy of the root component

## Set up MSW for mocking API calls

- npm i -D msw
- the msw is a mocking library which will intercept the requests and responses in the integration tests
- create ./src/mocks/handler/todoHandler.ts
- create ./src/mocks/handler/index.ts
- create ./src/mocks/server.ts
- update the ./src/setupTests.ts

## Integration tests

- write integration tests for the fetch todos function of WorkTodosPage.tsx by creating ./src/pages/tests/WorkTodosPage.test.ts
- run the tests, npm run test, and see if the todos are rendered

## Delete todo

- create a function to delete a todo
- create a button to delete a todo

## Add todo

- npm i formik yup
- create a function to add a todo
- create a button to add a todo

## Update todo

- create a function to update a todo
- create a button to update a todo

## Custom Hooks

- create ./src/hooks/useBudget.ts
- use the useBudget hook on the WorkTodosPage.tsx
- create the button and presentation for the budget

## Custom Hooks Test

- add a test for the useBudget hook on the WorkTodosPage.test.ts
