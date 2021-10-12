To create production version in dist directory:

install terser if not installed
```
npm i -g terser 
```

and in console

```
cd src
terser ./src/o.js -c -m toplevel,reserved=["o","element","obj","name","val","attributes", "attrs", "classNames", "classList", "className", "id", "children", "text", "html", "oRefInstance", "parentNode", "childNode"] -o "./npm/o.js"
```
and minify utils
```
terser "./src/utils/inputFunction.js" -c -m toplevel,reserved=["inputFunction"] -o "./npm/utils/inputFunction.js"
terser "./src/utils/addMethodService.js" -c -m toplevel,reserved=["addMethodService"] -o "./npm/utils/addMethodService.js"
```
