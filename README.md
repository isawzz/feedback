
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

6. npx nodemon server.js
(starts server on localhost:3000)

7. start windows powershell in dir where ngrok.exe is

8. ./ngrok.exe http 3000
(starts ngrok)

9. copy url that looks like:
https://c2ee-2601-600-8500-18a0-399b-e410-67c4-2cc1.ngrok.io

10. send it to other users, and paste into browser, this should connect everyone to your localhost:3000

##formulas for value:

1. ich habs nicht geschafft deine zu replicaten. irgendwie das aufaddieren der frueheren events mach ich falsch. wenn du es in game_fe.js editieren willst, setze auch in server.js am anfang game_version = 'game_fe'

2. alternativ koenntest du auch in game.js meine primitiv version anschauen und verbessern

3. die frame rate aendert sich automatisch wenn du interval (vom frontend aus) aenderst. aber in game.js (game_fe.js) musst beides editieren damit INTERVAL = 1000 / FR bleibt.

4. es gibt leider keine settings versionen so wie du es in deiner besseren version hast.

5. ich hab jetzt (in game.js) interval auf 50ms (FR 20) gesetzt damit es smooth aussieht. falls es performance probleme gibt, setzt die FR runter.