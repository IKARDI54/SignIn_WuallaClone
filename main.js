const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')

const loginCheck = user =>{

    if (user) {
        loggedInLinks.forEach(link => link.style.display = 'block')
        loggedOutLinks.forEach(link => link.style.display = 'none')
    } else {
        loggedInLinks.forEach(link => link.style.display = 'none')
        loggedOutLinks.forEach(link => link.style.display = 'block')
    }
}

//SignUp
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;


    auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {

            // clear the form
            signupForm.reset();

            //close the modal
            $('#singupModal').modal('hide')

            console.log("signup");

        })

})

//Signin

const signinForm = document.querySelector('#login-form')
signinForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {

            // clear the form
            signupForm.reset();

            //close the modal
            $('#signinModal').modal('hide')

            console.log("sign in");

        })
});

const logout = document.querySelector("#logout");
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(
        () => {
            console.log('sign out');

        }
    )
})

//Posts 
const postList = document.querySelector('.posts')
const setupPost = data => {
    if (data.length){
        let html = ''
        data.forEach(doc => {
            const post = doc.data()
            console.log(post.description)
            const li = `
            <li class='list-group-item list-group-item-action'>
            <h5>${post.title}</h5>
            <p>${post.description}</p>
            </li>
            `;
            html += li;
        });
        postList.innerHTML = html;
    }else {
        postList.innerHTML = '<p class="text-center"> Login to see Posts</p>'

    }
}

//Events
//list for auth
auth.onAuthStateChanged(user => {
    if (user) {
        fs.collection('anuncios')
            .get()
            .then((snapshot) => {
                setupPost(snapshot.docs);
                loginCheck(user)
            })
    } else {
        setupPost([]);
        loginCheck(user)

    }
})