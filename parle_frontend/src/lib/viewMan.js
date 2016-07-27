
var viewMan = (function(jq){
  let views;
  let links;
  let currentView;
  let runEvents = {};
  if(jq === undefined) {
    console.error("required library jQuery not found!");
    return undefined;
  }

  function init() {
    views = jq("[data-view]");
    currentViews = jq("[data-view-main]");
    //links = jq("[data-link]");

    if(currentViews.length > 0) {
      currentView = currentViews[0];
    } else {
      currentView = views[0];
    }

    document.location = "#" + jq(currentView).attr("data-view");

    window.onhashchange = function(event) {
      event.preventDefault();
      nav(event.newURL.split("#")[1]);
    }

    process();
  }

  function process() {
    jq(views).hide();
    jq(currentView).show();
    if(runEvents[jq(currentView).attr("data-view")] !== undefined) {
      try {
        runEvents[jq(currentView).attr("data-view")]();
      } catch (e) {
        console.log(e);
      }
    }



  }

  function nav(title) {
    for(var view of views) {
      if( jq(view).attr("data-view") === title ) {
        currentView = view;
        document.location = "#" + jq(currentView).attr("data-view");
        break;
      }
    }
    process();
  }

  function viewevent(viewName, func) {
    runEvents[viewName] =  func;
  };




  init();

  return {
    nav : nav,
    init: init,
    process: process,
    viewevent : viewevent,
    __views : views,
    __currentView : currentView
  }
})($ || jQuery);
