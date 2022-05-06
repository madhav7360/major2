$(function(){

	var body = $('body'),
		stage = $('#stage'),
		back = $('a.back');

	/* Step 1 */

	$('#step1 .encrypt').click(function(){
		body.attr('class', 'encrypt');

		// Go to step 2
		step(2);
	});

	$('#step1 .decrypt').click(function(){
		body.attr('class', 'decrypt');
		step(2);
	});

	$('#step1 .friedman').click(function(){
		body.attr('class', 'friedman');
		step(2);
	});

	/* Step 2 */


	$('#step2 .button').click(function(){
		// Trigger the file browser dialog
		$(this).parent().find('input').click();
	});


	// Set up events for the file inputs

	var file = null;

	$('#step2').on('change', '#encrypt-input', function(e){

		// Has a file been selected?

		if(e.target.files.length!=1){
			alert('Please select a file to encrypt!');
			return false;
		}

		file = e.target.files[0];

		//Is file too large
		if(file.size > 1024*1024){
			alert('Please choose files smaller than 1mb, otherwise you may crash your browser.');
			return;
		}

		//Is file empty
		if(file.size == 0){
			alert('Empty file. \nPlease chosse a file with some text.');
			return;
		}

		step(3);
	});

	$('#step2').on('change', '#decrypt-input', function(e){

		if(e.target.files.length!=1){
			alert('Please select a file to decrypt!');
			return false;
		}

		file = e.target.files[0];
		step(3);
	});

	$('#step2').on('change', '#friedman-input', function(e){

		// Has a file been selected?

		if(e.target.files.length!=1){
			alert('Please select a file to test!');
			return false;
		}

		file = e.target.files[0];

		//Is file too large
		if(file.size > 1024*1024){
			alert('Please choose files smaller than 1mb, otherwise you may crash your browser.');
			return;
		}

		//Is file empty
		if(file.size == 0){
			alert('Empty file. \nPlease chosse a file with some text.');
			return;
		}

		step(3);
	});

	/* Step 3 */


	$('a.button.process').click(function(){

		if(body.hasClass('encrypt') || body.hasClass('decrypt' ))
		{
		var input = $(this).parent().find('input[type=password]'),
			a = $('#step4 a.download'),
			password = input.val();

		input.val('');

		if(password.length<5){
			alert('Please choose a longer password!');
			return;
		}
	}

		// The HTML5 FileReader object will allow us to read the 
		// contents of the	selected file.

		var reader = new FileReader();

		if(body.hasClass('encrypt')){

			// Encrypt the file
			reader.onload = function(e){

				
				console.log(e.target.result);
				if($('input[name="Technique"]:checked').val()=="Traditional")
				var encrypted = encryption(e.target.result, password);
				else
				var encrypted = enhancedEncryption(e.target.result, password);




				
				a.attr('href', 'data:application/octet-stream,' + encrypted);
				a.attr('download', file.name + '.encrypted');

				step(4);
			};

			

			reader.readAsText(file);
		}
		else if (body.hasClass('decrypt')){

			// Decrypt it!

			reader.onload = function(e){

				if($('input[name="Technique"]:checked').val()=="Traditional")
				var decrypted = decryption(e.target.result, password).toString(CryptoJS.enc.Latin1);
				else
				var decrypted = enhancedDecryption(e.target.result, password).toString(CryptoJS.enc.Latin1);
				console.log(decrypted);
			

				a.attr('href', 'data:application/octet-stream,' + decrypted);
				a.attr('download', file.name.replace(file.name.substring(file.name.indexOf('.')),'.txt'));

				step(4);
			};

			reader.readAsText(file);
		}
		else {
				// Encrypt the file
				reader.onload = function(e){

				
					console.log(e.target.result);
					// if($('input[name="Technique"]:checked').val()=="Traditional")
					// var encrypted = encryption(e.target.result, password);
					// else
					// var encrypted = enhancedEncryption(e.target.result, password);
					let ioc = calculateIOC(e.target.result);
					console.log(ioc);
					document.getElementById("iocValue").innerHTML = ioc;
					let keylength = calculateLength(ioc, e.target.result)
					document.getElementById("keyLength").innerHTML = keylength;

					console.log(keylength);
					// a.attr('href', 'data:application/octet-stream,' + encrypted);
					// a.attr('download', file.name + '.encrypted');
	
					step(5);
				};
	
				
	
				reader.readAsText(file);
		}
	});


	/* The back button */


	back.click(function(){

	

		$('#step2 input[type=file]').replaceWith(function(){
			return $(this).clone();
		});

		step(1);
	});


	// function that moves the viewport to the correct step div

	function step(i){

		if(i == 1){
			back.fadeOut();
		}
		else{
			back.fadeIn();
		}

		// Move the #stage div. Changing the top property will trigger
		// a css transition on the element. i-1 because we want the
		// steps to start from 1:

		stage.css('top',(-(i-1)*100)+'%');
	}

});
