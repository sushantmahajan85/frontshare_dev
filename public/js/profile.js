const passValueSocialLinks = async (
  instagram,
  facebook,
  twitter,
  tiktok,
  snapchat,
  youtube
) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/blocks/sociallink",
      data: {
        instagram,
        facebook,
        twitter,
        tiktok,
        snapchat,
        youtube,
      },
    });
    if (result.data.status === "success") {
      window.alert("YES");
    }
  } catch (err) {
    window.alert("NO");
    console.log(err);
  }
};

const passValueCustomLink = async (url, title, description) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/blocks/customlink",
      data: {
        url,
        title,
        description,
      },
    });
    if (result.data.status === "success") {
      window.alert("YES");
    }
  } catch (err) {
    window.alert("NO");
    console.log(err);
  }
};

const passValueCustomText = async (text) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/blocks/customtext",
      data: {
        text,
      },
    });
    if (result.data.status === "success") {
      window.alert("YES");
    }
  } catch (err) {
    window.alert("NO");
    console.log(err);
  }
};

const passValueVideoPreview = async (vidLink) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/blocks/videopreview",
      data: {
        vidLink,
      },
    });
    if (result.data.status === "success") {
      window.alert("YES");
    }
  } catch (err) {
    window.alert("NO");
    console.log(err);
  }
};

const passValueNewsLetter = async (title, btnText) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/blocks/newsletter",
      data: {
        title,
        btnText,
      },
    });
    if (result.data.status === "success") {
      window.alert("YES");
    }
  } catch (err) {
    window.alert("NO");
    console.log(err);
  }
};

const passValueUpload = async (data) => {
  try {
    const result = await axios({
      method: "PATCH",
      url: "/api/v1/users/updateMe",
      data,
    });
    if (result.data.status === "success") {
      window.alert("YES");
    }
  } catch (err) {
    window.alert("NO");
  }
};

const passValueDelete = async () => {
  try {
    const result = await axios({
      method: "PATCH",
      url: "/api/v1/users/deletePhoto",
    });
    if (result.data.status === "success") {
      window.alert("YES");
    }
  } catch (err) {
    window.alert("NO");
  }
};

const passValueUpdateLink = async (profilelink) => {
  try {
    const result = await axios({
      method: "PATCH",
      url: "/api/v1/users/updatelink",
      data: {
        profilelink,
      },
    });
    if (result.data.status === "success") {
      window.alert("YES");
    }
  } catch (err) {
    window.alert("NO");
  }
};

document.getElementById("socialLinkForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const instagram = document.getElementById("instagram").value;
  const facebook = document.getElementById("facebook").value;
  const twitter = document.getElementById("twitter").value;
  const tiktok = document.getElementById("tiktok").value;
  const snapchat = document.getElementById("snapchat").value;
  const youtube = document.getElementById("youtube").value;
  passValueSocialLinks(instagram, facebook, twitter, tiktok, snapchat, youtube);
});

document.getElementById("customLinkForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const url = document.getElementById("url").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  passValueCustomLink(url, title, description);
});

document.getElementById("customTextForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = document.getElementById("customText").value;
  console.log(text);
  passValueCustomText(text);
});

document.getElementById("videoPreviewForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const vidLink =
    "https://www.youtube.com/embed/" +
    document.getElementById("vidLink").value.split("v=")[1];
  passValueVideoPreview(vidLink);
});

document.getElementById("newsLetterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("newsLetterTitle").value;
  const btnText = document.getElementById("btnText").value;
  passValueNewsLetter(title, btnText);
});

const uploadButton = document.querySelector("#upload-btn");
uploadButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("ABC");
  const form = new FormData();
  form.append("name", document.getElementById("usernameInput").value);
  form.append("bio", document.getElementById("bioInput").value);
  form.append("photo", document.getElementById("photo").files[0]);
  console.log(form);
  console.log(document.getElementById("photo").files[0]);
  passValueUpload(form);
});

const deleteButton = document.querySelector("#delete-btn");
deleteButton.addEventListener("click", (e) => {
  e.preventDefault();
  passValueDelete();
});

var sociallinks = 0;
var customlink = 0;
var customtext = 0;
var videopreview = 0;
var newsletter = 0;

var blocks = {
  sociallinks: 0,
  customlink: 0,
  customtext: 0,
  videopreview: 0,
  newsletter: 0,
};

$(document).on("click", ".add-block-btn", (e) => {
  e.preventDefault();

  blocks[e.target.dataset.block]++;
  console.log(blocks[e.target.dataset.block]);

  var kanbanItem = document.createElement("div");
  kanbanItem.className = "kanban-item";
  kanbanItem.dataset.block =
    e.target.dataset.block + "-" + blocks[e.target.dataset.block];

  var cardItem = document.createElement("div");
  cardItem.className = "card kanban-item-card hover-actions-trigger";

  var cardBody = document.createElement("div");
  cardBody.className = "card-body position-relative";

  var cardContent = document.createElement("p");
  cardContent.className = "mb-0 font-weight-medium text-sans-serif";

  cardContent.innerHTML =
    "This is " +
    e.target.dataset.block +
    " block " +
    blocks[e.target.dataset.block] +
    "<br>👌 Drag cards to any list and place anywhere in the list";

  $(cardItem).appendTo(kanbanItem);
  $(cardBody).appendTo(cardItem);
  $(cardContent).appendTo(cardBody);
  $(kanbanItem).appendTo("#addCards2");

  console.log(cardItem);

  c2.push({
    block: e.target.dataset.block,
    content: blocks[e.target.dataset.block],
    id: e.target.dataset.block + "-" + blocks[e.target.dataset.block],
  });

  console.log(c2);
});

const passValueSaveCards = async (c1, c2, c3) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/blocks/canvas",
      data: {
        c1,
        c2,
        c3,
      },
    });
    if (result.data.status === "success") {
      window.alert("YES");
      // window.location.assign("/login");
    }
  } catch (err) {
    window.alert("NO");
    console.log(err);
  }
};

const saveCardsButton = document.getElementById("save-cards-btn");
saveCardsButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(c1);
  console.log(c2);
  console.log(c3);
  console.log("hiiiiiiiiiiii");
  passValueSaveCards(c1, c2, c3);
});

const updateLinkButton = document.querySelector("#updateLinkButton");
updateLinkButton.addEventListener("click", (e) => {
  e.preventDefault();

  const profilelink = document.getElementById("myInput-1").value.split("/")[1];
  console.log(profilelink);
  passValueUpdateLink(profilelink);
});
