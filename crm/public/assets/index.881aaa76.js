const n=(t,o,s)=>{const e=new Date;e.setTime(e.getTime()+s*60*60*1e3);const i="expires="+e.toUTCString();document.cookie=t+"="+o+";"+i+";path=/"};export{n as s};
