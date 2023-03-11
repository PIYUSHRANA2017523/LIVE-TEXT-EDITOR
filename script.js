let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
//List of fontlist

let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "Cursive",
];
//Initial Settings

const initializer = () => {
  //function calls for highlighting buttons

  //No highlights for link, unlink,lists, undo,redo since they are one time operations

  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);
  //create options for font names

  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
});
  //fontSize allows only till 7
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
}
  //default size
  fontSizeRef.value = 3;
};
//main logic
const modifyText = (command, defaultUi, value) => {
  //execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};
//For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
}); });
//options that require value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
}); });
//link
linkButton.addEventListener("click", () => {
let userLink = prompt("Enter a URL");
  //if link has http then pass directly else add https
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});
//Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      //needsRemoval = true means only one button should be highlight and other would be normal
      if (needsRemoval) {
        let alreadyActive = false;
        //If currently clicked button is already active
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }
        //Remove highlight from other buttons
        highlighterRemover(className);
        if (!alreadyActive) {
          //highlight clicked button
          button.classList.add("active");
        }
      } else {
        //if other buttons can be highlighted
        button.classList.toggle("active");
} });
}); };
const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};
// const addCommentButton = document.querySelector('#addComment');
// const textInput = document.getElementById("text-input");

// addCommentButton.addEventListener('click', () => {
 
//     const comment = prompt("Enter your comment:");

//     // Create a new comment element
//     const commentElement = document.createElement("div");
//     commentElement.classList.add("comment");
  
//     // Create a new text element to hold the comment text
//     const commentTextElement = document.createElement("p");
//     commentTextElement.textContent = comment;
  
//     // Create a hide/unhide button to toggle the comment visibility
//     const hideButton = document.createElement("button");
//     hideButton.textContent = "Hide";
//     hideButton.addEventListener("click", function() {
//       commentTextElement.style.display = "none";
//       hideButton.textContent = "Unhide";
//     });
  
//     // Append the text and hide/unhide button elements to the comment element
//     commentElement.appendChild(commentTextElement);
//     commentElement.appendChild(hideButton);
  
//     // Append the comment element to the target element
//     textInput.appendChild(commentElement);
// });

// Listen for clicks outside of the text input to close the comment prompt
document.addEventListener('click', (event) => {
  if (event.target !== addCommentButton && !textInput.contains(event.target)) {
    promptClosed = true;
  }
});

const highlightedText = document.querySelectorAll('.highlight');

// Add an event listener to each highlighted text element
highlightedText.forEach((text) => {
  const comment = text.getAttribute('data-comment');

  // Add a mouseover event listener to show the comment dialog box
  text.addEventListener('mouseover', (event) => {
    const commentBox = document.createElement('div');
    commentBox.classList.add('comment');
    commentBox.innerText = comment;
    text.appendChild(commentBox);
  });

  // Add a mouseout event listener to hide the comment dialog box
  text.addEventListener('mouseout', (event) => {
    const commentBox = text.querySelector('.comment');
    text.removeChild(commentBox);
  });
});

function markText() {
    // Get the selected text
  var selectedText = window.getSelection().toString();

  // Get the bookmark text from the input field
  var bookmarkText = prompt("Enter the Comment");
  //bookmarkText.append(" ");
  // Create a bookmark element

  bookmarkText = " "+bookmarkText;

  var bookmark = document.createElement("span");
  bookmark.style.backgroundColor = "yellow";
  bookmark.textContent = bookmarkText;

  // Wrap the selected text with the bookmark element
  var range = window.getSelection().getRangeAt(0);
  range.surroundContents(bookmark);

  // Add a class to the bookmark element
  bookmark.classList.add("bookmark");

  // Add a data-tooltip attribute to the bookmark element
  bookmark.setAttribute("data-tooltip", bookmarkText);

  // Add an event listener to show the tooltip on hover
  bookmark.addEventListener("mouseover", function () {
    var tooltip = document.createElement("span");
    tooltip.textContent = bookmark.getAttribute("data-tooltip");
    tooltip.classList.add("tooltip");
    bookmark.appendChild(tooltip);
  });

  // Add an event listener to hide the tooltip on mouseout
  bookmark.addEventListener("mouseout", function () {
    bookmark.removeChild(bookmark.lastChild);
  });
  }

window.onload = initializer();
