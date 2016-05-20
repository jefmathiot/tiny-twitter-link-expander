var linkClassNames = ["twitter-timeline-link", "url-ext"]

function expandCurrentTwitterLinks(){
  var links = document.getElementsByClassName(linkClassName)
  for(var i = 0; i < links.length; i++){
    expandTwitterLink(links[i])
  }
}

function expandAddedTwitterLinks(){
  var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){
      var addedNodes = mutation.addedNodes
      for(var i = 0; i < addedNodes.length; i++){
        for(var j = 0; j < linkClassNames.length; j++){
          var links = addedNodes[i].querySelectorAll("." + linkClassNames[j])
          for(var k = 0; k < links.length; k++){
            expandTwitterLink(links[k])
          }
        }
      }
    })
  })
  observer.observe(document, {
    childList: true,
    subtree: true
  });
}

function expandTwitterLink(linkElem){
  if(linkElem.getAttribute("href")){
    var originalLink = linkElem.getAttribute("data-expanded-url") ||
      linkElem.getAttribute("data-full-url");
    if(originalLink){
      linkElem.setAttribute("href", originalLink)
    }
  }
}

expandAddedTwitterLinks()
expandCurrentTwitterLinks()
