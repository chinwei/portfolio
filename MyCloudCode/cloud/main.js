
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {

/* global Parse,console,require */
var Mailgun = require('mailgun');
Mailgun.initialize('chinwei.me', 'key-50hqq6ifefy-05wv5vu7l1yd8-8cd100');

	Mailgun.sendEmail({
	  to: "chinwei.w@gmail.com",
	  from: request.params.email ,
	  subject: "Email from "+request.params.name+"",
	  text: request.params.comments 
	}, {
	  success: function(httpResponse) {
	    // console.log('httpreponse is '+httpResponse);
	    // response.success('reponse is '+response);
	    // response.success('http reponse is '+httpResponse);
	  },
	  error: function(httpResponse) {
	    console.error(httpResponse);
	    response.error("Uh oh, something went wrong");
	  }
	});


});



