import{a as $,S as H,i as o}from"./assets/vendor-Db2TdIkw.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function c(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=c(t);fetch(t.href,r)}})();const I="49742049-be694405c40ea2d5a3f5aa174",O="https://pixabay.com/api/";async function g(e,a=1,c=15){const n={key:I,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:c};return $.get(O,{params:n})}let A=new H(".gallery a",{captionsData:"alt",captionDelay:250});const v=document.querySelector(".gallery"),S=document.querySelector(".loader");function f(e){const a=e.map(({webformatURL:c,largeImageURL:n,tags:t,likes:r,views:d,comments:P,downloads:B})=>`
    <li class="gallery-item">
      <a href="${n}">
        <img src="${c}" class="img" alt="${t}" />
        <ul class="data-list">
          <li class="data-item">
            <p class="data-text">Likes</p>
            <p class="data-value">${r}</p>
          </li>
          <li class="data-item">
            <p class="data-text">Views</p>
            <p class="data-value">${d}</p>
          </li>
          <li class="data-item">
            <p class="data-text">Comments</p>
            <p class="data-value">${P}</p>
          </li>
          <li class="data-item">
            <p class="data-text">Downloads</p>
            <p class="data-value">${B}</p>
          </li>
        </ul>
      </a>
    </li>
  `).join("");v.insertAdjacentHTML("beforeend",a),A.refresh()}function q(){v.innerHTML=""}function w(){S.classList.remove("hidden")}function b(){S.classList.add("hidden")}const M=document.querySelector(".load-more"),h=document.querySelector(".load-message");function y(){M.classList.remove("hidden"),h.classList.add("hidden")}function m(){M.classList.add("hidden")}function x(){h.classList.remove("hidden")}function E(){h.classList.add("hidden")}const p=document.querySelector(".form"),D=document.querySelector(".load-more");let s="",i=1;const l=15;let u=0;const L=localStorage.getItem("query");L&&(s=L,N());p.addEventListener("submit",async e=>{if(e.preventDefault(),s=e.target.elements.text.value.trim(),!s){o.warning({message:"Enter search term!"});return}localStorage.setItem("query",s),i=1,q(),m(),w(),x();try{const{data:a}=await g(s,i,l);if(u=a.totalHits,a.hits.length===0){o.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}f(a.hits),u>l&&y()}catch{o.error({message:"Error fetching images."})}finally{b(),E(),p.reset()}});D.addEventListener("click",async()=>{i+=1,m(),x();try{const{data:e}=await g(s,i,l);f(e.hits),_();const a=Math.ceil(u/l);i>=a?(o.info({message:"We're sorry, but you've reached the end of search results."}),m()):y()}catch{o.error({message:"Error loading more images."})}finally{E()}});function _(){const{height:e}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}async function N(){i=1,q(),m(),w();try{const{data:e}=await g(s,i,l);if(u=e.totalHits,e.hits.length===0){o.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}f(e.hits),u>l&&y()}catch{o.error({message:"Error fetching images."})}finally{b()}}
//# sourceMappingURL=index.js.map
