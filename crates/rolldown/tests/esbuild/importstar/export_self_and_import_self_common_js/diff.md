## /out.js
### esbuild
```js
// entry.js
var entry_exports = {};
__export(entry_exports, {
  foo: () => foo
});
module.exports = __toCommonJS(entry_exports);
var foo = 123;
console.log(entry_exports);
```
### rolldown
```js
"use strict";


//#region entry.js
var entry_exports = {};
__export(entry_exports, { foo: () => foo });
const foo = 123;
console.log(entry_exports);

//#endregion
Object.defineProperty(exports, 'foo', {
  enumerable: true,
  get: function () {
    return foo;
  }
});

```
### diff
```diff
===================================================================
--- esbuild	/out.js
+++ rolldown	entry_js.cjs
@@ -1,7 +1,12 @@
 var entry_exports = {};
 __export(entry_exports, {
     foo: () => foo
 });
-module.exports = __toCommonJS(entry_exports);
 var foo = 123;
 console.log(entry_exports);
+Object.defineProperty(exports, 'foo', {
+    enumerable: true,
+    get: function () {
+        return foo;
+    }
+});

```