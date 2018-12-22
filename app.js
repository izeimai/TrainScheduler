// Initialize Firebase
var config = {
    apiKey: "AIzaSyBoFkPfvpN1oy5ly_rLMuN5gcNICumvAuk",
    authDomain: "trainscheduler-33b3e.firebaseapp.com",
    databaseURL: "https://trainscheduler-33b3e.firebaseio.com",
    projectId: "trainscheduler-33b3e",
    storageBucket: "trainscheduler-33b3e.appspot.com",
    messagingSenderId: "494738212067"
};

firebase.initializeApp(config);

// Creat a variable to reference the database
var database = firebase.database();

// On click event for form button
$("#add-train").on("click", function (event) {
    event.preventDefault(); // prevents page from refreshing when hitting submit button

    var trainName = $("#name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();


    // Push inputs to the database
    database.ref().push({
        name: trainName,
        destination: trainDest,
        time: trainTime,
        frequency: trainFreq
    });

}); // close click event

// Pulling information from the database
database.ref().on("child_added", function (snapshot) {
    var snap = snapshot.val(); // store values

    // Server time is available as moment()
    var currentTime = moment();
    // I could subtract a whole year, but 1 day seems sufficient for a daily train schedule
    var firstTrainTime = moment(snap.time, "HH:mm").subtract(1, "days");
    // Difference between current time and firstTrainTime in minutes
    var timeDifference = moment().diff(moment(firstTrainTime), "minutes");
    // Modulo used for the minutes remaining after difference is divided by frequency
    var timeRemaining = timeDifference % snap.frequency;
    // Subtract the remaining minutes from the frequency to get minutes until next train
    var minutesToNextTrain = snap.frequency - timeRemaining;
    // Add the minutes to next train to the current time and format to military time
    var nextTrainTime = moment().add(minutesToNextTrain, "minutes").format("HH:mm");

    // Add rows to the HTML
    var newRow = $("<tr>").append(
        $("<td>").text(snap.name),
        $("<td>").text(snap.destination),
        $("<td>").text(snap.frequency),
        $("<td>").text(nextTrainTime),
        $("<td>").text(minutesToNextTrain)
    );

    // Append the new row to the html
    $("tbody").append(newRow);

}, function (errorObject) { // Error
    console.log("Errors handled: " + errorObject.code);
});