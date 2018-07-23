var app = (function () {

    console.log("main.js loaded");

    var statusSelector = document.querySelectorAll('.col-4');
    var alert = document.getElementById('logAlert');
    var choices = [];
    const URL = "";

    //checks for HEAT authentication
  

    //autocomplete.js - https://goodies.pixabay.com/javascript/auto-complete/demo.html
    new autoComplete({
        selector: 'input[name="searchBox"]',
        minChars: 2,
        source: function (term, suggest) {
            term = term.toLowerCase();
            var matches = [];
            for (i = 0; i < choices.length; i++)
                if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
            suggest(matches);
        }
    });

    //ajax function to get customer names
    console.log(api.callName());

    //creates footer button control functions 
    for (var i = 0; i < statusSelector.length; i++) {
        statusSelector[i].addEventListener('click', function () {
            resetSelectors();
            this.classList.remove("notActive");
            this.classList.add("Active");
        })
    }

    function resetSelectors() {
        for (var i = 0; i < statusSelector.length; i++) {
            statusSelector[i].classList.add("notActive");
        }
    }
})();