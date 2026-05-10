const form = document.querySelector("form");
const msg = document.querySelector("#msg");

let messages = [];

//presence
messages = isFilled("Fullname", messages, "full name is missing");
messages = isFilled("id", messages, "id is missing");
messages = isFilled("email", messages, "email is missing");
messages = isFilled("gender", messages, "gender is missing");

//format
messages = isId("id", messages, "id format is wrong (must be 7 numbers)")
messages = isEmail("email", messages, "email format is wrong");

//whitelist

