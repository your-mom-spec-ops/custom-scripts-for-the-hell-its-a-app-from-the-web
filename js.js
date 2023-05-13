(() => {
    const highlightResults = (text, color) => {
      document.designMode = "on"; // https://stackoverflow.com/a/5887719
      var selection = window.getSelection();
      selection.collapse(document.body, 0);
      while (window.find(text)) {
        document.execCommand("HiliteColor", false, color);
        selection.collapseToEnd();
      }
      document.designMode = "off";
    };
  
    let mostRecentSearchText = "";
    const search = text => {
      highlightResults(mostRecentSearchText, "transparent");
      highlightResults(text, "rgb(255 255 1 / 50%)");
      mostRecentSearchText = text;
    };
  
    const input = document.createElement("input");
    input.placeholder = "Search...";
    input.style.padding = "10px 15px";
    input.style.fontSize = "15px";
    input.style.borderRadius = "3px";
    input.style.border = "solid 1px lightgray";
  
    const form = document.createElement("form");
    form.style.display = "none";
    form.style.position = "fixed";
    form.style.top = "15px";
    form.style.right = "15px";
    form.style.zIndex = "2147483647"; // https://stackoverflow.com/a/856569
    form.addEventListener("submit", e => {
      e.preventDefault();
      search(input.value);
    });
  
    const close = document.createElement("a");
    close.innerText = "⨯";
    close.href = "javascript:void(0)";
    close.style.fontSize = "30px";
    close.style.padding = "15px";
    close.style.textDecoration = "none";
    close.addEventListener("click", e => {
      e.preventDefault();
      search("");
      form.style.display = "none";
    });
  
    form.appendChild(input);
    form.appendChild(close);
    document.body.appendChild(form);
  
    document.addEventListener("keydown", event => {
      if (event.metaKey && event.key === "f") {
        event.preventDefault();
        form.style.display = "block";
        input.focus();
      }
    });
  })();