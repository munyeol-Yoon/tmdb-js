//(리뷰등록 버튼에 이벤트 추가) 이부분 부터 보면 이해가 편하실 거에요 
//혹시 이해안되시거나 궁금한거 있으시면 언제든지 저한테 말씀해주세요 

//DOM 요소 상수할당 
const $reviewForm = document.getElementById("review-form");
const $nameInput = $reviewForm["user-name"];
const $ratingInput = $reviewForm["user-rating"];
const $passwordInput = $reviewForm["user-password"];
const $reviewInput = $reviewForm["user-review"];
const $reviewsContainer = document.querySelector(".reviews");

//로컬스토리지에 저장되어있는 리뷰데이터를 파싱해서 객체로 저장, 로컬스토리지에 데이터가 없으면 빈배열임
const reviews = JSON.parse(localStorage.getItem("localReviews")) || [];

//로컬스토리지에 인풋벨류들을 저장하고 reviews에 객체로 저장하는 함수 
const addReview = (name, rate, review, password, targetId) => {
  
  // 구조분해 할당 {name: name, rate: rate, review: review, password: password, targetId: targetId} 이형태로 review배열에 push함
  reviews.push({name, rate, review, password, targetId});

  localStorage.setItem("localReviews", JSON.stringify(reviews));//로컬스토리지에 review에 push했던 데이터 저장

  return {name, rate, review, password, targetId};// createReviewElement에 파라미터에 들어갈거임
};

//리뷰댓글 생성하는 함수, 생성될 때 삭제버튼이랑 수정버튼에 이벤트도 추가됨. 
const createReviewElement = ({name, rate, review, password, targetId}) => {
  //html에 동적으로 리뷰요소 생성 
  const $reviewDiv = document.createElement("div");
  const $reviewName = document.createElement("p");
  const $reviewRate = document.createElement("p");
  const $reviewComment = document.createElement("p");
  const $editButton = document.createElement("button");
  const $deleteButton = document.createElement("button");

  //클래스 생성 
  $reviewDiv.classList.add("review-item-div");
  $editButton.classList.add("edit-btn", password, targetId);//수정버튼에 password와 targetId 클래스 생성
  $deleteButton.classList.add("delete-btn", password, targetId);//삭제버튼에 password와 targetId 클래스 생성

  //innerText 생성 
  $reviewName.innerText = name;
  $reviewRate.innerText = "⭐ " + rate;
  $reviewComment.innerText = review;
  $editButton.textContent = "수정";
  $deleteButton.textContent = "삭제";

  //add to the DOM
  $reviewDiv.append($reviewName, $reviewRate, $reviewComment, $editButton, $deleteButton);
  $reviewsContainer.appendChild($reviewDiv);

  //수정 버튼에 이벤트 추가 
  $editButton.addEventListener("click", function () {
    const promptPassword = prompt("비밀번호를 입력하세요");  //사용자가 입력한 비밀번호 상수 할당
    const $password = this.classList.item(1); // 클릭된 버튼의 클래스 중 두 번째 클래스(password)를 가져옵니다.
    //reviews배열에서 수정하려는 review의 인덱스를 타겟아이디와 패스워드비교를 통해 찾기  
    const reviewIndex = reviews.findIndex((r) => r.targetId === targetId && r.password === promptPassword); 

    //prompt에서 입력한 비밀번호랑 수정버튼 class에 등록했던 비밀번호가 맞는지 확인하고 맞으면 수정기능이 구현되게함 
    if ($password === promptPassword) {
      const editReview = prompt("수정할 내용을 입력하세요", reviews[reviewIndex].review); // 수정할 내용을 입력 받습니다.
      if (editReview !== null) {
        reviews[reviewIndex].review = editReview; // reviews의 해당 인덱스리뷰를 재할당 해서 수정되게함
       
        localStorage.setItem("localReviews", JSON.stringify(reviews)); // 수정된 리뷰를 로컬 스토리지에 업데이트합니다.
        alert("리뷰가 수정되었습니다.");
        $reviewComment.innerText = editReview; // 해당 리뷰를 표시하는 HTML 요소도 수정합니다.
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  });

  //삭제버튼에 이벤트 추가 
  $deleteButton.addEventListener("click", function () {
    const promptPassword = prompt("비밀번호를 입력하세요");//사용자가 입력한 비밀번호 상수 할당
    const $password = this.classList.item(1); // 클릭된 버튼의 클래스 중 두 번째 클래스(password)를 가져옵니다.
    //reviews배열에서 수정하려는 review의 인덱스를 타겟아이디와 패스워드비교를 통해 찾기 
    const reviewIndex = reviews.findIndex((r) => r.targetId === targetId && r.password === promptPassword); 

    //prompt에서 입력한 비밀번호랑 삭제버튼 class에 등록했던 비밀번호가 맞는지 확인하고 맞으면 삭제기능이 구현되게함 
    if ($password === promptPassword) {
      
      reviews.splice(reviewIndex, 1);// 해당 인덱스의 리뷰를 삭제합니다.
      
      localStorage.setItem("localReviews", JSON.stringify(reviews));// 로컬 스토리지에서도 삭제합니다.
     
      $reviewsContainer.removeChild(this.parentNode);// 해당 리뷰를 표시하는 HTML 요소도 삭제합니다.
      alert("리뷰가 삭제되었습니다.");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  });
};

// 해당페이지 url에서 media_id 가져옴
const urlParams = new URLSearchParams(window.location.search);
const targetId = urlParams.get("media_id");

//해당 media_id가 있는 리뷰들만 필터링해서 해당영화상세페이지 리뷰에 추가하기 
const filterReviews = reviews.filter((review) => review.targetId === targetId);
filterReviews.forEach(createReviewElement);

//리뷰등록 버튼에 이벤트 추가 
$reviewForm.onsubmit = (e) => {
  e.preventDefault(); //1. 등록버튼 누를때 새로고침 안되게 함. 

  //2. 로컬스토리지와 reviews 배열에 벨류들 저장
  const newReview = addReview($nameInput.value, $ratingInput.value, $reviewInput.value, $passwordInput.value, targetId);
  
  //3. 리뷰 동적추가(addReview에 return값이 createReviewElement에 파라미터로 들어감) 
  createReviewElement(newReview);

  //4. 등록버튼 눌리면 원래 입력했던 벨류들 지워지게 함.
  $nameInput.value = "";
  $ratingInput.value = "";
  $reviewInput.value = "";
  $passwordInput.value = "";
};



//validation check(리뷰글자수 50자 이내로 제한)
$reviewInput.addEventListener("input", function () {
  const maxLength = 50;
  const text = $reviewInput.value;

  if (text.length > maxLength) {
    alert("최대 50자까지 입력 가능합니다.");
    text = text.slice(0, maxLength); //50자 이후로는 입력안되게
  }
});

// validation check(비밀번호 4자리,숫자만 가능하게 제한)
$passwordInput.addEventListener("input", function () {
  const $submitBtn = document.getElementById("submit-btn");
  const inputValue = $passwordInput.value;

  $passwordInput.value = inputValue.replace(/[^\d]/g, ""); //[^\d]/g(숫자가 아닌모든문자)를 ""로 대체함

  if (inputValue.length === 4) {
    $submitBtn.disabled = false; 
  } else {
    $submitBtn.disabled = true;  //4자리가 아니면 등록버튼이 안눌리게 
  } 
});
