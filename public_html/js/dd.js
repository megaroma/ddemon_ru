//items

function TopLoginForm() {
	this.loading = function (status) {
		if(status) {
			$('#dd-auth-top-ajax-loader').show();
			$('#dd-auth-top-login-btn').addClass('btn-disabled');
			$('#dd-auth-top-login-btn').attr('disabled', 'disabled');
			$('#dd-auth-top-login-btn').prop('disabled', true); 
		} else {
			$('#dd-auth-top-ajax-loader').hide();
			$('#dd-auth-top-login-btn').removeClass('btn-disabled');
			$('#dd-auth-top-login-btn').attr('disabled', '');
			$('#dd-auth-top-login-btn').prop('disabled', false);
		}
		return true;
	}

	this.show_error = function (status) {
		if(status) {
			$('#dd-auth-top-error-msg').show();
		} else {
			$('#dd-auth-top-error-msg').hide();
		}
	}

}


var DD = (function () {
//Public
var public_ver = '1.00';

var doc_url = window.location.href;
var items = {};

function public_get_item(name) {
    if (typeof items[name]==='undefined') {
		switch (name) {
	  		case 'top-login-form':
	    	items[name] = new TopLoginForm();
	    	break;
	    	default:
	    		return false;
		}    	
    } 
    return items[name];	
}

//Private

return {
    ver: public_ver,
    get_item: public_get_item
}

})();


//events
$( document ).ready(function() {

    $('.container').on('click','.dd_change_lang', function (event) {
        event.preventDefault();
        var lang = $(this).data('lang');
        var url = window.location.href;
        if(lang == 'en') {
            url = url.replace(/\/en/g, '/ru');
        }
        if(lang == 'ru') {
            url = url.replace(/\/ru/g, '/en');
        }
        $(location).attr('href',url);
        return false;
    });

    //top menu auth login form
    $('.container').on('click','#dd-auth-top-login-btn', function (event) {
        event.preventDefault();
        var form_data = $('#dd-auth-top-login-form').serializeArray();
        var action = $('#dd-auth-top-login-form').attr('action');
        var tlogin = DD.get_item('top-login-form');
        tlogin.loading(true);
        tlogin.show_error(false);
	$.ajax({
		type: "POST",
		url: action,
		data: form_data,
		dataType: "json"
			})
			.done(function( data ) {
				if(data.status == "ok") {
					location.reload();
				} else {
					tlogin.show_error(true);
					tlogin.loading(false);
				}
			}).fail(function(xhr) {
			//var Response = JSON.parse(xhr.responseText);
			alert('Something went wrong. Please try again later.');
		});
        return false;
    });

    //top menu auth logout
    $('.container').on('click','#dd-auth-top-logout', function (event) {
        event.preventDefault();
        var action = $(this).data('action');
	$.ajax({
		type: "GET",
		url: action,
		data: [],
		dataType: "json"
			})
			.done(function( data ) {
				if(data.status == "ok") {
					location.reload();
				} else {
					alert("error");
				}
			}).fail(function(xhr) {
			//var Response = JSON.parse(xhr.responseText);
			alert('Something went wrong. Please try again later.');
		});
        return false;
    });


});

