//heatcall.js
// written by nate schneider 

var api = (function () {
    var choices = [],
        storeName = "",
        columnArray = ["RecId",
            "Category",
            "CreatedDateTime",
            "IncidentNumber",
            "Owner",
            "Priority",
            "ProfileFullName",
            "Status",
            "Subject",
            "Symptom"
        ],
        searchFilter = {
            Active: 'a7d2ddaa-6cfc-4a3a-b5a5-342f3debf344',
            Resolved: 'efd3b94b-bc9a-4672-98ef-17b1ac102f63'
        };

    //checks to see if your logged into HEAT
    HEATAPI.Auth.getSignInfo(function (data) {
        if (!data.authenticated) {
            logAlert.style.display = "block";
        } else {
            signIn();
        }
    });

    //calls to HEAT for employee name data
    HEATAPI.Search.SearchBusinessObject("Frs_CompositeContract_Contact", '',
        "DisplayName",
        "LastModDateTime",
        "DESC",
        500,
        function (payLoad) {
            if (payLoad.success) {
                console.log("Name payLoad Receieved");
            } else {
                console.log("Name payLoad Failure.");
            }
            for (var i = 0; i < payLoad.data.length; i++) {
                choices[i] = payLoad.data[i].DisplayName;
            }
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
            app.active();
        }
    });

    //calls HEAT for ticket data and creates ticket objects
    function callTicketData(filter) {
        HEATAPI.Search.SearchBusinessObject("Incident",
            searchFilter[filter],
            columnArray,
            "LastModDateTime",
            "DESC",
            5000,
            function (payLoad) {
                if (payLoad.success) {
                    tProc.createTicketObjects(storeName, payLoad);
                } else {
                    console.log("Ticket payLoad Failure.");
                }
            })
    }

    function logOut() {
        HEATAPI.Auth.signOut(function (data) {
            console.log(data);
            location.reload();
        });
    }

    function signIn() {
        HEATAPI.Auth.signIn(function (data) {
            console.log(data);
        });
    }

    function getNameData() { //returns private function
        return _namepayLoadData;
    }

    function getTicketData() { //returns private function
        return _ticketObj;
    }

    //public
    return {
        callTicketData: callTicketData, //function to fetch ticket data from HEAT
        name: getNameData, //function to fetch employee name data from HEAT
        data: getTicketData, //function to use ticketObj data
        logOut: logOut, //function to log out of app
        signIn: signIn //function to sign into app
    }
})();
