var app={
	
	gameBegin: function(){
		$('#start-wrapper').fadeIn(4000);
		$('#scroll-wrapper').hide();
		$('#game-console-wrapper').hide();
		
		var counter = 0;
		
		$('#start>img').everyTime(10,'initialScreen',function(){
			counter -= 1;
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
		});
	}
	
};


$(document).ready(function(){
	app.gameBegin();
	app.showScrollOnStartButtonClick();
	app.showGameConsoleOnArrowClick();
});