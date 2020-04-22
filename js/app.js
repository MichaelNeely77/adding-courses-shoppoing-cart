// Variables
const courses = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('#clear-cart');



// LIsteneres
loadEventListeners();

function loadEventListeners() {
    courses.addEventListener('click', buyCourse);

    shoppingCartContent.addEventListener('click', removeCourse);

    clearCartBtn.addEventListener('click', clearCart);

    document.addEventListener('DOMcontentLoaded', getFromLocalStorage);
}



// Functions
function buyCourse(e) {
    e.preventDefault();
    // Use delegation to find course added to shpping cart
    if(e.target.classList.contains('add-to-cart')) {
        // read the course values
        const course = e.target.parentElement.parentElement;

        // read the values
        getCourseInfo(course);
    }
}
// Reads HTML information of selected course
function getCourseInfo(course) {
    // create objecct with course data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    // Insert inot the shopping cart
    addIntoCart(courseInfo);
}

function addIntoCart(course) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width="100">
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href=#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;
    // Add into the shopping cart
    shoppingCartContent.appendChild(row);

    // Add course into storage
    saveIntoStorage(course);
}
function saveIntoStorage (course) {
    let courses = getCoursesFromStorage();

    // add the course into the array
    courses.push(course);

    localStorage.setItem('courses', JSON.stringify(courses) );
}

function getCoursesFromStorage() {
    let courses;

    // if something exists in storage or create empty array
if(localStorage.getItem('courses') === null ) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses') );
    }
    return courses;
}


function removeCourse(e) {
    let course, courseId;
    // remove form the DOM
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    // Remove form local storage
    console.log(courseId);

    removeCourseLocalStorage();

}

function removeCourseLocalStorage(id) {
    let coursesLS = getCoursesFromStorage();

    coursesLS.forEach(function(courseLS, index) {
        if(courseLS.id === id) {
            coursesLS.splice(index,1);
        }
    });
    
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}



function clearCart() {
    // shoppingCartContent.innerHTML= '';
    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

        // clear from local Storage
        clearLocalStorage();
}

function clearLocalStorage() {
    localStorage.clear();
}

function getFromLocalStorage () {
    let coursesLS = getCoursesFromStorage();

    // Loop through courses and print into the cart
    coursesLS.forEach(function(course) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <tr>
                <td>
                    <img src="${course.image}" width="100">
                </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href=#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
        `;
        shoppingCartContent.appendChild(row);
    });
}