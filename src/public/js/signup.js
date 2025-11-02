console.log("Signup frontend javascript file");

$(function () {
  const fileTarget = $(".file-box .upload-hidden");
  let filename;

  fileTarget.on("change", function () {
    if (window.FileReader) {
      const uploadFile = $(this)[0].files[0];
      const fileType = uploadFile["type"];
      const validImageType = ["image/jpeg", "image/jpeg", "image/png"];

      if (!validImageType.includes(fileType)) {
        alert("Please insert only jpeg, jpg and png");
      } else {
        if (uploadFile) {
          console.log(URL.createObjectURL(uploadFile));
          $(".upload-img-frame")
            .attr("src", URL.createObjectURL(uploadFile))
            .addClass("success ");
        }
        filename = $(this)[0].files[0].name;
      }
      $(this).siblings(".upload-name").val(filename);
    }
  });
});

$(function () {});

function validateSignupForm() {
  const memberNick = $(".member-nick").val();
  const memberPhone = $(".member-phone").val();
  const memberPassword = $(".member-password").val();
  const memberConfirmPassword = $(".confirm-password").val();

  if (
    memberNick === "" ||
    memberPassword === "" ||
    memberPhone === "" ||
    memberConfirmPassword === ""
  ) {
    alert("Please insert all required inputs");
    return false;
  }

  if (memberPassword !== memberConfirmPassword) {
    alert("Password differs please, check!");
    return false;
  }

  const memberImage = $(".member-image").get(0).files[0]
    ? $(".member-image").get(0).files[0].name
    : null;

  if (!memberImage) {
    alert("please insert restaurant image");
    return false;
  }
}
