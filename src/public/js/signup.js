console.log("Signup frontend javascript file");

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
}
