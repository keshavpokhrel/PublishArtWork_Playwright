
# Playwright
This repository contains a Proof Of Concept of the `Playwright` + `Typescript` test automation framework for Artwork web application on multiple Web browsers: Chrome, Firefox, WebKit (Safari) etc.

# Prerequsites
Local environment should have nodejs, playwright, VSCode or any IDE, Typescript etc. to work on current project.

## Running with Playwright
To run test cases of specific browser: 

**Firefox**
```
npx playwright test -g 'Publish Art' --project=firefox
```
**Chrome**
```
npx playwright test -g 'Publish Art' --project=chromium
```

**Safari**
```
npx playwright test -g 'Publish Art' --project=webkit
```
**Mobile ViewPort**
```
npx playwright test -g 'Publish Art' --project='mobile chrome'
```

- To run all test cases on all browsers in sequential manner in a single worker:

   > In **playwright.config.ts** file we need to set **`workers: 1`**

   ![image](https://github.com/keshavpokhrel/PublishArtwork_Playwright/assets/6346814/a28601c7-0e20-4335-9aa4-a6cc425296d4)

_Then run below command:_

```
npx playwright test -g 'Publish Art'
```
- To run all test cases on multiple browsers on multiple workers in sequance:
   > In **playwright.config.ts** file we need to comment like : **`//workers: 1`** and make parallel false like : **`fullyParallel:false`**

  ![image](https://github.com/keshavpokhrel/PublishArtwork_Playwright/assets/6346814/3cb1cb1e-9e4e-448c-823b-6a281140965e)
 
 _Then run below command:_

```
npx playwright test -g 'Publish Art'
```
- To run all test cases on all browsers in parallel/random manner with multiple workers:
   > In **playwright.config.ts** file we need to make parallel true like : **`fullyParallel:true`** and comment worker like : **`//workers:1`**
   
  ![image](https://github.com/keshavpokhrel/PublishArtwork_Playwright/assets/6346814/251f077c-26f7-476c-b714-1eb8f2d976da)

_Then run below command:_

```
npx playwright test -g 'Publish Art'
```
- To run all test cases on all/any browsers in headless mode:
  > In **playwright.config.ts** file we need to make **`headless: true`**

![image](https://github.com/keshavpokhrel/PublishArtwork_Playwright/assets/6346814/bac57bd6-741e-4ad9-a48a-db7da91a43f0)


_Then run below command:_

```
npx playwright test -g 'Publish Art'
```
_If we want to run any specific browser on headless we can pass `--project={projectname}` on above command, example like :_
```
npx playwright test -g 'Publish Art' --project=chromium
```
