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
          自分: result["自分"].split(","),
          相手: result["相手"].split(","),
          コメント: result["コメント"],
        };
      });
      battleList.forEach(function (match) {
        $("<div></div>", {
          class: "対戦結果 " + match["相手"].join(" "),
          html:
            "<span>" +
            match["自分"]
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
            match["相手"]
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
            match["コメント"] +
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
  $("div.対戦結果").show();
  if (searchClass) {
    $("div.対戦結果")
      .not("." + searchClass)
      .hide();
  }
});
$("button.print").on("click", function () {
  var linkHTML =
    '<a href="' +
    "https://script.google.com/macros/s/AKfycbwRyVOcKW22I1hEfnrAPSlI2BPQwbgFjZEwBDBzzjVJsM6O7FJm/exec?" +
    "自分=" +
    $(".atkMember img")
      .map((idx, elm) => $(elm).data("name"))
      .get()
      .toString() +
    "&相手=" +
    $(".defMember img")
      .map((idx, elm) => $(elm).data("name"))
      .get()
      .toString() +
    "&コメント=" +
    $("input.コメント").val() +
    '">登録用リンク</a>';
  $(".output").html(linkHTML);
});