How to run the app in localhost

1. clone the app from the repo on github : https://github.com/RAJATsd/product_list_ipsator
2. run "npm install" in terminal
3. run "npm run dev" in terminal to start the app. It will launch on localhost:3000 by default

My Design decisions :

1. Divided the flow in 3 parts, i.e pages, containers and components
2. Containers are the connected components to redux and components are mostly non-connected reusable parts
3. All the main logic goes in containers
4. Material UI used for icons and components
5. Individual parts of redux of corresponding containers are situated in the container's own folder
6. Utils are made to reduced duplicacy
