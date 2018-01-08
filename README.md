# FireBaseApplication


$("#form-btn").click(

)

- function to create object type that can create multiple objects for all the submissions made 

















reading and writing data: 
firebase data is retrieved by attaching an asynchronous listener to a firebase.database.Reference 

basic write operations: 
use set() to sava data to a specified reference --- replacing any data at that path 
    - using set() overwrites data at the specified location, including any child nodes
     function writeTrainData(trainName, trainDestination, trainFirstDeparture, trainFrequency) {
         firebase.database().ref('trains/' + name).set(){
             name: ...;
         }
     }