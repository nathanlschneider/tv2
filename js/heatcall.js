//heatcall.js
// written by nate schneider 

var api = (function () {

    var sessionTimer = setInterval(function(){
        logOut();
    },1200 * 1000);

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
            Active: 'ee3b3497-dea5-4a1a-ba97-664504969b51',
            Resolved: '9658ca96-70bd-44f4-b8f4-801d3bb3b966',
            All: '5b58910a-f400-400b-b12f-7c6ad065e9a2'
        };

        HEATAPI.Search.SearchBusinessObject("Frs_CompositeContract_Contact", '',
        "DisplayName",
        "LastModDateTime",
        "DESC",
        500,
        function (payLoad) {
            if (payLoad.success) {
                if (!sessionStorage) {
                    signIn();
                }
                // console.log("Name payLoad Receieved");
                var iframe = document.getElementById('authFrame');
                iframe.classList.remove('show');
            } else {
                // console.log("Name payLoad Failure.");
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
            storeName = item.getAttribute('data-val');
            tProc.purgeContents();
            callTicketData("All");

        }
    });

    //calls HEAT for ticket data and creates ticket objects
    function callTicketData(filter) {
        checkSession();
        HEATAPI.Search.SearchBusinessObject("Incident",
            // searchFilter[filter],
            '5b58910a-f400-400b-b12f-7c6ad065e9a2',
            columnArray,
            "LastModDateTime",
            "DESC",
            500,
            function (payLoad) {
                if (payLoad.success) {
                    tProc.createTicketObjects(storeName, payLoad);
                } else {
                    // console.log("Ticket payLoad Failure.");
                }
            })
    }

    function logOut() {
        HEATAPI.Auth.signOut(function (data) {
            // console.log(data);
            location.reload();
        });
    }

    function signIn() {
        HEATAPI.Auth.signIn(function (data) {
            sessionStorage = data.expires_in;
            //location.reload();
        });
    }

    function getNameData() { //returns private function
        return _namepayLoadData;
    }

    function getTicketData() { //returns private function
        return _ticketObj;
    }

    function checkSession() {
       signIn();
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