const passValueLogin = async (email, password) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    if (result.data.status === "success") {
      window.alert("YES");
    }
  } catch (err) {
    window.alert("NO");
  }
};

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  passValueLogin(email, password);
});

const passvaluex = async (data) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/users/uploadVideo",
      data,
    });
    if (result.data.status === "success") {
      window.alert("YES");
    }
  } catch (err) {
    window.alert("NO");
  }
};

const uploadButton = document.querySelector("#upload-btn");
uploadButton.addEventListener("click", (e) => {
  e.preventDefault();
  const form = new FormData();
  // form.append("name", document.getElementById("name").value);
  // form.append("email", document.getElementById("email").value);
  form.append("video", document.getElementById("video").files[0]);
  console.log(form);
  console.log(document.getElementById("video").files[0]);
  passvaluex(form);
});
