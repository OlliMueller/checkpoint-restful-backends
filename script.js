let pendingConnections = [];

window.addEventListener("load", function () {
  pendingConnections = Number(this.localStorage.getItem("connections")) || 0;
  updatePendingCounter();

  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=8")
    .then((response) => response.json())
    .then((data) => {
      const allCards = document.querySelector("#contact-cards");

      data.forEach((singleCard) => {
        createContactCards(allCards, singleCard);
      });
      updateEventListener();
    });
});

function createContactCards(container, data) {
  const contactPerson = document.createElement("div");
  const contactCardsContainer = document.querySelector(".contact-cards");
  contactPerson.classList.add("contact-card");

  contactPerson.innerHTML = `
  <div class="user-background-container"> <button class="icon-remove-contact">
  X
</button> <img class="contact-background-image" src="${
    data.backgroundImage || "https://picsum.photos/200"
  }" />
  </div>
    <img class="contact-image" src="${data.picture}" />
    <p class="contact-name">${data.name.title} ${data.name.first} ${
    data.name.last
  }</p>
    <p class="job-title">${data.title}</p>
    <p class="mutual-connection">${
      data.mutualConnections
    } mutual connections</p>
    <button class="button-connect">
        Connect
    </button> 
`;
  contactCardsContainer.appendChild(contactPerson);
}

function pendingCounter(event) {
  const connectButton = event.target;

  if (connectButton.innerText === "Connect") {
    pendingConnections++;
    localStorage.setItem("counter", pendingConnections);
    updatePendingCounter();
    connectButton.innerText = "Pending";
  } else {
    pendingConnections--;
    localStorage.setItem("counter", pendingConnections);
    updatePendingCounter();
    connectButton.innerText = "Connect";
  }
}

function updatePendingCounter() {
  const pendingElement = document.getElementById("pending");

  if (pendingConnections === 0) {
    pendingElement.innerText = "No pending invitations";
  } else if (pendingConnections === 1) {
    pendingElement.innerText = "1 pending invitations";
  } else if (pendingConnections > 1) {
    pendingElement.innerText = `${pendingConnections} pending invitations`;
  }
}

function updateEventListener() {
  document.querySelectorAll(".button-connect").forEach((connectBtn) => {
    connectBtn.removeEventListener("click", pendingCounter);
    connectBtn.addEventListener("click", pendingCounter);
  });
}
