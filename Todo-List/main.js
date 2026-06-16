const input = document.querySelector(".input");
const button = document.querySelector(".button");
const list = document.querySelector(".list");
const reset = document.querySelector(".button_reset");

button.addEventListener("click", function () {
  let text = input.value.trim();
  if (text != "") {
    let newLi = document.createElement("li");
    newLi.innerText = text;
    list.appendChild(newLi);
    input.value = "";
  } else {
    alert("할 일을 입력해 주세요!");
    input.value = "";
  }
});

reset.addEventListener("click", function () {
  let text = input.value.trim();
  const reset = document.querySelector(".list");

  if (confirm("모두 지우시겠습니까?")) {
    list.innerHTML = "";
    alert("지금 입력된 값도 사라집니다");
    input.value = "";
  }
});
