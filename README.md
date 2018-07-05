## How to use
Provide proper configuration in `server.js` and `client.js` files.

Run `server.js` on host machine.

Run `client.js` on user machine and provide command as a argument.
```
node client.js ls
```

Passing arguments:
```
node client.js ls -l
```

Piping input:
```
ls -l | node client.js grep pac
```
