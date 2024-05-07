//DOM elements
const reviewForm = document.getElementById("reviewForm");
const nameInput = reviewForm["userName"];
const ratingInput = reviewForm["userRating"];
const passwordInput = reviewForm["userPassword"];
const reviewInput = reviewForm["userReview"];
const reviewsContainer = document.querySelector(".reviews");

const reviews = JSON.parse(localStorage.getItem("localReviews")) || [];

const addReview = (name, rate, review, password) => {
  reviews.push({ name, rate, review, password });

  localStorage.setItem("localReviews", JSON.stringify(reviews));

  return { name, rate, review };
};

const createReviewElement = ({ name, rate, review }) => {
  //create elements
  const reviewDiv = document.createElement("div");
  const reviewName = document.createElement("p");
  const reviewRate = document.createElement("p");
  const reviewComment = document.createElement("p");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  //create elements's class
  reviewDiv.classList.add("reviewItemDiv");
  editButton.classList.add("editButton");
  deleteButton.classList.add("deleteButton");

  //fill the content
  reviewName.innerText = name;
  reviewRate.innerText = "⭐ " + rate;
  reviewComment.innerText = review;
  editButton.textContent = "수정";
  deleteButton.textContent = "삭제";

  //add to the DOM
  reviewDiv.append(
    reviewName,
    reviewRate,
    reviewComment,
    editButton,
    deleteButton
  );
  reviewsContainer.appendChild(reviewDiv);

  // 수정버튼 이벤트추가
  const editButtons = document.querySelectorAll(".editButton");

  editButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const password = prompt("비밀번호를 입력하세요");

      const commentPassword = reviews[index].password;

      if (password === commentPassword) {
        const newReview = prompt("수정할 내용을 입력하세요", reviews[index].review);

        if (newReview !== null) {
          reviews[index].review = newReview; // 수정된 댓글을 저장합니다.
          // 화면에 수정된 내용을 반영합니다.
          reviewsContainer.children[index].querySelector(
            ".reviewItemDiv p:nth-child(3)"
          ).innerText = newReview;
          localStorage.setItem("localReviews", JSON.stringify(reviews)); // 로컬 스토리지 업데이트
          alert("댓글이 수정되었습니다.");
        }
      } else {
        alert("비밀번호가 일치하지 않습니다!");
      }
    });
  });

  //삭제버튼 이벤트추가 
  const deleteButtons = document.querySelectorAll(".deleteButton");

  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const password = prompt("비밀번호를 입력하세요");

      const commentPassword = reviews[index].password;

      // 사용자가 입력한 비밀번호와 댓글의 비밀번호를 비교
      if (password === commentPassword) {
        reviews.splice(index, 1); // 배열에서 해당 인덱스의 요소 삭제
        localStorage.setItem("localReviews", JSON.stringify(reviews)); // 로컬 스토리지 업데이트
        reviewsContainer.removeChild(reviewsContainer.children[index]); // 댓글을 화면에서도 삭제
        alert("댓글이 삭제되었습니다.");
      } else {
        alert("비밀번호가 일치하지 않습니다!");
      }
    });
  });
};

//기존리뷰들 추가
reviews.forEach(createReviewElement);

reviewForm.onsubmit = (e) => {
  e.preventDefault();
  //로컬스토리지에 벨류저장
  const newReview = addReview(
    nameInput.value,
    ratingInput.value,
    reviewInput.value,
    passwordInput.value
  );
  //리뷰 동적추가
  createReviewElement(newReview);
  //인풋 비우기
  nameInput.value = "";
  ratingInput.value = "";
  reviewInput.value = "";
  passwordInput.value = "";
};

//validation check(리뷰글자수 제한)
reviewInput.addEventListener("input", function () {
  const maxLength = 50;
  const text = reviewInput.value;

  if (text.length > maxLength) {
    alert("최대 50자까지 입력 가능합니다.");
    text = text.slice(0, maxLength); //50자 이후로는 입력안되게
  }
});

// validation check(비밀번호 4자리숫자만 가능하게 제한)
passwordInput.addEventListener("input", function () {
  const submitBtn = document.getElementById("submitBtn");
  const inputValue = passwordInput.value;

  passwordInput.value = inputValue.replace(/[^\d]/g, ""); //숫자만 입력할수 있게

  if (inputValue.length === 4) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  } //4자리만 입력가능하게
});
