const URL = "http://localhost:8080/";
const API_URL = "/profiles";

function wireUp() {
    // addEvent listener to button for click
    document.querySelector("#button").addEventListener("click", loadProfiles);

    document.querySelector("#submitBtn").addEventListener("submit", handlePost);
}

function addDeleteEvent() {
    document.querySelectorAll(".deleteBtn").forEach(el => {
        el.addEventListener("click", deleteProfile);
    })
}

function addEditEvent() {
    document.querySelectorAll(".editBtn").forEach(el => {
        el.addEventListener("click", getById);
    })
}

function addSaveEvent() {
    document.querySelectorAll(".saveBtn").forEach(el => {
        el.addEventListener("click", saveProfile);
    })
}

function handlePost(data) {

    // axios.post(API_URL, body).then((res) => {
    //     console.log(res.data);
    // });

    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            res.json();
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

function loadProfiles() {
    // const res = await fetch(API_URL);
    // const data = await res.json();
    // console.log(data);
    // displayProfiles(data);

    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            displayProfiles(data);
        })
        .then(err => console.log(err));
}

function displayProfiles(profiles) {
    let card = "";
    let i = 0;

    profiles.forEach(newData => {
        const { id, name, linkedIn, company, picture, role } = newData;
        card += `
            <div id="cardProfiles" class="card" style="width: 18rem;">
                <img src=${picture} class="card-img-top circle" alt="Profile Photo">
                <div class="card-body">
                    <h5 class="card-title">${name} - ${company}</h5>
                    <p class="card-text">${role}</p>
                    <a href=${linkedIn} class="btn btn-primary">Go to Profile</a>
                    <button id=${i++} type="button" class="deleteBtn btn btn-danger">Delete</button>
                    <button id=${id} type="button" class="editBtn btn btn-success">Edit</button>
                    <button type="button" class="saveBtn btn btn-success">Save</button>
                </div>
            </div>
        `
    });
    document.getElementById("profiles").innerHTML = card;
    addDeleteEvent();
    addEditEvent();
    addSaveEvent();
}

function deleteProfile(e) {
    e.preventDefault();
    let id = e.target.id;
    console.log(id);

    fetch("/", {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id
        })
    })
        .then(res => {
            loadProfiles();
        })
}

var userId;

function getById(e) {
    let { id } = e.target;
    userId = id;
    fetch(`/${id}`)
        .then(res => res.json())
        .then(populateForm);
}

function populateForm(data) {
    let { name, linkedIn, company, picture, role } = data;
    document.getElementById("name").value = name;
    document.getElementById("company").value = company;
    document.getElementById("role").value = role;
    document.getElementById("linkedIn").value = linkedIn;
    document.getElementById("picture").value = picture;
}

// let user = { id: null, name: "", linkedIn: "", company: "", picture: "", role: "" }

// function onChangeHandler(evt) {
//     evt.preventDefault();
//     let { name, value } = evt.target;
//     user[name] = value;
//     console.log(user);
// }

function getFields() {
    let name = document.getElementById("name").value;
    let company = document.getElementById("company").value;
    let role = document.getElementById("role").value;
    let linkedIn = document.getElementById("linkedIn").value;
    let picture = document.getElementById("picture").value;

    return { id: userId, name, company, role, linkedIn, picture };
}

function saveProfile() {
    fetch(URL, {    
        method: "put",
        body: JSON.stringify(getFields()),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((person) => console.log(person));
}

wireUp();