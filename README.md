# LePlanner beta

## Setup (Ubuntu 16)
* install [nginx](http://nginx.org)
* configure nginx to to share `/public` folder for domain and to share `/api` route to node server port
```
# example.config
server {
  listen 80;
  server_name exampledomain.com;
  index index.html index.html;

  location / {
    root  /var/www/html/leplanner-beta/public;
    autoindex off;
  }

  location /api {
    proxy_pass http://localhost:3000;
  }
}
```
example config with SSL
```
# beta.leplanner.net
server {
        listen 80;
        server_name beta.leplanner.net;
        location /manifest.appcache {
           return 404;
        }
        location / {
           return 301 https://beta.leplanner.net$request_uri;
        }
}

server {
    listen 443 ssl;
    ssl on;

    root /var/www/html/leplanner-beta/public;
    index index.html index.htm;

    client_max_body_size 5M;

    server_name beta.leplanner.net;
    ssl_certificate /etc/nginx/ssl/nginx.crt;
    ssl_certificate_key /etc/nginx/ssl/nginx.key;

    location / {
        try_files $uri $uri/ =404;
        autoindex off;
    }

    location /api {
        proxy_pass http://localhost:3000;
    }

}

# leplanner.net
server {
    listen 80;

    server_name leplanner.net www.leplanner.net;
    return 301 https://beta.leplanner.net$request_uri;
}
```
* install [mongodb](https://www.mongodb.com/)
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```
* install dev packages
```
sudo npm -g install bower gulp pm2
```
* install npm packages
* install bower packages
* minify all neccessery files running gulp
```
gulp
```
* create `config/config.js`
```javascript
//congig.js
var config = {};

config.port = 3000; //port, default 3000
config.db = ''; // mongodb://[username:password@]host1[:port1][/[database][?options]]
config.secret = ''; // cookie secret
config.cookieMaxAge = 30 * 24 * 3600 * 1000; // 30 days
config.profile_image_upload_path = './public/images/user/';
config.profile_image_upload_temp_path = './public/images/user-temp/';
config.scenarios_thumb_upload_path = './public/images/scenario-thumbs/';
config.site_url = ''; //site URL, example http://leplanner-beta.romil.ee
config.email = ''; // password reset emails sender
config.developer_email = ''; // critical error email will be sent here
config.apiKey = ''; // used for public api for getting data

config.errorMails = true; // email developer on critical error

// for logger.js
config.log = {
	level: 7,
	appName: 'LePlanner'
};

module.exports = config;
```

## Create required folders
```
/public/images/user/
/public/images/user-temp/
/public/images/scenario-thumbs/
```

## Run from console
```
node bin/www
```
PS! use [pm2](http://pm2.keymetrics.io) for better control  


## Automate backup
install [gdrive](https://github.com/prasmussen/gdrive#downloads) and authenticate
```
create gdrive
sudo wget https://docs.google.com/uc?id=0B3X9GlR6EmbnQ0FtZmJJUXEyRTA&export=download
sudo chmod +x gdrive

gdrive list
```

Add backup script for example to `sudo nano /opt/bckp.sh`
```
#!/bin/sh
_now=$(date +"%d_%m_%Y")
#_file="/opt/backup/mongodump-$_now"
_folder="$_now"
_file="$_folder/mongodump-$_now"

_leplannerDir="/var/www/html/leplanner-beta"
_backupLocation="/opt/backup";

mongodump --host 127.0.0.1 --port 26016 --username MONGOUSERNAME --password MONGOPASSWORD --db leplanner  --$

cp -a "$_leplannerDir/public/images/scenario-thumbs" "$_backupLocation/$_folder"
cp -a "$_leplannerDir/public/images/user" "$_backupLocation/$_folder"
echo "copied"
_tarfile="$_now.tar"
tar -cf "$_backupLocation/tar/$_tarfile" -C "$_backupLocation/$_folder" .
echo "zipped"

#echo "LePlanner backup - $_now" | mail -s "LePlanner backup - $_now" EMAIL

_data=`/opt/gdrive --config /home/LINUXUSERNAMEWITHAUTHENTICATEDGDRIVE/.gdrive upload "$_backupLocation/tar/$_tarfile" --parent GOOGLEDRIVEFOLDERID --name$

#_data=`/opt/gdrive list --query "name contains '$_tarfile' and trashed = false " --order "modifiedTime desc" -m 1`
echo $_data
_arr=($_data)
#echo "id: ${arr[5]} file: ${arr[6]} size: ${arr[8]} ${arr[9]} date-time: ${arr[10]} ${arr[11]}"

/opt/gdrive --config /home/LINUXUSERNAMEWITHAUTHENTICATEDGDRIVE/.gdrive share --type user --email EMAILTOSHAREFILEWITHANDSENDNOTIFICATION ${_arr[3]}
```
add cronjob TO RUN ONCE A WEEK AND NOTIFY TO EMAIL
```
sudo crontab -e

MAILTO=EMAILTONOTIFY
59 23 * * 0 bash /opt/bckp.sh
```
