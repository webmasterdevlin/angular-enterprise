# Steps

- ng new my-app
- cd my-app

## Pick your UI library or UI framework

- ng bootstrap
- angular material
- prime ng

## Cheat Sheet

- https://www.digitalocean.com/community/tutorials/angular-angular-cli-reference

## Chrome Extension

- https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh

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

- create a component, nav-bar/nav-bar.component.ts, to display the navigation bar
- Add links/menus for different pages in the NavigationBar
- run the application and try to navigate using the menus
- create styling for the navigation bar

## Core

- set up the core module
- set up the generic http service using rxjs
- import the core module in the app.module.ts

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
- create a method to fetch the heroes and villains
- insert the fetch method to the ngOnInit hook
- run the application with json-server
- check the dev tools network tab to see the response
- render the heroes and villains using the \*ngFor directive

## Navigate to hero detail and villain detail

- inject the Router in the constructor
- create a method, goToHeroDetail, in heroes component
- create a method, goToVillainDetail in villains component
- use the goToHeroDetail method in the click event of the Detail buttons of heroes and villains pages html
- in the hero-detail and villain-detail pages, inject the ActivatedRoute
- create a method, getHero and getVillain in the hero-detail and villain-detail components

## Delete a hero and villain

- create a method, removeHero and removeVillain in the heroes and villains components
- use the methods in the click event of the delete buttons of heroes and villains components html

## Create a form

- create a shared module

```bash
ng g m shared
```

- create a reusable form component, shared/components/form/form.component.ts
- use @Input decorators to pass the form to the form component
- use @Output decorator to emit an event

## Add a hero and villain

- create properties namely itemForm and isOpen in the heroes and villains components
- inject the FormBuilder in the constructor of the heroes and villains components
- create a method formBuilderInit for itemForm initialization
- create a method, toggle and onSave in the heroes and villains components
- use the reusable form component in the heroes and villains components html

## Update a hero and villain

- create properties namely editingTracker and editForm in the heroes and villains components
- add editedForm in the formBuilderInit method
- create onUpdate method in the heroes and villains components
- use another reusable form component in the heroes and villains components html for the update form
- use the tracking property and the \*ngIf directive to display the update form if editing is same as id
- use the edit button's click event to assign id to editingTracker and toggle the form
