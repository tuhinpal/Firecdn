/*
 Project-Name: Firecdn
 Author: Tuhin Kanti Pal
 Author's Github: https://github.com/cachecleanerjeet
 Project's Github: https://github.com/cachecleanerjeet/Firecdn
 Author's Email: me@thetuhin.com
 LICENSE: Apache-2.0 
 Contact: https://telegram.dog/t_projects
 Channel: https://telegram.dog/tprojects
*/

window.onload = () => { /* Check the user status when the page has been loaded */
    firebase.auth().onAuthStateChanged((user) => {
        document.getElementById('pageload').style.display = "none"; /* Hide loading animation */
        if (user) { /* If logged in it will show Upload Page */
            document.getElementById('container').style.display = "block";
            document.getElementById('login').style.display = "none";
        } else { /* If not logged in it will show Login Page */
            document.getElementById('container').style.display = "none";
            document.getElementById('login').style.display = "flex";
        }
    });
}

eval(atob('ZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiLmxvZ28iKS5ocmVmID0gYXRvYigiYUhSMGNITTZMeTluYVhSb2RXSXVZMjl0TDJOaFkyaGxZMnhsWVc1bGNtcGxaWFF2Wm1seVpXTmtiZz09Iik7CmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIi5sb2dvIikudGFyZ2V0ID0gIl9ibGFuayI7'))
document.getElementById('do_login').addEventListener("click", async function() { /* Login */
    document.getElementById('do_login').innerText = "Logging In"
    firebase.auth().signInWithEmailAndPassword(document.getElementById('email').value, document.getElementById('password').value)
        .then((userCredential) => {
            console.log("Signed In")
        })
        .catch((error) => {
            document.getElementById('do_login').innerText = "Login"
            alert('ERROR - ' + error.message) /* Alerted error message if error happened */
        });
})

document.getElementById('logout_btn').addEventListener("click", async function() { /* Logout */
    var askForsignout = confirm(`Are you sure for logging out?`); /* Asking confermation for logged out */
    if (askForsignout) {
        document.getElementById('do_login').innerText = "Login"
        firebase.auth().signOut()
    };
})

const uploadfile = document.getElementById("uploadfile") /* Get the file input element */
uploadfile.onchange = function() {
    if (uploadfile.value) { /* If file has been selected then it will show name of that file on "filenameholder" element */
        document.getElementById("filenameholder").innerText = uploadfile.value.replace(/^.*[\\\/]/, '')
    } else { /* If no file has been provided it will stay on previous state */
        return
    }
}

eval(atob('ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImtvb2wiKS5pbm5lclRleHQgPSBhdG9iKCJUV0ZrWlNCaWVTQlVkV2hwYmc9PSIp'))
document.getElementById("button").addEventListener("click", upload); /* If upload button clicked it will execute upload function */

async function upload() { /* Upload function */
    var actionbutton = document.getElementById('button') /* Get the button */
    actionbutton.innerText = "Uploading";
    const reader = new FileReader(); /* Init FileReader */
    reader.addEventListener('load', (event) => { /* When FileReader is ready */
        fetch('https://time.akamai.com/') /* Fetch the time */
            .then((res) => res.text())
            .then((result) => {
                var ref = firebase.storage().ref().child(result + Math.random().toString(36).substring(9)); /* Create an Unique ID using time and some random strings */
                var upload = ref.putString(event.target.result, 'data_url') /* Started upload the DataUrl on Firebase */

                upload.on('state_changed',
                    (snapshot) => {
                        actionbutton.classList.remove('actionbutton')
                        actionbutton.classList.add('progressbutton')
                        actionbutton.innerText = `${Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100)}% Uploaded` /* Progress on the button */
                    },
                    (error) => { /* If error while upload (Permision Issue) */
                        actionbutton.classList.remove('actionbutton')
                        actionbutton.classList.add('progressbutton')
                        actionbutton.classList.add('error')
                        actionbutton.innerText = `Sorry, upload error !`
                    },
                    () => { /* When upload has been completed */
                        upload.snapshot.ref.getDownloadURL().then((downloadurl) => { /* Get the Download URL */
                            actionbutton.classList.remove('progressbutton')
                            actionbutton.classList.add('actionbutton')
                            actionbutton.innerText = `Copy Direct URL`
                            document.getElementById('copytext').value = downloadurl /* Write the value on an almost hidden Input Box */
                            document.getElementById("button").addEventListener("click", copy); /* Create an event listener for copy the url */
                        });
                    }
                );
            })
            .catch((error) => { /* If Error happened whie fetching time */
                actionbutton.classList.remove('actionbutton')
                actionbutton.classList.add('progressbutton')
                actionbutton.classList.add('error')
                actionbutton.innerText = `Sorry, that's an error !`
            })
    });
    if (uploadfile.files.length === 0) { /* If no file has been provided */
        actionbutton.innerText = "Select a file before Upload";
        setTimeout(function() {
            actionbutton.innerText = "U P L O A D";
        }, 1500);
    } else {
        document.getElementById("button").removeEventListener("click", upload); /* Remove the executed eventlistener (upload()) */
        reader.readAsDataURL(uploadfile.files[0]); /* Read the first selected file and init everything */
    }
}

function copy() { // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
    var copyText = document.getElementById('copytext');
    copyText.select();
    document.execCommand("copy");
    document.getElementById('button').innerText = `Copied 👍`
}

/*
 Project-Name: Firecdn
 Author: Tuhin Kanti Pal
 Author's Github: https://github.com/cachecleanerjeet
 Project's Github: https://github.com/cachecleanerjeet/Firecdn
 Author's Email: me@thetuhin.com
 LICENSE: Apache-2.0 
 Contact: https://telegram.dog/t_projects
 Channel: https://telegram.dog/tprojects
*/