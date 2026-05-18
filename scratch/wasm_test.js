// Removed duplicate local.get 0, adjusted sizes to total code section size 30 (0x1e) and function body size 28 (0x1c)
const wasmBuffer = new Uint8Array([
  0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, // Magic + Version
  0x01, 0x06, 0x01, 0x60, 0x01, 0x7f, 0x01, 0x7f, // Type section (ID 1, size 6)
  0x03, 0x02, 0x01, 0x00,                         // Function section (ID 3, size 2)
  0x07, 0x07, 0x01, 0x03, 0x66, 0x69, 0x62, 0x00, 0x00, // Export section (ID 7, size 7, "fib")
  0x0a, 0x1e, 0x01, 0x1c, 0x00,                   // Code section (ID 10, size 30 (0x1e), 1 function, function body size 28 (0x1c), 0 locals)
  0x20, 0x00,                                     // local.get 0 (for condition)
  0x41, 0x02,                                     // i32.const 2 (for condition)
  0x49,                                           // i32.lt_s (evaluates condition)
  0x04, 0x7f,                                     // if i32
  0x20, 0x00,                                     //   local.get 0 (then branch return)
  0x05,                                           // else
  0x20, 0x00,                                     //   local.get 0
  0x41, 0x01,                                     //   i32.const 1
  0x6b,                                           //   i32.sub
  0x10, 0x00,                                     //   call 0 (fib)
  0x20, 0x00,                                     //   local.get 0
  0x41, 0x02,                                     //   i32.const 2
  0x6b,                                           //   i32.sub
  0x10, 0x00,                                     //   call 0 (fib)
  0x6a,                                           //   i32.add
  0x0b,                                           // end if
  0x0b                                            // end func
]);

WebAssembly.instantiate(wasmBuffer).then(results => {
  const fib = results.instance.exports.fib;
  console.log("Wasm compiled successfully!");
  console.log("fib(10) =", fib(10)); // Should be 55
  console.log("fib(20) =", fib(20)); // Should be 6765
  console.log("fib(30) =", fib(30)); // Should be 832040
}).catch(err => {
  console.error("Wasm failed:", err);
});
