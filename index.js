const fs = require('fs');
const http = require('https');
const unzip = require("unzip-crx");
const cheerio = require('cheerio')

const extension = "https://clients2.google.com/service/update2/crx?response=redirect&prodversion=49.0&x=id%3Dhpplgjkooibhfkmmepoikcjpadcojcik%26installsource%3Dondemand%26uc";

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
}

download(extension,"tmp.html");
setTimeout(function() {
  var $ = cheerio.load(fs.readFileSync("tmp.html"));
  var temp = $('a').attr('href');

  console.log(temp);

  download(temp,"extension.crx");
  setTimeout(function() {
    unzip("extension.crx").then(() => {
      console.log("Successfully unzipped your crx file..");

      // Remove temp file
      fs.unlink('tmp.html', function (err) {
          if (err) throw err;
          // if no error, file has been deleted successfully
          console.log('Temp file deleted...');
      });

      editExtension()
    });
  },5000);
},5000);

function editExtension() {
  var Fixjs = fs.readFileSync("extension/index.min.js", 'utf8');
  var Fixcss = fs.readFileSync("extension/bundle.css", 'utf8');
  Fixjs=Fixjs.replace('return"".concat(n,":").concat(r)','return "STREAM IS STARTING"');
  Fixjs=Fixjs.replace('return new Date(this._timestamp).getHours()<12?"AM":"PM"','/*return new Date(this._timestamp).getHours()<12?"AM":"PM"*/');
  Fixjs=Fixjs.replace('return e>=11&&e<=13?"th":e%10==1?"st":e%10==2?"nd":e%10==3?"rd":"th"','/*return e>=11&&e<=13?"th":e%10==1?"st":e%10==2?"nd":e%10==3?"rd":"th"*/');
  Fixjs=Fixjs.replace('return e.getHours()>5&&e.getHours()<12?"Good morning":e.getHours()<17?"Good afternoon":"Good evening"','/*return e.getHours()>5&&e.getHours()<12?"Good morning":e.getHours()<17?"Good afternoon":"Good evening"*/');
  Fixjs=Fixjs.replace('return"".concat(n," ").concat(r,", ").concat(i)','/*return"".concat(n," ").concat(r,", ").concat(i)*/');
  Fixjs=Fixjs.replace('return"".concat(t,":").concat(n)','/*return"".concat(t,":").concat(n)*/');
  Fixjs=Fixjs.replace(/return e.planet.name/g,'return "Planet: "+e.planet.name');
  Fixjs=Fixjs.replace('font-size:11vh;@media','font-size:5vh;@media');
  fs.writeFileSync("extension/index.min.js",Fixjs);

  Fixcss=Fixcss+'[class*="Settings"],\n[class*="Rocket"],\n[class*="Social"],\n[class*="Share"],\nsvg{\n\tdisplay: none !important;\n}'
  fs.writeFileSync("extension/bundle.css",Fixcss);

  // Remove downloaded extension
  fs.unlink('extension.crx', function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log('Removed extemsion file...');
  });
}
