// Assignment code here
function makePassword(size, params){
    //functions lower, upper, number, and special make use of ranges in order to generate ascii/utf-8 codes.
    //figured this method would would be a little easier and reduce typing also figured it would be a layer 
    //of randomness.
    var password = "";
    function lower (){ //returns a random lowercase letter 
        var r_lower = Math.floor((Math.random() * (26) + 97));
        // console.log('r_lower = '+ r_lower);
        return r_lower;
    }
    function upper (){ //returns a randomupper case letter
        var r_upper = Math.floor((Math.random() * (26) + 65));
        // console.log('r_upper = ' + r_upper);
        return r_upper;
    }
    function number(){ //returns a random number
        var r_number = Math.floor((Math.random() * (10) + 48 ));
        // console.log('r_number = ' + r_number);
        return r_number;
    }
    function special(){//returns a random special character
        //because i chose to use unicode encodings, i was forced to use ranges and whanot
        //in order to handle the different ranges of the special characters, i figured
        //id put them into an array and choose one at random.
        var special_char =[
             Math.floor((Math.random() * (16) + 33)),
             Math.floor((Math.random() * (9) + 58)),
             Math.floor((Math.random() * (6) + 91)),
             Math.floor((Math.random() * (4) + 123))];
        var r_special = special_char[Math.floor(Math.random() * 4)];
        // console.log('r_special = ' + r_special);
        return r_special;
    }
    var options=[lower,upper,number,special];//lists all options for password generation
    var choices = [];//empty array that gets populated by the user specifications for password generation

    for(var i = 0; i < 4; i++){ //this loop makes it so that only the specified parameters
        //are fulfilled. 
         if(params[i]){//checks to see if a parameter is asked for and if so pushes it into the user choices
             choices.push(options[i]);   
         }
    }
    function char(){//picks a random value that within the index of the generated choices array 
        var r_char = Math.floor(Math.random() * choices.length);
        return r_char;
    }
    
    for(var x = 0; x < size; x++){
        var r_num = char();//see function char()
        //this line was intersting. found that if I put the function within the array with parenthesis( ie. array = [function()]),
        //the function would be called within the options array and choices would be populated with values from the initial function call.
        //in order to have the function call on each loop, i added the parenthesis after it is accessed via index. kind of weird but it worked.
        var insert = String.fromCharCode(choices[r_num]());
        // console.log("insert = " + insert);
        password+= insert;//appends the random choice to the password
    }    
    
    return password;

        
}
function generatePassword(){

    var length;//determines the length of the password
    var luns = new Array(4);//acronym for lower, upper, numbers, and special. Makes it a bit easier to deal with specified options
    var good = [false, false]; //first determines that the length is a number and makes sure its a proper size
    do{
    length = prompt("Please enter a length for you password!",'');
    (!isNaN(Number(length))) ? good[0] = true: good[0] = false;//checks to see if the password length is actually a number.
    if(good[0]){
        if((length < 8) || length>128){//validation of proper password length
                if(length < 8){
                confirm("password must be at least 8 characters long");
                }else{
                confirm("password must be less than or equal to 128 characters long");
                }
        }else{
            good[1] = true;
        }
    }else{
        alert("length must be a numerical value!");
    }
    }while(!(good[0] && good[1]));//makes sure both the specified length is a number and the size is within specified parameters 
    luns[0] = confirm("would you like lowercase letters in your password?");
    luns[1] = confirm("would you like uppercase letters in your password?");
    luns[2] = confirm("would you like numeric characters in your password?");
    luns[3] = confirm("would you like special characters in your password?");
    var choices=0;//checks to see if the user actually picked an option
    for(var i = 0; i < 4; i++){
        if(luns[i]){
            choices++;
        }

    }
    if( choices == 0){//just doesnt make a password if the user doesnt pick an option
        alert("Guess you dont want a password?");
        return "[no password for you!]";
    }
    return makePassword(length, luns);//wanted a cleaner space so I added a function.
    
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
