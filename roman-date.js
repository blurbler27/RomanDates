



function bisextilis(annus) {
    if (annus % 4 === 0) {
	if (annus % 100 === 0){
	    return false;
	}
	else{
	    return true;
	}
    }
    return false;
}



/*
Want to get the date ancient roman style, e.g., Mar. 15 should
be "Idus Martias"?  Idus f pl.
*/

const menses = [
    /* nomen mensis, accus pl, nom pl, numerus dierum, nonae, idus*/
    ["Ianuari","as","ae", 31, 5, 13],
    ["Februari","as","ae", 28, 5, 13 ],
    ["Marti","as","ae",31, 7, 15 ],
    ["April","es","es", 30, 5, 13 ],
    ["Mai","as","ae",31, 7, 15 ],
    ["Iuni","as","ae", 30, 5, 13 ],
    ["Iuli","as","ae",31,7,15 ],
    ["August","as","ae", 31,5, 13],
    ["Septembres","","",30,5, 13 ],
    ["Octobres","","", 31,7,15],
    ["Novembres","","", 30,5, 15],
    ["Decembres","","", 31,5, 15 ],
];

/***********************************************************************************************/
/*  See https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript */
const numeralCodes = [["","I","II","III","IV","V","VI","VII","VIII","IX"],         // Ones
                    ["","X","XX","XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],   // Tens
                      ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"],        // Hundreds
		      ["", "M", "MM",  "MMM"]];                              //Thousands (up to 3000)

function convert(num) {
  var numeral = "";
  var digits = num.toString().split('').reverse();
  for (var i=0; i < digits.length; i++){
    numeral = numeralCodes[i][parseInt(digits[i])] + numeral;
  }
  return numeral;  
}
/***********************************************************************************************/
function diesMensis(nunc)
{
    let annus = nunc.getFullYear();
    let mensis=nunc.getMonth();
    let dies = nunc.getDate();
    let idus = menses[mensis][5];
    let nonae=menses[mensis][4];
    let numerusDierum=menses[mensis][3];
    let mensisNomenAc=menses[mensis][0]+menses[mensis][1];
    let mensisNomenNom=menses[mensis][0]+menses[mensis][2];

    if(mensis===1 && bisextilis(annus) )
    {
	numerusDierum=29;
    }
    

    if(dies===1){return "Kalendae "+menses[mensis][0]+menses[mensis][2];}

    if(dies<nonae-1)
    {
	let n=nonae - dies+1;
	return "Ante diem "+convert(n)+" Nonas "+mensisNomenAc;
    }
    if(dies===nonae-1){return "Pridie Nonas "+mensisNomenAc;}
    if(dies===nonae){return "Nonas "+mensisNomenAc;}
    
    if(dies<idus-1)
    {
	let n=idus - dies+1;
	return "Ante diem "+convert(n)+" Idus "+mensisNomenAc;
    }
    if(dies===idus-1){return "Pridie Idus "+mensisNomenAc;}
    if(dies===idus){return "Idus "+mensisNomenAc;}    

    mensisNomenAc=menses[(mensis+1)%12][0]+menses[(mensis+1)%12][1];
    mensisNomenNom=menses[(mensis+1)%12][0]+menses[(mensis+1)%12][2];

    if(dies===numerusDierum){return "Pridie Kalendas "+ mensisNomenAc;}

    if(dies<numerusDierum)
    {
	let n= numerusDierum-dies+2;
	if(mensis===1 && numerusDierum===29) /*Leap year*/
	{
	    if(dies<=24){n=n-1;} /*6th day before Kal occurs twice*/
	}
	return "Ante diem "+convert(n)+" Kalendas "+mensisNomenAc;
    }
    return "Falsum est!";
    
}


