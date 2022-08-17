function ktrim(str) {
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function StripTags(s) {
    return s.replace("<", "&lt").replace(">", "&gt");
}

//숫자 타입에서 쓸 수 있도록 format() 함수 추가
Number.prototype.format = function(){
    if(this==0) return 0;
 
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');
 
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
 
    return n;
};
 
// 문자열 타입에서 쓸 수 있도록 format() 함수 추가
String.prototype.format = function(){
    var num = parseFloat(this);
    if( isNaN(num) ) return "0";
 
    return num.format();
};

function makecm(arg){
    return arg.format();
}

function chkmn(str)
{
    var kum=str;
    var i=0,j=kum.length-4;

    if (kum.length > 8)
    {
       for (i=0;i < 4;i++,j--)
       {
           if (kum.substring(j,j-1) !='0') return true;
       }

       return false;
    }

    return true;
}

// zeronull 2000. 5. 11 추가
function num2han(arg)
{
    var str=arg+'';
    var kum=str; var ret=''; var tmp='';
    var i=0,j=0,k=0;
    var kum1=new Array();
    var kum2=new Array();
    kum2[0]="원"; kum2[1]="십"; kum2[2]="백"; kum2[3]="천"; kum2[4]="만";
    kum2[5]="십"; kum2[6]="백"; kum2[7]="천"; kum2[8]="억"; kum2[9]="십";
    kum2[10]="백";kum2[11]="천";
    kum1[0]=""; kum1[1]="일"; kum1[2]="이"; kum1[3]="삼"; kum1[4]="사";
    kum1[5]="오"; kum1[6]="육"; kum1[7]="칠"; kum1[8]="팔"; kum1[9]="구";

    if (kum.length > 12)
    {
       alert("정확한 금액이 아님니다");
       return false;
    }

    for (i=kum.length,j=0;i > 0;i--,j++)
    {
        tmp=kum.substring(i,i-1);
        if ((j==4 && tmp=='0' && chkmn(kum)) || (j==8 && tmp=='0') || (tmp != '0' || j == 0))
           ret= kum2[j]+ ret;
        if (((j % 4)==0 || tmp !='1') || (i-1 == 0 && tmp != '1'))
           ret= kum1[tmp]+ ret;
    }

    return ret;

}

//str이 null, undefined, NaN, 공백("") 이면 true
function fIsNull(str) {
 	if (str+"" == "undefined" || str+"" == "NaN" || str+"" == "null" || str+"" == "")
 		return true;
	return false;
}

function clearcm(arg)
{

    var str= arg+'';
    var ret='';
    var chr;

    for(var i = 0; i < str.length; i++)
    {
       chr = str.substr(i,1);

       if (!(chr < '0' || chr > '9' || (i==0 && chr=='0')))
       {
          ret= ret + chr;
       }

    }

    return ret;
}

//input 필드 객체(obj)의 값이 정수(0~9)만 입력하였는지 확인
function fIsNum(obj) {
	var str = obj.value;
	return fIsNumStr(obj.value);
}
//문자열(str)이 (0-9)만으로 이루어졌는지 체크
function fIsNumStr(str) {
	if(fIsNull(str)) return false;
	
	var temp = "";
	var n = String(str);
	var len = n.length;
	var pos = 0;
		var ch = '';
	
	while (pos < len) {
		ch = n.charAt(pos);
		if ((ch >= '0') && (ch <= '9')) {
			temp = temp + ch;
		}else{
			return false;
		}
		pos = pos + 1;
	}
	return true;
}

//input 필드 객체(obj)의 값이 올바른 email포맷이면 true
function fIsEmail( obj ) {
    var deny_pattern = /[^(--a-zA-Z0-9"@.")]/;
    if (deny_pattern.test(obj.value)) return false;

	var str = "";
	if (typeof obj=="object") str = obj.value;
	else			  str = obj;

	if(fIsNull(str)) return false;	//공백이라면

	var isValid = true;
	str += "";

	namestr = str.substring(0, str.indexOf("@"));  // everything before the '@'
	domainstr = str.substring(str.indexOf("@")+1, str.length); // everything after the '@'

	// Rules : @앞에 글자가 있어야 하며, 도메인부분엔 반드시 "." 이 있어야 하며,
	//				@와 . 이 연속해서 올 수 없고, 마지막 글자는 반드시 영문이어야 한다.
   	if (fIsBlank(obj) || (namestr.length == 0) ||
			(domainstr.indexOf(".") <= 0) ||
			(domainstr.indexOf("@") != -1) ||
			!(	(str.charAt(str.length-1) >= 'a' && str.charAt(str.length-1) <= 'z') || (str.charAt(str.length-1) >= 'A' && str.charAt(str.length-1) <= 'Z')	)
	){
			isValid = false;
	}
   	return isValid;
}

//input 필드 객체(obj)의 값이 blank이면 true
function fIsBlank( obj ) {
	var str = obj.value;
	return fIsNull(str);
}



//input 필드 객체(obj)의 값이 올바른 범위의 소숫자리이면 true
function fIsSosu(obj,num) {
	fDelRLSpace(obj); //양쪽 공백제거
	var str = obj.value;
	var strlen = obj.value.length;
	var dotNum = 0;
	var idx = str.indexOf(".");

	 // '.' 이 한개 이상 입력하는지 체크
	for(i=0; i<strlen; i++){
		if(str.charAt(i) == '.') dotNum++;
	}

	if(dotNum > 1) return false;
	if(idx > -1){
		if(str.substring(idx+1).length > num || str.substring(idx+1).length==0) {
			return false;
		}
	}
	chk1 = /[^0-9"."]/;  //0-9와 '.'이외의 문자가 있는지 확인
	if(chk1.test(str)) {
		return false;
 	}
	return true;
}

//input 필드 객체(obj)의 값이 올바른 패스워드포맷이면 true
function fIsPasswd(obj) {
	fDelRLSpace(obj); //양쪽 공백제거
	var str = obj.value;
	chk1 = /^[a-z\d]{6,12}$/i;  //a-z와 0-9이외의 문자가 있는지 확인
	chk2 = /[a-z]/i;  //적어도 한개의 a-z 확인
	chk3 = /\d/;  //적어도 한개의 0-9 확인
	return chk1.test(str) && chk2.test(str) && chk3.test(str);
}

//19000909형태, 1900-09-09형태의 날짜(str)가  올바른 날짜인지 체크
function fIsDate(str) {
	if(fIsNull(str)) return false;	//공백이라면

	var valid = true;
	var msg="";
	str =  fRmString(str, "-");
	var birth = str;
	var yyyy = birth.substring(0,4);
	var mm = birth.substring(4,6);
	var dd = birth.substring(6,8);

	
	if ( birth.length != 8 || !fIsNumStr(birth) ) {
		//alert("올바른 일자형식이 아닙니다.\n예) 20040101");
		return false;
	}

	if (!(yyyy.substring(0,2)=="19" || yyyy.substring(0,2)=="20" || yyyy.substring(0,4)=="9999")) {
		//msg+="년 입력오류!\n";
		valid= false;
	}

	if (mm > 12 || mm < 1) {
		//msg+="월 입력오류! (1~12)\n";
		valid =  false;
	}

	var chkdt = new Date( yyyy, mm-1, dd );
	if( chkdt.getFullYear() > 1900 && (chkdt.getFullYear() != yyyy || chkdt.getMonth() != (mm-1) || chkdt.getDate() != dd) ){
		//alert( msg+"날짜의 입력이 잘못되었습니다.");
		return false;
	}
	else if( chkdt.getFullYear() < 1900 && ( chkdt.getFullYear() != yyyy.substring(2) || chkdt.getMonth() != (mm-1) || chkdt.getDate() != dd )){
		//alert( msg+"날짜의 입력이 잘못되었습니다."); 
		return false;
	}
	return true;
}


//190009형태, 1900-09형태의 날짜(str)가  올바른 년월인지 체크
function fIsDateYM(str) {
	if(fIsNull(str)) return false;	//공백이라면

	var valid = true;
	var msg="";
	var birth = fRmString(str, "-");
	var yyyy = birth.substring(0,4);
	var mm = birth.substring(4,6);

	if ((fIsNull(birth) || birth.length != 6) || !fIsNumStr(birth)) {
		//alert("올바른 년월형식이 아닙니다.\n예) 200401");
		return false;
	}

	if (!(yyyy.substring(0,2)=="19" || yyyy.substring(0,2)=="20")) {
		msg+="년 입력오류!\n";
		valid= false;
	}

	if (mm > 12 || mm < 1) {
		msg+="월 입력오류! (1~12)\n";
		valid =  false;
	}

	if (valid==false) alert(msg);

	return valid;
}
//경매 등록 부분하고 같다. 같이 동기화 해야 함.
function selectDeliveryres(type)
{
	var f = document.itemForm;

    // 무료 일때만 배송비용을 입력안해도 됨


    // 우표일때 착불이 선택 안되도록
    if (f.deliverytype[1].checked==true)
    {

        f.deliveryres[1].disabled=true;
    }
    else
    {
        f.deliveryres[1].disabled=false;
    }


    if (f.deliveryres[2].checked==true)
    {
        f.deliverymoneybf.readOnly = true;
		f.deliverymoneybf.style.background="silver";
		f.deliverymoneybf.style.color="silver";
        f.deliverymoneybf.value="0";
        regInputUpKey3(1);

        f.deliverymoneyaf.readOnly = true;
		f.deliverymoneyaf.style.background="silver";
		f.deliverymoneyaf.style.color="silver";
        f.deliverymoneyaf.value="0";
        regInputUpKey3(2);
    }
    else if (f.deliveryres[0].checked==true) // 선결제/착불
    {

        f.deliverymoneybf.readOnly = false;

        if (f.deliverymoneybf.value=="0") f.deliverymoneybf.value="";
		f.deliverymoneybf.style.background="white";
		f.deliverymoneybf.style.color="black";
        if (type==1) f.deliverymoneybf.focus();
        // 우편이라면
        if (f.deliverytype[1].checked==true)
        {
            // 착불 비활성화
            f.deliveryres[1].disabled=true;
            f.deliverymoneyaf.readOnly = true;
            f.deliverymoneyaf.style.background="silver";
            f.deliverymoneyaf.style.color="silver";
            f.deliverymoneyaf.value="0";
            regInputUpKey3(2);

        }
        else // 착불 활성화
        {
            f.deliverymoneyaf.readOnly = false;

            if (f.deliverymoneyaf.value=="0") f.deliverymoneyaf.value="";
            f.deliverymoneyaf.style.background="white";
            f.deliverymoneyaf.style.color="black";

        }

    }
    else if (f.deliveryres[1].checked==true)  // 착불
    {

        f.deliverymoneybf.readOnly = true;
		f.deliverymoneybf.style.background="silver";
		f.deliverymoneybf.style.color="silver";
        f.deliverymoneybf.value="0";
        regInputUpKey3(1);

        f.deliverymoneyaf.readOnly = false;

        if (f.deliverymoneyaf.value=="0") f.deliverymoneyaf.value="";
		f.deliverymoneyaf.style.background="white";
		f.deliverymoneyaf.style.color="black";
        if (type==1) f.deliverymoneyaf.focus();

    }

    return;

}

$(document).ready(function(){
	document.title = "- 코베이옥션 -";
});




/*****
 * 사업자등록번호 체크
 * return : boolean
 * ex) 111-11-11111
 *****/
function check_worknum(resno) {
   fmt = /^\d{3}-\d{2}-\d{5}$/;
   if(!fmt.test(resno)) return false;
   // Check Sum 코드의 유효성 검사


   buf = new Array(10);
   for (i = 0; i < 3; i++) buf[i] = parseInt(resno.charAt(i));
   for (i = 3; i < 5; i++) buf[i] = parseInt(resno.charAt(i + 1));
   for (i = 5; i < 10; i++) buf[i] = parseInt(resno.charAt(i + 2));
   multipliers = [1,3,7,1,3,7,1,3,5,1];
   for (i = 0, sum = 0; i < 10; i++){
       if(i==0 || i==9){
           sum += (buf[i] * multipliers[i]);
       }else{
           sum += (buf[i] * multipliers[i]%10);
           if(i==8) sum += Math.floor(buf[i] * multipliers[i] / 10);
       }
   }
   if (sum % 10 != 0) return false;
   return true;
}


/*****
 * 주민등록번호 체크
 * return : boolean
 * ex) 111111-1111111
 * TODO : 주민등록번호 뒷자리 첫번째 자리에 7,8 로 시작하는 주민등록 번호가 있다. 이것은 귀화한 사람에게 발급되는 번호라고 한다
 *    할 수 있다면 체크했으면 좋겠는데 아직은 위의 번호를 가진 사람도 보지 못했거니와 유효성도 같은 방식으로 해야 하는지 알지 못하겠다.
 *****/
function check_regnum(resno){

   // 주민번호의 형태와 7번째 자리(성별) 유효성 검사
   fmt = /^\d{6}-[1234]\d{6}$/;
   if(!fmt.test(resno)) return false;



   // 날짜 유효성 검사
   birthYear   = (resno.charAt(7) <= "2") ? "19" : "20";
   birthYear  += resno.substr(0, 2);
   birthMonth = resno.substr(2, 2) - 1;
   birthDate    = resno.substr(4, 2);
   birth          = new Date(birthYear, birthMonth, birthDate);

   if(birth.getYear() % 100 != resno.substr(0, 2) || birth.getMonth() != birthMonth || birth.getDate() != birthDate) return false;

   // Check Sum 코드의 유효성 검사
   buf = new Array(13);
   for (i = 0; i < 6; i++) buf[i] = parseInt(resno.charAt(i));
   for (i = 6; i < 13; i++) buf[i] = parseInt(resno.charAt(i + 1));

   multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
   for (i = 0, sum = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);

   if((11 - (sum % 11)) % 10 != buf[12]) return false;

   return true;
}


/*****
 * 법인번호 체크
 * return : boolean
 * ex) 111111-1111111
 *****/
function check_corpnum(resno){
   fmt = /^\d{6}-\d{7}$/;
   if(!fmt.test(resno)) return false;
   // Check Sum 코드의 유효성 검사
   buf = new Array(13);
   for (i = 0; i < 6; i++) buf[i] = parseInt(resno.charAt(i));
   for (i = 6; i < 13; i++) buf[i] = parseInt(resno.charAt(i + 1));

   multipliers = [1,2,1,2,1,2,1,2,1,2,1,2];
   for (i = 0, sum = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);
   if(10 - sum.toString().substring(sum.toString().length*1 - 1,sum.toString().length*1)*1 != buf[12]) return false;

   return true;
}


/**
 * 입력값이 특정 문자(chars)만으로 되어있는지 체크
 * 특정 문자만 허용하려 할 때 사용
 * ex) if (!hasCharsOnly(form.blood,"ABO")) {
 *         alert("혈액형 필드에는 A,B,O 문자만 사용할 수 있습니다.");
 *     }
 */
function hasCharsOnly(input,chars) {

    for (var inx = 0; inx < input.length; inx++) {
       if (chars.indexOf(input.charAt(inx)) == -1){

           return false;
       }
    }
    return true;
}

/**
 * 입력값이 사용자가 정의한 포맷 형식인지 체크
 * 자세한 format 형식은 자바스크립트의 'regular expression'을 참조
 */
function isValidFormat(input,format) {
    if (input.search(format) != -1) {
        return true; //올바른 포맷 형식
    }
    return false;
}

function isPhoneNum(input){
	var chars = "-0123456789";
	if(!hasCharsOnly(input,chars))
	{
		return false;
	}
	else
		return true;
}

function isValidEmail(input) {
	if (input=="") {
		return true;
	}else{
		var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
		return isValidFormat(input,format);
	}
}

function fisallnum(arg)
{
    var str=arg+'';

    for (var i = 0; i < str.length; i++)
    {
        if  (str.charAt(i) < '0' || str.charAt(i) > '9')
            return false;
    }

    return true;

}

var window_left = (screen.width-640)/2;
var window_top = 50;

function popup_window(name, url, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable)
{
    var thisX = width;
    var thisY = height;
    var maxThisX = screen.width - 50;
    var maxThisY = screen.height - 50;
    
    var marginY = 0;

    if (navigator.userAgent.indexOf("MSIE 6") > 0) marginY = 60;        // IE 6.x
    else if(navigator.userAgent.indexOf("MSIE 7") > 0) marginY = 80;    // IE 7.x
    else if(navigator.userAgent.indexOf("Firefox") > 0) marginY = 50;   // FF
    else if(navigator.userAgent.indexOf("Opera") > 0) marginY = 30;     // Opera
    else if(navigator.userAgent.indexOf("Netscape") > 0) marginY = -2;  // Netscape
    else if(navigator.userAgent.indexOf("Chrome") > 0) marginY = 20;  // Chrome
    
    if (thisX > maxThisX) {
        window.document.body.scroll = "yes";
        thisX = maxThisX;
    }
    if (thisY > maxThisY - marginY) {
        window.document.body.scroll = "yes";
        thisX += 19;
        thisY = maxThisY - marginY;
    }
    
    thisX = thisX+10;
    thisY = thisY+marginY;

    toolbar_str = toolbar ? 'yes' : 'no';
    menubar_str = menubar ? 'yes' : 'no';
    statusbar_str = statusbar ? 'yes' : 'no';
    scrollbar_str = scrollbar ? 'yes' : 'no';
    resizable_str = resizable ? 'yes' : 'no';

    var pop=window.open(url, name, 'left='+left+'px,top='+top+'px,width='+thisX+'px,height='+thisY+'px,toolbar='+toolbar_str+',menubar='+menubar_str+',status='+statusbar_str+',scrollbars='+scrollbar_str+',resizable='+resizable_str);
    pop.focus();
    return pop;
}


function null2string(obj) {
	if(typeof obj == "undefined") {
		return "";
	}else {
		return obj;
	}
}

function setCookie_pop(name, value, expiredDay) {
	var todate = new Date();
	todate.setDate(todate.getDate()+expiredDay);
	document.cookie = name + "=" + escape(value) + "; path=/; expires="+todate.toGMTString();
}

function getCookie_pop(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
    
}

//한글키로 변환
function imeModeChange(f)
{
    if (f.style.imeMode != "active")
    {
        f.style.imeMode = "active";
    }
}

//특수문자 입력 제한
function checkKeyCode(){
	console.log(event.keyCode);
	if ((event.keyCode >= 34 && event.keyCode <= 39) 
			|| event.keyCode == 42 || event.keyCode == 60 || event.keyCode == 61 || event.keyCode == 62
			|| event.keyCode == 64 || event.keyCode == 94 || event.keyCode == 126|| event.keyCode == 92 
			|| event.keyCode == 33 || event.keyCode == 95 || event.keyCode == 125|| event.keyCode == 124
			|| event.keyCode == 40 || event.keyCode == 41 || event.keyCode == 43 || event.keyCode == 45
			|| event.keyCode == 123 || event.keyCode == 63 || event.keyCode == 58 || event.keyCode == 59 ) {
		alert("특수문자(~,!,(,),_,+,{,},:,;,/,?,@,#,$,%,^,&,*,<,>)는 입력 불가합니다.");
		event.returnValue = false;
		return false;
	}
}


function trim2(arg)
{
    var str= arg+'';
    var ret='';
    var chr;

    for(var i = 0; i < str.length; i++)
    {
       chr = str.substr(i,1);

       if (!(chr < ' '))
       {
          ret= ret + chr;
       }

    }
    return ret;
}
