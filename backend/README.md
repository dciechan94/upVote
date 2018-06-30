# SpringBoot - MongoDb Template

## Configuration files

1. Setting properties in ```application.properties```.
    1. Find ```application.properties_template``` file in ```./src/main/resources``` directory.
    2. Create a copy and rename it to ```application.properties```.
    3. Redefine property values according to the environmental setting you want to work with.

    Property file contains <b>MongoDB</b> connection parameters.
2. Setting logger configuration in ```log4j2.xml```.
    1. Find ```log4j2.xml_template``` file in ```./src/main/resources``` directory.
    2. Create a copy and rename it to ```log4j2.xml```.
    3. Redefine xml structure according to the environmental setting you want to work with.

    Default configuration provides logging divided into 3 log files located in ```./logs``` directory:
    1. ```apache.log``` with INFO level logging over org.apache package
    2. ```application.log``` with INFO level logging over org.apache package
    3. ```spring.log``` with INFO level logging over org.springframework package
    
## Package structure renaming
1. Make sure ```@ComponentScan``` and ```@EnableMongoRepositories``` annotations points to the correct packages after the package name refactoring. You can use ```CoreConfigConstants``` variables to automate the process.

2. Make sure logger configuration (```log4j2.xml```) is up-to-date .