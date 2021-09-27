To create production version in dist directory:

install terser if not installed
```
npm i -g terser 
```

and in console

```
cd src
terser o.js -c -m toplevel,reserved=["o","element","obj","name","val","attributes", "attrs", "classNames", "classList", "className", "id", "children", "text", "html", "oRefInstance"] -o "../dist/o.js"
```
