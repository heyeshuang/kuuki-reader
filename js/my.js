// Generated by CoffeeScript 1.7.1
var cateList, entryList, getRequest, nl2br, pushNewButton, pushNewHead, pushNewMenu, testSourse, xhr, xmlDoc;

testSourse = "http://dl.dropboxusercontent.com/s/w85noarzzeabgr7/emoji.xml";

xmlDoc = [];

cateList = [];

entryList = [];

getRequest = function(sourceURL) {
  var xhr;
  xhr = new XMLHttpRequest;
  xhr.open('GET', sourceURL);
  xhr.send();
  return xhr;
};

pushNewMenu = function(string) {
  return $("li.menu-item-divided").before("<li><a href='#' class='cate'>" + string + "</a></li>");
};

pushNewButton = function(string) {
  return $(".content").append("<a href='#' class='pure-button emojiBox'>" + (nl2br(string)) + "</a>");
};

pushNewHead = function(string) {
  return $(".content").append("<h2 class='content-subhead'>" + (nl2br(string)) + "</h2>");
};

nl2br = function(str) {
  var breakTag;
  breakTag = '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1" + breakTag + "$2");
};

$(function() {}, xhr = getRequest(testSourse), xhr.onreadystatechange = function() {
  var $xml, cate, entry, _i, _j, _len, _len1;
  if (xhr.readyState === 4 && xhr.status === 200) {
    xmlDoc = xhr.responseXML;
    $xml = $(xmlDoc);
    cateList = $xml.find("category").map(function() {
      return $(this).attr("name");
    });
    entryList = $xml.find("category[name='" + cateList[0] + "']").find("entry").map(function() {
      return $(this).find("string").text();
    });
    pushNewHead(cateList[0]);
    for (_i = 0, _len = cateList.length; _i < _len; _i++) {
      cate = cateList[_i];
      pushNewMenu(cate);
    }
    for (_j = 0, _len1 = entryList.length; _j < _len1; _j++) {
      entry = entryList[_j];
      pushNewButton(entry);
    }
  }
  return $(".cate").click((function() {
    var _k, _len2, _results;
    $(this).blur();
    $(this).parent().parent().children().removeClass("pure-menu-selected");
    $(this).parent().addClass("pure-menu-selected");
    entryList = $xml.find("category[name='" + ($(this).text()) + "']").find("entry").map(function() {
      return $(this).find("string").text();
    });
    $(".content").empty();
    pushNewHead($(this).text());
    _results = [];
    for (_k = 0, _len2 = entryList.length; _k < _len2; _k++) {
      entry = entryList[_k];
      _results.push(pushNewButton(entry));
    }
    return _results;
  }));
});

//# sourceMappingURL=my.map
