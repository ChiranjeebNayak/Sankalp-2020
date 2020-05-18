$(document).ready(function() {
    $("#sankalp").click(function(){
            window.location.href="main.html";
          })
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please enter your Name'
                    }
                }
            },
            college_name: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please enter your Name'
                    }
                }
            },
            college_city: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please enter your Name'
                    }
                }
            },
			
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please enter your Email Address'
                    },
                    emailAddress: {
                        message: 'Please enter a valid Email Address'
                    }
                }
            },
            contact_no: {
                validators: {
                  stringLength: {
                        min: 10, 
                        max: 10,
                    },
                    notEmpty: {
                        message: 'Please enter your Contact No.'
                     }
                }
            },
			 batch: {
                validators: {
                    notEmpty: {
                        message: 'Please select your Department/Office'
                    }
                }
            },
            }
        })
        .on('success.form.bv', function(e) {
            $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');
           

            $("#loading").show();

            let indicator = 0;

            var database = firebase.database();
            database.ref('user').once('value', function(snapshot){
                if(snapshot.exists()){ 

                    snapshot.forEach(function(data){
                        var val = data.val();
                        if(val.Email==$("#email").val())
                        {
                            indicator = 1;
                           
                        }
                        

                    });
                    
                }
            });
 

            setTimeout(function(){ 


            if(indicator==0)
            {
           const ref = firebase.database().ref();
                         let fname= $("#fname").val();
                         let email=$("#email").val();
                         let contact_no=$("#contact").val();
                         let batch = $("#batch").val();
                         let college_name = $("#clgname").val();
                         let college_city = $("#college_city").val();
                         let referral=$("#Referral").val();
                         let accomodation='no';
                         let roll=$("#roll").val();
                         let aadhar=$("#aadhar").val();
                         var checkBox = document.getElementById("accomodation");
                         if (checkBox.checked == true)
                               {
                                   accomodation='yes';
                                 }
                         
                       
                          
                        
                   	  ref.child("user").push({
                               Name:fname,
                               Email:email,
                               contact:contact_no,
                               batch:batch,
                               College_name:college_name,
                               college_city:college_city,
                               accomodation:accomodation,
                               referral:referral,
                               roll:roll,
                               aadhar:aadhar,

                               
             
                           });   

                           $("#loading").hide();
                           
                           $('#success_message').slideDown({ opacity: "show" }, "slow").delay(2000).fadeOut("slow");
               
                       }
              else{

                $("#loading").hide();
               $('#fail_message').slideDown({ opacity: "show" }, "slow").delay(2000).fadeOut("slow"); 
              }
        
        
        }, 5000);
            
                      

        });

    
});

function timeFunction() {
    setTimeout(function(){ alert("After 5 seconds!"); }, 5000);
 }

 