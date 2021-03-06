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
            // alert("There are no tickets of this type for the last 30 days" + store);
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
        this.createTicket = function (RecId) {
            p1 = document.createElement('p'),
                p2 = document.createElement('p'),
                p3 = document.createElement('p'),
                p4 = document.createElement('p'),
                p5 = document.createElement('p'),
                p6 = document.createElement('p'),
                p7 = document.createElement('p'),
                p8 = document.createElement('p'),
                p9 = document.createElement('p'),
                outerCard = document.createElement('div'),
                innerCard = document.createElement('div'),
                h51 = document.createElement('h5'),
                h52 = document.createElement('h6'),
                p = document.createElement('p'),
                a = document.createElement('a');

            outerCard.className = "card";
            h51.className = "card-header";
            h51.textContent = "Ticket #" + IncidentNumber;
            innerCard.className = "card-body";
            h52.className = "card-title";
            h52.textContent = ProfileFullName;
            p3.textContent = "Category: " + Category;
            p4.textContent = "Priority: " + Priority;
            p5.textContent = "Status: " + Status;
            p6.textContent = "Created On: " + CreatedDateTime;
            p7.textContent = "Tech Assigned: " + Owner;
            p8.textContent = "Issue: " + app.strip(Subject);
            p9.textContent = "Description: " + app.strip(Symptom);
            a.className = "btn btn-primary btn-block";
            a.textContent = "Go Back";
            a.addEventListener('click', function (event) {
                // console.log(app.lastClicked());
                if (app.lastClicked() === "Active") {
                    showCurrentCards("Active");
                } else {
                    showCurrentCards("Resolved");
                }

            })
            contents.appendChild(outerCard);
            outerCard.appendChild(h51);
            outerCard.appendChild(innerCard);
            innerCard.appendChild(h52);
            innerCard.appendChild(p3);
            innerCard.appendChild(p4);
            innerCard.appendChild(p5);
            innerCard.appendChild(p6);
            innerCard.appendChild(p7);
            innerCard.appendChild(p8);
            innerCard.appendChild(p9);
            innerCard.appendChild(a);
        }
        this.createCard = function () {
            var card = document.createElement('div'),
                body = document.createElement('div'),
                title = document.createElement('h5'),
                subTitle = document.createElement('h6'),
                content = document.createElement('p'),
                p1Img = document.createElement('img'),
                p2Img = document.createElement('img');

            card.className = "card card-alt";
            card.setAttribute("id", RecId);
            body.className = "card-body card-body-alt";
            title.className = "card-title";
            title.textContent = Category;
            subTitle.className = "card-subtitle capletter";
            subTitle.textContent = app.ts(app.strip(Subject.toLowerCase()));
            content.className = "card-text capletter";
            content.textContent = app.ts(app.strip(Symptom.toLowerCase()));
            p1Img.src = "img/p1.png";
            p2Img.src = "img/p2.png";
            p1img.classList = "alertImg";
            p2img.classList = "alertImg";

            contents.appendChild(card);
            card.appendChild(body);
            body.appendChild(title);
            body.appendChild(subTitle);
            body.appendChild(content);
            if (Priority == 1) {
                card.classList.add('p1');
                body.appendChild(p1Img);
            }

            if (Priority == 2) {
                card.classList.add('p2');
                body.appendChild(p2Img);
            }

            body.addEventListener('click', function (event) {

                tProc.showCurrentTickets(event.path[2].id);
            });
        }
    }

    function purgeContents() {
        _ticketObj = {};
        while (contents.firstChild) {
            contents.removeChild(contents.firstChild);
        }
    }

    function clearContents() {
        // contents.innerHTML = "";
        while (contents.firstChild) {
            contents.removeChild(contents.firstChild);
        }
    }

    function showCurrentCards(filter) {
        clearContents();

        if (filter === "Resolved") {
            for (let i = 0; i < Object.keys(_ticketObj).length; i++) {
                if (_ticketObj[i].Status === "Resolved" || _ticketObj[i].Status === "Closed") {
                    _ticketObj[i].createCard();
                }
            }
        } else {
            for (let i = 0; i < Object.keys(_ticketObj).length; i++) {
                if (_ticketObj[i].Status !== "Resolved" && _ticketObj[i].Status !== "Closed") {
                    _ticketObj[i].createCard();
                }
            }
        }
    }

    function showCurrentTickets(RecId) {
        console.log(RecId);
        if (RecId != "content") {
            clearContents();
            for (let i = 0; i < Object.keys(_ticketObj).length; i++) {
                if (_ticketObj[i].RecId === RecId) {
                    // console.log(RecId);
                    _ticketObj[i].createTicket();
                }
            }
        }
    }

    return {
        clearContents: clearContents, // cleears DOM elements, but keeps ticket data in memory
        purgeContents: purgeContents, // purges DOM content and ticket data
        createTicketObjects: createTicketObjects,
        showCurrentCards: showCurrentCards,
        showCurrentTickets: showCurrentTickets
    }
})();