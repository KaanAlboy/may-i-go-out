var mayIGoOut = true;
var publicTransportRight = true;
const responseList = [
  "Ekmek alıp dünyayı gezebilirsiniz",
  "Takımınızın şampiyonluğunu maskesiz kutlayabilirsiniz",
  "Bazı şeyleri protesto edebilirsiniz",
];

const form = document.getElementById("main-form");
const formContainer = document.getElementById("response-container");

const selectDay = document.getElementById("day-select");
const selectHour = document.getElementById("hour-select");

for (let index = 17; index <= 31; index++) {
  const node = document.createElement("option");
  node.value = index;
  node.textContent = index;
  selectDay.appendChild(node);
}

for (let index = 0; index < 24; index++) {
  const node = document.createElement("option");
  node.value = index;
  node.textContent = index + ":00";
  selectHour.appendChild(node);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //Get form values
  const age = parseInt(form.elements[0].value);
  const day = form.elements[1].value;
  const month = parseInt(form.elements[2].value) + 1;
  const hour = parseInt(form.elements[3].value);
  const vacStatus = form.elements[4].value;

  //Convert int to proper date
  const date = month + "-" + day + "-2021";
  const dateObj = new Date(date);
  console.log(dateObj.getDay());

  if (age >= 65 || age < 18) {
    publicTransportRight = false;
  }
  //Weekends
  if (dateObj.getDay() === 6 || dateObj.getDay() === 0) {
    mayIGoOut = false;
    publicTransportRight = false;
  } else {
    if (hour >= 21 || hour < 5) {
      mayIGoOut = false;
    }
  }

  if (age >= 65 && vacStatus === "false") {
    if (hour >= 14 || hour < 10) {
      mayIGoOut = false;
    }
  }

  createResponse(mayIGoOut, publicTransportRight);
  console.log(mayIGoOut);
  mayIGoOut = true;
});

function createResponse(mayIGoOut, publicTransportRight) {
  let responseType = "alert-danger";
  let responseTitle = "Dışarı çıkamazsınız!";
  let responseText = publicTransportRight
    ? "İzinli saatlerde toplu taşıma: Kullanabilirsiniz"
    : "İzinli saatlerde toplu taşıma: Kullanamazsınız";
  const genericText = "Yapabilecekleriniz: ";

  if (mayIGoOut) {
    responseType = "alert-success";
    responseTitle = "Dışarı çıkabilirsiniz!";
    responseText = publicTransportRight
      ? "İzinli saatlerde toplu taşıma: Kullanabilirsiniz"
      : "İzinli saatlerde toplu taşıma: Kullanamazsınız";
  }

  if (!document.getElementById("response")) {
    const node = document.createElement("div");
    node.id = "response";
    node.classList.add("alert");
    node.classList.add(responseType);

    const header = document.createElement("h4");
    header.classList.add("alert-heading");
    header.textContent = responseTitle;

    const text = document.createElement("p");
    text.textContent = responseText;

    const genericTextSlot = document.createElement("p");
    genericTextSlot.textContent = genericText;

    const list = document.createElement("ul");

    for (let index = 0; index < responseList.length; index++) {
      const li = document.createElement("li");
      li.textContent = responseList[index];
      list.appendChild(li);
    }

    node.appendChild(header);
    node.appendChild(text);
    node.appendChild(genericTextSlot);
    node.appendChild(list);
    formContainer.appendChild(node);
  } else {
    const response = document.getElementById("response");
    response.children[0].textContent = responseTitle;
    response.children[1].textContent = responseText;
    response.classList.remove("alert-danger", "alert-success");
    response.classList.add(responseType);
  }
}
