# FROM maven:3.8.5-openjdk-17 # for Java 17
FROM maven:3.8.2-jdk-8
#setting the working directory
WORKDIR /web-app
#copy the current directory into the container
COPY . .
#run maven to build the app
RUN mvn clean install
#the default command to run when the  container starts
CMD mvn spring-boot:run