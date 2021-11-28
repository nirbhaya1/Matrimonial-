$(document).ready(function(){
    $('.header').height($(window).height());


$('form[id="login"]').submit( function(e) {
  e.preventDefault();
 
  var datastring = $("#login").serialize();
  $("#loginbtn").hide();
  $("#loginbtnLoader").css("display","inline-block");
  $.post("api/users/login", datastring, function(result){
    console.log(result)
    if(result.message == 'failed'){
      alert("Email or password is not valid!")
      $("#loginbtn").show();
    $("#loginbtnLoader").css("display","none");
    }
    else
    {
       window.location.href = '/'
    }
    
  }).fail(function() {
    $("#loginbtn").show();
    $("#loginbtnLoader").css("display","none");
  });


})

    $('form[id="register"]').validate({
    errorClass: "error text-danger",
    rules: {
      firstName : {
        required: true,
        minlength: 3
      },
      birthDate:{
        required: true
      },
      gender:{
        required: true
      },
      password:{
        required: true
      },
      confpassword:{
        required: true
      },
      
      email: {
        required: true,
        email: true
      },
      height: {
        required: true,
        number: true,
        min: 0
      },
      weight: {
        required: true,
        number: true,
        min: 0
      },
      caste : {
        required: true,
        minlength: 3
      },
      profession : {
        required: true,
        minlength: 3
      },
      bio : {
        required: true,
        minlength: 10
      }
    },

    messages : {
      firstName: {
        minlength: "Name should be at least 3 characters"
      },
      caste: {
        minlength: "Caste should be at least 3 characters"
      },
      profession: {
        minlength: "Profession should be at least 3 characters"
      },
      bio: {
        minlength: "Bio should be at least 10 characters"
      },
      birthDate:{
        required: "Please enter your birth date"
      },
      gender:{
        required: "Please select gender"
      },
      password:{
        required: "Please enter password"
      },
      confpassword:{
        required: "Please enter confirm password"
      },
      
      email: {
        email: "The email should be in the format: abc@domain.tld"
      },
      weight: {
        required: "Please enter your weight as a numerical value",
        number: "Please enter your weight as a numerical value"
      },
      height: {
        required: "Please enter your height as a numerical value",
        number: "Please enter your height as a numerical value"
      }
    },
    submitHandler: function(form) {

      $("#register").on("submit", function (e) {
                e.preventDefault();
                
                var datastring = $("#register").serialize();
                $("#userRegister").hide();
                $("#userRegisterLoader").css("display","inline-block");

                $.post("api/users/registration", datastring, function(result){
                    window.location.href = '/login'
                }).fail(function() {
    alert( "error" );
    $("#userRegister").show();
    $("#userRegisterLoader").css("display","none");
  });


               

            });

      

      
    }
  });
    
    



  


  })

