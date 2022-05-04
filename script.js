const _templates = {
  countryListing: function (data) {
    return `<p class="country" code=${data.cca2} capital=${
      data.capital ? data.capital[0] : "unavailable"
    } language=${
      data.languages && data.languages[Object.keys(data.languages)[0]]
    }>${data.name.common}</p>`;
  },
};

let selectedCountry;

$.ajax({
  url: "https://restcountries.com/v3.1/all",
  type: "GET",
  dataType: "json", // added data type
  success: function (res) {
    console.log(res);

    for (country in res)
      $("#countries-list").append(_templates.countryListing(res[country]));
  },
});

function toggleDropdown() {
  $("#dropdown-content").toggleClass("d-none");
}

function filterCountries(element) {
  let searchField = $(element);
  let filterText = searchField.val().toLowerCase();
  let listedCountries = $(".country");

  for (let index = 0; index < listedCountries.length; index++) {
    const listedCountry = listedCountries[index];
    let countryName = $(listedCountry).text().toLowerCase();
    let countryCode = $(listedCountry).attr("code").toLowerCase();
    let countryCapital = $(listedCountry).attr("capital").toLowerCase();
    let countryLanguage = $(listedCountry).attr("language").toLowerCase();
    if (
      countryName.toLowerCase().indexOf(filterText) > -1 ||
      countryCode.toLowerCase().indexOf(filterText) > -1 ||
      countryCapital.toLowerCase().indexOf(filterText) > -1 ||
      countryLanguage.toLowerCase().indexOf(filterText) > -1
    ) {
      $(listedCountry).removeClass("d-none");
    } else {
      $(listedCountry).addClass("d-none");
    }
  }
}

$("body").on("click", ".country", function () {
  selectedCountry = $(this).text();
  $("#dropdown-btn").text(selectedCountry);
  $("#search-country").val("");
  filterCountries("#search-country");
  toggleDropdown();
});

// $.ajax({
//   url: "https://api.jsonbin.io/v3/c",
//   type: "POST",
//   data: {},
//   contentType: "json",
//   beforeSend: function (xhr) {
//     xhr.setRequestHeader(
//       "X-Master-Key",
//       "$2b$10$k8Z8xntro4ULdMJdE7.iE.1KNFPEdg8co5YvjplaoEQcQ9LnaBkeS"
//     );
//     xhr.setRequestHeader("X-Collection-Name", "collection-one");
//   },
//   success: function (res) {
//     console.log(res);
//   },
// });

let searchParams = new URLSearchParams(window.location.search);
if (searchParams.has("binId")) {
  console.log("has binid");

  $.ajax({
    url: `https://api.jsonbin.io/v3/b/${searchParams.get("binId")}`,
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
      $("#user-name").val(res.record.name);
      $("#user-age").val(res.record.age);
      $("#user-gender").val(res.record.gender);
      $("#user-address").val(res.record.address);
      $("#user-city").val(res.record.city);
      selectedCountry = res.record.country;
      $("#dropdown-btn").text(selectedCountry);
    },
  });

  $("body").on("submit", "#user-form", function (e) {
    e.preventDefault();

    let formData = new FormData(this);
    formData.append("country", selectedCountry);

    formData = JSON.stringify(Object.fromEntries(formData));

    $.ajax({
      url: `https://api.jsonbin.io/v3/b/${searchParams.get("binId")}`,
      type: "PUT",
      data: formData,
      contentType: "json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader(
          "X-Master-Key",
          "$2b$10$k8Z8xntro4ULdMJdE7.iE.1KNFPEdg8co5YvjplaoEQcQ9LnaBkeS"
        );
      },
      success: function (res) {
        console.log(res);
        document.location.href = "./view.html";
      },
    });
  });
} else {
  $("body").on("submit", "#user-form", function (e) {
    e.preventDefault();

    let formData = new FormData(this);
    formData.append("country", selectedCountry);

    formData = JSON.stringify(Object.fromEntries(formData));

    $.ajax({
      url: "https://api.jsonbin.io/v3/b",
      type: "POST",
      data: formData,
      contentType: "json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader(
          "X-Master-Key",
          "$2b$10$k8Z8xntro4ULdMJdE7.iE.1KNFPEdg8co5YvjplaoEQcQ9LnaBkeS"
        );
        xhr.setRequestHeader("X-Collection-Id", "626f8e0a25069545a32c0867");
      },
      success: function (res) {
        console.log(res);
        document.location.href = "./view.html";
      },
    });
  });
}
