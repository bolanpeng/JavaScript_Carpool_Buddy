/************************************************************************** 
***************************************************************************/

function unit2() {

     if (typeof server === 'undefined')  { server = 'http://localhost:3000'; }
     var loaddb = server + '/loaddb';
     var search = server + '/search';

     //*********************************************************************************************
     //     Define how results sent back from Server is processed and displayed on Client
     //*********************************************************************************************
 
   
     //This function is called by the server when returning query results
     var test1_loaddb_callback =  {
         success: function(req,id) {
                    Test1_Search();   
                  },
         failure: function(req,id) {
                    Process_Results('Test 1', null, null, false);       
                  }     
     };
     var test1_search_callback =  {
         success: function(req,id) {
                    var response = JSON.parse(req.responseText);
                    var description = 'Test 1';
                    var expected = Expected(description);
                    var results  = response.emails;
	            Process_Results(description, results, expected, true);    
                  },
         failure: function(req,id) {
                    Process_Results('Test 1', null, null, false);       
                  }     
     };


     var test2_loaddb_callback =  {
         success: function(req,id) {
                    Test2_Search();   
                  },
         failure: function(req,id) {
                    Process_Results('Test 2', null, null, false);       
                  }     
     };
     var test2_search_callback =  {
         success: function(req,id) {
                    var response = JSON.parse(req.responseText);
                    var description = 'Test 2';
                    var expected = Expected(description);
                    var results  = response.emails;
	            Process_Results(description, results, expected, true);    
                  },
         failure: function(req,id) {
                    Process_Results('Test 2', null, null, false);       
                  }     
     };

     var test3_loaddb_callback =  {
         success: function(req,id) {
                    Test3_Search();   
                  },
         failure: function(req,id) {
                    Process_Results('Test 3', null, null, false);       
                  }     
     };
     var test3_search_callback =  {
         success: function(req,id) {
                    var response = JSON.parse(req.responseText);
                    var description = 'Test 3';
                    var expected = Expected(description);
                    var results  = response.emails;
	            Process_Results(description, results, expected, true);    
                  },
         failure: function(req,id) {
                    Process_Results('Test 3', null, null, false);       
                  }     
     };

     var test4_loaddb_callback =  {
         success: function(req,id) {
                    Test4_Search();   
                  },
         failure: function(req,id) {
                    Process_Results('Test 4', null, null, false);       
                  }     
     };
     var test4_search_callback =  {
         success: function(req,id) {
                    var response = JSON.parse(req.responseText);
                    var description = 'Test 4';
                    var expected = Expected(description);
                    var results  = response.emails;
	            Process_Results(description, results, expected, true);    
                  },
         failure: function(req,id) {
                    Process_Results('Test 4', null, null, false);       
                  }     
     };

     var test5_loaddb_callback =  {
         success: function(req,id) {
                    Test5_Search();   
                  },
         failure: function(req,id) {
                    Process_Results('Test 5', null, null, false);       
                  }     
     };

     var test5_search_callback =  {
         success: function(req,id) {
                    var response = JSON.parse(req.responseText);
                    var description = 'Test 5';
                    var expected = Expected(description);
                    var results  = response.emails;
	            Process_Results(description, results, expected, true);    
                  },
         failure: function(req,id) {
                    Process_Results('Test 5', null, null, false);       
                  }     
     };

     var test6_loaddb_callback =  {
         success: function(req,id) {
                    Test6_Search();   
                  },
         failure: function(req,id) {
                    Process_Results('Test 6', null, null, false);       
                  }     
     };
     var test6_search_callback =  {
         success: function(req,id) {
                    var response = JSON.parse(req.responseText);
                    var description = 'Test 6';
                    var expected = Expected(description);
                    var results  = response.emails;
	            Process_Results(description, results, expected, true);    
                  },
         failure: function(req,id) {
                    Process_Results('Test 6', null, null, false);       
                  }     
     };

     var test7_loaddb_callback =  {
         success: function(req,id) {
                    Test7_Search();   
                  },
         failure: function(req,id) {
                    Process_Results('Test 7', null, null, false);       
                  }     
     };
     var test7_search_callback =  {
         success: function(req,id) {
                    var response = JSON.parse(req.responseText);
                    var description = 'Test 7';
                    var expected = Expected(description);
                    var results  = response.emails;
	            Process_Results(description, results, expected, true);    
                  },
         failure: function(req,id) {
                    Process_Results('Test 7', null, null, false);       
                  }     
     };

     var test8_loaddb_callback =  {
         success: function(req,id) {
                    Test8_Search();   
                  },
         failure: function(req,id) {
                    Process_Results('Test 8', null, null, false);       
                  }     
     };
     var test8_search_callback =  {
         success: function(req,id) {
                    var response = JSON.parse(req.responseText);
                    var description = 'Test 8';
                    var expected = Expected(description);
                    var results  = response.emails;
	            Process_Results(description, results, expected, true);    
                  },
         failure: function(req,id) {
                    Process_Results('Test 8', null, null, false);       
                  }     
     };

     //This function processes the response sent by the server
     function Process_Results(description, response, expected, success) {
        if (success) {		
             var status = TestCompare(expected, response);
             var parms = { 'test-description': description, 
                           'test-expected': Format(expected),
                           'test-results': Format(response),
                           'test-status': status  };
        } else {
             var parms = { 'test-description': desciption, 
                           'test-expected': Format(expected),
                           'test-results': Format([]),
                           'test-status': 'FAILED'  };      
        }
        for (var parm in parms) {
           try { 
             document.getElementById(parm).textContent = parms[parm];
           } catch(failed) {
           }	
        }	
     }

     function Expected(test) {
        var expect = [];
        if (test == "Test 1") { expect = [ 'hengar@gmail.com', 'baptistaf@gmail.com', 'rollinn@gmail.com']; }
        if (test == "Test 2") { expect = [ 'rollinn@gmail.com' ]; }
        if (test == "Test 3") { expect = [ 'aitkent@gmail.com', 'nichollsj@gmail.com', 'fiorinij@gmail.com' ]; }
        if (test == "Test 4") { expect = [ ]; }
        if (test == "Test 5") { expect = [ 'kimbrelln@gmail.com', 'remigiod@gmail.com', 'hillerd@gmail.com' ]; }
        if (test == "Test 6") { expect = [ 'kimbrelln@gmail.com', 'remigiod@gmail.com', 'hillerd@gmail.com' ]; }
        if (test == "Test 7") { expect = [ ]; }
        if (test == "Test 8") { expect = [ 'damored@gmail.com', 'gaddisp@gmail.com', 'renegerh@gmail.com' ]; }

        return expect;
     }


     function Format(array) {
         var str = '';
         for (var i=0; i < array.length; i++) {
           str = str + array[i] + "  ";
         }
         return str;

     }

     function TestCompare(expected, results) {
        if (expected.length != results.length) { return "FAILED"; }
        for(var i=0; i < expected.length; i++) {
           if (notFound(expected[i], results)) { return "FAILED"; }
        }
        return "PASSED";
     }

     function notFound(target, array) {
        for (var i=0; i < array.length; i++) {
           if (target == array[i]) { return 0; }
        }
        return 1;
     }

     //*********************************************************************************************
     //                    Define form event handlers on client side
     //*********************************************************************************************	
	
     // This function is called after the web page is loaded.	
     function initPage() {
     
       try {
           document.getElementById("unit2-test1-submit").addEventListener('click', Test1_Submit, false);
           document.getElementById("unit2-test2-submit").addEventListener('click', Test2_Submit, false);
           document.getElementById("unit2-test3-submit").addEventListener('click', Test3_Submit, false);
           document.getElementById("unit2-test4-submit").addEventListener('click', Test4_Submit, false);
           document.getElementById("unit2-test5-submit").addEventListener('click', Test5_Submit, false);
           document.getElementById("unit2-test6-submit").addEventListener('click', Test6_Submit, false);
           document.getElementById("unit2-test7-submit").addEventListener('click', Test7_Submit, false);
           document.getElementById("unit2-test8-submit").addEventListener('click', Test8_Submit, false);
        } catch(failed) {
           
        }    
     }

     //Define action when form is submitted.
     function Test1_Submit(event) {
        event.preventDefault(); 
        sendGetRequest(loaddb, test1_loaddb_callback);
     }
     function Test1_Search(event) {
        var payload = {"homezipCode":"90004",
                       "workzipCode":"90010",
                       "leavehome":"07:00:00",
                       "leavework":"16:30:00",
                       "waittime":"30"};
        sendPostRequest(search, payload, test1_search_callback);
     }


     function Test2_Submit(event) {
        event.preventDefault(); 
        sendGetRequest(loaddb, test2_loaddb_callback);
     }
     function Test2_Search(event) {
        var payload = {"homezipCode":"90005",
                       "workzipCode":"90010",
                       "leavehome":"08:00:00",
                       "leavework":"17:30:00",
                       "waittime":"30"};
        sendPostRequest(search, payload, test2_search_callback);
     }


     function Test3_Submit(event) {
        event.preventDefault(); 
        sendGetRequest(loaddb, test3_loaddb_callback);
     }
     function Test3_Search(event) {
        var payload = {"homezipCode":"90005",
                       "workzipCode":"90009",
                       "leavehome":"08:00:00",
                       "leavework":"17:30:00",
                       "waittime":"30"};
        sendPostRequest(search, payload, test3_search_callback);
     }

     function Test4_Submit(event) {
        event.preventDefault(); 
        sendGetRequest(loaddb, test4_loaddb_callback);
     }
     function Test4_Search(event) {
        var payload = {"homezipCode":"90005",
                       "workzipCode":"90009",
                       "leavehome":"07:00:00",
                       "leavework":"16:30:00",
                       "waittime":"30"};
        sendPostRequest(search, payload, test4_search_callback);
     }

     function Test5_Submit(event) {
        event.preventDefault(); 
        sendGetRequest(loaddb, test5_loaddb_callback);
     }
     function Test5_Search(event) {
        var payload = {"homezipCode":"90001",
                       "workzipCode":"90011",
                       "leavehome":"07:00:00",
                       "leavework":"16:30:00",
                       "waittime":"0"};
        sendPostRequest(search, payload, test5_search_callback);
     }

     function Test6_Submit(event) {
        event.preventDefault(); 
        sendGetRequest(loaddb, test6_loaddb_callback);
     }
     //Define action when form is submitted.
     function Test6_Search(event) {
        var payload = {"homezipCode":"90001",
                       "workzipCode":"90011",
                       "leavehome":"07:00:00",
                       "leavework":"16:30:00",
                       "waittime":"60"};
        sendPostRequest(search, payload, test6_search_callback);
     }

     function Test7_Submit(event) {
        event.preventDefault(); 
        sendGetRequest(loaddb, test7_loaddb_callback);
     }
     function Test7_Search(event) {
        var payload = {"homezipCode":"90002",
                       "workzipCode":"90015",
                       "leavehome":"07:00:00",
                       "leavework":"16:30:00",
                       "waittime":"0"};
        sendPostRequest(search, payload, test7_search_callback);
     }

     //Define action when form is submitted.

     function Test8_Submit(event) {
        event.preventDefault(); 
        sendGetRequest(loaddb, test8_loaddb_callback);
     }
     function Test8_Search(event) {
        var payload = {"homezipCode":"90002",
                       "workzipCode":"90015",
                       "leavehome":"07:00:00",
                       "leavework":"16:30:00",
                       "waittime":"60"};
        sendPostRequest(search, payload, test8_search_callback);
     }
 
    //-----------------------------------------------------------------------------------------------------------
     function sendGetRequest(url, callback) {
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
     function sendPostRequest(url, payload, callback) {
        if (!window.XMLHttpRequest ) { 
          return null;
        }
        req = new XMLHttpRequest();
        req.open('POST', url, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
               if (req.status === 200) {
                  callback.success(req);
               } else {
                  callback.failure(req);  
               }
            }  	  
        }
        req.send(JSON.stringify(payload));
     }
     initPage();
}

