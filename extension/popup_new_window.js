var host = 'https://jira.docomodigital.com/';
//var host = 'https://buongiorno.atlassian.net/';

var issueSelector;

$(document).ready(function() {
  $(".select2").select2({
    theme: "bootstrap",
    width: 400
  });

  issueSelector = $("#issueSelector");

  issueSelector.on("select2:select", issueSelected);
  issueSelector.on("select2:open", issueSelected);

  issueSelector.select2("open");
  issueSelector.focus();
});

function clearForm() {
	$('#components').val("");
	$('#labels').val("");
	$('#epicLink').val("");
}

function issueSelected(e) {
	console.log("issueSelected: "+issueSelector.val());
	
	clearForm();
	switch (issueSelector.val()) {
		case "Shakura_Task":
			$('#projectSelector').val("PT").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#epicLink').val("PT-292");
			break;
		case "BadDebts_Task":
			$('#projectSelector').val("PT").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#epicLink').val("EDCB-25");
			break;
		case "BadDebts_Standalone_Task":
			$('#projectSelector').val("PT").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#epicLink').val("EDCB-26");
			break;
		case "PT-2":
		case "PT-3":
		case "PT-4":
		case "PT-15":
		case "PT-16":
		case "PT-18":
		case "PT-55":
		case "PT-63":
		case "PT-114":
			$('#epicLink').val(issueSelector.val());
		case "PT":
			$('#projectSelector').val("PT").trigger("change");
			$('#issueTypeSelector').val("Story").trigger("change");
			break;
		case "PT_Support_Task":
			$('#projectSelector').val("PT").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#labels').val('Platform,Support');
			break;
		case "PT_Support_Bug":
			$('#projectSelector').val("PT").trigger("change");
			$('#issueTypeSelector').val("Bug").trigger("change");
			$('#labels').val('Platform,Support');
			break;
		case "SOP_SanityQA":
		case "OME":
			window.location='https://http://jira.docomodigital.com/plugins/servlet/ac/com.atlassian.jira.static.issues/issues-collector-gtd2?user.key=ruben.martinez&user.id=ruben.martinez'
			break;
		case "OME_Support_connectors_enabler":
			$('#projectSelector').val("OME").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#labels').val('connectors,support,enabler');
			break;
		case "OME_Support":
			$('#projectSelector').val("OME").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#labels').val('connectors');
			break;
		case "Payments_Service_Management":
			window.location='https://coa.docomodigital.com/display/OPT/Opening+Requests+to+Payments+Service+Management+Team'
			break;
		case "Supported_Services_Catalog":
			window.location='https://coa.docomodigital.com/display/ITP/Supported+services+catalog'
			break;
		case "SA_Support":
			$('#projectSelector').val("SL").trigger("change");
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
			break;
		case "BPC_Support_Bug":
			$('#projectSelector').val("PGE").trigger("change");
			$('#issueTypeSelector').val("Bug").trigger("change");
			$('#labels').val('Support,BPC_Support');
			break;
		case "Internal":
			$('#projectSelector').val("PT").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#assignee').val("ruben.martinez");
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
			break;
		case "LMN_WebInterface":
			$('#projectSelector').val("PPE").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#labels').val("LMN,interface,psu_optimization");
			$('#components').val("LMN UI");
			break;
		case "PSU_Optimization":
			$('#projectSelector').val("PPE").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#labels').val("LMN,psu_optimization");
			break;
		case "EDCB_Task":
			$('#projectSelector').val("EDCB").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#labels').val("Platform");
			break;
		case "PT_Support_Task":
			$('#projectSelector').val("PT").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#labels').val("Platform,Support");
			break;
		case "PT_Support_Bug":
			$('#projectSelector').val("PT").trigger("change");
			$('#issueTypeSelector').val("Bug").trigger("change");
			$('#labels').val("Platform,Support");
			break;
		case "EDCB_Support_Task":
			$('#projectSelector').val("EDCB").trigger("change");
			$('#issueTypeSelector').val("Task").trigger("change");
			$('#labels').val("Platform,Support");
			break;
		case "EDCB_Support_Bug":
			$('#projectSelector').val("EDCB").trigger("change");
			$('#issueTypeSelector').val("Bug").trigger("change");
			$('#labels').val("Platform,Support");
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

function setEpicToIssue(issueId, epicId) {
	dataJSON = {
		"fields": {
			"customfield_10841": epicId
		}
	}

	var data =  JSON.stringify(dataJSON);
	console.log("setEpicToIssue, data to be sent: "+data)

	jQuery.ajax({
		url: host +'/rest/api/2/issue/'+issueId,
		type: 'PUT',
		dataType: 'json',
		contentType: "application/json",
		data: data,
		error: function(response, textStatus, errorThrown){
			console.log('setEpicToIssue error, response: '+ response);
			$('#createdResultPlaceholder').css("color", "red").append("Error while setting epic [" + textStatus + "] [" + errorThrown + "] - " + response);
		},
		success: function (response){
			console.log("setEpicToIssue response: "+ response);
			$('#createdResultPlaceholder').append('<p>epiclink set</p>');
		}		
	});
}

/* Logic */
$("#issueCollectorForm").submit(function(event){
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
	
	var epicLink = $('#epicLink').val();

	dataJSON = {
			"fields": {
				"assignee": { 
					"name": assignee
				},
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
		}

	if (epicLink && epicLink.length>0) {
		var EPIC_CUSTOM_FIELD = "customfield_10841"; // Taken from: https://jira.docomodigital.com.net/rest/api/2/field, set also in dataJSON above
		dataJSON[EPIC_CUSTOM_FIELD] = epicLink;
	}

	var data =  JSON.stringify(dataJSON);
	console.log("data to be sent: "+data)

	jQuery.ajax({
		url: host +'/rest/api/2/issue/',
		type: 'POST',
		dataType: 'json',
		contentType: "application/json",
		data: data,
		error: function(response){
			console.log('error, args:'+ response);
			$('#createdResultPlaceholder').css("color", "red").append(JSON.stringify(response));
			setTimeout(function () { window.close(); }, 10000);
		},
		success: function (response){
			console.log("Response: "+ JSON.stringify(response));
			$('#createdResultPlaceholder').append('<p><a href="'+ issue_browse + response.key +'">'+ issue_browse + response.key +'</a></p>');
			$('#createdResultPlaceholder').append('<p>'+ JSON.stringify(response) +'</p>');
			$('#createdResultPlaceholder').append('<p>'+ data +'</p>');
			if (epicLink) {
				setTimeout(function() { setEpicToIssue(response.key, epicLink) }, 2000);
			}
			//setTimeout(function() { window.close(); }, 60000);
		}
	});

	event.preventDefault();
});
