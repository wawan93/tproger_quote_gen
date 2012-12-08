$(document).ready(function() {


// Скрипт нагло скопипизжен с http://bart-gen.ru/
// Огромное спасибо автору! Статья на харбе - http://habrahabr.ru/post/149606/

	
	var canvas = document.getElementById('fon');  //Определяю canvas
	var ctx = canvas.getContext('2d'); //Определяю контехт canvas
	var sprite = new Image(); 
	sprite.src = 'img/sprite.png'; //Определяю спрайт
	sprite.onload=function(e){ctx.drawImage(sprite, 0, 0);}; //Сразу рисую пустой спрайт
	
	function draw(text, auth)
	{	
		ctx.drawImage(sprite, 0, 0);	//Рисую спрайт
		var maxWidth = 550; //максимальная длина строки в px
		var lineHeight = 25; //максимальная высота строки, нужна для определения положения текста
		var marginTop = 200; 
		/*если мы знаем высоту текста, то мы можем
		предположить, что высота строки должна быть именно такой*/
		var marginLeft = 590;
		
		ctx.font = "bold 18px courier";
		ctx.fillStyle = "#fff";
		ctx.textAlign = "right";
		ctx.textBaseline = "middle";
	
		var words = text.split(" ");
		var countWords = words.length;
		var line = "";
		
		// разделяем текст на строки
		var l = text.split ("\n");
		var lines = new Array();
		var k=0;
		
		// каждую строку делим еще на строчки по длине
		for (var c=0;c<l.length;c++) {
			var words = l[c].split(" ");
			var countWords = words.length;
			var line = "";

			// перебираем все слова и составляем из них строки
			for (var n = 0; n < countWords; n++) {
				var testLine = line + words[n] + " ";
				var testWidth = ctx.measureText(testLine).width;
				if (testWidth > maxWidth) {
					lines[k] = line;
					k++;
					line = words[n] + " ";
				}	
				else {
					line = testLine;
				}
			}
			lines[k] = line;
			k++;
		}
		
	// Проверяем, не вылезли ли мы за границы
		if (k>8) {
			alert("Слишком много строчек!"); exit;
		}
		
	//Считаем, на сколько надо отступить от середины, чтобы весь текст был по центру	
		marginTop = 205 - (lineHeight) * (k/2);
		
	// Теперь печатаем текст

		for (var n=0; n<(k); n++) {
			ctx.fillText(lines[n], marginLeft, marginTop);
			marginTop += lineHeight;
		}
	
	// Печатаем автора
		ctx.font = "bold italic 18px courier";
		ctx.fillStyle = "#0f0";
		ctx.textAlign = "right";
		ctx.textBaseline = "middle";
		ctx.fillText(auth, marginLeft, 330);
	}
	
	$('#writeIt').click(function(){
		phrase = document.forms.inputForm.elements.inputPhrase.value;
		author = "/* @ " + document.forms.inputForm.elements.inputAuthor.value + " */ ";
		draw(phrase, author);
	});
	
	$('#cancel').click(function(){
		ctx.drawImage(sprite, 0, 0);
	});

	$('#downloadIt').click(function(){
            var form = '<form id="canvas_form" action="process.php"  method="post">'+
                        '<input type="hidden" name="imageData" value="' + canvas.toDataURL("image/png") + '" />'+
                        '</form>';
            $("#saveimage").html(form);
            document.forms["canvas_form"].submit();
	});
});