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
    var firstTrainConverted;
    var frequency;
    var nextArrival;
    var minutesAway;
    var currentTime;
    var diffTime;
    var remainder;
    var nextTrain;
    var database = firebase.database();


    // Empties the user input areas
    function emptyInput() {
        $("#trainName").val('');
        $("#destination").val('');
        $("#firstTrain").val('');
        $("#frequency").val('');
    }

    // When Submit button is clicked
    $("#submit").on('click', function () {

        // Assigns user input to variables
        trainName = $("#trainName").val();
        destination = $("#destination").val();
        firstTrain = $("#firstTrain").val();
        frequency = $("#frequency").val();
        // Calculate arrival time & minutes away
        // First Train (pushed back 1 year to make sure it comes before current time)
        firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        currentTime = moment();
        console.log("Current time: " + moment(currentTime).format("hh:mm"));
        // Difference between the times
        diffTime = moment().diff(moment(firstTrainConverted), "minutes");
        console.log("Difference in time: " + diffTime);
        // Time apart (remainder)
        remainder = diffTime % frequency;
        console.log(remainder);
        // Minute Until Train
        minutesAway = frequency - remainder;
        console.log("Minutes until next train: " + minutesAway);
        // Next Train
        nextTrain = moment().add(minutesAway, "minutes").format("hh:mm");
        console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));


        emptyInput();
        // console.log(trainName, destination, firstTrain, frequency)

        // Code for handling the push
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            minutesAway: minutesAway,
            nextTrain: nextTrain,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    })


    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref()
        .orderByChild("dateAdded")
        .on("child_added", function (snapshot) {
            // storing the snapshot.val() in a variable for convenience
            var sv = snapshot.val();

            // // Console.logging the last user's data
            // console.log(sv.trainName);
            // console.log(sv.destination);
            // console.log(sv.firstTrain);
            // console.log(sv.frequency);

            var infoRow = $("<tr>")
            infoRow.append("<th>" + sv.trainName + "</th>")
            infoRow.append("<td>" + sv.destination + "</td>")
            // infoRow.append("<td>" + sv.firstTrain + "</td>")
            infoRow.append("<td>" + sv.frequency + " minutes</td>")
            infoRow.append("<td>" + sv.nextTrain + "</td>")
            infoRow.append("<td>" + sv.minutesAway + "</td>")
            // infoRow.append("<td>$" + sv.rate + "</td>")
            // infoRow.append("<td>$" + billed + "</td>")
            $("#trainInfo").append(infoRow)

            // Handle the errors
        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });



})();