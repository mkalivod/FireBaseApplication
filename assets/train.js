
$(document).ready(function () {
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

  firebase.initializeApp(config);
  
    var database = firebase.database();
  
    // set current time on jumbotron element 
  
    // RegEx for clock function
    var re = new RegExp("[0][0]$")
  
    var time = new Date();
  
    function updateTime() {
  
      time = new Date().getTime();
  
      $("#time").html(moment().format("h:mm:ss"));
      if (re.test(moment().format("h:mm:ss"))) {
        location.reload();
      }
    }
  
    $(function () {
      updateTime();
      setInterval(updateTime, 1000);
    });
  
    // 2. Button for adding Employees
    $("#submitButton").on("click", function (event) {
      event.preventDefault();
  
      // Grabs user input
      var trainName = $("#trainName").val().trim();
      var trainDest = $("#destination").val().trim();
      var trainTime = $("#firstTrain").val().trim();
      var frequency = $("#frequency").val().trim();
  
  
      // Uploads employee data to the database
      database.ref().push({
        trainName: trainName,
        trainDest: trainDest,
        trainTime: trainTime,
        frequency: frequency
      });
  
  
      // Logs everything to console
      console.log(trainName);
      console.log(trainName);
      console.log(trainTime);
      console.log(frequency);
  
      // Alert
      alert("Train successfully added");
  
      // Clears all of the text-boxes
      $("#trainName").val("");
      $("#destination").val("");
      $("#firstTrain").val("");
      $("#frequency").val("");
  
    });
  
    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (snapshot) {
  
      console.log(snapshot.val());
  
      // Store everything into a variable.
      var trainName = snapshot.val().trainName;
      var trainDest = snapshot.val().trainDest;
      var trainTime = snapshot.val().trainTime;
      var frequency = snapshot.val().frequency;
  
      // Employee Info
      console.log(trainName);
      console.log(trainDest);
      console.log(trainTime);
      console.log(frequency);
  
      // Time Calculations
      var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
  
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  
      var trainRemainder = diffTime % frequency;
  
      var minutesTillTrain = frequency - trainRemainder;
  
      var arrival = moment().add(minutesTillTrain, "minutes");
  
      arrivalFormat = moment(arrival).format("hh:mm");
  
      // Insert train into HTML
      $("#trainInfo").append(`
      <tr>
      <td> ${trainName} </td>
      <td> ${trainDest} </td>
      <td> ${frequency} </td>
      <td> ${arrivalFormat} </td>
      <td> ${minutesTillTrain} </td>
      </tr>`);
    });
  
  });
  
    //   // Insert train into HTML
    //   $("table").append(`
    //   <tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    //     frequency + "</td><td>" + arrivalFormat + "</td><td>" + minutesTillTrain + "</td></tr>`);
    // });