//tProc.js
// written by nate schneider 

var tProc = (function () {

    var makeTicket = function (data) {

        for (var i = 0; i < Object.keys(data).length; i++) {
            var content = document.getElementById('content'),
                fragment = document.createDocumentFragment(),
                outerDiv = document.createElement('div'),
                innerDiv = document.createElement('div'),
                img1 = document.createElement('img'),
                img2 = document.createElement('img'),
                h5 = document.createElement('h5'),
                h6 = document.createElement('h6'),
                p = document.createElement('p');
                
            outerDiv.className = "card";
            //outerDiv.classList.add('p' + data[i].Priority);
            outerDiv.classList.add()
            innerDiv.className = "card-body";
            h5.className = "card-title";
            h5.textContent = data[i].Category;
            h6.className = "card-subtitle";
            h6.textContent = app.ts(app.strip(data[i].Subject));
            p.className = "card-text";
            p.textContent = data[i].CreatedDateTime; //data[i].Symptom;
            img1.src = "img/p1.png";  
            img2.src = "img/p2.png"; 
            
            fragment.appendChild(outerDiv);
            outerDiv.appendChild(innerDiv);
            innerDiv.appendChild(h5);
            innerDiv.appendChild(h6);
            innerDiv.appendChild(p);
            
            if (data[i].Priority == 1) {
                outerDiv.classList.add('p1');                
                innerDiv.appendChild(img1);
            }

            if (data[i].Priority == 2) {
                outerDiv.classList.add('p2');
                innerDiv.appendChild(img2);
            }

            content.appendChild(fragment);
        }
    };

    return {
        makeTicket: makeTicket
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
