import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as h,u as p,i as y}from"./assets/vendor-D8bAVsIk.js";let l;const n=document.querySelector(".button-start"),u=document.getElementById("datetime-picker"),g=document.querySelector("[data-days]"),S=document.querySelector("[data-hours]"),C=document.querySelector("[data-minutes]"),D=document.querySelector("[data-seconds]");n.addEventListener("click",b);function b(){n.disabled=!0,u.disabled=!0;const t=setInterval(()=>{const e=l-Date.now();if(e<0){clearInterval(t),u.disabled=!1;return}const s=r(e);console.log("playCountDown  timePreiodArray:",s);const{days:i,hours:d,minutes:a,seconds:c}=s;g.textContent=o(i),S.textContent=o(d),C.textContent=o(a),D.textContent=o(c)},1e3)}const w={locale:p.Ukrainian,dateFormat:"d F Y H:i",enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const e=new Date(t[0]).getTime();if(e<Date.now()){console.log("Ти обрав минуле!"),y.show({message:"Please choose a date in the future",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",iconUrl:"./img/Group.svg",iconColor:"#FAFAFB",title:"Error",titleColor:"#fff",borderRadius:"4px"}),n.disabled=!0;return}n.disabled=!1,l=e}};function r(t){const a=Math.floor(t/864e5),c=Math.floor(t%864e5/36e5),m=Math.floor(t%864e5%36e5/6e4),f=Math.floor(t%864e5%36e5%6e4/1e3);return{days:a,hours:c,minutes:m,seconds:f}}console.log(r(2e3));console.log(r(14e4));console.log(r(2414e4));function o(t){return t.toString().length===1?t.toString().padStart(2,0):t.toString()}h("#datetime-picker",w);
//# sourceMappingURL=1-timer.js.map
