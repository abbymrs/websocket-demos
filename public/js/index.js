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
        console.log(e.data);
        let div = document.createElement('div');
        div.innerHTML = e.data;
        document.body.append(div);
    };
    fetch('http://localhost:8000/cors', {
        mode: 'cors'
    })
        .then(res => res.text())
        .then(data => {
            // console.log(data);
            document.body.innerHTML += data;
            data.replace(/\<script src=\"(.*?)\"\>\<\/script\>/g, function (a, v) {
                if (v) {
                    var s = document.createElement('script');
                    s.src = 'http://localhost:8000'+ v;
                    document.body.append(s);
                }
            });
        })
        .then(err => {
            if (err) console.log(err);
        });
    
    setTimeout(()=>{
    connect.send('hello');        
    },2000);
}

