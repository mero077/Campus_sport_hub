const form = document.querySelector("form");
const msg = document.querySelector("#msg");

form.addEventListener('submit', e=> {
   
let messages = [];

//presence
messages = isFilled("firstname", messages, "First name is missing");
messages = isFilled("lastname", messages, "Last name is missing");
messages = isFilled("email", messages, "Email is missing");
messages = isFilled("message", messages, "Message missing");

//format
messages = isEmail("email", messages, "Email format is wrong");
messages = isPhone("number", messages, "Phone number must start with 05 and be 10 numbers");

//whitelist
const genders = ['Female', 'Male'];
const languages = ['English', 'Arabic', 'French', 'Chinese'];
messages = isWhitelist("gender", genders, messages, "Gender selection is invalied ");
messages = isWhitelist("language", languages, messages, " Language selection is invalied ");

//errors
if(messages.length > 0){
    msg.innerHTML = "  issues found is [" + messages.length + "]: " + messages.join(", ") + ".";
    e.preventDefault();
}


});
//functions
function isFilled(selector, messages, msg){
    const val = document.getElementsByName(selector)[0].value.trim();
    if(val.length < 1){
        messages.push(msg);
    }
    return messages;

}

function isEmail(selector, messages, msg){
    const val = document.getElementsByName(selector)[0].value.trim();
    if(!val.match("[a-z0-9]+@[a-z]+\\.[a-z]{2,4}")){
        messages.push(msg);
    }
    return messages;

}

function isPhone(selector, messages, msg){
    const val = document.getElementsByName(selector)[0].value.trim();
    if(!val.match("^05[0-9]{8}$")){
        messages.push(msg);
    }
    return messages;

}

function isWhitelist(selector, whitelist, messages,msg){
     const val = document.getElementsByName(selector)[0].value.trim();
    if(!whitelist.includes(val)){
        messages.push(msg);
    }
    return messages;

}
