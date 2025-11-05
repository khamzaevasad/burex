console.log("Users frontend javascript file");
$(function () {
  $(".member-status").on("change", (e) => {
    const id = e.target.id;
    const memberStatus = $(`#${id}.member-status`).val();

    axios
      .post("/admin/user/edit", { _id: id, memberStatus: memberStatus })
      .then((response) => {
        const result = response.data;
        if (result) {
          console.log("updated successfully");
          $(".member-status").blur();
        } else alert("User Updated Failed");
      })
      .catch((err) => {
        console.log(err);
        alert("User Updated Failed");
      });
  });
});
