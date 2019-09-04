# db2 docker setup instruction
1) Go to https://hub.docker.com and create a free account (or use existing if you already have one)
2) Go to https://hub.docker.com/_/db2-developer-c-edition and choose `Proceed to checkout`, fill-in the contact form, agree to terms of service and click `Get Content`
3) On the docker command line run `docker login` and pass in your `hub.docker.com` credentials created in step 1)
4) On the docker command line run `glossary-poc/glossary-docker/setupBGDocker.sh`

Successful ouptput should look like:
```
$ glossary-poc/glossary-docker/setupBGDocker.sh
Removing old resources
Stopping db2 ... done
Removing db2 ... done
Removing network glossarydocker_default
Removing volume glossarydocker_db2_data
Creating network "glossarydocker_default" with the default driver
Creating volume "glossarydocker_db2_data" with default driver
Creating db2 ... done

Waiting for services to go up
......................ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
.ls: cannot access /database/data/db2inst1/NODE0000: No such file or directory
(*) Setup has completed.
```

5) Test your db connection using: <br/>
 On Linux/MAC: `jdbc:db2://localhost:50000/BG`<br/>
 On Windows:  `jdbc:db2://<docker-machine ip>:50000/BG`<br/>
 Username: `db2inst1`<br/>
 Password: `db2inst1`
