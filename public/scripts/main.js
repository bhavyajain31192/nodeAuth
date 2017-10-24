$(document).ready(function() {

    //ajax call config, http interceptor
    $.ajaxSetup({
    beforeSend: function (xhr)
    {
       xhr.setRequestHeader("Accept","application/vvv.website+json;version=1");
       xhr.setRequestHeader("Authorization", Cookies.get('access_token'));        
    }
    });

    // datatables intialization
    $('#inventory-list').DataTable();
    //logout
    $('#logout').click(function(e){
        e.preventDefault;
       
        $.post('/logout', {}, function(data) {
            Cookies.remove('access_token', { path: '' });
        })
    });
    // user Registration
    $('#register').click(function(e){
        e.preventDefault;
        var data = {
            name: $('#name').val(),
            email: $('#email').val(),
            num: $('#phone').val(),
            pass: $('#password').val()
        }
        $.post('/signup', data, function(data) {
            console.log(data);
            if(data.token) {
                window.location.href = '/';
            }
        })
    });
    // inventory creation
    
    $('#createInventoryItem').click(function(e){
        e.preventDefault;
        var data = {
            name: $('#name').val(),
            qty: $('#qty').val()
        }
        $.post('/api/inventory', data, function(data) {
            console.log(data);
            if(data.redirectTo) {
                window.location.href = data.redirectTo;
            }
            
        })
    });

    // inventory updation
     $('#editInventoryItem').click(function(e){
        e.preventDefault;
        var data = {
            name: $('#name').val(),
            qty: $('#qty').val()
        }
        $.post('/api/inventory/'+$('#inventory_id').val(), data, function(data) {
            console.log(data);
            if(data.redirectTo) {
                window.location.href = data.redirectTo;
            }
            
        })
    });
    // inventory deletion
     $('.deleteInventoryItem').click(function(e){
        $.ajax({
            url: '/api/inventory/'+$(this).attr('item'),
            type: 'DELETE',
            success: function(data) {
            console.log(data);
            if(data.redirectTo) {
                window.location.href = data.redirectTo;
            }
            }
         });
    });
});    