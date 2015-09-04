//-----Crud Form Class -------------------------
function CrudForm( model ) {
    this.model = model;
    this.url = "";

    this.sys_msg = {};

    this.sys_msg['confirm_delete'] = 'Are you sure that you want to permanently delete the selected database object?';

    this.before_save = function (data) {
        return data;
    }

    this.action = function (crud_action) {
        if(typeof crud_page === 'undefined'){
            return  $('#form_for_'+this.model+' input[name=crud_action]').val();
        } else {
            $('#form_for_'+this.model+' input[name=crud_action]').val(crud_action);
            return crud_action;
        }
    };

    this.page = function (crud_page) {
        if(typeof crud_page === 'undefined'){
            return  $('#form_for_'+this.model+' input[name=crud_page]').val();
        } else {
            $('#form_for_'+this.model+' input[name=crud_page]').val(crud_page);
            return crud_page;
        }
    };

    this.order = function (crud_order) {
        if(typeof crud_order === 'undefined'){
            return  $('#form_for_'+this.model+' input[name=crud_order]').val();
        } else {
            $('#form_for_'+this.model+' input[name=crud_order]').val(crud_order);
            return crud_order;
        }
    };

    this.sort = function (crud_sort) {
        if(typeof crud_sort === 'undefined'){
            return  $('#form_for_'+this.model+' input[name=crud_sort]').val();
        } else {
            $('#form_for_'+this.model+' input[name=crud_sort]').val(crud_sort);
            return crud_sort;
        }
    };

    this.tma = function (crud_tma) {
        if(typeof crud_tma === 'undefined'){
            return  $('#form_for_'+this.model+' input[name=TMA]').val();
        } else {
            $('#form_for_'+this.model+' input[name=TMA]').val(crud_tma);
            return crud_tma;
        }
    };

    this.reset = function () {
        $('#form_for_'+this.model+' input[name=crud_order]').val('');
        $('#form_for_'+this.model+' input[name=crud_sort]').val('');
        $('#form_for_'+this.model+' input[name=crud_page]').val('');
        $('#form_for_'+this.model+' input[name=crud_action]').val('getlist');
        $('#form_for_'+this.model+' input[name=crud_changed]').val('');
        $('.crud_filters_'+this.model).remove();
        $('#list_for_'+this.model).html('');
    };


    this.reload = function () {
        $('#form_for_'+this.model+' input[name=crud_action]').val('getlist');
        $('#form_for_'+this.model).submit();  
    }; 
}

//-------Crud Object-----------------------------
var Crud = (function () {
//Public
var public_ver = '1.00';

var doc_url = window.location.href;
var forms = {};

function public_save_log(error) {
$.post( window.location.href,
        {crud_action: "save_error_log",url : window.location.href,type: error.type,message: error.message,file: error.file, line: error.line  } , 
        function( data ) {
            alert('An unexpected error has occurred.  Please contact your system Administrator. Error log record number: '+data);
        });          
}

function public_get_form(model) {
    if (typeof forms[model]==='undefined') {
        forms[model] = new CrudForm(model);
        forms[model].url =  doc_url;
    } 
    return forms[model];
}

//Private

return {
    ver: public_ver,
    save_log: public_save_log,
    get_form: public_get_form

}


})();


//--------------Events---------------------------------

$( document ).ready(function() {

//--------Submit------
$('.container').on('submit', '.crud_form', function(event){
    
//$(".crud_form").submit(function( event ) {
var form_id = $(this).attr('id');	
var model = form_id.replace('form_for_','');
var form = Crud.get_form(model);
var action = form.action();
if(action.split('_')[0] == 'save') return true;
event.preventDefault();
var form_data = $('#'+form_id).serializeArray();
//form_data.push({name: "crud_action",value: "getlist"});
//var page = $('#'+form_id+' input[name=crud_page]').val();
//var sort = $('#'+form_id+' input[name=crud_sort]').val();
//var order = $('#'+form_id+' input[name=crud_order]').val();
var changed = $('#'+form_id+' input[name=crud_changed]').val();
if (changed == 1 ) {	
	if(confirm('You have unsaved changes on this page. Do you want to leave this page and discard your changes?')) {
		$('#'+form_id+' input[name=crud_changed]').val('');
		$('#crud_save_cancel_panel_'+model).hide();
	} else {
		return false;
	}
}
$('#crud-ajax-loader-'+model).show();
$('#crud-ajax-top-loader-'+model).show();
$.post( form.url,
		//{page: page,sort: sort, order: order,model: model} , 
        form_data,
		function( data ) {
	$('#list_for_'+model).html(data);
    if($.isFunction($('#source').tableBarChart))
        $('#source').tableBarChart('#target', '', false);
    $('#crud-ajax-top-loader-'+model).hide();   
    var filters_status = $('#crud_'+model+'_list_filters_status').val();
    if(filters_status == "") {
        $('#crud_'+model+'_filters_status').text('Not filtered');
        $('#crud_'+model+'_filters_status_info').attr('data-original-title','Not filtered');        
        $('#crud_'+model+'_filters_status_info').attr('data-content','press the plus button to add filters.');        
    } else {
        $('#crud_'+model+'_filters_status').text('Filtered');
        $('#crud_'+model+'_filters_status_info').attr('data-original-title','Filtered by:');        
        $('#crud_'+model+'_filters_status_info').attr('data-content',filters_status);        
    }
    $('#crud_'+model+'_show_filters_panel').show();
    $('#crud_'+model+'_filters_panel').hide();
    $('.has_popover').popover({html: true});
    $('form input[type="text"].bfh-phone, form input[type="tel"].bfh-phone, span.bfh-phone').each(function () {
      var $phone;
      $phone = $(this);
      $phone.bfhphone($phone.data());
    //
        
    }); 

}).fail(function(xhr) {
var Response = JSON.parse(xhr.responseText);
//alert( "error"+Response.error.type );
$('#crud-ajax-top-loader-'+model).hide(); 
//alert('Something went wrong. Please try again later.');
Crud.save_log(Response.error);

});

return false;
});


//-------Pagination-------------------
$('.container').on('click','.pagination a', function (event) {
    event.preventDefault();
    var pag_link = $(this).attr('href');
    var tmp = pag_link.indexOf('?page=');
    tmp = pag_link.substr(parseInt(tmp) + 6);
    tmp=tmp.split('#');
    var page = tmp[0];
    var model = tmp[1];

    var form = Crud.get_form(model);
    form.page(page);
    form.action('getlist');
    form.reload();
    return false;
});

//-----Sort--------------------------
$('.container').on('click','.crud_sort_link', function (event) {
    event.preventDefault();
    var column = $(this).data('column');
    var model = $(this).data('model');
    var sort = $('#form_for_'+model+' input[name=crud_sort]').val();
    var order = $('#form_for_'+model+' input[name=crud_order]').val();
    if(column == sort) {
    	if(order == 'desc') {
    		$('#form_for_'+model+' input[name=crud_order]').val('asc');    		
    	} else {
    		$('#form_for_'+model+' input[name=crud_order]').val('desc');    		    		
    	}
    } else {
    	$('#form_for_'+model+' input[name=crud_sort]').val(column);
    	$('#form_for_'+model+' input[name=crud_order]').val('desc');
    }
    $('#form_for_'+model+' input[name=crud_action]').val('getlist');
    $('#form_for_'+model).submit();
    return false;
});

//-----Make TD Editable
$('.container').on('dblclick','.scrud_editable_td', function (event) {
	var self = this;
    var column = $(self).data('column');
    var model = $(self).data('model');
    var form = Crud.get_form(model);
    var id = $(self).data('id');
    var value = $(self).html();
    $('#form_for_'+model+' input[name=crud_changed]').val('1');
      $('.has_popover').each(function() {
            $(this).popover('hide');
        });     
    $.post( form.url,    
		{column: column,model: model,id: id, data: value,crud_action: "maketdeditable"} , 
		function( data ) {
	    $(self).html(data);
	    $(self).children(":first").focus();
        $(self).removeClass('scrud_editable_td');
	    $('#crud_save_cancel_panel_'+model).show();
                $('.datepicker').datetimepicker({
                    pickTime: false
                });
    $('form input[type="text"].bfh-phone, form input[type="tel"].bfh-phone, span.bfh-phone').each(function () {
      var $phone;
      $phone = $(this);
      $phone.bfhphone($phone.data());
    });  

  
$('.crudsummernote').summernote({
  onChange: function(contents, $editable) {

     $('.summernote').each(function(i) {
            $(this).html($(this).code());
        });
  }
});
$('.crudsummernote').removeClass('crudsummernote');


}).fail(function(xhr) {
var Response = JSON.parse(xhr.responseText);
Crud.save_log(Response.error);
});



});


//-------Cancel Button ---------------
$('.container').on('click','.crud_cancel_btn', function (event) {
var model = $(this).data('model');
$('#crud_save_cancel_panel_'+model).hide();
$('#form_for_'+model+' input[name=crud_changed]').val('');
$('#form_for_'+model+' input[name=crud_action]').val('getlist');
$('#form_for_'+model).submit();
return false;
});




//------Save Button-------------------
$('.container').on('click','.crud_save_btn', function (event) {
var model = $(this).data('model');
var form = Crud.get_form(model);
var form_data = $('#form_list_for_'+model).serializeArray();

if(form_data.length == 1) {
    alert('Nothing to save');
    $('#form_for_'+model+' input[name=crud_changed]').val('');
    $('#form_for_'+model+' input[name=crud_action]').val('getlist');
    $('#form_for_'+model).submit();    
    return false;
}

form_data.push({name: "model",value: model});
form_data.push({name: "crud_action",value: "savelist"});
form_data = form.before_save(form_data);
$('#crud_save_cancel_panel_'+model).hide();
$('#crud-ajax-loader-'+model).show();
$('#crud-ajax-top-loader-'+model).show();
$('.crud_tr_'+model).removeClass('danger');
 
$.ajax({
type: "POST",
url: form.url,
data: form_data,
dataType: "json",
async: false,
 
})
.done(function( data ) {
if(data.status == 'ok') {
	$('#form_for_'+model+' input[name=crud_changed]').val('');
    $('#form_for_'+model+' input[name=crud_action]').val('getlist');
	$('#form_for_'+model).submit();
} else {
	$('#crud_save_cancel_panel_'+model).show();
	$('#crud-ajax-loader-'+model).hide();
    $('#crud-ajax-top-loader-'+model).hide();
    $('#crud_tr_'+model+'_'+data.row_id).addClass('danger');
    alert(data.message);
}

}).fail(function() {
$('#crud_save_cancel_panel_'+model).show();
$('#crud-ajax-loader-'+model).hide();
$('#crud-ajax-top-loader-'+model).hide();	
alert("Something Went Wrong. Please Try again Later" );
});


return false;
});

//----Add filter--------------------------------------------
$('.container').on('click','.crud_add_filter', function (event) {
event.preventDefault();
var id = $(this).data('id');
var model = $(this).data('model');
var form = Crud.get_form(model);
var range = $(this).data('range');
var filter_count = $('#form_for_'+model+' input[name=crud_filters_count]').val();
filter_count = parseInt( filter_count ) + 1;
$.post( form.url,
        {id: id,model: model,i: filter_count,range: range,TMA: form.tma(), crud_action: "addfilter" } , 
        function( data ) {
        $('#crud_'+model+'_filters').append(data);
        $('#form_for_'+model+' input[name=crud_filters_count]').val(filter_count);
 
        $('form input[type="text"].bfh-phone, form input[type="tel"].bfh-phone, span.bfh-phone').each(function () {
            var $phone;
            $phone = $(this);
            $phone.bfhphone($phone.data());
        });  
       $('.datepicker').datetimepicker({
                    pickTime: false
                });                
    }).fail(function(xhr) {
var Response = JSON.parse(xhr.responseText);
Crud.save_log(Response.error);
});


return true;
});

//---Delete filter--------------------------------------------
$('.container').on('click','.crud_del_filter_btn', function (event) {
event.preventDefault();
var i = $(this).data('i');
var model = $(this).data('model');
$('#crud_filter_'+model+'_'+i).remove();
});


//----filter-------------------------------------------------
$('.container').on('click','.crud_filter_btn', function (event) {
event.preventDefault();
var model = $(this).data('model');
$('#form_for_'+model+' input[name=crud_page]').val('1');
$('#form_for_'+model+' input[name=crud_sort]').val('');
$('#form_for_'+model+' input[name=crud_order]').val('');
$('#form_for_'+model+' input[name=crud_action]').val('getlist');
$('#form_for_'+model).submit();
});


//---Show filters-------------------------------------------
$('.container').on('click','.crud_show_filters_btn', function (event) {
event.preventDefault();
var model = $(this).data('model');
$('#crud_'+model+'_show_filters_panel').hide();
$('#crud_'+model+'_filters_panel').show();

});

//---Selector--------
$('.container').on('change','.crud_filter_selector', function (event) {
    var i = $(this).data('i');
    var model = $(this).data('model');
    var selector = $(this).find(':selected').text();
    if (selector == 'Between') {
        if($('#crud_filter_data_'+model+'_'+i).hasClass('col-sm-6')) {
            $('#crud_filter_data_'+model+'_'+i).removeClass('col-sm-6');
            $('#crud_filter_data_'+model+'_'+i).addClass('col-sm-3');
            $('#crud_filter_data2_'+model+'_'+i).show();
        }
    } else {
        if($('#crud_filter_data_'+model+'_'+i).hasClass('col-sm-3')) {
            $('#crud_filter_data_'+model+'_'+i).removeClass('col-sm-3');
            $('#crud_filter_data_'+model+'_'+i).addClass('col-sm-6');
            $('#crud_filter_data2_'+model+'_'+i).hide();
        }
    }
});

//---export-------------------------------------
$('.container').on('click','.export_btn', function (event) {
    var model = $(this).data('model');
    var action = $(this).data('action');
    $('#form_for_'+model+' input[name=crud_action]').val(action);
    $('#form_for_'+model).submit();    
});

//---show more ----------------------------------
$('.container').on('click','.crud_show_more', function (event) {
event.preventDefault();
var mode = $(this).data('mode');

if(mode == 'html') {
    $(this).parent().next().show();
    $(this).parent().hide();
} else {
$(this).next().show();
$(this).hide();
}
return false;
});

//---show less ----------------------------------
$('.container').on('click','.crud_show_less', function (event) {
event.preventDefault();
$(this).parent().prev().show();
$(this).parent().hide();
return false;
});

//---click checkbox ----------------------------------
$('.container').on('click','.crud_input_checkbox', function (event) {
    if($(this).is(':checked')){
        $(this).next().val(1);
    } else {
        $(this).next().val(0);
    }
});

//-----insert row-------------------------------- 
$('.container').on('click','.crud_insert_btn', function (event) {
event.preventDefault();
var model = $(this).data('model');
var form = Crud.get_form(model);
$.post( form.url,
        {model: model,crud_action: "add_insert_row" } , 
        function( data ) {
            $('#form_list_for_'+model+' table tbody').prepend(data);
            $('#form_for_'+model+' input[name=crud_changed]').val('1');
            $('#crud_save_cancel_panel_'+model).show();
            $('.crud_insert_btn').hide();
        $('.datepicker').datetimepicker({
                    pickTime: false
                });
        $('form input[type="text"].bfh-phone, form input[type="tel"].bfh-phone, span.bfh-phone').each(function () {
            var $phone;
            $phone = $(this);
            $phone.bfhphone($phone.data());
        });

$('.crudsummernote').summernote({
  onChange: function(contents, $editable) {

     $('.summernote').each(function(i) {
            $(this).html($(this).code());
        });
  }
});
$('.crudsummernote').removeClass('crudsummernote');
        
    }).fail(function(xhr) {
var Response = JSON.parse(xhr.responseText);
Crud.save_log(Response.error);
});

return false;
});

//---delete row-----------------------------------------
$('.container').on('click','.crud_delete_btn', function (event) {
event.preventDefault();
var model = $(this).data('model');
var id = $(this).data('id');
var form = Crud.get_form(model);
if(id == 'new') {
    $('#crud_tr_'+model+'_new').remove();
    $('.crud_insert_btn').show();
} else {
    if(confirm(form.sys_msg['confirm_delete'])) {    
        $.post( form.url,
                {id: id,model: model,crud_action: "delete_row" } , 
                function( data ) {
                    $('#form_for_'+model).submit();
                }).fail(function(xhr) {
                    var Response = JSON.parse(xhr.responseText);
                    Crud.save_log(Response.error);
                });    
            }
}

return false;
});


//-------------------------WIDGETS------------------------------------------------

$('.container').on('click','.crud_widget_help_ico',function (event) {
event.preventDefault();
var filename = $(this).data('filename');
var title = $(this).data('title');
var hashtag = $(this).data('hashtag');
$('#crud_help_edit_frame').html('');
$('#crud_save_help_file_btn').hide();
$('#crud_edit_help_file_btn').show();
$('#crud_help_hidden_file').val(filename);
$('#crud_help_hidden_hashtag').val(hashtag);
$('#crud_iframe_popup_title').html(title);
$('#crud_iframe_popup_body').attr('height','400'); 
$('#crud_iframe_popup_body').attr('src',base_url + '/../tmahelp/'+filename+ '?' +  Math.round(Math.random() * 100000 + 1000) +'#'+hashtag );  
$('#crud_iframe_popup').modal('show');
return false;
});

$('#crud_iframe_popup').on('hide.bs.modal',function (e) {
    $('#crud_iframe_popup_body').attr('src',''); 
    if (tinymce.activeEditor != null || tinymce.activeEditor != undefined) {
        for (var i = 0; i < tinymce.editors.length; i++) {
            tinymce.remove(tinymce.editors[i]);
        }    
    }
});


$('.modal-content').on('click','#crud_edit_help_file_btn',function (event) {
event.preventDefault();
var filename = $('#crud_help_hidden_file').val();
var hashtag = $('#crud_help_hidden_hashtag').val();
 $('#crud_iframe_popup_body').attr('src',''); 
 $('#crud_iframe_popup_body').attr('height','4'); 
//$('#crud_iframe_popup_body').attr('src',base_url + '/edithelp/'+filename+'/'+hashtag );  
$('#crud_help_edit_frame').load(base_url + '/edithelp/'+filename+'/'+hashtag, function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success") {
            $('#crud_save_help_file_btn').show();
            $('#crud_edit_help_file_btn').hide();

        }
       // if(statusTxt == "error")
           // alert("Error: " + xhr.status + ": " + xhr.statusText);
    });

return false;
});


$('.modal-content').on('click','#crud_save_help_file_btn',function (event) {
event.preventDefault();
var filename = $('#crud_help_hidden_file').val();
var hashtag = $('#crud_help_hidden_hashtag').val();
var content =  tinymce.get('crud_helpedit_text').getContent();

$.post( base_url + '/savehelp/'+filename+'/'+hashtag,
        {text: content, filename: filename, hashtag: hashtag } , 
        function( data ) {
               if(data == 'ok') {
                    $('#crud_save_help_file_btn').hide();
                    $('#crud_edit_help_file_btn').show();
                    $('#crud_help_edit_frame').html('');
                    $('#crud_iframe_popup_body').attr('height','400'); 
                    $('#crud_iframe_popup_body').attr('src',base_url + '/../tmahelp/'+filename+ '?' +  Math.round(Math.random() * 100000 + 1000) + '#'+hashtag );  
               } else {
                 alert(data);
               }
        });



return false;
});



$(document).on('focusin', function(e) {
    if ($(e.target).closest(".mce-window").length) {
        e.stopImmediatePropagation();
    }
});

// end document ready
});	