if (window.WebSocket != undefined) {
    let connect = new WebSocket('ws://127.0.0.1:5000');

    connect.onopen = function (e) {
        console.log(e);
        console.log('connected!');
    };
    connect.onclose = function (e) {
        console.log('close');
    };
    connect.onerror = (e) => {
        console.log('Error: ' + e.data);
    };
    connect.onmessage = (e) => {
        let data = JSON.parse(e.data).data;
        let dialogWrap = document.querySelector('.dialogue');
        let str = "";
        for (let i = 0; i < data.length; i++) {
            let res = JSON.parse(data[i]);
            str += `<div class="dia-wrap"><time class="time">${res.time}</time><p class="content">${res.msg}</p></div>`;
        }
        dialogWrap.innerHTML = str;
    };

    let btn = document.querySelector('#btn-send');

    btn.onclick = function (e) {
        sendMsg(e);
    };

    document.querySelector('#textInp').onkeyup = function (e) {
        sendMsg(e);
    };
    function sendMsg(e){
        if (e.keyCode == 13) {
            let value = document.querySelector('#textInp').value;
            let data = {
                msg: value,
                time: new Date().toLocaleTimeString()
            }
            connect.send(JSON.stringify(data));
            document.querySelector('#textInp').value = '';
            document.querySelector('#textInp').focus();
        }
    }

}

