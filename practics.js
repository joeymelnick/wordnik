http://api.wordnik.com/v4/word.json/?multi&resource.1={word1}/related&type=synonym&resource=kind

var baseUrl = "http://api.wordnik.com/v4/word.json/"
var apiKey = "&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
var autoBaseUrl = "http://api.wordnik.com:80/v4/words.json/search/"
var synonymData = 0

function getSynonyms(){
	var synonymReq = $("#synonyms").val();
	console.log(synonymReq)
	
$.ajax({
		type: 'GET',
		url: baseUrl + synonymReq + '/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=5' + apiKey,
		success: function(data) {
			console.log('success', data);
			$('#synonymList').append("<ul id='synList'></ul>");
			for (i = 0; i < data[0].words.length; i++){
		$("#synList").append("<li>"+ data[0].words[i]+ "</li>");
	}
		},
		error: function(e) {
			console.log('error is', e);
		}
});
}

function getSpellingSuggestions(){
	var spellReq = $("#spelling").val();
	console.log(spellReq)
		
$.ajax({
		type: 'GET',
		url: autoBaseUrl + spellReq + '?useCanonical=false&includeSuggestions=true' + apiKey,
		success: function(data) {
			console.log('success', data);
			$('#suggestedSpelling').append("<ul id='spellList'></ul>");
			for (i = 0; i < data.suggestions.length; i++){
		$("#spellList").append("<li>"+ data.suggestions[i]+ "</li>");
	}
		},
		error: function(e) {
			console.log('error is', e);
		}
});
}

function autoCompleteWord(){
	var availableTags
	var autoReq = $("#wordPartial").val();

	$.ajax({
			type: 'GET',
			url: 'http://api.wordnik.com:80/v4/words.json/search/' + autoReq + '?caseSensitive=true&minCorpusCount=5&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=-1&skip=0&limit=10'+ apiKey,
				success: function(data){
					console.log(data.searchResults.length)
					autoSuggestion = []
				for (i=0; i < data.searchResults.length; i++){
					autoSuggestion.push(data.searchResults[i].word)
					console.log('in the for loop', autoSuggestion)
				}
				
				$( "#wordPartial" ).autocomplete({
      			source: autoSuggestion
   				});
			},
			error: function(e) {
				console.log('error is', e);
			}
	});

}