// Filter box for a guide's quick-reference table: hides non-matching rows and empty group headers.
(()=>{
  const q=document.getElementById("q");if(!q)return;
  const rows=[...document.querySelectorAll("#ref tbody tr")];
  const none=document.createElement("tr");none.className="nomatch";none.hidden=true;
  none.innerHTML='<td colspan="4">No matches. Try a shorter word, or search the whole page.</td>';
  document.querySelector("#ref tbody").append(none);
  q.addEventListener("input",()=>{
    const v=q.value.trim().toLowerCase();let grp=null,shown=0;
    rows.forEach(r=>{
      if(r.classList.contains("grp")){if(grp)grp.hidden=!!v&&!shown;grp=r;shown=0;return}
      const ok=!v||r.textContent.toLowerCase().includes(v);r.hidden=!ok;if(ok)shown++;
    });
    if(grp)grp.hidden=!!v&&!shown;
    none.hidden=!v||rows.some(r=>!r.hidden&&!r.classList.contains("grp"));
  });
})();
