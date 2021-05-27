// HW review for students
//  //////////  1  //////////////
const http = require('http');
const fs = require('fs');

const http = require("http");
const fs = require("fs");
http
  .createServer(function (request, response) {
    if (request.url === "/create-directory" && request.method === "POST") {
      fs.mkdir("content", function (err) {
        if (err) {
          response.end("Sorry there is an error: ", err);
        } else {
            // seen in our server's local console
          console.log("Content Folder created");
            // seen in Postman or client side's console
          response.end("Content Folder created");
        }
      });
    }
    if (request.url === "/create-text" && request.method === "POST") {
      let body = "";
      request.on("data", function (data) {
        body += data.toString();
      });
      request.on("end", function () {
        let parsedBody = JSON.parse(body);
        fs.writeFile(parsedBody.fileName, parsedBody.message, function (err) {
          if (err) {
            response.end("Sorry there is an error: ", err);
          } else {
              // seen in our server's local console
            console.log(`${parsedBody.fileName} created`);
              // seen in Postman or client side's console
            response.end(`${parsedBody.fileName} created`);
          }
        });
      });
    }
  })
  .listen(3000, function () {
    console.log(`Server started at port 3000`);
  });
  