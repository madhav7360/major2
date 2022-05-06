function prepareMatrix() {
 let Mat = new Array(8);
    for (let i = 0; i < Mat.length; i++) {
        Mat[i] = new Array(27);
    }
  let Alpha = new Array(27);
    Alpha[0]='A'
  for (let i = 1; i < 26; i++) {
    Alpha[i] = String.fromCharCode(Alpha[i-1].charCodeAt(0) + 1); // char array of A,B,C....Z,&;
  }
  Alpha[26] = "&";

  let index = 1,
    r,
    j;

  for (i = 0; i < 8; i++) {
    //logic for filling Mat
    for (j = 0; j < 27; j++) {
      r = (index + j) % 27;
      Mat[i][j] = Alpha[r];
    }
    index = index + 2;
  }
  return Mat;
}



function preparePlainText(str) {
  for (i = 0; i < str.length; i++) {
    if (str.charAt(i) == " ")
      str = str.substring(0, i) + "&" + str.substring(i + 1); //for replacing spaces ' '  with & in plain text
  }
  str=str.toUpperCase();
  return str;
}



function enhancedEncryption(str, keyword) {
  let Mat = prepareMatrix();
  str = preparePlainText(str);
  console.log(str)
  let cipher_text = "";
  let index = 0;
  let key = generateKey(str, keyword).toUpperCase();
  console.log(key);
  for (i = 0; i < str.length; i++) {
    charpt = str.charAt(i); //char of plain text
    charkt = key.charAt(i); //char of key text
    charpt_index = 0;
    charkt_index = 0;

    for (j = 0; j < 27; j++) {
      if (Mat[index % 8][j] == charpt) {
        //finds index of plain text's char in Mat and stores in charpt_index
        charpt_index = j;
      }
      if (Mat[index % 8][j] == charkt) {
        //finds index of key text's char in Mat and stores in charkt_index
        charkt_index = j;
      }
    }

    cipher_index = (charkt_index + charpt_index) % 27;

    cipher_text = cipher_text + Mat[index % 8][cipher_index]; //adding char in cipher string

    index++; //incrementing rows
  }
  console.log(cipher_text);
  return cipher_text;
}

function enhancedDecryption(cipher_text,keyword){

    let Mat = prepareMatrix();
    let key = generateKey(cipher_text, keyword).toUpperCase();
    console.log(cipher_text);
    console.log(key);
    let index = 0;
    let res = "";
    for ( i = 0; i < cipher_text.length ; i++) {
         charct = cipher_text.charAt(i);
         charkt = key.charAt(i);
         charct_index = 0;
         charkt_index = 0;

        for( j = 0; j < 27; j++){
            if( Mat[index % 8][j] == charct){              //finds index of plain text in Mat and stores in charpt_index
                charct_index = j;
            } if( Mat[index % 8][j] == charkt){         //finds index of key text in Mat and stores in charkt_index
                charkt_index = j;
            }
        }

         res_index = (charct_index - charkt_index);
        if(res_index < 0) res_index = res_index + 27;

        res_index = res_index % 27;

        if(Mat[index % 8][res_index] == '&') res = res + ' ';
        else res = res + Mat[index % 8][res_index];

        index++;
    }
    console.log(res)
    return res;
}
