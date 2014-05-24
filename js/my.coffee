testSourse="http://dl.dropboxusercontent.com/s/w85noarzzeabgr7/emoji.xml"

xmlDoc=[]
cateList=[]
entryList=[]
getRequest=(sourceURL)->
  xhr=new XMLHttpRequest
  xhr.open('GET',sourceURL)
  xhr.send()
  xhr
pushNewMenu=(string)->
  $("li.menu-item-divided").
    before("<li><a href='#' class='cate'>#{string}</a></li>")

pushNewButton=(string)->
  $(".content").
    append("<a href='#' class='pure-button emojiBox'>#{nl2br(string)}</a>")

pushNewHead=(string)->
  $(".content").append("<h2 class='content-subhead'>#{nl2br(string)}</h2>")

nl2br=(str)->
  breakTag='<br>'
  return (str + '').
    replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1#{breakTag}$2")

$(->
xhr=getRequest(testSourse)
xhr.onreadystatechange = ->
# page init
  if ( xhr.readyState == 4 && xhr.status == 200 )
    xmlDoc=xhr.responseXML
    $xml=$(xmlDoc)
    cateList=($xml.find("category").map ->
      return $(this).attr("name"))
    entryList=$xml.find("category[name='#{cateList[0]}']").find("entry").map(->
      return $(this).find("string").text())
    pushNewHead(cateList[0])
    for cate in cateList
      pushNewMenu(cate)
    for entry in entryList
      pushNewButton(entry)

  $(".cate").click (->
    $(this).blur()
    $(this).parent().parent().children().removeClass("pure-menu-selected")
    $(this).parent().addClass("pure-menu-selected")
    entryList=$xml.find("category[name='#{$(this).text()}']").find("entry").map(->
      return $(this).find("string").text())
    $(".content").empty()
    pushNewHead($(this).text())
    for entry in entryList
      pushNewButton(entry)
    )
)
