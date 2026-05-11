const form = document.querySelector("form");
const msg = document.querySelector("#msg");

form.addEventListener('submit', e=> {
   
    e.preventDefault();

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
    
}
else{ 
    senddata();
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
    if(!val.match("[a-z0-9]+@[a-z]+\.[a-z]{2,4}")){
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

async function senddata() {
    const endpoint = "http://localhost:4000/contact_us/insert";

    const data = {
        firstname : document.getElementsByName("firstname")[0].value,
        lastname : document.getElementsByName("lastname")[0].value,
        email : document.getElementsByName("email")[0].value,
        gender : document.getElementsByName("gender")[0].value,
        number : document.getElementsByName("number")[0].value,
        DOB : document.getElementsByName("DOB")[0].value,
        language : document.getElementsByName("language")[0].value,
        message : document.getElementsByName("message")[0].value,
    };
    fetch(endpoint,{
            method : "post",
            headers : { "Content-Type": "application/json" },
            body : JSON.stringify(data) 
        })
        .then(function(response){
            if(response.ok){
                return response.json();
            } else{
                 msg.innerHTML = "Error occurred while submiting your message";
                 throw new Error("Server error");
            }

        })
        .then(function(result){
           if (result.status) getdata();
        })
         .catch(function(err){
            if (err.message !== "Server error") {
            msg.innerHTML = "Error occurred while submiting your message";
            }
        });
  
}

async function getdata() {
     const endpoint = "http://localhost:4000/contact_us/view";

     try{
        const response = await fetch(endpoint);
        const data = await response.json();
        const lastEntry  = data[data.length - 1];

        msg.innerHTML = "Thank you " + lastEntry.firstname + ", your message has been submit successfully! ";
     }
     catch(err){
        msg.innerHTML= "There is an error occurred"
     }
}
