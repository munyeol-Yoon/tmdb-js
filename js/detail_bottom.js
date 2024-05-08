//DOM elements
const reviewForm = document.getElementById("reviewForm");
const nameInput = reviewForm["userName"];
const ratingInput = reviewForm["userRating"];
const passwordInput = reviewForm["userPassword"];
const reviewInput = reviewForm["userReview"];
const reviewsContainer = document.querySelector(".reviews");

const reviews = JSON.parse(localStorage.getItem("localReviews")) || [];

const addReview = (name, rate, review, password, targetId) => {
  reviews.push({name, rate, review, password, targetId});

  localStorage.setItem("localReviews", JSON.stringify(reviews));

  return {name, rate, review, password, targetId};
};

const createReviewElement = ({name, rate, review, password, targetId}) => {
  //create elements
  const reviewDiv = document.createElement("div");
  const reviewName = document.createElement("p");
  const reviewRate = document.createElement("p");
  const reviewComment = document.createElement("p");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  //create elements's class
  reviewDiv.classList.add("reviewItemDiv");
  editButton.classList.add("editButton", password, targetId);
  deleteButton.classList.add("deleteButton", password, targetId);

  //fill the content
  reviewName.innerText = name;
  reviewRate.innerText = "⭐ " + rate;
  reviewComment.innerText = review;
  editButton.textContent = "수정";
  deleteButton.textContent = "삭제";

  //add to the DOM
  reviewDiv.append(reviewName, reviewRate, reviewComment, editButton, deleteButton);
  reviewsContainer.appendChild(reviewDiv);

  //수정기능
  editButton.addEventListener("click", function () {
    const promptPassword = prompt("비밀번호를 입력하세요");
    const password = this.classList.item(1); // 클릭된 버튼의 클래스 중 두 번째 클래스를 가져옵니다.
    const reviewIndex = reviews.findIndex((r) => r.targetId === targetId && r.password === promptPassword); // promptPassword를 사용하여 비밀번호를 확인합니다.

    if (password === promptPassword) {
      const editReview = prompt("수정할 내용을 입력하세요", reviews[reviewIndex].review); // 수정할 내용을 입력 받습니다.
      if (editReview !== null) {
        reviews[reviewIndex].review = editReview; // 리뷰를 수정합니다.
        // 여기서 추가 작업이 필요하다면 수행합니다.
        localStorage.setItem("localReviews", JSON.stringify(reviews)); // 수정된 리뷰를 로컬 스토리지에 업데이트합니다.
        alert("리뷰가 수정되었습니다.");
        reviewComment.innerText = editReview;
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  });

  //삭제기능
  deleteButton.addEventListener("click", function () {
    const promptPassword = prompt("비밀번호를 입력하세요");
    const password = this.classList.item(1); // 클릭된 버튼의 클래스 중 두 번째 클래스를 가져옵니다.
    const reviewIndex = reviews.findIndex((r) => r.targetId === targetId && r.password === promptPassword); // promptPassword를 사용하여 비밀번호를 확인합니다.

    if (password === promptPassword) {
      // 해당 인덱스의 리뷰를 삭제합니다.
      reviews.splice(reviewIndex, 1);
      // 로컬 스토리지에서도 삭제합니다.
      localStorage.setItem("localReviews", JSON.stringify(reviews));
      // 해당 리뷰를 표시하는 HTML 요소도 삭제합니다.
      reviewsContainer.removeChild(this.parentNode);
      alert("리뷰가 삭제되었습니다.");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  });
};

// 해당페이지 영화 id 가져오는 함수
const urlParams = new URLSearchParams(window.location.search);
const targetId = urlParams.get("media_id");

//해당 영화만 필터링된 리뷰들을 생성
const filterReviews = reviews.filter((review) => review.targetId === targetId);
filterReviews.forEach(createReviewElement);

//폼에 서밋 버튼에 이벤트 추가
reviewForm.onsubmit = (e) => {
  e.preventDefault();

  //로컬스토리지에 벨류저장
  const newReview = addReview(nameInput.value, ratingInput.value, reviewInput.value, passwordInput.value, targetId);
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
