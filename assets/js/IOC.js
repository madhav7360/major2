//Frequency Functions
function getLetterFrequencies(input) {
    console.log(input);
    var freq = new Array(0);
    
        freq[0] = new Array();
  
    var aIndex = 0;
    
        for (var z = 'A'.charCodeAt() ; z <= 'Z'.charCodeAt(0) ; z++) {
            freq[0][z] = 0;
        }
    
    for (var x = 0; x < input.length; x++) {
        var c = input.charAt(x);
        if ((!/[^a-zA-Z]/.test(c))) {
            //Do everything in upper case.
            c = c.toUpperCase();
            freq[aIndex][c.charCodeAt(0)]++;
            aIndex++;
            if (aIndex >= 0) aIndex = 0;
        }
    }
    console.log(freq);
    return freq;
}


//IOC Function
function calculateIOC(input) {
    console.log('in ioc'+input);
    var freqs = getLetterFrequencies(input, 0);
    let totalLetters = 0;
    // 
    // Calculate the IOC
    // First, loop through the characters and
    // calculate the numerator
    var numerator = 0;
    for (var i = 'A'.charCodeAt(0) ; i <= 'Z'.charCodeAt(0) ; i++) {
        numerator += freqs[0][i] * (freqs[0][i] - 1);
        totalLetters += freqs[0][i];
    }

    // Calculate the denominator
    var denominator = totalLetters * (totalLetters - 1);

    // Calculate the IOC

    let ioc = numerator / denominator;

    calculateLength(ioc, totalLetters);

    return ioc;
}


function calculateLength(ioc, input) {
    let totalLetters = 0;
    var freqs = getLetterFrequencies(input, 0);
  
    for (var i = 'A'.charCodeAt(0) ; i <= 'Z'.charCodeAt(0) ; i++) {
        totalLetters += freqs[0][i];
    }
    console.log(totalLetters);

    numerator = (0.027*totalLetters);
    console.log(numerator);
    denominator= ((totalLetters-1)*ioc) - (0.038*totalLetters) + 0.065;
    console.log(denominator);
    return Math.round(numerator / denominator);
}