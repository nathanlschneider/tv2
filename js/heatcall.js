//heatcall.js
// written by nate schneider 

var api = (function () {

    //private
    var ticketPayload = {},
        namePayload = {},
        i = 0,
        c = 0,
        _ticketObj = {},
        logAlert = document.getElementById('logAlert'),
        columnArray = ["Category",
            "CreatedDateTime",
            "IncidentNumber",
            "Owner",
            "Priority",
            "ProfileFullName",
            "Status",
            "Subject",
            "Symptom"
        ];

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
            for (i = 0; i < payLoad.data.length; i++) {
                choices[i] = payLoad.data[i].DisplayName;
            }
        });

    //creates ticket object
    function Ticket(Category, CreatedDateTime, IncidentNumber, Owner, Priority, ProfileFullName, Status, Subject, Symptom) {
        this.Category = Category;
        this.CreatedDateTime = CreatedDateTime;
        this.IncidentNumber = IncidentNumber;
        this.Owner = Owner;
        this.Priority = Priority;
        this.ProfileFullName = ProfileFullName;
        this.Status = Status;
        this.Subject = Subject;
        this.Symptom = Symptom;
    }
    //calls HEAT for ticket data and creates ticket objects
    function callTicketData(store, searchFilter) {
        _ticketObj = {};
        HEATAPI.Search.SearchBusinessObject("Incident",
            searchFilter,
            columnArray,
            "LastModDateTime",
            "DESC",
            5000,
            function (payLoad) {
                var i = 0;
                if (payLoad.success) {
                    console.log("Ticket Data payLoad Receieved");
                    for (c = 0; c < payLoad.data.length; c++) {
                        if (payLoad.data[c].ProfileFullName === store) {
                            _ticketObj[i] = new Ticket(payLoad.data[c].Category, payLoad.data[c].CreatedDateTime, payLoad.data[c].IncidentNumber,
                                payLoad.data[c].Owner, payLoad.data[c].Priority, payLoad.data[c].ProfileFullName, payLoad.data[c].Status, payLoad.data[c].Symptom);
                            i++;
                        };
                    }
                    tProc.makeTicket(_ticketObj);
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
        callTicketData: callTicketData,  //function to fetch ticket data from HEAT
        name: getNameData,               //function to fetch employee name data from HEAT
        data: getTicketData,             //function to use ticketObj data
        logOut: logOut,                  //function to log out of app
        signIn: signIn                   //function to sign into app
    }
})();
