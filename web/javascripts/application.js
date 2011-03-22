var GAME_DURATION = 600;
var WINNING_QUESTIONS = 3;

var timer = {};

var questions=[
	{
		file: "acertijo2.ggb",
		answer: 2002,
		kind: "geogebra",
		text: "En la pantalla de arriba puedes ver cuatro vistas diferentes de un mismo cubo. coloca la cara que falta en la cuarta vista con el color que le corresponde"
	}
];

var question;

var right_answers;



var app = {
	
	gameBegin: function(){
		$('#scroll-wrapper').hide();
		$('#game-console-wrapper').hide();
		$('#start-wrapper').fadeIn(4000);
		
		var counter = 0;		
		$('#start>img').everyTime(10,'initialScreen',function(){
			counter -= 1;
			if(counter ==-360)
				counter = 0;
			$('#start>img').css({
			                        MozTransform: 'rotate(-' + -counter + 'deg)',
			                        WebkitTransform: 'rotate(' + -counter + 'deg)',
			                        transform: 'rotate(' + -counter + 'deg)'
			                    }
								,100); 
		});
		
		//ocultar calavera
		//poner la maqueta en el estado inicial
	},
	
	showScrollOnStartButtonClick: function(){
		$('#button').click(function() {
			$('#start-wrapper').fadeOut(1000, function(){
				$('#start>img').stopTime('initialScreen');
			});
			$('#scroll-wrapper').fadeIn(2000, function(){
				var scroll_p = $(this).find('p');
				var timeBeetweenP = 2000;
				
				$(scroll_p[0]).fadeIn(1000, function(){
					$(scroll_p[1]).delay(timeBeetweenP).fadeIn(1000, function(){
						$(scroll_p[2]).delay(timeBeetweenP).fadeIn(1000);
						$(scroll_p[3]).delay(timeBeetweenP).fadeIn(1000);
					});
				});
			});
		});
	},
	
	showGameConsoleOnArrowClick: function(){
		$('#right-arrow').click(function() {
			$('#scroll-wrapper').fadeOut(1000);
			$('#game-console-wrapper').fadeIn(2000);
			app.startGame();
		});
	},
	
	// http://sedition.com/perl/javascript-fy.html
	prepareQuestionArray: function(){
		var i = questions.length;
		  if ( i == 0 ) return false;
		  while ( --i ) {
		     var j = Math.floor( Math.random() * ( i + 1 ) );
		     var tempi = questions[i];
		     var tempj = questions[j];
		     questions[i] = tempj;
		     questions[j] = tempi;
		   }
	},
	
	startGame: function(){
		right_answers = 0;
		timer.running = true;
		timer.remaining = GAME_DURATION;
		
		$('#visual').html('');
		$('#statement').html('');
		
		app.prepareQuestionArray();
		app.loadQuestion();
		app.startTimer();		
		app.setupListeners();
	},
	
	loadQuestion: function(){
		question = questions.pop();
		app.questionLoader(question);
	},
	
	startTimer: function(){
		// arduino START
		
		$('#webcam').everyTime(1000,'gameTimer',app.timerHandler);
	},
	
	die: function(){
		alert('LA HAS PALMAO');
	},
	
	setupListeners: function(){
		$('#fermat_submit').submit(function() {
			if(question.answer == $('#code_text').value()){
				
				right_answers++;
				if(right_answers == WINNING_QUESTIONS){
					//arduino go back to initial position
					app.win();
				}
				else{
					//arduino stop 30s
					app.loadQuestion();
					setTimeout("app.reactivateTimer()",30000);
				}
					
			}
			else{
				$('')
			}
				
			return false;
		});
	},
	// private
	questionLoader: function(question) {
		switch(question.kind)
		{
		case "geogebra":
		  visual_code = '	<applet name="ggbApplet" code="geogebra.GeoGebraApplet" archive="questions/geogebra.jar"\
				codebase="./"\
				width="470" height="304"mayscript="true">\
				<param name="filename" value="questions/' + question.file + '"/>\
				<param name="java_arguments" value="-Xmx512m -Djnlp.packEnabled=true" />\
				<param name="cache_archive" value="questions/geogebra.jar, questions/geogebra_main.jar, questions/geogebra_gui.jar, questions/geogebra_cas.jar, questions/geogebra_export.jar, questions/geogebra_properties.jar" />\
				<param name="cache_version" value="3.2.46.0, 3.2.46.0, 3.2.46.0, 3.2.46.0, 3.2.46.0, 3.2.46.0" />\
				<param name="framePossible" value="false" />\
				<param name="showResetIcon" value="false" />\
				<param name="showAnimationButton" value="true" />\
				<param name="enableRightClick" value="false" />\
				<param name="errorDialogsActive" value="true" />\
				<param name="enableLabelDrags" value="false" />\
				<param name="showMenuBar" value="false" />\
				<param name="showToolBar" value="false" />\
				<param name="showToolBarHelp" value="false" />\
				<param name="showAlgebraInput" value="false" />\
				<param name="allowRescaling" value="true" />\
			</applet>';
		  break;
		case "plain":
		  visual_code = '';
		  break;
		}

		text = '<p>' + question.text + '</p>';

		$('#visual').html(visual_code);
		$('#statement').html(text);
	},
		
	timerHandler: function(){
		if(timer.running){
			timer.remaining--;
			if(timer.remaining<=0)
				app.die();
		}
	},
	
	reactivateTimer: function(){
		// arduino start
		timer.running = true;
	}
};


$(document).ready(function(){
	app.gameBegin();
	app.showScrollOnStartButtonClick();
	app.showGameConsoleOnArrowClick();
});