import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as c,u as l}from"./assets/vendor-DXPcFomS.js";const i={locale:l.Ukrainian,dateFormat:"d F Y H:i",enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(o){const e=new Date(o[0]).getTime();if(e<Date.now()){console.log("Ти обрав минуле!");return}console.log("onClose  unixDate:",e),console.log("onClose  Date:",new Date().getTime()),console.log("onClose  Number:",e)}};function t(o){const n=Math.floor(o/864e5),s=Math.floor(o%864e5/36e5),a=Math.floor(o%864e5%36e5/6e4),r=Math.floor(o%864e5%36e5%6e4/1e3);return{days:n,hours:s,minutes:a,seconds:r}}console.log(t(2e3));console.log(t(14e4));console.log(t(2414e4));c("#datetime-picker",i);
//# sourceMappingURL=1-timer.js.map
