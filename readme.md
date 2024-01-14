#TensorGoAssignment
This reposiroty contains both the frontend and the backend

FRONTEND :
Type in "cd ./frontend" on the terminal, then type in "npm install", then type in "npm start"
Make sure that the application is running on port:3000 only frr google auth to work.


BACKEND:
You don't need to run the backend locally, i have deployed it on "https://tensorgoassignment.onrender.com/", and have made the necessary changes in the frontned, but let's say that you want to run the backend locally, then you have to make some changes, in the frontend as well as the backend, in the frontend pls find "https://tensorgoassignment.onrender.com/" and replace it with "http://localhost:3001", make sure to find all the instances, and now in the backend you do the same, find "https://tensorgoassignment.onrender.com/" and replace it with "http://localhost:3001". But it does not end here, you have to have .env file in your backend, so as to have the MONGI_URI, google console credentials, but i cannot put that on a public git repo, so pls text me on "indushassan@gmail.com" to get the .env file, or you can put in your own credentials, but for the google auth to work, you have to enter redirect URI's which are --- "http://localhost:3001/api/v1/users/auth/google/callback", pls put this in your redirect URIs in your google console, and the SUCCESS_URI will have to be "http://localhost:3000?id=".
After these chages, from the root direcory, type "cd ./backend" on the terminal, then type in "npm install", then "npm start".

USAGE:
If you are logging in for the first time, you will be given default metrics, 30 Users and 15GB Storage. And after that everytime you login, 10 Users will be added and 3GB Storage Usage will be added. You can increase your billing cycle by logging in and logging out, there are no default invoices, and will be created 30 days after the cycle starts using Zappier.com as automation, but you can create invoices by clicking the given button on Home Page.
The moment you generate a new Invoice the current cycle ends and new one starts, so the Users and Storage will be zero, and will need logging again to increase them.
--- (so as to show the wroking of the automation, i have made the billing cycle to be of one day, even though it might display the expected end date for a month later but, each billing cycle ends and a new one starts everyday automatically to show the working of it using Zappier.com)

[you can only login using GOOGLE]