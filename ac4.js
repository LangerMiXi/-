//密码，后端的由集中配置控制，尽量保证各环境一致
var zxlogin_secret = "iflytzhixueweb";

//rc4算法
function rc4( data, key){
  var seq = Array(256);//int
  var das = Array(data.length);//code of data
  var i = 0;
  var j = 0;
  for(var i = 0; i<256; i++ ){
    seq[i] = i;
  }
  for (var i=0; i<256; i++){
    j=(j+seq[i]+key.charCodeAt(i % key.length)) % 256;
    var temp = seq[i];
    seq[i] = seq[j];
    seq[j] = temp;
  }
  for(var i=0; i<data.length; i++){
    das[i] = data.charCodeAt(i)
  }
  i = 0;
  j = 0;
  for(var x = 0; x < das.length; x++)
  {
    var i = (i+1) % 256;
    var j = (j+seq[i]) % 256;
    var temp = seq[i];
    seq[i] = seq[j];
    seq[j] = temp;
    var k = (seq[i] + (seq[j] % 256)) % 256;
    das[x] = String.fromCharCode( das[x] ^ seq[k]) ;
  }
  return das.join('');
}

//字符串转16进制字符串，适配后端接口，且可以解决编码问题
function toHexString(str) {
  var hexStr = '';
  for(var i = 0;i<str.length;i++){
    if(str.charCodeAt(i).toString(10)<16){//加上前导0
      var charTmp = '0'+str.charCodeAt(i).toString(16);
      hexStr += charTmp;
    }else{
      hexStr += str.charCodeAt(i).toString(16)
    }
  }
  return hexStr;
}function lll(txtPassword){
	var a=toHexString(rc4(txtPassword, "iflytzhixueweb"));
	return a;
}
