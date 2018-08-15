//tProc.js
// written by nate schneider 

var tProc = (function () {

    var _ticketObj = {};
    //creates ticket object
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
    }

    function createTicketObjects(store, payLoad) {
        _ticketObj = {};
        var i = 0;
        for (var c = 0; c < payLoad.data.length; c++) {
            if (payLoad.data[c].ProfileFullName === store) {
                _ticketObj[i] = new Ticket(payLoad.data[c].RecId,
                    payLoad.data[c].Category,
                    payLoad.data[c].CreatedDateTime,
                    payLoad.data[c].IncidentNumber,
                    payLoad.data[c].Owner,
                    payLoad.data[c].Priority,
                    payLoad.data[c].ProfileFullName,
                    payLoad.data[c].Status,
                    payLoad.data[c].Symptom);
                i++;
            };
        }
        if (i === 0) {
            alert("There are no tickets for store");
        };
        console.log();
        makeTicketList(_ticketObj);
    }

    var makeTicketList = function (data) {

        for (var i = 0; i < Object.keys(data).length; i++) {

            var content = document.getElementById('content'),
                fragment = document.createDocumentFragment(),
                outerTicket = document.createElement('div'),
                outerCard = document.createElement('div'),
                innerCard = document.createElement('div'),
                img1 = document.createElement('img'),
                img2 = document.createElement('img'),
                h5 = document.createElement('h5'),
                h6 = document.createElement('h6'),
                p = document.createElement('p');

            outerTicket.addEventListener('click', function (event) {
                while (content.firstChild) {
                    content.removeChild(content.firstChild);
                }
                makeTicket(this.id);
            });

            outerTicket.setAttribute("id", data[i].RecId);
            outerTicket.className = "ticket";
            outerCard.className = "card cardAlt";
            innerCard.className = "card-body card-bodyAlt";
            h5.className = "card-title";
            h5.textContent = data[i].Category;
            h6.className = "card-subtitle";
            h6.textContent = app.ts(app.strip(data[i].Subject));
            p.className = "card-text";
            p.textContent = data[i].CreatedDateTime; //data[i].Symptom; 
            img1.src = "img/p1.png";
            img2.src = "img/p2.png";

            fragment.appendChild(outerTicket);
            outerTicket.appendChild(outerCard);
            outerCard.appendChild(innerCard);
            innerCard.appendChild(h5);
            innerCard.appendChild(h6);
            innerCard.appendChild(p);

            if (data[i].Priority == 1) {
                outerCard.classList.add('p1');
                innerCard.appendChild(img1);
            }

            if (data[i].Priority == 2) {
                outerCard.classList.add('p2');
                innerCard.appendChild(img2);
            }
            content.appendChild(fragment);
        }
    };

    function makeTicket(data) {

        for (var i = 0; i < Object.keys(_ticketObj).length; i++) {

            if (_ticketObj[i].RecId == data) {

                var content = document.getElementById('content'),
                    fragment = document.createDocumentFragment(),
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
                h51.textContent = "Ticket #" + _ticketObj[i].IncidentNumber;
                innerCard.className = "card-body";
                h52.className = "card-title";
                h52.textContent = _ticketObj[i].ProfileFullName;
                p3.textContent = "Category: " + _ticketObj[i].Category;
                p4.textContent = "Priority: " + _ticketObj[i].Priority;
                p5.textContent = "Status: " + _ticketObj[i].Status;
                p6.textContent = "Created On: " + _ticketObj[i].CreatedDateTime;
                p7.textContent = "Tech Assigned: " + _ticketObj[i].Owner;
                p8.textContent = app.strip(_ticketObj[i].Subject);
                p9.textContent = _ticketObj[i].Symptom;
                a.className = "btn btn-primary btn-block";
                a.textContent = "Go Back";

                a.addEventListener('click', function () {
                   
                    }

                   

                fragment.appendChild(outerCard);
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
                content.appendChild(fragment);
            }
        }
    }

    return {
        purgeCurrentData: purgeCurrentData,
        makeTicketList: makeTicketList,
        createTicketObjects: createTicketObjects
    }
})();

/* <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>

innerDiv = document.createElement('div'),
innerDivAtt = document.createAttribute('class'),

h5 = document.createElement('h5'),
h5Att = document.createAttribute('class'),

h6 = document.createElement('h6'),
h6Att = document.createAttribute('class'),

p = document.createElement('p'),
pAtt = document.createAttribute('class'); */
