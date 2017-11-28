/************************************************************************** 
***************************************************************************/

function spike3() {

     if (typeof server === 'undefined')  { server = 'http://localhost:3003'; }
     var spike = server + '/s3?';

     var spike_callback =  {
         success: function(req,id) {
                  var response = JSON.parse(req.responseText);
	          Spike_Results(response, true, id);
                  },
         failure: function(req,id) {
                  Spike_Results(null, false, id);
                  }
     };
				
     //-----------------------------------------------------------------------------------------------------------		
     function initPage() {

       try {
           document.getElementById("spike3-submit").addEventListener('click', Spike_Submit, false);
           document.getElementById("spike3-reset").addEventListener('click', Spike_Reset, false);
        } catch(failed) {
     
        }    

     }

    //-----------------------------------------------------------------------------------------------------------
     function Spike_Submit(event) {
        event.preventDefault();
        var url = spike;
        url = url + "topic=" + document.getElementById("spike3-topic").value;
        url = url + "&message=" + document.getElementById("spike3-message").value;
        sendRequest(url, spike_callback);
     }

     //-----------------------------------------------------------------------------------------------------------
     function sendRequest(url, callback) {
        if (!window.XMLHttpRequest ) { 
          return null;
        }
        req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
               if (req.status === 200) {
                  callback.success(req);
               } else {
                  callback.failure(req);  
               }
            }  	  
        }
        req.send();
     }

     //-----------------------------------------------------------------------------------------------------------
     function Spike_Results(response, success) {
        if (success) {				
           var parms = { 'spike3-status':response.status };
        } else {
           var parms = { 'spike3-status':null };
        }
        for (var parm in parms) {
           try { 
             document.getElementById(parm).textContent = parms[parm];
           } catch(failed) {
             // parameter not included in returned response object  
           }	
        }	
     } 
     initPage();
}

