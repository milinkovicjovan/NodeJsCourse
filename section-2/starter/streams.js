const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1 // just for small apps
  // NODE HAVE TO LOAD ENTIRE FILE INTO MEMORY, BECAUSE ONLY AFTER THAT'S READY
  // IT CAN THEN SEND THAT DATA, AND THIS IS THE PROBLEM WHEN FILE IS BIG
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  // Solution 2: Streams
  // WE JUST CREATE A READABLE STREAM. THEN AS WE RECEIVE EACH CHUNK OF DATA
  // WE SEND IT TO THE CLIENT AS A RESPONSE WHICH IS A WRITABLE STREAM
  //   const readable = fs.createReadStream("test-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found");
  //   });

  // Solution 3
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writeableDestination)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
