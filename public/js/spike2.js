/************************************************************************** 
***************************************************************************/

function spike2() {

     if (typeof server === 'undefined')  { server = 'http://localhost:3003'; }
     var spike = server + '/s2?';

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
           document.getElementById("spike2-submit").addEventListener('click', Spike_Submit, false);
           document.getElementById("spike2-reset").addEventListener('click', Spike_Reset, false);
        } catch(failed) {
 
        }    
 
     }

    //-----------------------------------------------------------------------------------------------------------
     function Spike_Submit(event) {
        event.preventDefault();
        var url = spike;
        url = url + "email=" + document.getElementById("spike2-email").value;
        url = url + "&topic=" + document.getElementById("spike2-topic").value;
        sendRequest(url, spike_callback);
     }
     //-----------------------------------------------------------------------------------------------------------
     function Spike_Reset() {
        document.getElementById("spike2-status").textContent = null;;
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
           var parms = { 'spike2-status':response.status };
        } else {
           var parms = { 'spike2-status':null };
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

