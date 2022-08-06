const express = require("express"); //FunctionObject //express module
const path = require("path"); //pathObject //path module
const redditData = require("./data.json"); //jsObject //self created module/file needs "./"
const app = express(); //AppObject

//npm i ejs
//set() method takes 2 arguments
//("key","value") //sets key to value
app.set("view engine", "ejs"); //auto require("ejs")
//when view engine is used express assumes our views/templates
//exist in a (default)views directory
//can change directoryName with app.set('views', process.cwd() + '/directoryName') //nodejs runtime execution directory - issue
//we can also change it to use currentDirectoryPath of index.html insted- due to not finding views directory when executing from outside this directory eg-cd..
app.set("views", path.join(__dirname, "/views")); //object.method(currentDirectoryPath,"/directoryName") //combines strings

//serving static files - found in directoryName - making it available in ejs files + localhost:3000/style.css
//unlike default app.use(callback) - no callback argument to execute when any httpMethod/any httpStructured request
//comes in to localhost:3000 or any /resource path ,instead execute the argument
//appObject.method(expressObject.method("assetsDirectoryName"))
//we can also change it to use currentDirectoryPath of index.html instead- due to not finding public directory when executing from outside this directory eg-cd..
app.use(express.static(path.join(__dirname, "public")));

//adddress - localhost:3000
//app is listening for (HTTPstructured) requests
//execute callback
//localhost:3000 shows Cannot GET/ if we're not responding with any content
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

//httpMethod-get,path-"/"(root) - (direct match/exact path)
//execute callback when http structure request arrives
//convert http request/response to jsObject
app.get("/", (req, res) => {
  console.log("HTTP structured request received");
  //res.send("test"); //content-type:text/plain + converted to httpStructued response
  res.render("home"); //object.method(fileName)
  //render() looks for default directory views to find file
  //send ejs file/template as (http structure)response //content-type:text/html
  //render() executes the js in ejs file - converts ejs file into pure html
});

//httpMethod-get,path-"/rand" - (direct match/exact path)
app.get("/rand", (req, res) => {
  console.log("HTTP structured request received");
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("random", { randNo: num }); //render(ejsFile,variablesObject) passes the key in variablesObject argument as variables to ejs file
  //variablesObject- if key and value are same name ie {num:num} can be shortened to {num}
  //resObjt convert and send httpStructured response //Content-Type:text/html
});

//httpMethod-get,path-"/r/:subreddit" - (pattern match)
//:subreddit -pathVariable
app.get("/r/:subreddit", (req, res) => {
  //key into variables //object destructure
  const { subreddit } = req.params; //req.params an object
  const data = redditData[subreddit]; //Object[key] is another object with properties
  // console.log(data); //object with properties
  //undefine is falsy
  if (data) {
    res.render("subreddit", { ...data }); //send variables to ejs //resObjt convert and send httpStructured response //Content-Type:text/html
    //object-literal-spread - ...data is taking out each key:value pair in object and passing it in individually to new object
    //{...data} is same as {key1:"value1",key2:"value2",key3:value3}
    //each key is a variable passed into ejs file
  } else {
    res.render("notfound", { subreddit }); //send variables to ejs //resObjt convert and send httpStructured response //Content-Type:text/html
  }
});

//httpMethod-get,path-"/cats" - (direct match/exact path)
app.get("/cats", (req, res) => {
  //pretend database
  const cats = ["Blue", "Rocket", "catName3", "catName4", "catName5"];
  res.render("cats", { cats }); //send variable to ejs //resObjt convert and send httpStructured response //Content-Type:text/html
});

//Templating-
//define single preset pattern for all webpages
//that we can dynamically modify by embedding info+logic/
//EJS(EmbeddedJavaScript) - templating language
//other templating languages - handlebar //jade //pug //nunjucks
//we add javascript into html with EJS
//try not to write logic in ejs file - write logic in js file and pass in the variables to ejs
//json/jsObject
//write keys in an object and json in lowercase
//write file names in lowercase
//serving static files express-framework -
//.css,.js and otherfile(image) - instead of just .html http strucuted response
//using middleware function - runs between httpStructuredRequest coming in and httpStructuredResponse going out
//express.static("assetsDirectoryName") Object.method(argument) //uses nodejs runtime directory//fix above sets to current directory of index.html
