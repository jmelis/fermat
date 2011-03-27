var GAME_DURATION = 600;
var FAIL_PENALTY = 30;
var WINNING_QUESTIONS = 3;
var MAX_TRIES = 3;

var timer = {};
var win_timer;

var questions=[
    {
		file: "acertijo1/ACERTIJO_1.ggb",
		answer: "4201",
		kind: "geogebra",
		text: "Distribuye 7 vasijas llenas de vino, 7 que están a la mitad, y 7 vacías en tres partes de modo que tengan la misma cantidad de vasijas y de vino. Para hacer el reparto, coloca las vasijas dentro de los tres rectángulos. Cuando hayas terminado el reparto, aparecerá un código."
	},
    {
		file: "acertijo2/acertijo2.ggb",
		answer: "2002",
		kind: "geogebra",
		text: "En la pantalla de arriba puedes ver cuatro vistas diferentes de un mismo cubo. Coloca la cara que falta en la cuarta vista con el color que le corresponde."
	},
    {
		file: "acertijo3/ACERTIJO_3.ggb",
		answer: "2002",
		kind: "geogebra",
		text: "Arrastra hasta el hueco gris el cubo resultante al doblar la figura formada por los seis cuadrados de colores. Cuando lo hayas colocado, aparecerá un código."
	},
    {
		file: "acertijo4/acertijo4.jpg",
		answer: "Ana",
		kind: "image",
		text: "Los padres de Ana tienen 5 hijos. De mayor a menor son Pam, Pem, Pim, Pom y ..."
	},
    {
		file: "acertijo5/acertijo5.png",
		answer: "7",
		kind: "image",
		text: "¿Cuántas cifras tiene el siguiente número en esta serie?"
	},
    {
		file: "acertijo6/acertijo6.png",
		answer: "28",
		kind: "image",
		text: "El único número perfecto comprendido entre 20 y 30 es:"
	},
    {
		file: "acertijo7/acertijo7.png",
		answer: "123-45-67+89",
		kind: "image",
		text: "Escribe las cifras 123456789 separadas por un signo de sumar y dos signos de restar, de modo que el resultado sea 100."
	},
    {
		file: "acertijo8/acertijo8.png",
		answer: "12",
		kind: "image",
		text: "Un sastre tiene una pieza de tela de 50 metros de longitud y cada media hora corta una pieza de 2 metros. ¿Al cabo de cuántas horas habrá cortado completamente la pieza?"
	},
    {
		file: "acertijo9/acertijo9.png",
		answer: "6",
		kind: "image",
		text: "¿Cuál es el mínimo número veces que hay pulsar las teclas para obtener el número 16 cuando está recién encendida?"
	},
    {
		file: "acertijo10/acertijo10.png",
		answer: "5939" ,
		kind: "image",
		text: "Hay más agua en la primera que vino en la segunda: código 9593.<br/>Hay la misma cantidad de agua en la primera que vino en la segunda: código 5939.<br/>Hay menos agua en la primera que vino en la segunda: código 3579.<br/>No podemos estar seguros de ninguna de las afirmaciones anteriores: código 9989."
	},
    {
		file: "acertijo11/acertijo11.png",
		answer: "16",
		kind: "image",
		text: "¿En cuántos días llegará a la cima del muro?"
	},
    {
		file: "acertijo12/acertijo12.png",
		answer:  "00",
		kind: "image",
		text: "Las dos últimas cigras de 14!"
	},
    {
		file: "acertijo13/acertijo13.png",
		answer: "36",
		kind: "image",
		text: "El número total de perlas era:<br>36, 43, 50 o 64."
	},
    {
		file: "acertijo14/acertijo14.jpg",
		answer: "66",
		kind: "image",
		text: "¿Cuántos puntos tiene el triángulo que ocupa el décimo lugar en esta serie?"
	},
    {
		file: "acertijo15/ACERTIJO_15.ggb",
		answer: "5201" ,
		kind: "geogebra",
		text: "Arrastra el número 25 a la casilla que le corresponde siguiendo el orden lógico de colocación."
	},
    {
		file: "acertijo16/ACERTIJO_16.ggb",
		answer: "1345" ,
		kind: "geogebra",
		text: "Arrastra los números para que se cumpla la igualdad."
	},
    {
		file: "acertijo17/ACERTIJO_17.gif",
		answer: "3" ,
		kind: "image",
		text: "En una habitación sin luz tengo un cajón con diez pares de calcetines blancos y otros diez pares de calcetines negros.¿Cuántos calcetines debo coger para estar seguro de tener un par de calcetines del mismo color?"
	},
    {
		file: "acertijo18/ACERTIJO_18.gif",
		answer: "21" ,
		kind: "image",
		text: "En una habitación sin luz tengo un cajón con diez pares de guantes blancos y otros diez pares de guantes negros.¿Cuántos guantes debo coger para estar seguro de tener un par de guantes del mismo color?"
	},
    {
		file: "acertijo19/acertijo19.jpg",
		answer: "6161" ,
		kind: "image",
		text: "Las piezas del cuadrado y el rectángulo son exactamente iguales: Código 4635<br/>Hay exactamente una pieza más grande en el rectángulo: Código 9301<br/>Hay exactamente dos piezas más grandes en el rectángulo: Código 6161<br/>Hay más de dos piezas más grandes en el rectángulo: Código 3075"
	},
    {
		file: "acertijo20/acertijo20.png",
		answer: "0" ,
		kind: "image",
		text: "¿Cuántos gatos, sacos y viejas (en total) iban hacia Villavieja?"
	},
    {
		file: "acertijo21/ACERTIJO_21.ggb",
		answer: "5201" ,
		kind: "geogebra",
		text: "Arrastra hasta el hueco gris el único cubo que no se puede formar al doblar la figura formada por los seis cuadrados de colores. Cuando hayas terminado, introduce el código aquí."
	},
    {
		file: "acertijo22/acertijo22.png",
		answer: "2025" ,
		kind: "image",
		text: "Si 3 cafés y dos refrescos cuestan 4,40 euros, y 2 cafés y cuatro refrescos cuestan 9,60 euros."
	},
    {
		file: "acertijo23/acertijo23.png",
		answer: "2354" ,
		kind: "image",
		text: "Averigua el código reemplazando cada letra por la anterior en el abecedario"
	},
    {
		file: "acertijo24/acertijo24.png",
		answer: "6174" ,
		kind: "image",
		text: "El primer resultado que se repite es:"
	},
    {
		file: "acertijo25/acertijo25.png",
		answer: "399" ,
		kind: "image",
        text: "¿Cuántos gatos, sacos y viejas (en total) venían de Villavieja?"
	}/*,
    {
		file: ["acertijo26/damas.jar","acertijo26/damas.class"],
		answer: "234" ,
		kind: "jar",
		text: "Señala N casillas de forma que no haya dos ni en la misma fila,  ni en la misma columna ni en diagonal."
	}*/
];

var question;

var right_answers;
var current_tries;

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
        $('#code-text').html('');

		app.prepareQuestionArray();
		app.loadQuestion();
		app.startTimer();
		app.setupListeners();
	},

	loadQuestion: function(){
		current_tries = 0;
		question = questions.pop();
		app.questionLoader(question);
	},

	startTimer: function(){
		Arduino.start();

		$('#webcam').everyTime(1000,'gameTimer',app.timerHandler);
	},

	die: function(){
		alert('LA HAS PALMAO');
		//parar timers
	},

	setupListeners: function(){
		$('#code-submit').click(function() {
			// question answered right
			if(question.answer.toLowerCase() == $('#code-text').val().toLowerCase()){
				right_answers++;
				// player wins
				if(right_answers == WINNING_QUESTIONS){
					//arduino go back to initial position
					app.win();
				}
				//player hasnt won yet
				else{
					//arduino stop 30s
                    clearTimeout(win_timer);
                    Arduino.stop();
                    timer.running = false;

					$('#information-display p').css({color:'green'}).html('¡Respuesta correcta! ' + (WINNING_QUESTIONS- right_answers) + ' más para ganar.').fadeIn(500).fadeOut(3000,function() {
						$('#code-text').val("");
						app.loadQuestion();
						win_timer = setTimeout("app.reactivateTimer()",30000-3500); //TBD: quitar chapuza tiempo
					});
				}
			}
			// question answered wrong
			else{
				current_tries ++;
				// too many tries
				if(current_tries == 3){
					$('#information-display p').css({color:'red'}).html('¡Demasiados fallos, siguiente pregunta!').fadeIn(500).fadeOut(3000,function() {
						$('#code-text').val("");
						app.loadQuestion();
                        app.blockCodetext('¡Respuesta incorrecta! Penalización de 30 s');
					});
				}
				// still trying
				else{
                    app.blockCodetext('¡Respuesta incorrecta! Penalización de 30 s');
				}
			}
			return false;
		});
	},

	// private
	questionLoader: function(question) {
		switch(question.kind)
		{
		case "geogebra":
		  visual_code = '<applet name="ggbApplet" code="geogebra.GeoGebraApplet" archive="questions/geogebra.jar"\
				codebase="./"\
				width="470" height="305"mayscript="true">\
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
		case "image":
		  visual_code = '<img src="/questions/' + question.file + '" width="470" height="305"/>';
		  break;
		case "jar":
            var class = question.file.pop();
            var jar = question.file.pop();
            visual_code = "<applet align='middle' archive='/questions/" + jar + "' code='/questions/" + class + "' height='242' width='210'><param name='align' value='middle'>\
  <param name='code' value='/questions/" + class + "'>\
  <param name='height' value='470'>\
  <param name='width' value='305'></applet>";
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
		Arduino.start();
		timer.running = true;
	},

    blockCodetext: function(msg) {
        $('#code-text').val("");
        $('#information-display p').css({color:'red'}).html(msg).fadeIn(500).fadeOut(3000);
        $('form').hide();
        $('#progressbar').show();

        var stepDelay = 333;
        var numberSteps = parseInt(30000/stepDelay);

        $('#progressbar').everyTime(stepDelay,'penaltyTimer',function(i) {
            $(this).progressbar({
                value: parseInt(100 - 100*i/numberSteps)
            });

            // restore #code-text in last iteration
            if (i == numberSteps){
                $('form').show();
                $('#progressbar').hide();
                $('#information-display p').html('');
            }
        }, numberSteps);
    }
};


$(document).ready(function(){
	app.gameBegin();
	app.showScrollOnStartButtonClick();
	app.showGameConsoleOnArrowClick();
});
