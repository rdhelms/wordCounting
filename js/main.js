// wordCounting
function WordCount(text, resultElem) {
  //The HTML element where the word count results will be displayed.
  this.elems = {
    display: document.querySelector(resultElem)
  };
  //The text whose words will be counted.
  this.text = text;
  //Functions to add text to the display div. Either add to existing or replace all.
  this.addDisplay = function(newText) {
    this.elems.display.innerHTML += newText;
  };
  this.displayText = function(replaceText) {
    this.elems.display.innerHTML = replaceText;
  };
  //Create the allWords object to keep track of each word and its count.
  this.allWords = {
    // (Starts empty)
  };
  //Function to actually count the words.
  this.countWords = function() {
    //Convert to lower case
    var fullString = this.text.toLowerCase();
    //First replace newlines with spaces, then replace all 's with '' and then all other punctuation except - with ''
    var fullNoPunct = fullString.replace(/\n/g," ").replace(/'s |[\.,\/#!$%\^&\*;:\|{}=\_`~()@\+\?><\[\]\+\\\'\"]/g, '');
    //Break string into an array of all the remaining words
    var arrayOfWords = fullNoPunct.split(" ");
    //For every word in the array, if it is longer than one character, either add it to the array or increment its existing count.
    for (var word of arrayOfWords) {
      if (word.length > 1) {
        if (!this.allWords[word]) {
          this.allWords[word] = 1;
        } else {
          this.allWords[word]++;
        }
      }
    }
    //Get a sorted array for display purposes
    var sorted = Object.keys(this.allWords).sort();
    var mostCommonCount = 0;
    var mostCommonWord = '';
    this.displayText('');
    //For every word in the sorted array, check its count in the allWords object to find the highest count
    for (var key of sorted) {
      if (this.allWords[key] > mostCommonCount) {
        mostCommonCount = this.allWords[key];
        mostCommonWord = key;
      }
      //Output the word and its count to the results div
      this.addDisplay(key + ": \t" + this.allWords[key] + "<br>");
    }
    //Print out the most common word at the bottom of the results div
    this.addDisplay("<br>Most Common Word: \t\"" + mostCommonWord + "\" (" + mostCommonCount + " times)");
  }
}

//Function to grab the text from each HTML textarea, create a WordCount object for each, and count the words.
function checkText() {
  var leftText = document.querySelector('.text1').value;
  var countLeft = new WordCount(leftText, '.result1');
  countLeft.countWords();

  var rightText = document.querySelector('.text2').value;
  var countRight = new WordCount(rightText, '.result2');
  countRight.countWords();
}

//Check the textareas every 20ms.
var loopHandle = setInterval(checkText, 20);
