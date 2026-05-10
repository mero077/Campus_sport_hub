const form = document.querySelector("form");
const msg = document.querySelector("#msg");

form.addEventListener('submit', e=> {
   
let messages = [];

//presence
messages = isFilled("firstname", messages, "first name is missing");
messages = isFilled("lastname", messages, "last name is missing");
messages = isFilled("email", messages, "email is missing");
messages = isFilled("message", messages, "messageis missing");

//format
messages = isEmail("email", messages, "email format is wrong");
messages = isPhone("number", messages, "phone number must start with 05 and be 10 numbers");

//whitelist
const genders = ['Female', 'Male'];
const languages = ['English', 'Arabic', 'French', 'Chinese'];
messages = isWhitelist("gender", genders, messages, "selection is invalied ");
messages = isWhitelist("language", languages, messages, "selection is invalied ");

//errors
if(messages.length > 0){
    msg.innerHTML = "  issues found is [" + messages.length + "]: " + messages.join(", ") + ".";
    e.preventDefault();
}


});

function isFilled(selector, messages, msg){
    const val = document.getElementsByName(selector)[0].value.trim();
    if(val.length < 1){
        messages.push(msg);
    }
    return messages;

}

function isEmail(selector, messages, msg){
    const val = document.getElementsByName(selector)[0].value.trim();
    if(!val.match("[a-z0-9]+@[a-z]+//.[a-z]{2,4}")){
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
