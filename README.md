
# so geht es!

1. install node js: https://nodejs.org/en/download/
(falls du es nicht schon hast)

2. clone github from ... tbd

3. open in vs code 

4. in vs code: goto dir wo server.js drin ist (v2)

5. npx nodemon server.js
(starts server on localhost:3000)

6. start windows powershell in dir where ngrok.exe is

7. ./ngrok.exe http 3000
(starts ngrok)

7. copy url that looks like:
https://c2ee-2601-600-8500-18a0-399b-e410-67c4-2cc1.ngrok.io

8. send it to other users, and paste into browser, this should connect everyone to your localhost:3000
