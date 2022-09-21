const fs = require("fs");
const crypto = require("crypto");

const start = Date.now(); // CURRENT DATE IN MILISECONDS
process.env.UV_THREADPOOL_SIZE = 4;
// THREADPOOL SIZE: IF WE SET 1 IT TAKES LONGER TO COMPLETE ENCRYPTED PASSWORDS
// IF WE HAVE 4 IS FASTER BECAUSE THERE IS NO WAITING OTHER TO FINISH

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));
// TIMER AND SETIMMEDIATE IS NOT CALLBACK FUNCTIONS THEY ARE NOT IN EVENT-LOOP
// AND THEY ARE NOT INSIDE SOME CALLBACK FUNCTION, BECAUSE OF THAT
// THEY RENDER AFTER TOP-LEVEL CODE AND BEFORE I/O, BECAUSE
// I/O READS BIG FILE TEST-FILE.TXT

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("----------------");

  // SETIMMEDIATE RENDERS BEFORE TIMERS BECAUSE THE EVENT LOOP ACTUALLY
  // WAITS SO IT PAUSES IN THE POLLING PHASE AND SO THAT SETIMMEDIATE CALLBACK
  // IS ACTUALLY EXECUTED FIRST
  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));
  // ALL LOGS HAVE BEEN LOGGED BUT TIMER 3 GOES INTO SECOND CYCLE
  // BECAUSE IT DIDN'T FINISHED

  ///////////////////////////////////////////
  // SYNC ARE BLOCKING THE ENTIRE EXECUTION, AND TIMERS FINISHED
  // AFTER SYNC BECAUSE THEY WERE NOT RUNNING INSIDE THE EVENT LOOP
  // BUT TIMERS WERE
  // And so they were basically working in the background
  // and could only be picked up by the event loop
  // when they were ready, right after these four
  // password encryptions, so this one was
  // another great example of seeing the
  // code blocking and event loop all in action.
  // AND THIS IS THE REASON BECAUSE WE TAKE SYNCHRONOUS CODE
  // OUTSIDE CALLBACK FUNCTIONS

  // crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  // console.log(Date.now() - start, "Password encrypted");

  // crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  // console.log(Date.now() - start, "Password encrypted");

  // crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  // console.log(Date.now() - start, "Password encrypted");

  // crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  // console.log(Date.now() - start, "Password encrypted");

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});

console.log("Hello from the top-level code");
// FIRST LOG IS TOP-LEVEL CODE
