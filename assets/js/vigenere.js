
// JavaScript code to implement Vigenere Cipher

// This function generates the key in
// a cyclic manner until it's length isi'nt
// equal to the length of original text
function prepareString(str)
{
    return str.replace(/ /g,'').toUpperCase();
}

function generateKey(str,key)
{
	
	key=key.split("");
	if(str.length == key.length)
		return key.join("");
	else
	{
		let temp=key.length;
		for (let i = 0;i<(str.length-temp) ; i++)
		{
			
			key.push(key[i % ((key).length)])
		}
	}
	return key.join("");
}

// This function returns the encrypted text
// generated with the help of the key
function cipherText(str,key)
{
	let cipher_text="";

	for (let i = 0; i < str.length; i++)
	{
		// converting in range 0-25
		let x = (str[i].charCodeAt(0) + key[i].charCodeAt(0)) %26;

		// convert into alphabets(ASCII)
		x += 'A'.charCodeAt(0);

		cipher_text+=String.fromCharCode(x);
	}
	return cipher_text;
}

// This function decrypts the encrypted text
// and returns the original text
function decryption(cipher_text,keyword)
{
    console.log(cipher_text);
	let orig_text="";
    let key = generateKey(cipher_text, keyword).toUpperCase();
    console.log(key);


	for (let i = 0 ; i < cipher_text.length ; i++)
	{
		// converting in range 0-25
		let x = ((cipher_text[i].charCodeAt(0) -	key[i].charCodeAt(0) + 26)) %26;

		// convert into alphabets(ASCII)
		x += 'A'.charCodeAt(0);
		orig_text+=String.fromCharCode(x);
	}
	return orig_text;
}



function encryption(str, keyword)
{
    console.log(str);
    str = prepareString(str);
    console.log(str);
    let key = generateKey(str, keyword).toUpperCase();
    console.log(key);
    let cipher_text = cipherText(str, key);
    console.log(cipher_text)
    return cipher_text;
}


