# Owl representation data
Linked Data Viewer Project in PHP 7 &amp; JS 

## Dev Env Installation (linux)
Presuppose: python3 is already installed.

* Installing Apache2 server

`sudo apt-get install apache2`

* Installing php7.0

`sudo apt-get install php7.0`

* Installing the good lib to run php7 on apache2

`sudo apt-get install libapache2-mod-php7.0`

* Installing a URL request library

`sudo apt-get install php7.0-curl`

* Installing the XML library

`sudo apt-get install php7.0-xml`

* Don't forger to restart your server

`sudo service apache2 restart`

## Git Manual

Configs
---------------------------------------------------------------
```bash
git config --global user.name "<username>"

git config --global user.email <mail>

git config --list

git config --global alias.co checkout
```

Base Commands
---------------------------------------------------------------

Init a repo from local: `git init`

Get a git repo:
```bash
git remote add origin git@github.com:<username>/<repo_name>.git
Or git remote add origin https://github.com/<username>/<repo_name>.git
Or git clone https://github.com/<username>/<repo_name>.git
```

Add files for git: `git add ~/ur/path/directory/file`

Get informations: `git status`

Up to date: `git pull`

Commit & Push
```bash
git commit -m "explicit message" # -m for the message
git commit -a -m "message" # -a automatic add

git push origin master
```
Back to latest version: `git checkout -f`

Avoid username and pwd for push
---------------------------------------------------------------
* Create a SSH key: `ssh-keygen -t rsa`

* Add to the agent: `ssh-add ~/.ssh/id_rsa`

* Add it on your github account: https://github.com/settings/ssh

* Make sure config is ok: `git config --global push.default simple`

You can see: `git remote show origin`

You need: `git+ssh://git@github.com/<username>/<repo_name>.git`

And change if needed: `git remote set-url origin git+ssh://git@github.com/<username>/<repo_name>.git`

Branch (example change README)
---------------------------------------------------------------
```bash
git co -b <branch_name>
git branch
git mv README README.md
gedit README.md
git commit -a -m "README file improvement"
```
* Merge with master branch
```bash
git checkout master (Use to jump from branch to branch)
git merge modify-README
```
Delete: `git branch -d modify-README`

Heroku
---------------------------------------------------------------
Deployment on Heroku
```bash
sudo install heroku

heroku create

git push heroku master

Rename: heroku rename <new_name>
```
