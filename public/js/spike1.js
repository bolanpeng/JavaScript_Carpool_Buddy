/************************************************************************** 
***************************************************************************/

function spike1() {

     if (typeof server === 'undefined')  { server = 'http://localhost:3003'; }
     var spike = server + '/s1?';


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
           document.getElementById("spike1-submit").addEventListener('click', Spike_Submit, false);
           document.getElementById("spike1-reset").addEventListener('click', Spike_Reset, false);
        } catch(failed) {

        }    
     }

     //-----------------------------------------------------------------------------------------------------------
     function Spike_Submit(event) {
        event.preventDefault();
        var url = spike;
        url = url + "address1=" + document.getElementById("spike1-address1").value;
        url = url + "&city1=" + document.getElementById("spike1-city1").value;
        url = url + "&state1=" + document.getElementById("spike1-state1").value;
        url = url + "&address2=" + document.getElementById("spike1-address2").value;
        url = url + "&city2=" + document.getElementById("spike1-city2").value;
        url = url + "&state2=" + document.getElementById("spike1-state2").value;
        sendRequest(url, spike_callback);
     }

     //-----------------------------------------------------------------------------------------------------------
     function Spike_Reset() {
        document.getElementById("spike1-distance").textContent = null;
        document.getElementById("spike1-duration").textContent = null;
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
           var parms = { 'spike1-distance':response.distance,
                         'spike1-duration':response.duration };
        } else {
           var parms = { 'spike1-distance':null, 'spike1-duration':null };
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

