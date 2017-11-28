/************************************************************************** 
***************************************************************************/

function story1() {

    var insert = server + '/insert';

    function initPage() {
        try {
           document.getElementById("create_profile").addEventListener('click', Profile_Submit, false);
        } catch(failed) {
        }    
    }

    function Profile_Submit(event) {

           //Create the new request
	var req = new XMLHttpRequest();
	var profile = {name: null, email: null, homezipcode: null, workzipcode: null, leavehome: null, leavework: null, waittime: null, emptyseats: null};
	
	profile.name = document.getElementById('name').value;
	profile.email = document.getElementById('email').value;
	profile.homezipcode = document.getElementById('home_zip').value;
	profile.workzipcode = document.getElementById('work_zip').value;
	profile.leavehome = document.getElementById('leave_home').value;
	profile.leavework = document.getElementById('leave_work').value;
	profile.waittime = document.getElementById('wait_time').value;
	profile.emptyseats = document.getElementById('empty_seats').value;

	req.open('POST', insert, true);
	req.setRequestHeader('Content-Type', 'application/json');

	//Add the event listener 
	req.addEventListener('load', function(event) {
		if(req.status >= 200 && req.status < 400){

			var response = JSON.parse(req.responseText);
			
			//Clear the input values after submission
			document.getElementById('name').value = "";	
			document.getElementById('email').value = "";
			document.getElementById('home_zip').value = "";
			document.getElementById('work_zip').value = "";
			document.getElementById('leave_home').value = "";
			document.getElementById('leave_work').value = "";
			document.getElementById('wait_time').value = "";
			document.getElementById('empty_seats').value = "";

			//Write Success Message to the Screen
			var msg = document.getElementById('profile_form_result_message');
			msg.textContent = "You have successfully created a profile.";
		}	

		else {
			console.log("Error in network request: " + req.statusText);
		}
	});
	
	req.send(JSON.stringify(profile));
	event.preventDefault();	
    }
	
    initPage();
}
