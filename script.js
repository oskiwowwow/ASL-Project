$(document).ready(function() {

	var cards;
	var wrongAnswers;
	var numCorrect = 0;
	var numIncorrect = 0;

	buildDeck(1);


	
	function buildDeck(units) {
		$.getJSON("assets/unit17video.json", function(data) { 
			cards = shuffle(data.vocabulary);
			wrongAnswers = shuffle(data.filler);
			newCard();
		});
	}
	
	//$.getJSON("assets/unit16video.json", function(data) { 
		//	cards = shuffle(data.vocabulary);
			//wrongAnswers = shuffle(data.filler);
			//newCard();
		//});

	function shuffle(arr){
		var newArr = [];
		while (arr.length > 0){
			newArr.push(arr.splice(Math.floor(arr.length * Math.random()),1)[0]);
		}
		return newArr;
	}
	

	function choose($caller){
		if(!$caller.hasClass("chosen")){	
			$caller.addClass("chosen");
			if($caller.hasClass("right")){
				$caller.addClass("green");
				numCorrect++;
				$("#num_correct").text("+" + numCorrect);
				$(".wrong").remove();
			}
			else {
				numIncorrect ++;
				$("#num_incorrect").text("-" + numIncorrect);
				var rightAnswer=$(".right").text();
				$caller.children("p").html("<span class=chosewrong>" + $caller.text() + "</span><span class=green> " + rightAnswer + "</span>");
				$(".option").not(".chosen").remove();
			}
			$caller.removeClass("option right wrong");
			(cards.length >0) ? newCard() : null;
		}
	}
	
	function newCard(){
		var key = shuffle([1,0,0,0]);
		var card = cards.pop();
		
		$("#main").append("<div class='shadow card flashcard'></div>");
		$(".flashcard:last").append("<video preload loop autoplay muted><source src='" + card.filename + "' type='video/mp4'>not supported</video>");
		$(".flashcard:last").append("<div class='option_list'></div>");
		$.each(key, function(i, val){
			var word = val ? card.answer : wrongAnswers.pop();
			$(".option_list:last").append("<a class='" + (val ? "right" : "wrong") + " option'><p>" + word + "</p></a>");
		});
		
		$(".option").click(function() {
		choose($(this));
		});
	}
		
});