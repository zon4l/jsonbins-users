const _templates = {
  userEntry: function (data) {
    return `<tr class="border user" country="${data.record.country}" gender="${data.record.gender}">
                <td class="text-center name">${data.record.name}</td>
                <td class="text-center">${data.record.age}</td>
                <td class="text-center"><i class="fa-solid fa-pen-to-square icon edit-btn" binId=${data.metadata.id}></i></td>
                <td class="text-center"><i class="fa-solid fa-trash-can icon delete-btn" binId=${data.metadata.id}></i></td>
            </tr>`;
  },
};

$.ajax({
  url: `https://api.jsonbin.io/v3/c/626f8e0a25069545a32c0867/bins`,
  type: "GET",
  dataType: "json",
  beforeSend: function (xhr) {
    xhr.setRequestHeader(
      "secret-key",
      "$2b$10$k8Z8xntro4ULdMJdE7.iE.1KNFPEdg8co5YvjplaoEQcQ9LnaBkeS"
    );
    xhr.setRequestHeader(
      "X-Access-Key",
      "$2b$10$nZK9tRvsklaeTKXMIhBE7eMk32YUl6R/dYn5wQmiCF/drO0oXJOSS"
    );
    xhr.setRequestHeader(
      "X-Master-Key",
      "$2b$10$k8Z8xntro4ULdMJdE7.iE.1KNFPEdg8co5YvjplaoEQcQ9LnaBkeS"
    );
  },
  success: function (res) {
    for (entry in res) {
      appendUser(res[entry].record);
    }
    if (res) fetchUsers(res[res.length - 1].record);
  },
});

function fetchUsers(binId) {
  $.ajax({
    url: `https://api.jsonbin.io/v3/c/626f8e0a25069545a32c0867/bins/${binId}`,
    type: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "secret-key",
        "$2b$10$k8Z8xntro4ULdMJdE7.iE.1KNFPEdg8co5YvjplaoEQcQ9LnaBkeS"
      );
      xhr.setRequestHeader(
        "X-Access-Key",
        "$2b$10$nZK9tRvsklaeTKXMIhBE7eMk32YUl6R/dYn5wQmiCF/drO0oXJOSS"
      );
      xhr.setRequestHeader(
        "X-Master-Key",
        "$2b$10$k8Z8xntro4ULdMJdE7.iE.1KNFPEdg8co5YvjplaoEQcQ9LnaBkeS"
      );
    },
    success: function (res) {
      for (entry in res) {
        appendUser(res[entry].record);
      }
      if (res) fetchUsers(res[res.length - 1].record);
    },
  });
}

function appendUser(binId) {
  $.ajax({
    url: `https://api.jsonbin.io/v3/b/${binId}`,
    type: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "secret-key",
        "$2b$10$k8Z8xntro4ULdMJdE7.iE.1KNFPEdg8co5YvjplaoEQcQ9LnaBkeS"
      );
      xhr.setRequestHeader(
        "X-Access-Key",
        "$2b$10$nZK9tRvsklaeTKXMIhBE7eMk32YUl6R/dYn5wQmiCF/drO0oXJOSS"
      );
    },
    success: function (res) {
      $("#users-table").append(_templates.userEntry(res));
    },
  });
}

$("body").on("click", ".delete-btn", function () {
  $.ajax({
    url: `https://api.jsonbin.io/v3/b/${$(this).attr("binId")}`,
    type: "DELETE",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "X-Master-Key",
        "$2b$10$k8Z8xntro4ULdMJdE7.iE.1KNFPEdg8co5YvjplaoEQcQ9LnaBkeS"
      );
    },
    success: function () {
      location.reload();
    },
  });
});

$("body").on("click", ".edit-btn", function () {
  document.location.href = `./index.html?binId=${$(this).attr("binId")}`;
});

$("body").on("click", ".dropdown-item", function () {
  switch ($(this).attr("val")) {
    case "name":
      filterByName();
      break;

    case "gender":
      filterByGender();
      break;

    case "country":
      filterByCountry();
      break;
  }
});

function filterByName() {
  $("#filter-btn").text("Name");

  $("body").on("keyup", "#filter-input", function () {
    console.log("keyup");

    let searchField = $("#filter-input");
    let filterText = searchField.val().toLowerCase();
    let listedUsers = $(".user");

    //   console.log(listedUser);

    for (let index = 0; index < listedUsers.length; index++) {
      const listedUser = listedUsers[index];
      let userName = $(listedUser).find(".name").text().toLowerCase();
      if (userName.toLowerCase().indexOf(filterText) > -1) {
        $(listedUser).removeClass("d-none");
      } else {
        $(listedUser).addClass("d-none");
      }
    }
  });
}

function filterByGender() {
  $("#filter-btn").text("Gender");

  $("body").on("keyup", "#filter-input", function () {
    console.log("keyup");

    let searchField = $("#filter-input");
    let filterText = searchField.val().toLowerCase();
    let listedUsers = $(".user");

    //   console.log(listedUser);

    for (let index = 0; index < listedUsers.length; index++) {
      const listedUser = listedUsers[index];
      let userGender = $(listedUser).attr("gender").toLowerCase();
      if (filterText == "") {
        $(listedUser).removeClass("d-none");
      } else if (userGender.toLowerCase() == filterText) {
        $(listedUser).removeClass("d-none");
      } else {
        $(listedUser).addClass("d-none");
      }
    }
  });
}

function filterByCountry() {
  $("#filter-btn").text("Country");

  $("body").on("keyup", "#filter-input", function () {
    console.log("keyup");

    let searchField = $("#filter-input");
    let filterText = searchField.val().toLowerCase();
    let listedUsers = $(".user");

    //   console.log(listedUser);

    for (let index = 0; index < listedUsers.length; index++) {
      const listedUser = listedUsers[index];
      let userCountry = $(listedUser).attr("country").toLowerCase();
      if (userCountry.toLowerCase().indexOf(filterText) > -1) {
        $(listedUser).removeClass("d-none");
      } else {
        $(listedUser).addClass("d-none");
      }
    }
  });
}
