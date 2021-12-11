# Steps

- ng new my-app
- cd my-app

## Pick your UI library or UI framework

- ng bootstrap
- angular material
- prime ng

## Create pages and routers

- npm i -D prettier
- create a home page

```bash
ng g m pages/home
```

- create a module for the hero feature's code splitting ./src/features/hero/hero.module.ts

```bash
ng g m features/hero
```

- create a module for the villain feature's code splitting ./src/features/villain/villain.module.ts

```bash
ng g m features/villain
```

- create a page ./src/features/hero/containers/heroes/heroes.component.ts and say heroes works

```bash
ng g c features/hero/containers/heroes
```

- create a page ./src/features/villain/containers/villains/villains.component.ts and say villains works

```bash
ng g c features/villain/containers/villains
```

- create a module, app-routing.module.ts, to register the pages
- import the routing module inside the app.module.ts
- run the application and navigate to different pages using the URL field of the browser
- run the application and navigate to different pages using the URL field of the browser

## Create navigation bar

- create a component, shared/nav-bar/nav-bar.component.ts, to display the navigation bar
- Add links/menus for different pages in the NavigationBar
- run the application and try to navigate using the menus
- create styling for the navigation bar

## Core

- set up the core module
- set up the generic http service using rxjs

## Model/Schema

- create features/hero/hero.model.ts
- create features/villain/hero.model.ts
- create other models if needed

## Set up json-server and concurrently

- npm i -D json-server concurrently
- create ./src/json-server/db.json and ./src/json-server/routes.json
- add proxy.conf.json in ths src folder
- update the scripts

## Render Heroes and Villains

- create the properties namely endpoint, heroes, and isLoading as the local states of the heroes and villains components
- inject the HttpClientRxJSService in the constructor
- create a function to fetch the heroes and villains
- insert the fetch function to the ngOnInit hook
- run the application with json-server
- check the dev tools network tab to see the response
- render the heroes and villains using the \*ngFor directive

## Navigate to hero detail and villain detail

- inject the Router in the constructor
- create a function, goToHeroDetail, and also a function, goToVillainDetail
