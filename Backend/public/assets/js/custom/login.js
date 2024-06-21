// write function for onclick login button 

function login(){
    var email = $('#email-login').val();
    var password = $('#password-login').val();
    if(email == '' || password == ''){
        alert('Please enter email and password');
        return false;
    }
    $.ajax({
        url: '/auth/login',
        type: 'POST',
        data: {email: email, password: password},
        success: function(response){
            if(response.status == 'success'){
                window.location.href = '/auth/dashboard';
            }else{
                alert(response.message);
            }
        }
    });
}