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

const updateLinkButton = document.querySelector("#updateLinkButton");
updateLinkButton.addEventListener("click", (e) => {
  e.preventDefault();

  const profilelink = document.getElementById("myInput-1").value.split("/")[1];
  console.log(profilelink);
  passValueUpdateLink(profilelink);
});
