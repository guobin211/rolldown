# Diff
## /out.js
### esbuild
```js
// foo.js
var require_foo = __commonJS({
  "foo.js"(exports) {
    exports.x = 123;
  }
});

// entry.js
var ns = __toESM(require_foo());
console.log(ns.foo);
```
### rolldown
```js
import { default as assert } from "node:assert";


//#region foo.js
var require_foo = __commonJS({ "foo.js"(exports) {
	exports.x = 123;
} });

//#endregion
//#region entry.js
var import_foo = __toESM(require_foo());
assert.equal(import_foo.foo, undefined);

//#endregion

```
### diff
```diff
===================================================================
--- esbuild	/out.js
+++ rolldown	entry_js.js
@@ -2,6 +2,6 @@
     "foo.js"(exports) {
         exports.x = 123;
     }
 });
-var ns = __toESM(require_foo());
-console.log(ns.foo);
+var import_foo = __toESM(require_foo());
+console.log(import_foo.foo);

```