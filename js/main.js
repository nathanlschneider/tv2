// main.js
// written by nate schneider 

var app = (function () {

    var statusSelector = document.querySelectorAll('.col-4'),
        clearButton = document.getElementById('clearButton'),
        searchBox = document.getElementById('searchBox'),
        buttonAction = "",
        storeName = "",
        searchState = {
            Active: 'a7d2ddaa-6cfc-4a3a-b5a5-342f3debf344',
            Resolved: 'efd3b94b-bc9a-4672-98ef-17b1ac102f63',
            Closed: 'efd3b94b-bc9a-4672-98ef-17b1ac102f63'
        };

    clearButton.addEventListener('click', function () {
        searchBox.value = "";
        removeTickets();
        _ticketObj = {};
    });

    //autocomplete.js - https://goodies.pixabay.com/javascript/auto-complete/demo.html
    new autoComplete({
        selector: '#searchBox',
        minChars: 2,
        source: function (term, suggest) {
            term = term.toLowerCase();
            var matches = [];
            for (i = 0; i < choices.length; i++)
                if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
            suggest(matches);
        },
        onSelect: function (e, term, item) {
            $('.collapse').collapse('hide');
            storeName = item.getAttribute('data-val');
            statusSelector[0].click();
        }
    });

    //creates footer button control functions 
    for (var i = 0; i < statusSelector.length; i++) {
        var action = strip(statusSelector[i].textContent);
        statusSelector[i].addEventListener('click', function (event) {
            resetSelectors();
            removeTickets();
            this.classList.remove("notActive");
            this.classList.add("Active");
            buttonAction = strip(event.target.textContent).trim();
            console.log(storeName, searchState[buttonAction]);
            api.callTicketData(storeName, searchState[buttonAction]);
        })
    }

    function resetSelectors() {
        for (var i = 0; i < statusSelector.length; i++) {
            statusSelector[i].classList.add("notActive");
        }
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

    function removeTickets() {
        document.getElementById('content').innerHTML = "";
    }
    return {
        strip: strip,
        ts: ts
    };

})();
