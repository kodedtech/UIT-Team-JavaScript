document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);
let timer ;

function theDomHasLoaded(e) {
    let buttonStart = document.getElementById('start');
    let buttonStop = document.getElementById('stop');
    let buttonSort = document.getElementById('sort');

    buttonStart.onclick = function(e) {     
        e.stopImmediatePropagation();
        buttonStart.disabled = true;

        timer = setInterval(randomData, 1000);

        function randomData() {
            let shuffledData = shuffle(TABLE_DATA);   
            loadData(shuffledData);
        }
    };

    buttonStop.onclick = function(e) {
        buttonStart.disabled = false;
        clearInterval(timer);        
    };

    buttonSort.onclick = function() {
        let sortedData = TABLE_DATA.sortAscBy("id");
        let sortedData_ = sortedData.sortDescBy("price");        
        loadData(sortedData_);
    };
}

function loadData(data) {
    let tableRef = document.getElementsByClassName("table")[0].getElementsByTagName('tbody')[0];

    while(tableRef.hasChildNodes())
    {
        tableRef.removeChild(tableRef.firstChild);
    }
    const lengthCells = 4;
    const lengthData = TABLE_DATA.length;

    for (let i = 0; i < lengthData; i++) {
        let newRow   = tableRef.insertRow(tableRef.rows.length);
        let cellId  = newRow.insertCell(0);
        let cellImage = newRow.insertCell(1);
        let cellName  = newRow.insertCell(2);
        let cellPrice  = newRow.insertCell(3);        

        let DOM_img = document.createElement("img");
        DOM_img.src = data[i].thumbnailUrl;

        let id  = document.createTextNode(data[i].id);
        // let image  = document.createTextNode(DOM_img);
        let name  = document.createTextNode(data[i].name);
        let price  = document.createTextNode(data[i].price);

        cellId.appendChild(id);
        cellImage.appendChild(DOM_img);
        cellName.appendChild(name);
        cellPrice.appendChild(price);
    }
}

Array.prototype.sortAscBy = function(p) {
    return this.slice(0).sort(function(a, b) {
        let x = parseInt(a[p]);
        let y = parseInt(b[p]);

        if (x > y) {
            return 1;
        } else if(x < y) {
            return -1
        } else {
            return 0;
        }
        
    });
}
Array.prototype.sortDescBy = function(p) {
    return this.slice(0).sort(function(a, b) {
        let x = parseInt(a[p]);
        let y = parseInt(b[p]);

        if (x > y) {
            return -1;
        } else if(x < y) {
            return 1
        } else {
            return 0;
        }
        
    });
}

function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);

        counter--;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}