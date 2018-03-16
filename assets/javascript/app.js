(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD7Z2mCLTJvdDie5SQfyu5VOq3yJAMYMu0",
        authDomain: "train-scheduler-41cc0.firebaseapp.com",
        databaseURL: "https://train-scheduler-41cc0.firebaseio.com",
        projectId: "train-scheduler-41cc0",
        storageBucket: "train-scheduler-41cc0.appspot.com",
        messagingSenderId: "433615014625"
    };
    firebase.initializeApp(config);


    // Variable declarations
    var trainName;
    var destination;
    var firstTrain;
    var frequency;
    var nextArrival;
    var minutesAway;
    var database = firebase.database();


    // Empties the user input areas
    function emptyInput() {
        $("#trainName").val('');
        $("#destination").val('');
        $("#firstTrain").val('');
        $("#frequency").val('');
    }


})();