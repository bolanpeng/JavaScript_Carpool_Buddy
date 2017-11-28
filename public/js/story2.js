/************************************************************************** 
***************************************************************************/

function story2() {

    var search = server + '/search';

    function initPage() {
        try {
           document.getElementById("findBuddy").addEventListener('click', Search_Submit, false);
        } catch(failed) {
        }    
    }

    function Search_Submit(event) {
        var req = new XMLHttpRequest();
	var payload = {
	   homezipCode:document.getElementById('homezipCode').value,
	   workzipCode:document.getElementById('workzipCode').value,
	   leavehome:document.getElementById('leavehome').value,
	   leavework:document.getElementById('leavework').value,
	   waittime:document.getElementById('waittime').value
	};

	req.open('POST',search, true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			tabulateData(response);
		} else {
			console.log("Server request error");
		}
	});
	req.send(JSON.stringify(payload));
	event.preventDefault();   
    }
	
    function tabulateData(data){

	var node = document.getElementById('matches');
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
	
        var table = document.getElementById('matches');
        var caption = document.createElement('caption');
        caption.textContent = "Matching Profile(s)";
        table.appendChild(caption);
        var header = document.createElement('thead');
        var body = document.createElement('tbody');
        var headerRow = document.createElement('tr');
        var headerData_name = document.createElement('td');
        var headerData_email = document.createElement('td');
        headerData_name.textContent = "Name";
        headerData_email.textContent = "Email";
        headerRow.appendChild(headerData_name);
        headerRow.appendChild(headerData_email);
        header.appendChild(headerRow);
        table.appendChild(header);

	for ( i in data['names']){
            var bodyRow = document.createElement('tr');
            var bodyData_name = document.createElement('td');  
            var bodyData_email = document.createElement('td');
            var emailForm = document.createElement('form');
            emailForm.action = "mailto:" + data['emails'][i];
            var emailButton = document.createElement('input');
            emailButton.type = "submit";
            emailButton.value = "Message";
            emailForm.appendChild(emailButton);
            bodyData_email.appendChild(emailForm);
            bodyData_name.textContent = data['names'][i];
            bodyRow.appendChild(bodyData_name);
            bodyRow.appendChild(bodyData_email);
           body.appendChild(bodyRow);
       }
       table.appendChild(body);
    }

    initPage();
}
