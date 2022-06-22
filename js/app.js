

// FOR RECENT SECTION


let postForm = document.querySelector("#post-form");
let title = document.querySelector("#title");
let body = document.querySelector("#body");
let recentPostWrapper = document.querySelector("#recent-posts");
let recentBox = [];

//FETCHING JSONPLACEHOLDER USING GET FOR RECENT POSTS

recentPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => {
        recentBox = data;
        recentBox = recentBox.slice(0, 12);
        recentUI(recentBox) ;
    })
    
}
recentPosts();

// Creating posts using POST method for recent post

postForm.addEventListener('submit', createPost);

function createPost(e) {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: body.value,
            userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            recentBox.unshift(data);
            let recentPostHolder = '';
            recentBox.forEach(post => {
                recentPostHolder += `
                    <div class="col-lg-4 col-md-6 mb-5">
                        <div class="post-body">
                            <div class="img-post">
                                <img src="img/post${post.id}.jpg" alt="post images" style="border-radius:15px; height: 33vmax !important;" class="img-fluid w-100 post-images">
                            </div>
                            <h5 class="post-title pt-2 pb-2 main-color fw-bold">${post.title}</h5>
                            <p class="post-body">${post.body}</p>
                            <div class="btn-div d-flex justify-content-between ">
                                <button class="btn btn-outline-dark" onclick="readMore(${post.id})">Read More</button>
                                <button onclick="updatePost(${post.id})" class="btn btn-dark" href="#form-section"> Update</button>
                                <button class="btn btn-outline-dark" onclick="deletePost(${post.id})">Delete</button>
                            </div>
                        </div>
                    </div>
            `
            });
            recentPostWrapper.innerHTML = recentPostHolder;
        })
}

// Updating Recent posts using PUT METHOD

function updateRecentPost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title.value,
            body: body.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            let postTitles = document.querySelectorAll('.recentPost-title');
            let postBodies = document.querySelectorAll('.recentPost-body');
            postTitles.forEach((postTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        postTitle.innerHTML = data.title
                    }
                }
            })
            postBodies.forEach((postBody, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        postBody.innerHTML = data.body
                    }
                }
            })
        });
}


// Fetching DELETE METHOD for Recent Posts

function recentUI (postsUI) {
    let recentPostHolder = "";
        postsUI.forEach(recentPost => {
            let wordLength = recentPost.body;
            wordLength = wordLength.slice(0, 90);

            let titleLength = recentPost.title;
            titleLength = titleLength.slice(0, 30);
            recentPostHolder += `
                <div class="col-lg-4 col-md-6 mb-5">
                    <div class="post-body">
                        <div class="img-post">
                            <img src="img/post${recentPost.id}.jpg" alt="post images" style="border-radius:15px; height: 33vmax !important;" class="img-fluid w-100 post-images">
                        </div>
                        <h5 class="recentPost-title pt-2 pb-2 main-color fw-bold">${titleLength}</h5>
                        <p class="recentPost-body">${wordLength}</p>
                        <div class="btn-div d-flex justify-content-between ">
                            <button class="btn btn-outline-dark" onclick="readMoreRecent(${recentPost.id})">Read More</button>
                            <button onclick="updateRecentPost(${recentPost.id})" class="btn btn-dark" href="#form-section"> Update</button>
                            <button class="btn btn-outline-dark" onclick="deletePostRecent(${recentPost.id})">Delete</button>
                        </div>
                    </div>
                </div>
            `
        })

        recentPostWrapper.innerHTML = recentPostHolder;
}

// Calling DELETE posts method for Recent posts

function deletePostRecent(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            recentBox = recentBox.filter(recentPost => recentPost.id !== id);
            recentUI(recentBox) ;
        })

}

// View More For RECENT POSTS

function readMoreRecent(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = 'read-more.html';
        });
}




// FEATURED POST SECTION 

// Fetching JsonPlaceHolder for Featured Posts

let featuredWrapper = document.querySelector("#featured");
let featuredBox = [];

getFeaturedPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => {
        featuredBox = data;
        featuredBox = featuredBox.slice(0, 2);
        featuredUI(featuredBox);
    })
    
}
getFeaturedPosts();


// Updating using PUT METHOD for Featured Posts

function updatePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title.value,
            body: body.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            let Titles = document.querySelectorAll('.post-title');
            let Bodies = document.querySelectorAll('.post-body');
            Titles.forEach((Title, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        Title.innerHTML = data.title
                    }
                }

            })

            Bodies.forEach((Body, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        Body.innerHTML = data.body
                    }
                }

            })

        });
}

// Calling DELETE METHOD FOR Featured Posts

function featuredUI (postsUI) {
    let featuredPostHolder = "";
        console.log(featuredBox);
        postsUI.forEach(featuredPost => {
            featuredPostHolder += `
                <div class="col-lg-6 col-md-6 mb-5 d-flex justify-content-center align-items-center">
                    <div class="feature-img">
                        <img src="./img/post${featuredPost.id}.jpg" alt="featiure" class="img-fluid">
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 d-flex justify-content-center align-items-center mb-5">
                    <div class="text-div order-sm-last">
                        <h5 class="post-title" class="fw-bold pb-3">${featuredPost.title}</h5>
                        <p  class="post-body">${featuredPost.body}</p>
                        <div class="btn-div d-flex justify-content-between ">
                            <button class="btn btn-outline-dark" onclick="readMore(${featuredPost.id})">Read More</button>
                            <button onclick="updatePost(${featuredPost.id})" class="btn btn-dark" href="#form-section"> Update</button>
                            <button class="btn btn-outline-dark" onclick="deletePost(${featuredPost.id})">Delete</button>
                        </div>
                    </div>
                </div>
            `
        })

    featuredWrapper.innerHTML = featuredPostHolder;

}

// Calling DELETE method for Featured Posts

function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            featuredBox = featuredBox.filter(featuredPost => featuredPost.id !== id);
            console.log(featuredBox)
            featuredUI(featuredBox) ;
        })

}

// View More Button For Featured Posts

function readMore(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = 'read-more.html'
 
        });
}














// Marquee effect

(function () {
    const script = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    script.async = true;
    script.src = "https://api.adnan-tech.com/public/js/at.js";
    script.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(script, s0);

    script.onload = function () {
        at.loadMarquee("#marquee", `<h3 class="fw-bold flex-end text-white">Featured Posts</h3>`, {
            duration: 5, // seconds
            direction: "rtl"
        });
    };
})();
