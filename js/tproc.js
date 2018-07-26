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
            });

            outerTicket.setAttribute("id", data[i].RecId);
            outerTicket.className = "ticket";
            outerCard.className = "card";
            innerCard.className = "card-body";
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

    return {
        makeTicket: makeTicketList,
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
