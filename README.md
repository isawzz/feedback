
# so geht es!

1. install node js: https://nodejs.org/en/download/
(falls du es nicht schon hast)

2. download yarn from https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable 

3. clone github from https://github.com/isawzz/feedback

4. open in vs code

4. in vs code terminal:

	yarn add express

	yarn add socket.io

5. in vs code: goto dir wo server.js drin ist (v2)

6. npx nodemon server.js (or simply: node server.js)
(starts server on localhost:3000)
(kann auch sein dass du nodemon installieren musst)

7. start windows powershell in dir where ngrok.exe is

8. ./ngrok.exe http 3000
(starts ngrok)

9. copy url that looks like:
https://c2ee-2601-600-8500-18a0-399b-e410-67c4-2cc1.ngrok.io

10. send it to other users, and paste into browser, this should connect everyone to your localhost:3000
