

var innerText = "null";
var innerText = document.body.innerText;
console.log(innerText)




function WordCount(str) {
  return str.split(" ").length;
}

// Counted Words and create word count string.
var totalWordCount = WordCount(innerText)

let totalWordCountPrintOut;
if (totalWordCount < 300) {
  totalWordCountPrintOut = `Total word count: ${totalWordCount} words &#128542;`;
} else if (totalWordCount > 1000) {
  totalWordCountPrintOut = `Total word count: ${totalWordCount} words &#128640;`;
} else {
  totalWordCountPrintOut = `Total word count: ${totalWordCount} words &#128578;`;
}

stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','-','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after', '&','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']

function remove_stopwords(str) {
    res = []
    words = str.split(' ')
    for(i=0;i<words.length;i++) {
       word_clean = words[i].split(".").join("")
       if(!stopwords.includes(word_clean)) {
           res.push(word_clean)
       }
    }
    return(res.join(' '))
}

//removing stop words
var cleanOutput = remove_stopwords(innerText);

// converitng all of body text to lower case
var cleanOutputLowerCase = cleanOutput.toLowerCase();

// word frequncy table

var text = cleanOutputLowerCase;

var atLeast = 2;       // Show results with at least .. occurrences
var numWords = 3;      // Show statistics for one to .. words
var ignoreCase = true; // Case-sensitivity
var REallowedChars = /[^a-zA-Z'\-]+/g;
 // RE pattern to select valid characters. Invalid characters are replaced with a whitespace

var i, j, k, textlen, len, s;
// Prepare key hash
var keys = [null]; //"keys[0] = null", a word boundary with length zero is empty
var results = [];
numWords++; //for human logic, we start counting at 1 instead of 0
for (i=1; i<=numWords; i++) {
    keys.push({});
}

// Remove all irrelevant characters
text = text.replace(REallowedChars, " ").replace(/^\s+/,"").replace(/\s+$/,"");

// Create a hash
if (ignoreCase) text = text.toLowerCase();
text = text.split(/\s+/);
for (i=0, textlen=text.length; i<textlen; i++) {
    s = text[i];
    keys[1][s] = (keys[1][s] || 0) + 1;
    for (j=2; j<=numWords; j++) {
        if(i+j <= textlen) {
            s += " " + text[i+j-1];
            keys[j][s] = (keys[j][s] || 0) + 1;
        } else break;
    }
}

// Prepares results for advanced analysis
for (var k=1; k<=numWords; k++) {
    results[k] = [];
    var key = keys[k];
    for (var i in key) {
        if(key[i] >= atLeast) results[k].push({"word":i, "count":key[i]});
    }
}

// Result parsing
var outputHTML = []; // Buffer data. This data is used to create a table using `.innerHTML`

var f_sortAscending = function(x,y) {return y.count - x.count;};
for (k=1; k<numWords; k++) {
    results[k].sort(f_sortAscending);//sorts results

    // Customize your output. For example:
    var words = results[k];
    if (words.length) outputHTML.push('<td colSpan="3" class="num-words-header">'+k+' word'+(k==1?"":"s")+'</td>');
    for (i=0,len=words.length; i<len; i++) {

        //Characters have been validated. No fear for XSS
        outputHTML.push("<td>" + words[i].word + "</td><td>" +
           words[i].count + "</td><td>" +
           Math.round(words[i].count/textlen*10000)/100 + "%</td>");
           // textlen defined at the top
           // The relative occurence has a precision of 2 digits.
    }
}
outputHTML = '<table id="wordAnalysis"><thead><tr>' +
              '<td>Phrase</td><td>Count</td><td>Relativity</td></tr>' +
              '</thead><tbody><tr>' +outputHTML.join("</tr><tr>")+
               "</tr></tbody></table>";
// document.getElementById("RobW-sample").innerHTML = outputHTML;

var url = window.location.href;



chrome.runtime.sendMessage({
	method:"getMetas",
	data7:totalWordCountPrintOut,
	data8:outputHTML,
	data9:url,
	data12:innerText
});
