var issueSelector;

$(document).ready(function() {
  $(".select2").select2({
    theme: "bootstrap",
    width: 200
  });

  issueSelector = $("#issueSelector");
  issueSelector.select2("open");
  issueSelector.focus();

  issueSelector.on("select2:select", issueSelected);
});

function issueSelected(e) {
	console.log("issueSelected: "+issueSelector.val());
	switch (issueSelector.val()) {
		case "SA_Support":
			$('#projectSelector').val("PGE").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#labels').val('SA,Support');
			break;
		case "SRM_Support_Task":
			$('#projectSelector').val("PGE").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#labels').val('Support,SRM_Support');
			$('#components').val("LMN");
			break;
		case "SRM_Support_Bug":
			$('#projectSelector').val("PGE").trigger("change");
			$('#issueTypeSelector').val("Bug").trigger("change");
			$('#labels').val('Support,SRM_Support');
			$('#components').val("LMN");
			break;
		case "BPC_Support_Task":
			$('#projectSelector').val("PGE").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#labels').val('Support,BPC_Support');
			$('#components').val("");
			break;
		case "BPC_Support_Bug":
			$('#projectSelector').val("PGE").trigger("change");
			$('#issueTypeSelector').val("Bug").trigger("change");
			$('#labels').val('Support,BPC_Support');
			$('#components').val("");
			break;
		case "Internal":
			$('#projectSelector').val("PPE").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#assignee').val("ruben.martinez");
			$('#labels').val('');
			break;
		case "SRM_Internal":
			$('#projectSelector').val("PPE").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#labels').val('SRM,SRM_Internal');
			$('#components').val("LMN");
			break;
		case "BPC_Internal":
			$('#projectSelector').val("PPE").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#labels').val('BPC,BPC_Internal');
			$('#components').val("");
			break;
		case "LMN_WebInterface":
			$('#projectSelector').val("PPE").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#labels').val("LMN,interface,psu_optimization");
			$('#components').val("LMN UI");
			break;
	}
}

/*
 * Look & Feel button groups
 */
/*
$(".form-group > .btn").click(function() {
	$(this).addClass("active").removeClass("btn-primary").addClass("btn-default").siblings().removeClass("active").removeClass("btn-default").addClass("btn-primary");
});
*/


/* Logic */
$("#issueCollectorForm").submit(function(event){
	var host = 'https://buongiorno.atlassian.net';
	var issue_browse = host +"/browse/";

	var project = $('#projectSelector').val();
	var issuetype = $('#issueTypeSelector').val();
	var labels = $('#labels').val().split(/ *, */);
	var component = $('#components').val().split(/ *, */);
	var assignee = $('#assignee').val();

        /* https://developer.atlassian.com/jiradev/jira-apis/jira-rest-apis/jira-rest-api-tutorials/jira-rest-api-example-create-issue  */
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
			$('#createdResultPlaceholder').css("color", "red").append(JSON.stringify(response));
			setTimeout(function () { window.close(); }, 10000);
		},
		success: function (response){
			console.log("Request created: "+ JSON.stringify(response));
			$('#createdResultPlaceholder').append('<p><a href="'+ issue_browse + response.key +'">'+ issue_browse + response.key +'</a></p>');
			$('#createdResultPlaceholder').append('<p>'+ JSON.stringify(response) +'</p>');
			setTimeout(function () { window.close(); }, 10000);
		}
	});

	event.preventDefault();
});
