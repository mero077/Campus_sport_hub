const form = document.querySelector("form");
const msg = document.querySelector("#msg");

form.addEventListener('submit', e=> {
let messages = [];

//presence
messages = isFilled("Fullname", messages, "Full name is missing");
messages = isFilled("id", messages, "Id is missing");
messages = isFilled("email", messages, "Email is missing");

//format
messages = isId("id", messages, "Id format is wrong (must be 7 numbers)")
messages = isEmail("email", messages, "Email format is wrong");

//whitelist
const sports = ['Football Tournament', 'Basketball Challenge', 'Running Marathon'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];
const colleges = ['Computer Science', 'Science', 'Medicine', 'Applied Medical Science','Engineering', 'Business', 'Arts & Humanities'];
const genders = ['female', 'male'];

messages = isWhitelisted("sport", sports, messages, "Sport event selection is invalied");
messages = isWhitelisted("level", levels, messages, "Your level selection is invalied");
messages = isWhitelisted("college", colleges, messages, "Your college selection is invalied");
messages = isWhitelisted("gender", genders, messages, "Gender selection is invalied");

//error
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
function isId(selector, messages, msg){
    const val = document.getElementsByName(selector)[0].value.trim();
    if(!val.match("^[0-9]{7}$")){
        messages.push(msg);
    }
    return messages;

}

function isEmail(selector, messages, msg){
    const val = document.getElementsByName(selector)[0].value.trim();
    if(!val.match("[a-z0-9]+@[a-z]+\.[a-z]{2,4}")){
        messages.push(msg);
    }
    return messages;
}

function isWhitelisted(selector, whitelist, messages, msg){
     const val = document.getElementsByName(selector)[0].value.trim();
    if(!whitelist.includes(val)){
        messages.push(msg);
    }
    return messages;

}
