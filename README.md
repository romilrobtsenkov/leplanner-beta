# LePlanner beta

## Setup
* install [nginx](http://nginx.org)
  * configure it to share `/public` folder for domain
  * configure it to share `/api` route to node server port
* install npm packages
* install bower packages
* create `config/config.js`
```javascript
var config = {};

config.port = 3000; //port, default 3000
config.db = ''; // mongodb://[username:password@]host1[:port1][/[database][?options]]
config.secret = ''; // cookie secret
config.cookieMaxAge = 30 * 24 * 3600 * 1000; // 30 days
config.beta_code = ''; // limitation for creating users
config.profile_image_upload_path = './public/images/user/';
config.profile_image_upload_temp_path = './public/images/user-temp/';
config.site_url = ''; //site URL, example http://leplanner-beta.romil.ee
config.email = ''; // password reset emails sender
config.developer_email = ''; // critical error email will be sent here
config.fav_icons_path = './public/images/favs/'; //favicon upload path when adding conveyor  

config.errorMails = true; // email developer on critical error

config.log = {
	level: 7,
	appName: 'LePlanner'
};

module.exports = config;
```

## Run from console
```
node bin/www
```
PS! use [pm2](http://pm2.keymetrics.io) for better control  

# License

Copyright (c) 2015 Romil Rõbtšenkov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
