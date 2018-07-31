var tProc = (function () {

    var contents = document.getElementById('content'),
        _ticketObj = {};

    function createTicketObjects(store, payLoad) {
        var i = 0;

        for (var c = 0; c < payLoad.data.length; c++) {
            if (payLoad.data[c].ProfileFullName === store) {
                _ticketObj[i] = new Ticket(
                    payLoad.data[c].RecId,
                    payLoad.data[c].Category,
                    payLoad.data[c].CreatedDateTime,
                    payLoad.data[c].IncidentNumber,
                    payLoad.data[c].Owner,
                    payLoad.data[c].Priority,
                    payLoad.data[c].ProfileFullName,
                    payLoad.data[c].Status,
                    payLoad.data[c].Subject,
                    payLoad.data[c].Symptom);
                i++;
            };
        }
        if (i === 0) {
            alert("There are no tickets for store");
        };
        showCurrentCards();
    }

    //ticker constrcutor
    function Ticket(RecId, Category, CreatedDateTime, IncidentNumber, Owner, Priority, ProfileFullName, Status, Subject, Symptom) {
        this.RecId = RecId;
        this.Category = Category;
        this.CreatedDateTime = CreatedDateTime;
        this.IncidentNumber = IncidentNumber;
        this.Owner = Owner;
        this.Priority = Priority;
        this.ProfileFullName = ProfileFullName;
        this.Status = Status;
        this.Subject = Subject;
        this.Symptom = Symptom;
        this.createTicket = function () {
            var div4 = document.createElement('div'),
                div5 = document.createElement('div'),
                div6 = document.createElement('div'),
                div7 = document.createElement('div'),
                div8 = document.createElement('div'),
                div9 = document.createElement('div'),
                div10 = document.createElement('div');
            div4.innerText = RecId;
            div5.innerText = CreatedDateTime;
            div6.innerText = IncidentNumber;
            div7.innerText = Owner;
            div8.innerText = ProfileFullName;
            div9.innerText = Status;
            div10.innerText = Symptom;
            contents.appendChild(div4);
            contents.appendChild(div5);
            contents.appendChild(div6);
            contents.appendChild(div7);
            contents.appendChild(div8);
            contents.appendChild(div9);
            contents.appendChild(div10);
        }
        this.createCard = function () {
            var div1 = document.createElement('div'),
                div2 = document.createElement('div'),
                div3 = document.createElement('div');
            div1.innerText = Category;
            div2.innerText = Priority;
            div3.innerText = Subject;
            contents.appendChild(div1);
            contents.appendChild(div2);
            contents.appendChild(div3);

        }
    }

    function purgeContents() {
        _ticketObj = {};
        while (contents.firstChild) {
            contents.removeChild(contents.firstChild);
        }
    }

    function clearContents() {
        contents.innerHTML = "";
    }

    function showCurrentCards() {
        for (let i = 0; i < Object.keys(_ticketObj).length; i++) {
            _ticketObj[i].createCard();
        }
    }

    function showCurrentTickets() {
    }

    return {
        clearContents: clearContents, // cleears DOM elements, but keeps ticket data in memory
        purgeContents: purgeContents, // purges DOM content and ticket data
        createTicketObjects: createTicketObjects,
        showCurrentCards: showCurrentCards,
        showCurrentTickets: showCurrentTickets
    }
})()

//var testCard = new Card("Hardware", "1", "Computer won't turn on.");
//var testTicket = new Ticket("3939eke903", "9/12/1979", "21", "Bill Tert", "Wendy's #002", "Active", "Hard down on all the terminals");

//testCard.create();
//testTicket.create.call(testCard.create());