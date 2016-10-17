/*
 * Look & Feel
 */
$(".form-group > .btn").click(function() {
	$(this).addClass("active").removeClass("btn-primary").addClass("btn-default").siblings().removeClass("active").removeClass("btn-default").addClass("btn-primary");
});

//Support
$(".form-group > .support > .btn").click(function() {
	if ($(this).hasClass("active")){
		$(this).removeClass("active").removeClass("btn-default").addClass("btn-danger");
	}
	else{
		$(this).addClass("active").removeClass("btn-danger").addClass("btn-default").siblings().removeClass("active").removeClass("btn-default").addClass("btn-danger");
	}
});

//Evolution
$(".form-group > .evolution > .btn").click(function() {
	if ($(this).hasClass("active")){
		$(this).removeClass("active").removeClass("btn-default").addClass("btn-success");
	}
	else {
		$(this).addClass("active").removeClass("btn-success").addClass("btn-default").siblings().removeClass("active").removeClass("btn-default").addClass("btn-success");
	}
});

function bodyOnload() {
	$("#subject").focus();
}

/* Logic */
$("#issueCollectorForm").submit(function(event){
	var host = 'https://buongiorno.atlassian.net';
	var issue_browse = host +"/browse/";
	
	var issuetype = "Story";

	var summary = $('#subject').val();
	var description = $('#description').val();

	var project = $('#project .active').text();

	var labels = ["LMN"];
	
/*
    $('#region .active').each(function(){
        labels.push($(this).attr('id')); 
    }); 

    $('#country .active').each(function(){
        labels.push($(this).attr('id'));
        if(jQuery.inArray($(this).attr('id'), countries_lmn) >= 0){
        	//country under LMN
        	labels.push("LMN"); 
        	project = 'PPE';
        }
    });
    
    $('#request .active').each(function(){
        labels.push($(this).attr('id')); 
        if ($(this).hasClass("support")){
        	labels.push("Support");
        	issuetype = 'Bug';
        }
        else if ($(this).hasClass("evolution")){
        	labels.push("Evolution");
        }
        
        if ($(this).hasClass("GAS")){
        	project = 'GAS';
        }
    });
 */   
	jQuery.ajax({
		url: host +'/rest/api/2/issue/',
		type: 'POST',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify({
			"fields": {
				"project": { 
					"key": project
				},
				"summary": summary,
				"description": description,
				"issuetype": {
					"name": issuetype
				},
				"labels": labels
			}
		}),
		error: function(response){
			console.log('error, args:'+ response);
			$('#submitresult').append(JSON.stringify(response));
			setTimeout(function () { window.close(); }, 4000);
		},
		success: function (response){
			console.log("Request created: "+ JSON.stringify(response));
			$('#submitresult').append('<p><a href="'+ issue_browse + response.key +'">'+ issue_browse + response.key +'</a></p>');
			$('#submitresult').append('<p>'+ JSON.stringify(response) +'</p>');
			setTimeout(function () { window.close(); }, 4000);
		}
	});

	event.preventDefault();
});
