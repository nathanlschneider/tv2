// main.js
// written by nate schneider 

var app = (function () {

    var statusSelector = document.querySelectorAll('.col-4'),
        clearButton = document.getElementById('clearButton'),
        searchBox = document.getElementById('searchBox'),
        buttonAction = "";

    clearButton.addEventListener('click', function () {
        searchBox.value = "";
        removeTickets();
    });
    
    for (var i = 0; i < statusSelector.length; i++) {
        statusSelector[i].addEventListener('click', function (event) {
            resetSelectors();
            removeTickets();
            this.classList.remove("notActive");
            this.classList.add("Active");
            buttonAction = strip(event.target.textContent).trim();
            api.callTicketData(buttonAction);
        })
    }
    
    function resetSelectors() {
        for (var i = 0; i < statusSelector.length; i++) {
            statusSelector[i].classList.add("notActive");
        }
    }

    function removeTickets() {
        document.getElementById('content').innerHTML = "";
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
