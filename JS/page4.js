const form = document.querySelector("form");
const msg = document.querySelector("#msg");

form.addEventListener('submit', e=> {
    e.preventDefault();
let messages = [];

//presence
messages = isFilled("Fullname", messages, "Full name is missing");
messages = isFilled("StudentID", messages, "Id is missing");
messages = isFilled("Email", messages, "Email is missing");

//format
messages = isId("StudentID", messages, "Id format is wrong (must be 7 numbers)")
messages = isEmail("Email", messages, "Email format is wrong");

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

async function senddata() {
    const endpoint = "http://localhost:4000/registration/insert";

    const data ={
        Fullname : document.getElementsByName("Fullname")[0].value,
        StudentID : document.getElementsByName("StudentID")[0].value,
        sport : document.getElementsByName("sport")[0].value,
        level : document.getElementsByName("level")[0].value,
        college : document.getElementsByName("college")[0].value,
        gender : document.getElementsByName("gender")[0].value,
        Email : document.getElementsByName("Email")[0].value,
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
                msg.innerHTML = "Error occurred while submiting your registration";
            }

        })
        .then(function(result){
            getdata();
        })

        .catch(function(err){
            msg.innerHTML = "Error occurred while submiting your registration";
        });
    }

async function getdata() {
     const endpoint = "http://localhost:4000/registration/view";

     try{
      const response = await fetch(endpoint);
        const data = await response.json();
        displaydata(data);}

        catch(err){
        msg.innerHTML= "There is an error occurrede"
     }
     }

     function displaydata(data){
        const cont = document.getElementById("Participants");
        cont.innerHTML="";

        data.forEach(function(Participants) {
            const name = document.createElement("p");
            name.textContent = "Name:" +  Participants.Fullname;

             const sport = document.createElement("p");
             sport.textContent = "Sport:" + Participants.sport;

              const level = document.createElement("p");
              level.textContent = "Level:" + Participants.level;

              cont.appendChild(name);
              cont.appendChild(sport);
              cont.appendChild(level);
        });
     }
     