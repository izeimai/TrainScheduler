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

    var trainName = $("name-input").val().trim();
    var trainDest = $("destination-input)").val().trim();
    var trainTime = $("time-input").val().trim();
    var trainFreq = $("frequency-input").val().trim();


    // Push inputs to the dtabase
    database.ref().push({
        name: trainName,
        destination: trainDest,
        time: trainTime,
        frequency: trainFreq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

}); // close click event

// Pulling information from the database
database.ref().on("child_added", function (snapshot) {
    var snap = snapshot.val(); // store values

    console.log(snap.name + snap.destination + snap.time + snap.frequency);

    // Add rows to the HTML
    var newRow = $("<tr>").append(
        $("<td>").text(snap.name),
        $("<td>").text(snap.destination),
        $("<td>").text(snap.freq),
        $("<td>").text("Next Arrival"),
        $("<td>").text("Minutes away")
    );

}, function (errorObject) { // Error
    console.log("Errors handled: " + errorObject.code);
});