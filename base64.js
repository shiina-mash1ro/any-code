const base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const base64Flip = {"0":52,"1":53,"2":54,"3":55,"4":56,"5":57,"6":58,"7":59,"8":60,"9":61,"A":0,"B":1,"C":2,"D":3,"E":4,"F":5,"G":6,"H":7,"I":8,"J":9,"K":10,"L":11,"M":12,"N":13,"O":14,"P":15,"Q":16,"R":17,"S":18,"T":19,"U":20,"V":21,"W":22,"X":23,"Y":24,"Z":25,"a":26,"b":27,"c":28,"d":29,"e":30,"f":31,"g":32,"h":33,"i":34,"j":35,"k":36,"l":37,"m":38,"n":39,"o":40,"p":41,"q":42,"r":43,"s":44,"t":45,"u":46,"v":47,"w":48,"x":49,"y":50,"z":51,"-":62,"_":63};

function decTo64(dec){
    let result = '';
    do {
        let characterValue = (dec % 63);
        dec = (dec - characterValue) / 63;
        result = base64[characterValue] + result;
    }while(dec > 0);
    return result;
}

function decFrom64(b64){
    let dec = base64Flip[b64[b64.length -1]];
    for(let i = b64.length - 2, j = 1; i >= 0; i--, j++){
        dec += base64Flip[b64[i]] * ( 63 ** j );
    }
    return dec;
}
