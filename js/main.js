// main.js
// written by nate schneider 

var app = (function () {

    var statusSelector = document.querySelectorAll('.filterBtn'),
        indicator = document.querySelector('.indicator'),
        clearButton = document.getElementById('clearButton'),
        searchBox = document.getElementById('searchBox'),
        fsButton = document.querySelector('.fsBtn');
        buttonAction = "";

    clearButton.addEventListener('click', function () {
        searchBox.value = "";
    });

    fsButton.addEventListener('click', function(){
        fsButton.classList.toggle('fsAnimate');
       fullscreen.toggle();
        
    })
    
    for (var i = 0; i < statusSelector.length; i++) {
        statusSelector[i].addEventListener('click', function (event) {
            if (this.innerText == "Active") {
               indicator.classList.add('animateActive');
               indicator.classList.remove('animateResolved');
              } else {
                indicator.classList.add('animateResolved');
                indicator.classList.remove('animateActive');
              }
        })
    }
    
    function removeTickets() {
       document.getElementById('content').style.display = "none";
    }

    //function to strip out HTML tags from a string
    function strip(html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var clean = doc.body.textContent;
        clean = clean.replace(/(\r\n\t|\n|\r\t)/gm, "");
        return clean || "";
    }

    function ts(string) {
        var length = 35;
        var trimmedString = string.length > length ?
            string.substring(0, length - 3) + "..." :
            string;
        return trimmedString;
    }

    function active(){
        statusSelector[0].click();
    }

    return {
        strip: strip,
        ts: ts,
        active: active
    };

})();
