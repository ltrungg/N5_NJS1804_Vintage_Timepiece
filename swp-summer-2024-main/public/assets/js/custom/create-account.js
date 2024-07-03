

function createAccount() {
    

    var email = $('#email-create').val();
    var password = $('#password-create').val();
    var userName = $('#userName-create').val();
    var telephone = $('#telephone-create').val();
    
    if (email == '') {
        alert('Please enter email');
        return false;
    }
    if (password == '') {
        alert('Please enter password');
        return false;
    }
    if (userName == '') {
        alert('Please enter user name');
        return false;
    }
    if (telephone == '') {
        alert('Please enter telephone');
        return false;
    }
    if (telephone.length != 10) {
        alert('Telephone number must be exactly 10 digits');
        return false;
    }

    $.ajax({
        url: '/auth/create-account',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            email: email,
            password: password,
            username: userName,
            phone: telephone
        }),
        success: function(response) {
            if (response.message == 'success') {
                window.location.href = './auth/dashboard';
            } else {
                alert(response.message);
            }
        },
        error: function(xhr, status, error) {
            alert('An error occurred: ' + error);
        }
    });

    return false;
}
