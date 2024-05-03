//DOM elements
const reviewForm = document.getElementById("reviewForm")
const nameInput = reviewForm['userName']
const ratingInput = reviewForm['userRating']
const passwordInput = reviewForm['userPassword']
const reviewInput = reviewForm['userReview']
const reviewsContainer = document.querySelector(".reviews")


const reviews = JSON.parse(localStorage.getItem("localReviews")) || [];

const addReview = (name, rate, review, password) => {
    reviews.push({name, rate, review, password})

    localStorage.setItem("localReviews", JSON.stringify(reviews));

    return {name, rate, review, password}
}

const createReviewElement = ({name, rate, review}) => {
    //create elements
    const reviewDiv = document.createElement('div')
    const reviewName = document.createElement('p')
    const reviewRate = document.createElement('p')
    const reviewComment = document.createElement('p')
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
   
    //create elements's class
    reviewDiv.classList.add('reviewItemDiv');
    editButton.classList.add('editButton');
    deleteButton.classList.add('deleteButton');

    //fill the content
    reviewName.innerText = name
    reviewRate.innerText = '⭐ ' + rate
    reviewComment.innerText = review
    editButton.textContent = '수정';
    deleteButton.textContent = '삭제';

    //add to the DOM
    reviewDiv.append(reviewName, reviewRate, reviewComment, editButton, deleteButton) 
    reviewsContainer.appendChild(reviewDiv) 
}

reviews.forEach(createReviewElement);

reviewForm.onsubmit = (e) => {
    e.preventDefault();

    const newReview = addReview(
        nameInput.value,
        ratingInput.value,
        reviewInput.value,
        passwordInput.value
    );

    createReviewElement(newReview)

    nameInput.value = "";
    ratingInput.value = "";
    reviewInput.value = "";
    passwordInput.value = "";
}

//validation check(리뷰글자수 제한)
reviewInput.addEventListener("input", function() {
  const maxLength = 50;
  const text = reviewInput.value;
  
  if (text.length > maxLength) {
    alert("최대 50자까지 입력 가능합니다."); 
    textarea.value = text.slice(0, maxLength); 
  }
});

// validation check(비밀번호 4자리숫자만 가능하게 제한)
const submitBtn = document.getElementById("submitBtn") 

passwordInput.addEventListener("input", function() { 
  
  let inputValue = passwordInput.value; 
  
  passwordInput.value = inputValue.replace(/[^\d]/g, '');

  if (inputValue.length === 4) {
   submitBtn.disabled = false;
  } else {   
    submitBtn.disabled = true;
  }
});

//수정 및 삭제 기능
const editButtons = document.querySelectorAll(".editButton")
const deleteButtons = document.querySelectorAll(".deleteButton")


