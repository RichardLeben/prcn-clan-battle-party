var setAtkChara, setDefChara;
$(function () {
  var atkSet = new Set();
  var defSet = new Set();
  var charaMap = {};
  var charaNameList = [];
  var reverseCharaNameList = [];
  var battleList = [];
  setAtkChara = function (charaName) {
    var member = [];
    if (atkSet.has(charaName)) {
      atkSet.delete(charaName);
    } else {
      if (atkSet.size < 5) {
        atkSet.add(charaName);
      }
    }
    reverseCharaNameList.forEach((_charaName) => {
      if (atkSet.has(_charaName)) {
        member.push(_charaName);
      }
    });
    var dataHTML = member
      .map((_charaName) => {
        return (
          '<img src="https://img.gamewith.jp/article_tools/pricone-re/gacha/' +
          charaMap[_charaName] +
          '.png" width="50px" height="50px" data-name="' +
          _charaName +
          '" onclick="setAtkChara(\'' +
          _charaName +
          "')\"/>"
        );
      })
      .join("");
    $(".atkMember").html(dataHTML);
  };
  setDefChara = function (charaName) {
    var member = [];
    if (defSet.has(charaName)) {
      defSet.delete(charaName);
    } else {
      if (defSet.size < 5) {
        defSet.add(charaName);
      }
    }
    reverseCharaNameList.forEach((_charaName) => {
      if (defSet.has(_charaName)) {
        member.push(_charaName);
      }
    });
    var dataHTML = member
      .map((_charaName) => {
        return (
          '<img src="https://img.gamewith.jp/article_tools/pricone-re/gacha/' +
          charaMap[_charaName] +
          '.png" width="50px" height="50px" data-name="' +
          _charaName +
          '" onclick="setDefChara(\'' +
          _charaName +
          "')\"/>"
        );
      })
      .join("");
    $(".defMember").html(dataHTML);
  };
  $("datalist option").each((idx, elm) => {
    charaNameList.push(elm.value);
    reverseCharaNameList.push(elm.value);
    charaMap[elm.value] = $(elm).data("icon");
  });
  reverseCharaNameList.reverse();
  var atkPanelHTML = charaNameList
    .map((_charaName) => {
      return (
        '<img src="https://img.gamewith.jp/article_tools/pricone-re/gacha/' +
        charaMap[_charaName] +
        '.png" width="50px" height="50px" data-name="' +
        _charaName +
        '" onclick="setAtkChara(\'' +
        _charaName +
        "')\"/>"
      );
    })
    .join("");
  var defPanelHTML = charaNameList
    .map((_charaName) => {
      return (
        '<img src="https://img.gamewith.jp/article_tools/pricone-re/gacha/' +
        charaMap[_charaName] +
        '.png" width="50px" height="50px" data-name="' +
        _charaName +
        '" onclick="setDefChara(\'' +
        _charaName +
        "')\"/>"
      );
    })
    .join("");
  $(".atkPanel").html(atkPanelHTML);
  $(".defPanel").html(defPanelHTML);
  $.get(
    "https://script.google.com/macros/s/AKfycbwRyVOcKW22I1hEfnrAPSlI2BPQwbgFjZEwBDBzzjVJsM6O7FJm/exec",
    function (results) {
      battleList = results.map(function (result) {
        return {
          ??????: result["??????"].split(","),
          ??????: result["??????"].split(","),
          ????????????: result["????????????"],
        };
      });
      battleList.forEach(function (match) {
        $("<div></div>", {
          class: "???????????? " + match["??????"].join(" "),
          html:
            "<span>" +
            match["??????"]
              .map(function (charaName) {
                return (
                  '<img src="https://img.gamewith.jp/article_tools/pricone-re/gacha/' +
                  charaMap[charaName] +
                  '.png" width="50px" height="50px" data-name="' +
                  charaName +
                  '" onclick="setAtkChara(\'' +
                  charaName +
                  "')\"/>"
                );
              })
              .join("") +
            "</span>" +
            "VS" +
            "<span>" +
            match["??????"]
              .map(function (charaName) {
                return (
                  '<img src="https://img.gamewith.jp/article_tools/pricone-re/gacha/' +
                  charaMap[charaName] +
                  '.png" width="50px" height="50px" data-name="' +
                  charaName +
                  '" onclick="setDefChara(\'' +
                  charaName +
                  "')\"/>"
                );
              })
              .join("") +
            "</span>" +
            "<div>" +
            match["????????????"] +
            "</div>",
        }).appendTo("body");
      });
    }
  );
});
$("button.search").on("click", function () {
  var searchClass = $(".defMember img")
    .map((idx, elm) => $(elm).data("name"))
    .get()
    .join(".");
  $("div.????????????").show();
  if (searchClass) {
    $("div.????????????")
      .not("." + searchClass)
      .hide();
  }
});
$("button.print").on("click", function () {
  var linkHTML =
    '<a href="' +
    "https://script.google.com/macros/s/AKfycbwRyVOcKW22I1hEfnrAPSlI2BPQwbgFjZEwBDBzzjVJsM6O7FJm/exec?" +
    "??????=" +
    $(".atkMember img")
      .map((idx, elm) => $(elm).data("name"))
      .get()
      .toString() +
    "&??????=" +
    $(".defMember img")
      .map((idx, elm) => $(elm).data("name"))
      .get()
      .toString() +
    "&????????????=" +
    $("input.????????????").val() +
    '">??????????????????</a>';
  $(".output").html(linkHTML);
});