var database = firebase.database();
var thisID = document.getElementById("birth_text");

var ref = database.ref().child("Birthdays"); 


ref.on("child_added", gotData);


function gotData(data)
{

	var name = data.child("Name").val();
	var date = data.child("Date").val();
	console.log(name, date);

	thisID.innerHTML = name;
	thisID.innterHTML = date;
	//console.log(data.val());
}
