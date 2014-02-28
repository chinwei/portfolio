/* global $,document,console,Parse */
$(document).ready(function() {
  
  var parseAPPID = "xnbnZqfqDnXdTvIPR813AcqF3rjE1QSWL7on9Hbq";
  var parseJSID = "iIWzUXFpzmMukn1JAIcOepOaZ5fkz412Pj0Yd83Q";
  
  Parse.initialize(parseAPPID, parseJSID);
  var CommentObject = Parse.Object.extend("hello");
  
  $( "#commentForm" ).validate({
      errorPlacement: function(error,element) {
      return true;
    }
  });
  
  $("#commentForm").on("submit", function(e) {
    e.preventDefault();

    if (!$("form").valid()) return false;

    console.log("Handling the submit");
    //add error handling here
    //gather the form data
    // TweenLite.to($('#submit-loader'), 0.8, {autoAlpha: 1, ease:Power2.easeInOut})

    $('#submit-btn').addClass('active');


    var data = {};
    data.name = $("#name").val();
    data.email = $("#email").val();
    data.comments = $("#comments").val();

    var comment = new CommentObject();
    comment.save(data, {
      success:function() {
        console.log("Success");
        
        TweenLite.to($('#thank-you-note'), 0.8, {autoAlpha: 1, paddingTop: 50, height: 150, ease:Power2.easeInOut})
        TweenLite.to($('#commentForm'), 0.8, {autoAlpha: 0, height: 0, ease:Power2.easeInOut})
        
        Parse.Cloud.run('hello', { 
              "name": data.name,
              "email": data.email,
              "comments": data.comments
           }, 
           { 
              success: function(result) { 
                 
              }, 
              error: function(error) { 
                 // alert(error.message); 
              } 
           } 
        );
      },
      error:function(e) {
        console.dir(e);
      }
    });
    
  });
  
});


