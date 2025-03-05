butt.onclick = function() {
    var val_Tp = document.getElementById('input-1').value;
    var val_Yp = document.getElementById('input-2').value;
    var val_Br = document.getElementById('input-3').value;
    var result = (val_Br*0.3)*(val_Yp/val_Tp);
    document.getElementById('str').innerHTML=result.toFixed(2) + ' TOKENS';
};