function e(e,t,i){return Math.max(t,Math.min(e,i))}function t([e,t],[i,n]){return Math.sqrt((i-e)**2+(n-t)**2)}function i(e,t){const i=Math.max(t.origin[0]-e[0],0,e[0]-(t.origin[0]+t.size[0])),n=Math.max(t.origin[1]-e[1],0,e[1]-(t.origin[1]+t.size[1]));return Math.sqrt(i**2+n**2)}const n={},o={position:null,isDown:!1};let r,s;const a=document.querySelector(".canvas"),l=a.getContext("2d"),d=[{center:[500,200],radius:50,color:"#F08080"},{center:[800,100],radius:100,color:"#FFF176"},{center:[100,300],radius:80,color:"#D8BFD8"},{center:[150,50],radius:40,color:"#A5D6A7"},{center:[500,800],radius:120,color:"#880E4F"},{center:[190,600],radius:70,color:"#0097A7"},{origin:[450,300],size:[90,160],color:"#0D2FC9"}],c={position:null,angle:null,directionVector:null,move(){let[t,i]=this.position;if(n.arrowup||n.arrowdown){const[e,o]=this.directionVector,r=5*(n.arrowup?1:-1);[t,i]=[t+r*e,i+r*o]}else n.w?i-=5:n.s&&(i+=5),n.a?t-=5:n.d&&(t+=5);t=e(t,0,a.width),i=e(i,0,a.height),this.updatePosition([t,i])},rotate(){const e=1*(Math.PI/180);o.isDown?c.updateAngle(function([e,t],[i,n]){return[i-e,n-t]}(this.position,o.position)):n.arrowright?c.updateAngle(this.angle-e):n.arrowleft&&c.updateAngle(this.angle+e)},updateAngle(e){Array.isArray(e)&&(e=Math.atan2(1,0)-Math.atan2(e[1],e[0])),this.angle=e,this.directionVector=[Math.sin(e),Math.cos(e)]},updatePosition(e){d.some((n=>{if(n.radius){const{center:i,radius:o}=n;return t(i,e)<=o}return!!n.size&&i(e,n)<=0}))||(this.position=e)}},h={segments:[],collidedObject:null,getClosestObstacle:e=>d.reduce(((n,o)=>{const r=o.radius?function([e,i],{center:[n,o],radius:r}){return t([n,o],[e,i])-r}(e,o):i(e,o);return r<n[1]&&(n=[o,r]),n}),[null,Number.MAX_SAFE_INTEGER]),getSegments(e,t){this.segments=[];const i=t;let[n,o]=this.getClosestObstacle(e),r=e;this.segments.push([r,o]);for(let e=0;o>1e-4&&o<=s&&e<250;e++)r=[r[0]+o*i[0],r[1]+o*i[1]],[n,o]=this.getClosestObstacle(r),this.segments.push([r,o]);this.collidedObject=o<.1?n:null},getCollisionPoint(){return this.segments[this.segments.length-1][0]},render(){l.lineWidth=2,this.segments.forEach((([e,t])=>{l.beginPath(),l.strokeStyle="rgba(255,255,255,0.1)",this.collidedObject?(l.globalAlpha=.2,l.fillStyle=this.collidedObject.color):l.fillStyle="rgba(255,255,255,0.08)",l.arc(...e,t,10,0,2*Math.PI),l.stroke(),l.fill(),l.globalAlpha=1,l.beginPath(),l.fillStyle="rgba(255,255,255,0.4)",l.arc(...e,3,0,2*Math.PI),l.fill()})),l.beginPath(),l.moveTo(...c.position),l.lineTo(...this.getCollisionPoint()),l.stroke(),l.lineWidth=1}},u=()=>{var e;r=window.requestAnimationFrame(u),l.fillStyle="#121212",l.fillRect(0,0,a.width,a.height),c.move(),c.rotate(),h.getSegments(c.position,c.directionVector),l.fillStyle="rgba(255,255,255,0.2)",d.forEach((e=>{l.beginPath(),e.radius?l.arc(...e.center,e.radius,0,2*Math.PI):e.size&&l.fillRect(...e.origin,...e.size),l.fill()})),l.font="18px monospace",o.position&&c.angle&&l.fillText(`mouse: [${o.position[0]},${o.position[1]}]  angle: ${(e=c.angle,e*(180/Math.PI)).toFixed(0)}º`,5,18),h.render()};(()=>{const e=()=>(a.width=window.innerWidth,a.height=window.innerHeight,s=Math.sqrt(a.width**2+a.height**2),e);e(),window.addEventListener("resize",e),window.addEventListener("keyup",(e=>{delete n[e.key.toLowerCase()]," "!==e.key&&"Space"!==e.code||(r?(cancelAnimationFrame(r),r=null):r=requestAnimationFrame(u))})),window.addEventListener("keydown",(e=>{const t=e.key.toLowerCase();n[t]=!0,(e=>"w"===e||"s"===e||"d"===e||"a"===e||"arrowleft"===e||"arrowright"===e||"arrowup"===e||"arrowdown"===e)(t)&&e.preventDefault()})),a.addEventListener("mousemove",(e=>{o.position=[e.clientX,e.clientY]})),a.addEventListener("mouseup",(()=>{o.isDown=!1})),a.addEventListener("mousedown",(()=>{o.isDown=!0})),c.updatePosition([20,20]),c.updateAngle(0),r=window.requestAnimationFrame(u)})();
