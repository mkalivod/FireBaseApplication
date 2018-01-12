

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDuFJv50jXM8EIzeftk-bHIKJ5PD7sKsWs",
    authDomain: "train-schedule-39ef2.firebaseapp.com",
    databaseURL: "https://train-schedule-39ef2.firebaseio.com",
    projectId: "train-schedule-39ef2",
    storageBucket: "train-schedule-39ef2.appspot.com",
    messagingSenderId: "531659992277"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  //BUTTON TO ADD TRAINS
  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

      var trainName = $("#train-name-input").val().trim();
      var trainDestination = $("#destination-input").val().trim();
      //var trainFirstArrival = moment($("#first-arrival-input").val().trim(), "DD/MM/YY").format("X");
      var trainFrequency = $("#frequency-input").val().trim();

      //TEMPORARY OBJECT TO HOLD TRAIN DATA
      var newTrain = {
          name: trainName,
          destination: trainDestination,
          firstArrival: trainFirstArrival,
          frequency: trainFrequency
      };

      //UPLOAD TRAIN DATA TO THE DATABASE
      database.ref().push(newTrain);

      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.firstArrival);
      console.log(newTrain.frequency);

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-arrival-input").val("");
      $("#frequency-input").val("");
  });


  //FIREBASE EVENT TO ADD TRAIN TO DATABASE AND TO HTML

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
     
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    //var trainFirstArrival = childSnapshot.val().firstArrival;
    var trainFrequency = childSnapshot.val().frequency;


    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirstArrival);
    console.log(trainFrequency);




    $("#currentTrain-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
     "<tr><td>" + trainFrequency + "</td><td>");
 
});