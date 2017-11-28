/************************************************************************** 
***************************************************************************/

function unit1() {

     if (typeof server === 'undefined')  { server = 'http://localhost:3000'; }
     var insert = server + '/insert';
     var search = server + '/itest';
     var loaddb = server + '/loaddb?';

     //*********************************************************************************************
     //     Define how results sent back from Server is processed and displayed on Client
     //*********************************************************************************************

   
     //This function is called by the server when returning query results

     function Test_Failure(test) {
         var results = {"name":"", "email":"", "homezipcode":"", "workzipcode":"",   				"leavehome":"","leavework":"","waittime":"","emptyseats":""};
         var expected = Expected(description);
         Process_Results(description, results, expected, false);
     
     }

     var test1_loaddb_callback =  {
         success: function(req,id) {
                   Test1_Insert();
                  },
         failure: function(req,id) {
                   Process_Results('Test 1', null);     
                  }     
     };
     var test1_insert_callback =  {
         success: function(req,id) {
                   Test1_Search();
                  },
         failure: function(req,id) {
                   Process_Results('Test 1', null); 
                  }     
     };
     var test1_search_callback =  {
         success: function(req,id) {
                    var description = 'Test 1';
                    var response = JSON.parse(req.responseText);
                    if (response.length != 1) {
                       Process_Results(description, null); 
                    } else {
	               Process_Results(description, response[0]); 
                    }
                  },
         failure: function(req,id) {
                    Process_Results('Test 1', null);
                  }     
     };

     var test2_loaddb_callback =  {
         success: function(req,id) {
                   Test2_Insert();
                  },
         failure: function(req,id) {
                   Process_Results('Test 2', null);     
                  }     
     };
     var test2_insert_callback =  {
         success: function(req,id) {
                   Test2_Search();
                  },
         failure: function(req,id) {
                   Process_Results('Test 2', null); 
                  }     
     };
     var test2_search_callback =  {
         success: function(req,id) {
                    var description = 'Test 2';
                    var response = JSON.parse(req.responseText);
                    if (response.length != 1) {
                       Process_Results(description, null); 
                    } else {
	               Process_Results(description, response[0]); 
                    }
                  },
         failure: function(req,id) {
                    Process_Results('Test 2', null);
                  }     
     };
 

     var test3_loaddb_callback =  {
         success: function(req,id) {
                   Test3_Insert();
                  },
         failure: function(req,id) {
                   Process_Results('Test 3', null);     
                  }     
     };
     var test3_insert_callback =  {
         success: function(req,id) {
                   Test3_Search();
                  },
         failure: function(req,id) {
                   Process_Results('Test 3', null); 
                  }     
     };
     var test3_search_callback =  {
         success: function(req,id) {
                    var description = 'Test 3';
                    var response = JSON.parse(req.responseText);
                    if (response.length != 1) {
                       Process_Results(description, null); 
                    } else {
	               Process_Results(description, response[0]); 
                    }
                  },
         failure: function(req,id) {
                    Process_Results('Test 3', null);
                  }     
     };


     var test4_loaddb_callback =  {
         success: function(req,id) {
                   Test4_Insert();
                  },
         failure: function(req,id) {
                   Process_Results('Test 4', null);     
                  }     
     };
     var test4_insert_callback =  {
         success: function(req,id) {
                   Test4_Search();
                  },
         failure: function(req,id) {
                   Process_Results('Test 4', null); 
                  }     
     };
     var test4_search_callback =  {
         success: function(req,id) {
                    var description = 'Test 4';
                    var response = JSON.parse(req.responseText);
                    if (response.length != 1) {
                       Process_Results(description, null); 
                    } else {
	               Process_Results(description, response[0]); 
                    }
                  },
         failure: function(req,id) {
                    Process_Results('Test 4', null);
                  }     
     };

     //This function processes the response sent by the server
     function Process_Results(description, response) {
        if (response == null) {
            response = {"name":"", "email":"", "homezipcode":"", "workzipcode":"",   				"leavehome":"","leavework":"","waittime":"","emptyseats":""};
        }
        var expected = Expected(description);	
        var status = TestCompare(expected, response);
        var parms = { 'test-description': description, 
                      'name-expected': expected.name,
                      'name-results': response.name,
                      'email-expected': expected.email,
                      'email-results': response.email,
                      'homezipcode-expected': expected.homezipcode,
                      'homezipcode-results': response.homezipcode,
                      'workzipcode-expected': expected.workzipcode,
                      'workzipcode-results': response.workzipcode,
                      'leavehome-expected': expected.leavehome,
                      'leavehome-results': response.leavehome,
                      'leavework-expected': expected.leavework,
                      'leavework-results': response.leavework,
                      'waittime-expected': expected.waittime,
                      'waittime-results': response.waittime,
                      'emptyseats-expected': expected.emptyseats,
                      'emptyseats-results': response.emptyseats,
                      'test-status': status  };
 
        for (var parm in parms) {
           try { 
             document.getElementById(parm).textContent = parms[parm];
           } catch(failed) {
           }	
        }	
     }

     function Expected(test) {
        var expect = {};
        if (test == "Test 1") { expect = {"name":"Charlie Brown", 
                                          "email":"brownc@gmail.com",
                                          "homezipcode":"90001", 
                                          "workzipcode":"90009",
                                          "leavehome":"07:00:00",
                                          "leavework":"16:30:00",
                                          "waittime":"01:00:00",
                                          "emptyseats":"1"}; }
        if (test == "Test 2") { expect = {"name":"Charlie Brown", 
                                          "email":"brownc@gmail.com",
                                          "homezipcode":"90001", 
                                          "workzipcode":"0",
                                          "leavehome":"00:00:00",
                                          "leavework":"00:00:00",
                                          "waittime":"00:00:00",
                                          "emptyseats":"0"}; }
        if (test == "Test 3") { expect = {"name":"Fred Jones", 
                                          "email":"jonesf@gmail.com",
                                          "homezipcode":"90006", 
                                          "workzipcode":"90009",
                                          "leavehome":"07:00:00",
                                          "leavework":"16:30:00",
                                          "waittime":"01:00:00",
                                          "emptyseats":"1"}; }
        if (test == "Test 4") { expect = {"name":"", 
                                          "email":"",
                                          "homezipcode":"", 
                                          "workzipcode":"",
                                          "leavehome":"",
                                          "leavework":"",
                                          "waittime":"",
                                          "emptyseats":""}; }
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
        if (expected.name != results.name)                { return "FAILED"; }
        if (expected.email != results.email)              { return "FAILED"; }
        if (expected.homezipcode != results.homezipcode)  { return "FAILED"; }
        if (expected.workzipcode != results.workzipcode)  { return "FAILED"; }
        if (expected.leavehome != results.leavehome)      { return "FAILED"; }
        if (expected.leavework != results.leavework)      { return "FAILED"; }
        if (expected.waittime != results.waittime)        { return "FAILED"; }
        if (expected.emptyseats != results.emptyseats)    { return "FAILED"; }
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
           document.getElementById("unit1-test1-submit").addEventListener('click', Test1_Submit, false);
           document.getElementById("unit1-test2-submit").addEventListener('click', Test2_Submit, false);
           document.getElementById("unit1-test3-submit").addEventListener('click', Test3_Submit, false);
           document.getElementById("unit1-test4-submit").addEventListener('click', Test4_Submit, false);
        } catch(failed) {
           
        }    
     }

     //Define action when form is submitted.
     function Test1_Submit(event) {
        event.preventDefault(); 
        sendGetRequest(loaddb, test1_loaddb_callback);
     }
     function Test1_Insert(event) {
         var profile = {"name":"Charlie Brown", 
                       "email":"brownc@gmail.com",
                       "homezipcode":"90001", 
                       "workzipcode":"90009",
                       "leavehome":"07:00:00",
                       "leavework":"16:30:00",
                       "waittime":"01:00:00",
                       "emptyseats":"1"};
        sendPostRequest(insert, profile, test1_insert_callback);
     }
     function Test1_Search(event) {
        var profile =  {"email":"brownc@gmail.com" };
        sendPostRequest(search, profile, test1_search_callback);
     }

     function Test2_Submit(event) {
        event.preventDefault(); 
        sendGetRequest(loaddb, test2_loaddb_callback);
     }
     function Test2_Insert(event) {
        var profile =  {"name":"Charlie Brown", 
                        "email":"brownc@gmail.com",
                        "homezipcode":"90001", 
                        "workzipcode":'',
                        "leavehome":'',
                        "leavework":'',
                        "waittime":'',
                        "emptyseats":''};
        sendPostRequest(insert, profile, test2_insert_callback);
     }
     function Test2_Search(event) {
        var profile =  {"email":"brownc@gmail.com" }; 
        sendPostRequest(search, profile, test2_search_callback);
     }

     function Test3_Submit(event) {
        event.preventDefault(); 
        sendGetRequest(loaddb, test3_loaddb_callback);
     }
     function Test3_Insert(event) {
        var profile =  {"name":"Charlie Brown", 
                        "email":"jonesf@gmail.com",
                        "homezipcode":"90001", 
                        "workzipcode":'',
                        "leavehome":'',
                        "leavework":'',
                        "waittime":'',
                        "emptyseats":''};
        sendPostRequest(insert, profile, test3_insert_callback);
     }
     function Test3_Search(event) {
        var profile =  {"email":"jonesf@gmail.com"};
        sendPostRequest(search, profile, test3_search_callback);
     }

     function Test4_Submit(event) {
        event.preventDefault(); 
        sendGetRequest(loaddb, test4_loaddb_callback);
     }
     function Test4_Insert(event) {
        var profile = {"name":"Charlie Brown", 
                       "email":"",
                       "homezipcode":"90001", 
                       "workzipcode":"90009",
                       "leavehome":"07:00:00",
                       "leavework":"16:30:00",
                       "waittime":"01:00:00",
                       "emptyseats":"1"}; 
        sendPostRequest(insert, profile, test4_insert_callback);
     }
     function Test4_Search(event) {
         var profile =  {"email":""};
        sendPostRequest(search, profile, test4_search_callback);
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

