function submit() {
   let frm = document.forms['survey'];
   const errorText = "을(를) 입력해주세요"
   arrKey = ["team", "rank", "name", "phone", "email", "address"];
   arrName = ["소속", "직급", "이름", "핸드폰번호", "이메일", "주소"];
   let arrlen = arrKey.length;
   for(i = 0; i < arrlen; i++) {
      if(!frm[arrKey[i]].value.trim()) {
         frm[arrKey[i]].focus();
         alert(arrName[i] + errorText);
         return false;
      }
   }
   let emailPat = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
   if(!emailPat.test(frm["email"].value)){
      frm["email"].focus();
      alert("잘못된 이메일입니다");
      return false;
   }
   let phonePat = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
   if(!phonePat.test(frm["phone"].value)){
      frm["phone"].focus();
      alert("잘못된 전화번호입니다");
      return false;
   }
   if (!periodValid(frm)) {
      frm["yearP1"].focus();
      alert("잘못된 기간입니다");
      return false;
   }
   let myjson = 
   {
      "team":frm["team"].value,
      "rank":frm["rank"].value,
      "name":frm["name"].value,
      "phone":frm["phone"].value,
      "email":frm["email"].value,
      "address":frm["address"].value,
      "symptom":getSymptom(),
      "feverDate":returnDate(frm, "F"),
      /*
      {
         "year":frm["yearF"].value,
         "mon":frm["monF"].value,
         "day":frm["dayF"].value,
      },
      */
      "symptomDate":returnDate(frm, ""),
      /*
      {
         "year":frm["year"].value,
         "mon":frm["mon"].value,
         "day":frm["day"].value,
      },
      */
      "place":frm["place"].value,
      "inmate":{
         "exist":frm["inmate"].value,
         "who":frm["who"].value,
      },
      "Period":{
         "period1":returnDate(frm, "P1"),
         "period2":returnDate(frm, "P2"),
         /*
         "year1":frm["yearP1"].value,
         "mon1":frm["monP1"].value,
         "day1":frm["dayP1"].value,
         "year2":frm["yearP2"].value,
         "mon2":frm["monP2"].value,
         "day2":frm["dayP2"].value,
         */
      },
      "note":frm["note"].value,
   }
   let str = JSON.stringify(myjson);

   let result = document.createElement("form");
   result.method = 'GET';
   result.action= "https://www.w3schools.com/action_page.php";
   
   let input = document.createElement("input");
   input.setAttribute("name", "result");
   input.setAttribute("value", str);
   result.appendChild(input);
   document.body.appendChild(result);

   result.submit();
}
function getSymptom() {
   let val = document.querySelectorAll('input[type=checkbox][name=symptom]:checked');
   let sJson = [];
   val.forEach(function(data) {
      sJson.push(data.value);
   });
   return sJson;
}
function periodValid(frm) {
   if (returnDate(frm, "P1") > returnDate(frm, "P2")) return false;
   else return true;
}
function returnDate(frm, n) {
   let period = "";
   period += frm[`year${n}`].value;
   if (frm[`mon${n}`].value < 10) period += "0"+ frm[`mon${n}`].value;
   else period += frm[`mon${n}`].value;
   if (frm[`day${n}`].value < 10) period += "0"+ frm[`day${n}`].value;
   else period += frm[`day${n}`].value;
   return parseInt(period);
}