/************************************************************************** 
***************************************************************************/

function story3() {

    var search = server + '/search';

    function initPage() {
        try {
           document.getElementById("findBuddy3").addEventListener('click', Search_Submit, false);
        } catch(failed) {
        }    
    }

    function Search_Submit(event) {
	var req = new XMLHttpRequest();
	var payload = {
		homezipCode:document.getElementById('homezipCode3').value,
		workzipCode:document.getElementById('workzipCode3').value,
		leavehome:document.getElementById('leavehome3').value,
		leavework:document.getElementById('leavework3').value,
		waittime:document.getElementById('waittime3').value
	};
	req.open('POST','/search', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			console.log(response);
			tabulateData(response);
		} else {
			console.log("Server request error");
		}
	});		
	req.send(JSON.stringify(payload));
	event.preventDefault();
    }


    function tabulateData(data) {

	var node = document.getElementById('matches');
	while (node.firstChild){
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
        //var headerData_connect = document.createElement('td');
        var headerData_message = document.createElement('td');  
        headerData_name.textContent = "Name";
        headerRow.appendChild(headerData_name);
        //headerRow.appendChild(headerData_connect);
	headerData_message.textContent = "Message";
        headerRow.appendChild(headerData_message);             
        header.appendChild(headerRow);
        table.appendChild(header);

        var addColData = function(name, id, j) { 
            var bodyRow = document.createElement('tr');
            var bodyData_name = document.createElement('td');  
            //var bodyData_connect = document.createElement('td');
            //var connectButton = document.createElement('input');
            var bodyData_message = document.createElement('td');      
            var messageButton = document.createElement('input');      
            var bodyData_send = document.createElement('td');        
            var sendButton = document.createElement('input');       
            bodyData_name.textContent = name; 
            //connectButton.type = "submit";
            //connectButton.value = "connect";
            //connectButton.id = id;
            //bodyData_connect.appendChild(connectButton);
            messageButton.type = "text";                         
            messageButton.id = "message" + id;                   
            sendButton.type = "submit";                         
            sendButton.value = "send";                           
            sendButton.id = "send" + id;                           
            bodyData_message.appendChild(messageButton);          
            bodyData_message.appendChild(sendButton);             
            bodyRow.appendChild(bodyData_name);
            //bodyRow.appendChild(bodyData_connect);
            bodyRow.appendChild(bodyData_message);                  
            bodyRow.id = "row" + id;
            return bodyRow;
        }

        var rows = [];
        for ( var i = 0; i < data['names'].length; i++){
           rows.push(addColData(data['names'][i], data['emails'][i], i));
        }

        for ( var i = 0; i < rows.length; i++){
           body.appendChild(rows[i]);
        }

        table.appendChild(body);
       /*
       var bindConnectButtons = function(id, email){

          return document.getElementById(id).addEventListener('click', function(event){
              var req = new XMLHttpRequest();
              var query = "topic=carpool&email=" + email; 
              req.open('GET','/subscribe?' + query, true);

              req.addEventListener('load', function(){
                   if(req.status >= 200 && req.status < 400){
                       document.getElementById(id).disabled = true;
                       document.getElementById(id).value = "Subscribed";
                   } else {
                       console.log("Server request error");
                   }
              });

             req.send(null);
             event.preventDefault();
          });
       }

       var connectButtons = [];
       for ( var i = 0; i < data['id'].length; i++){
          connectButtons.push(bindConnectButtons(data['id'][i],data['emails'][i]));
       } 
      */
  
        var bindMsgButtons = function(id) {
	
	    return document.getElementById('send'+id).addEventListener('click', function(event) {
                var req = new XMLHttpRequest();
                var message = document.getElementById('message'+id).value;
	        var query = "topic=carpool&message=" + message;
                req.open('GET', '/message?' + query, true);
		
	        req.addEventListener('load', function(){
                    if(req.status >= 200 && req.status < 400){
                       document.getElementById('send'+id).disabled = true;
                       document.getElementById('send'+id).value = "Sent!";
		       document.getElementById('message'+id).disabled = true;
                    } else {
                       console.log("Server request error");
                    }    
                });

                req.send(null);
                event.preventDefault(); 
           });   
        }
   
        var connectMsgButtons = [];
        for (var i = 0; i < data['emails'].length; i++) {
	    connectMsgButtons.push(bindMsgButtons(data['emails'][i]));   
        }
    }	
   
    initPage();
}
