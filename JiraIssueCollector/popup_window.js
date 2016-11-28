/*
 * Look & Feel
 */
$(".form-group > .btn").click(function() {
	$(this).addClass("active").removeClass("btn-primary").addClass("btn-default").siblings().removeClass("active").removeClass("btn-default").addClass("btn-primary");
});

$(document).ready(function() {
  var $issueMeta = $(".js-issueMeta").select2();
  $issueMeta.select2("open");
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
	$("#issueMeta").focus();
}

/* Logic */
$("#issueCollectorForm").submit(function(event){
	var host = 'https://buongiorno.atlassian.net';
	var issue_browse = host +"/browse/";

	var issueMeta = $('#issueMeta').val();


        /* https://developer.atlassian.com/jiradev/jira-apis/jira-rest-apis/jira-rest-api-tutorials/jira-rest-api-example-create-issue  */
	switch (issueMeta) {
		case "LMN_Internal":
			var project = "PLR";
			var issuetype = "Story";
			var components = ["LMN"];
			var labels = ["LMN","LMN_int"];
			break;
		case "LMN_Support":
			var project = "PGE";
			var issuetype = "Bug";
			var components = ["LMN"];
			var labels = ["LMN","Support_dev"];
			break;
		case "LMN_WebInterface":
			var project = "PLR";
			var issuetype = "Story";
			var components = ["LMN","LMN UI"];
			var labels = ["LMN","interface"];
			break;
		case "BPC_Support":
			var project = "PGE";
			var issuetype = "Bug";
			var labels = ["BPC","Support"];
			break;
		case "SOP_SanityQA":
			var project = "SOP";
			var issuetype = "Task";
			var labels = ["SM","SanityTestsQA"];
			break;

	}
	
	var summary = $('#subject').val();
	var description = $('#description').val();
	//var project = $('#project .active').text();
	
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
