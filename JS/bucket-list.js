// Array of sound file URLs
var soundFiles = [
  "./Tunes/do.wav",
  "./Tunes/re.wav",
  "./Tunes/mi.wav",
  "./Tunes/fa.wav",
  "./Tunes/sol.wav",
  "./Tunes/la.wav",
  "./Tunes/ti.wav",
  "./Tunes/do2.wav",
];

// Define an object that maps words to corresponding image URLs
const wordToImage = {
    "apple": "./CSS/Sources/apple.png",
    "apples": "./CSS/Sources/apple.png",
    "banana": "./CSS/Sources/banana.png",
    "bananas": "./CSS/Sources/banana.png",
    "bread": "./CSS/Sources/bread.png",
    "milk": "./CSS/Sources/milk.png",
    "cheese": "./CSS/Sources/cheese.png",
    "sriracha": "./CSS/Sources/sriracha.png",
    "spinach": "./CSS/Sources/spinach.png",
    "eggs": "./CSS/Sources/eggs.png",
    "soy sauce": "./CSS/Sources/soysauce.png",
    "tomato": "./CSS/Sources/tomato.png",
    "tomatoes": "./CSS/Sources/tomato.png",
    "butter": "./CSS/Sources/butter.png",
    "strawberry": "./CSS/Sources/strawberry.png",
    "strawberries": "./CSS/Sources/strawberry.png",
    "mustard": "./CSS/Sources/mustard.png",
    "ketchup": "./CSS/Sources/ketchup.png",
    "avocado": "./CSS/Sources/avocado.png",
    "orange": "./CSS/Sources/orange.png",
    "oranges": "./CSS/Sources/orange.png",
    "lemon": "./CSS/Sources/lemon.png",
    "lemons": "./CSS/Sources/lemon.png",
    "grapes": "./CSS/Sources/grapes.png",
    "jam": "./CSS/Sources/jam.png",
    "chilli peppers": "./CSS/Sources/chilli.png",
    "ice cream": "./CSS/Sources/icecream.png",
    "yogurt": "./CSS/Sources/yogurt.png",
    "peanut butter": "./CSS/Sources/peanutbutter.png",
    "flour": "./CSS/Sources/flour.png",
    "rice": "./CSS/Sources/rice.png",
    // Add more word-image mappings here as needed
};

// Function to play a random sound from the soundFiles array
function playRandomSound() {
  // Generate a random index within the length of the soundFiles array
  var randomIndex = Math.floor(Math.random() * soundFiles.length);

  // Create an Audio object with the selected sound file
  var audio = new Audio(soundFiles[randomIndex]);

  // Play the audio file
  audio.play();
}

// JavaScript function to add text to the output section
function addText() {
  // Get the input text
  var inputText = document.getElementById("input").value;

  var bannedWords = ["fuck", "shit"];

  // Check if input text contains any banned words
  for (var i = 0; i < bannedWords.length; i++) {
    if (inputText.includes(bannedWords[i])) {
      alert("Sorry, you cannot submit this text.");
      return;
    }
  }

  // Create a new text box element
  var textBox = document.createElement("div");
  textBox.classList.add("text-box");

  // Check if input text matches any word in the wordToImage object
  if (wordToImage[inputText.toLowerCase()]) {
    // If the input text matches, create an image element
    var img = document.createElement("img");
    img.src = wordToImage[inputText.toLowerCase()];
    img.style.width = "50px"; // Set width to 50px
    img.style.height = "auto"; // Let browser calculate height based on aspect ratio
    textBox.appendChild(img);
  } else {
    textBox.innerText = inputText; // Show text if no image is found
  }

  // Generate random background color
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  textBox.style.backgroundColor = "#" + randomColor;

  // Insert the text box at the beginning of the output section
  var output = document.getElementById("output");
  output.insertBefore(textBox, output.firstChild);

  // Clear the input field
  document.getElementById("input").value = "";

  // Save the new text to localStorage
  saveToLocalStorage();

  // Add event listener to the new text box element for deleting when clicked
  textBox.addEventListener("click", function () {
    textBox.remove();
    saveToLocalStorage();
  });

  // Add event listener to the new text box element for playing a random sound on hover
  textBox.addEventListener("mouseover", function () {
    playRandomSound();
  });
}


// Load saved data from localStorage on page load
function loadFromLocalStorage() {
  var savedText = localStorage.getItem("text");
  if (savedText) {
    console.log(savedText)
    var output = document.getElementById("output");
    output.innerHTML = savedText;

    // Add event listeners to all text-box elements
    var textBoxes = output.querySelectorAll(".text-box");
    textBoxes.forEach(function (textBox) {
      textBox.addEventListener("click", function () {
        textBox.remove();
        saveToLocalStorage();
      });
      textBox.addEventListener("mouseover", function () {
        playRandomSound();
      });
    });
  }
}

// Save the current text in the output section to localStorage
function saveToLocalStorage() {
  var output = document.getElementById("output");
  localStorage.setItem("text", output.innerHTML);
}

// Call addText() function when "Enter" key is pressed
var input = document.getElementById("input");
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addText();
  }
});

// Load saved data on page load
window.addEventListener("load", loadFromLocalStorage);
