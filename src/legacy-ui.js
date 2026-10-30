export function initMarvatelUI() {

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const NS='http://www.w3.org/2000/svg';
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2200)}
var go=function(id){$$('.screen').forEach(s=>s.classList.toggle('on',s.id===id));closeDrawer()}
function closeDrawer(){$('#drawer').classList.remove('on');$('#scrim').classList.remove('on')}

/* gambar peta bergaya (tanpa tile eksternal) */
const roads='M0 300C80 280 150 300 230 270S340 250 390 260M60 0C80 120 70 220 110 340S130 460 120 520M250 0C240 100 270 180 250 280S270 420 300 520M0 150C100 160 200 120 390 170M0 420C120 400 260 440 390 400M150 0L200 520';
function base(g){g.innerHTML=`<rect width="390" height="520" fill="var(--map)"/>
<rect x="20" y="40" width="80" height="60" rx="14" fill="var(--green)"/><rect x="270" y="320" width="90" height="70" rx="14" fill="var(--green)"/><rect x="150" y="360" width="60" height="50" rx="12" fill="var(--green)"/>
<path d="M0 230C70 210 120 250 200 225S330 200 390 220" stroke="#9fc6e8" stroke-width="9" fill="none" opacity=".6"/>
<path d="${roads}" stroke="var(--road)" stroke-width="7" fill="none"/><path d="${roads}" stroke="var(--road)" stroke-width="3" fill="none" transform="translate(0 40)" opacity=".7"/>
<text x="150" y="292" font-size="20" font-weight="800" fill="var(--mut)" opacity=".8" font-family="Plus Jakarta Sans">Bandung</text>
<g font-size="9" fill="var(--mut)" font-family="Inter"><text x="30" y="130">Jl. Pasteur</text><text x="260" y="150">Cicendo</text><text x="40" y="360">Pasirkaliki</text><text x="270" y="470">Sukajadi</text></g>`}
const C=[{id:'MV-0941',n:'Toko Sinar Jaya',a:'Jl. Pasteur No. 12, Sukajadi',s:'tunggak',st:'Menunggak 4 Hari',p:'Fiber Biz 50 Mbps',x:170,y:230},
{id:'MV-0712',n:'Warung Bu Ratna',a:'Jl. Cicendo No. 8',s:'aktif',st:'Aktif',p:'Home 20 Mbps',x:240,y:130},
{id:'MV-0533',n:'Sumber Motor',a:'Jl. Pasirkaliki No. 77',s:'off',st:'Nonaktif',p:'Home 10 Mbps',x:310,y:210},
{id:'MV-0620',n:'Hendrawan',a:'Jl. Sukajadi No. 31',s:'aktif',st:'Aktif',p:'Home 30 Mbps',x:290,y:360},
{id:'MV-0388',n:'Klinik Medika',a:'Jl. Dr. Djunjunan No. 5',s:'aktif',st:'Aktif',p:'Fiber Biz 30 Mbps',x:90,y:110},
{id:'MV-0451',n:'Kopi Pasteur',a:'Jl. Pasteur No. 40',s:'tunggak',st:'Menunggak 2 Hari',p:'Home 20 Mbps',x:70,y:380}];
const col={aktif:'#0a6b3c',tunggak:'#7a4300',off:'#6b6f7d'};
let sel=C[0],flt='all',qq='';
base($('#g1'));base($('#g2'));base($('#g3'));
function pins(){const g=$('#g1');$$('#g1 .pin').forEach(e=>e.remove());
 C.filter(c=>(flt==='all'||c.s===flt)&&c.n.toLowerCase().includes(qq)).forEach(c=>{const e=document.createElementNS(NS,'g');e.setAttribute('class','pin');e.setAttribute('tabindex','0');e.setAttribute('role','button');e.setAttribute('aria-label',c.n);
  const big=c===sel;e.innerHTML=`<path transform="translate(${c.x} ${c.y}) scale(${big?1.4:1})" d="M0 0c-4-10-14-14-14-25a14 14 0 0128 0c0 11-10 15-14 25z" fill="${col[c.s]}"/><circle cx="${c.x}" cy="${c.y-25*(big?1.4:1)}" r="5" fill="#fff"/>${big?`<rect x="${c.x-48}" y="${c.y+4}" width="96" height="18" rx="9" fill="#ffe6cf"/><text x="${c.x}" y="${c.y+17}" text-anchor="middle" font-size="10" font-weight="700" fill="#7a4300" font-family="Inter">${c.n}</text>`:''}`;
  const pick=()=>{sel=c;$('#sn').firstChild.textContent=c.n+' ';$('#sid').textContent='(ID: '+c.id+')';$('#sa').textContent=c.a;const s=$('#ss');s.textContent=c.st;s.style.color=c.s==='tunggak'?'var(--warn)':c.s==='aktif'?'var(--ok)':'var(--mut)';$('#sp').textContent=c.p;$('#sheet').classList.add('on');pins()};
  e.onclick=pick;e.onkeydown=k=>{if(k.key==='Enter')pick()};g.appendChild(e)})}
pins();
/* topologi */
(function(){const g=$('#g2'),O={x:195,y:255},P=[[100,170,'ODP-01',1],[290,150,'ODP-02',1],[105,370,'ODP-03',0],[300,370,'ODP-04',1]];let h='';
 P.forEach(([x,y,n,ok],i)=>{[[-30,-20],[24,-26],[-24,28],[30,24]].slice(0,3).forEach(([dx,dy],j)=>{h+=`<path d="M${x} ${y}L${x+dx} ${y+dy}" stroke="var(--mut)" stroke-dasharray="3 3" fill="none"/><circle cx="${x+dx}" cy="${y+dy}" r="6" fill="${ok?'#0a6b3c':'#7a4300'}" stroke="#fff" stroke-width="2"/>`})});
 P.forEach(([x,y])=>h+=`<path d="M${O.x} ${O.y}L${x} ${y}" stroke="#00479b" stroke-width="5" opacity=".95"/>`);
 P.forEach(([x,y,n,ok])=>h+=`<path d="M${x} ${y-13}l12 22h-24z" fill="${ok?'#00479b':'#7a4300'}"/><text x="${x}" y="${y+24}" text-anchor="middle" font-size="10" font-weight="700" fill="${ok?'var(--ink)':'#7a4300'}" font-family="Inter">${n}</text>`);
 h+=`<rect x="${O.x-17}" y="${O.y-17}" width="34" height="34" rx="9" fill="#00479b"/><path d="M${O.x-8} ${O.y+3}h16M${O.x-5} ${O.y-3}a8 8 0 0110 0" stroke="#fff" stroke-width="2" fill="none"/><rect x="${O.x-38}" y="${O.y+22}" width="76" height="20" rx="6" fill="#2a2d3a"/><text x="${O.x}" y="${O.y+36}" text-anchor="middle" font-size="10" fill="#fff" font-weight="600" font-family="Inter">ODC-CCD-01</text>`;g.insertAdjacentHTML('beforeend',h)})();
/* zoom */
const zs={g1:1,g2:1};
$$('.zoom button').forEach(b=>b.onclick=()=>{const g=b.closest('.mapw').querySelector('svg g');const k=g.id;zs[k]=Math.min(2,Math.max(.8,zs[k]+(+b.dataset.z)*.2));g.setAttribute('transform',`translate(${195*(1-zs[k])} ${260*(1-zs[k])}) scale(${zs[k]})`)});
/* login */
$('#eye').onclick=()=>{const p=$('#pwd');p.type=p.type==='password'?'text':'password'};
$('#go').onclick=()=>{const ok=$('#usr').value.trim()&&$('#pwd').value;$('#lerr').style.display=ok?'none':'block';if(ok)go('peta')};
$('#pwd').onkeydown=e=>{if(e.key==='Enter')$('#go').click()};
$('#forgot').onclick=e=>{e.preventDefault();toast('Hubungi admin wilayah untuk mengatur ulang kata sandi.')};
/* peta */
$$('.seg button').forEach(b=>b.onclick=()=>{$$('.seg button').forEach(x=>x.classList.toggle('on',x===b));$$('.view').forEach(v=>v.classList.toggle('on',v.id===b.dataset.v))});
$$('#chips button').forEach(b=>b.onclick=()=>{$$('#chips button').forEach(x=>x.classList.toggle('on',x===b));flt=b.dataset.f;pins()});
$('#q').oninput=e=>{qq=e.target.value.toLowerCase();pins()};
$('#sx').onclick=()=>$('#sheet').classList.remove('on');
$('#det').onclick=()=>toast('Detail '+sel.n+' belum tersedia di prototipe ini.');
$('#rute').onclick=()=>toast('Membuka rute ke '+sel.n+'…');
$('#redam').onclick=()=>toast('Memeriksa redaman… rata-rata −18.6 dB');
$('#bell').onclick=()=>toast('Ada 1 notifikasi baru.');
$('#menu').onclick=()=>{$('#drawer').classList.add('on');$('#scrim').classList.add('on')};
$('#scrim').onclick=closeDrawer;
$$('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
/* form */
const fmt=n=>(+n||0).toLocaleString('id-ID');
const num=s=>+String(s).replace(/\D/g,'');
let km=30000;
$('#tg').oninput=e=>{const n=num(e.target.value);e.target.value=n?fmt(n):'';$('#st').value=fmt(Math.max(0,n-km))};
$('#st').oninput=e=>{const n=num(e.target.value);e.target.value=n?fmt(n):'';km=Math.max(0,num($('#tg').value)-n);$('#km').textContent='Rp '+fmt(km)};
$('#tg').dispatchEvent(new Event('input'));
$('#days').innerHTML=[1,5,10,15,20,25,28].map(d=>`<button class="${d===10?'on':''}">${d}</button>`).join('');
$$('#days button').forEach(b=>b.onclick=()=>{$$('#days button').forEach(x=>x.classList.toggle('on',x===b));$('#jt').textContent='Tgl '+b.textContent+' setiap bulan'});
let lat=-6.90389,lng=107.60412;
function setPin(x,y){$('#mp').setAttribute('transform',`translate(${x} ${y})`);lat=-6.90389-(y-105)*.00004;lng=107.60412+(x-180)*.00004;$('#co').textContent=lat.toFixed(5)+', '+lng.toFixed(5)}
$('#mini').onpointerdown=e=>{const r=$('#mini').getBoundingClientRect();const mv=ev=>setPin(Math.max(10,Math.min(350,(ev.clientX-r.left)/r.width*360)),Math.max(30,Math.min(200,(ev.clientY-r.top)/r.height*210)));mv(e);$('#mini').setPointerCapture(e.pointerId);$('#mini').onpointermove=mv;$('#mini').onpointerup=()=>{$('#mini').onpointermove=null}};
$('#loc').onclick=()=>{if(!navigator.geolocation){toast('Lokasi tidak tersedia di perangkat ini.');return}navigator.geolocation.getCurrentPosition(p=>{$('#co').textContent=p.coords.latitude.toFixed(5)+', '+p.coords.longitude.toFixed(5);setPin(180,105);$('#co').textContent=p.coords.latitude.toFixed(5)+', '+p.coords.longitude.toFixed(5);toast('Lokasi Anda dipakai.')},()=>toast('Izin lokasi ditolak. Geser pin secara manual.'))};
$('#cp').onclick=()=>{try{navigator.clipboard.writeText($('#co').textContent)}catch(e){}toast('Koordinat disalin.')};
$('#gn').onclick=()=>toast('Pilih ODP lain: ODP-CCD-03, ODP-CCD-05.');
$('#bk').onclick=$('#bt').onclick=()=>go('peta');
$('#sv').onclick=()=>{const bad=['#nm','#wa','#al'].find(s=>!$(s).value.trim());if(bad){$(bad).focus();toast('Lengkapi kolom bertanda *.');return}toast('Data pelanggan disimpan.');setTimeout(()=>go('peta'),900)};

/* ===== layar baru ===== */
const MON=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const rp=n=>'Rp '+fmt(n);
const TD=new Date();
const dfull=new Intl.DateTimeFormat('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(TD);
$('#hd').textContent=dfull;
const L=[['Bpk. Bambang Sutrisno','MV-1082','Jl. Sukajadi No. 45','aktif',250000],['Toko Sinar Jaya','MV-0941','Jl. Pasteur No. 12','tunggak',200000],['Ibu Ratna Dewi','MV-1120','Gg. Karya Bakti 2 No. 7','aktif',175000],['Warkop Pak RT','MV-0715','Komp. Graha Asri Blok C','aktif',150000],['Studio Digital 9','MV-0433','Jl. Kebon Kawung No. 21','off',350000],['Pak Hendra Wijaya','MV-8921','Jl. Cemara No. 14, Cicendo','tunggak',250000],['Ibu Rina Marlina','MV-4102','Gg. Madrawi RT 03','tunggak',175000],['Toko Barokah Fiber','MV-1090','Jl. Pasteur No. 88','aktif',350000],['Klinik Medika','MV-0388','Jl. Dr. Djunjunan No. 5','aktif',300000],['Hendrawan','MV-0620','Jl. Sukajadi No. 31','aktif',200000],['Sumber Motor','MV-0533','Jl. Pasirkaliki No. 77','off',150000],['Kopi Pasteur','MV-0451','Jl. Pasteur No. 40','tunggak',175000]].map(([n,id,a,s,t])=>({n,id,a,s,t}));
const SL={aktif:['Aktif','#d6f5e3','var(--ok)'],tunggak:['Menunggak','var(--warnbg)','var(--warn)'],off:['Nonaktif','var(--tint2)','var(--mut)']};
const ds=o=>{const d=new Date(TD);d.setDate(d.getDate()+o);return d.getDate()+' '+MON[d.getMonth()]};
/* dashboard */
$('#due').innerHTML=[[5,1,'Besok','#fff3c9','#6b4a00'],[6,0,'Hari Ini','#f59e42','#fff'],[7,2,'2 hari lagi','var(--warnbg)','var(--warn)']].map(([i,o,t,bg,fg])=>{const c=L[i];return `<div class="dc ${o===0?'today':''}"><h3>${c.n}<span>ID: ${c.id}</span></h3><p style="font-size:12px;color:var(--mut);margin-top:6px;display:flex;gap:6px;align-items:center"><svg class="ic" style="width:14px;height:14px"><use href="#i-pin"/></svg>${c.a}</p><span class="pl" style="background:${bg};color:${fg}">${t} (${ds(o)})</span><div style="border-top:1px solid var(--tint2);padding-top:10px;font-size:13px;color:var(--mut)">Tagihan: <b class="jk" style="font-size:18px;color:var(--ink);margin-left:4px">${rp(c.t)}</b></div><div class="two" style="grid-template-columns:1fr 1fr;margin-top:12px"><button class="btn" data-l="${i}" style="height:42px;font-size:14px"><svg class="ic" style="width:18px;height:18px"><use href="#i-pin"/></svg>Lokasi</button><button class="btn soft" data-h="${i}" style="height:42px;color:var(--ok);background:var(--surf);border:1px solid #9fd9b8"><svg class="ic" style="width:18px;height:18px"><use href="#i-chat"/></svg>Hubungi</button></div></div>`}).join('');
$('#due').onclick=e=>{const l=e.target.closest('[data-l]'),h=e.target.closest('[data-h]');if(l)openDetail(L[l.dataset.l]);if(h)toast('Membuka WhatsApp ke '+L[h.dataset.h].n+'…')};
$('#klaim').onclick=()=>toast('Klaim talangan Rp 450.000 diajukan.');
/* daftar */
let lf='all',lq='',pgn=1,psz=5;
function lrows(){return L.filter(c=>(lf==='all'||c.s===lf)&&(c.n+c.id+c.a).toLowerCase().includes(lq))}
function renderList(){const r=lrows(),pc=Math.max(1,Math.ceil(r.length/psz));pgn=Math.min(pgn,pc);const s=(pgn-1)*psz,v=r.slice(s,s+psz);
 $('#lc').innerHTML=[['all','Semua',L.length],['aktif','Aktif',L.filter(c=>c.s==='aktif').length],['tunggak','Menunggak',L.filter(c=>c.s==='tunggak').length],['off','Nonaktif',L.filter(c=>c.s==='off').length]].map(([k,t,n])=>`<button data-f="${k}" class="${lf===k?'on':''}">${t}<b>${n}</b></button>`).join('');
 $('#tb').innerHTML=v.length?v.map((c,i)=>`<tr data-i="${L.indexOf(c)}" class="${c.s==='off'?'off':''}"><td class="s1"><svg class="ic" style="width:14px;height:14px;vertical-align:middle;color:var(--mut)"><use href="#i-grip"/></svg> <b style="font:700 11px ui-monospace,monospace">${String(s+i+1).padStart(2,'0')}</b></td><td class="s2"><b>${c.n}</b><code>${c.id}</code></td><td>${c.a}</td><td><span class="st" style="background:${SL[c.s][1]};color:${SL[c.s][2]}">${SL[c.s][0]}</span></td><td><b>${rp(c.t)}</b></td></tr>`).join(''):'<tr><td colspan="5" style="text-align:center;padding:24px;white-space:normal">Tidak ada pelanggan yang cocok. Ubah kata kunci atau filter.</td></tr>';
 $('#cnt').textContent=`${v.length} dari ${r.length}`;$('#sh').innerHTML=r.length?`Menampilkan <b>${s+1}-${s+v.length}</b> dari <b>${r.length}</b> pelanggan`:'';
 $('#pg').innerHTML=pc>1?`<button data-p="${pgn-1}" ${pgn===1?'disabled':''} aria-label="Sebelumnya">‹</button>`+Array.from({length:pc},(_,i)=>`<button data-p="${i+1}" class="${pgn===i+1?'on':''}">${i+1}</button>`).join('')+`<button data-p="${pgn+1}" ${pgn===pc?'disabled':''} aria-label="Berikutnya">›</button>`:''}
$('#lc').onclick=e=>{const b=e.target.closest('[data-f]');if(b){lf=b.dataset.f;pgn=1;renderList()}};
$('#pg').onclick=e=>{const b=e.target.closest('[data-p]');if(b&&!b.disabled){pgn=+b.dataset.p;renderList()}};
$('#lq').oninput=e=>{lq=e.target.value.toLowerCase();pgn=1;renderList()};
$('#ps').onchange=e=>{psz=+e.target.value;pgn=1;renderList()};
$('#tb').onclick=e=>{const t=e.target.closest('tr[data-i]');if(t)openDetail(L[t.dataset.i])};
$('#rg').onclick=()=>toast('Wilayah lain: Sukajadi, Coblong.');
$('#addc').onclick=()=>go('tambah');
renderList();
/* detail */
let cur=L[1];
base($('#g4'));
function renderRw(paid){const m=i=>{const d=new Date(TD.getFullYear(),TD.getMonth()-i,1);return MON[d.getMonth()]+' '+d.getFullYear()};
 const st=(t,bg,fg)=>`<span class="st" style="background:${bg};color:${fg}">${t}</span>`;
 const nx=ds(0);
 $('#rw').innerHTML=`<div class="rw"><div class="t"><b>${m(0)} <span style="font:500 12px Inter">| ${rp(cur.t)}</span></b>${paid?st('Lunas','#7bf0a8','#06582c'):st('Belum dibayar','var(--warnbg)','var(--warn)')}</div><div class="t" style="color:var(--mut)"><span>${paid?'Dibayar hari ini · Tunai':'Menunggu Penagihan / Setoran'}</span><span>${paid?'Setor: '+rp(cur.t-50000):'Jatuh Tempo: 20 '+MON[TD.getMonth()]}</span></div></div>
 <div class="rw"><div class="t"><b>${m(1)} <span style="font:500 12px Inter">| ${rp(cur.t)}</span></b>${st('Ditalangi','var(--surf)','var(--navy)').replace('class="st"','class="st" style="border:2px solid var(--navy);background:var(--surf);color:var(--navy)"')}</div><div class="t"><span style="color:var(--mut)">Ditalangi Teknisi (Setor ${rp(cur.t-50000)})</span><button class="btn" data-pl style="width:auto;height:44px;padding:0 14px;font-size:12px;background:var(--navy);border-radius:8px">Pelunasan talangan</button></div></div>
 ${[2,3].map(i=>`<div class="rw"><div class="t"><b>${m(i)} <span style="font:500 12px Inter">| ${rp(cur.t)}</span></b>${st('Lunas','#7bf0a8','#06582c')}</div><div class="t" style="color:var(--mut)"><span>${i===2?'19 '+MON[(TD.getMonth()+10)%12]+' · Tunai':'18 '+MON[(TD.getMonth()+9)%12]+' · Transfer Bank (BCA)'}</span><span>Setor: ${rp(cur.t-50000)}</span></div></div>`).join('')}`}
let paidNow=false;
function openDetail(c){cur=c;paidNow=false;$('#dn').textContent=c.n;$('#dow').textContent='Pemilik: '+c.n;$('#did').textContent='ID: '+c.id;
 $('#dbg').innerHTML=`<span class="bd" style="background:${c.s==='off'?'var(--tint2)':'#7bf0a8'};color:${c.s==='off'?'var(--mut)':'#06582c'}">● ${c.s==='off'?'Nonaktif':'Aktif'}</span>`+(c.s==='tunggak'?'<span class="bd" style="background:var(--warnbg);color:var(--warn)">● Menunggak 4 Hari</span>':'');
 $('#dal').textContent=c.a+', Kel. Cipaganti, Kec. Coblong, Kota Bandung';$('#dtg').innerHTML=rp(c.t)+'<span style="font:400 11px Inter;color:var(--mut)">/bln</span>';$('#dst').innerHTML=rp(c.t-50000)+'<span style="font:400 11px Inter;color:var(--mut)">/bln</span>';$('#dpl').textContent=c.n;$('#dnx').textContent='20 '+MON[TD.getMonth()]+' '+TD.getFullYear();
 renderRw(false);go('detail');$('#detail .scroll').scrollTop=0}
$('#rw').onclick=e=>{if(e.target.closest('[data-pl]'))toast('Pelunasan talangan dicatat.')};
$('#kp').onclick=()=>{if(paidNow){toast('Pembayaran sudah dikonfirmasi.');return}paidNow=true;renderRw(true);toast('Pembayaran '+rp(cur.t)+' dikonfirmasi.')};
$('#db').onclick=$('#db2').onclick=()=>go('list');
$('#ed').onclick=()=>{$('#nm').value=cur.n;$('#al').value=cur.a;$('#tg').value=fmt(cur.t);$('#tg').dispatchEvent(new Event('input'));go('tambah')};
$('#shr').onclick=()=>toast('Tautan detail pelanggan disalin.');
$('#mo').onclick=()=>toast('Menu lainnya belum tersedia.');
$('#tel').onclick=()=>toast('Memanggil +62 812-3456-7890…');
$('#wa2').onclick=()=>toast('Membuka WhatsApp ke '+cur.n+'…');
$('#gm').onclick=()=>toast('Membuka rute di Google Maps…');
$('#sw').onclick=e=>{const s=e.currentTarget,on=s.classList.toggle('on');s.setAttribute('aria-checked',on);$('#swt').textContent=on?'Aktif':'Nonaktif';$('#swt').style.color=on?'var(--navy)':'var(--mut)'};
/* rekap setoran */
$('#sl').innerHTML=L.filter(c=>c.s==='aktif').slice(0,5).map(c=>`<div class="rw" style="margin-top:8px"><div class="t"><b>${c.n}</b><b style="color:var(--ok)">${rp(c.t-50000)}</b></div><div class="t" style="color:var(--mut)"><span>${c.id}</span><span class="st" style="background:#7bf0a8;color:#06582c">Lunas</span></div></div>`).join('');
/* menu & navigasi */
$$('.mn').forEach(b=>b.onclick=()=>{$('#drawer').classList.add('on');$('#scrim').classList.add('on')});
$$('.bl').forEach(b=>b.onclick=()=>toast('Ada 1 notifikasi baru.'));
$('#dx').onclick=closeDrawer;
const _go=go;
go=function(id){_go(id);$$('#drawer nav button').forEach(b=>b.classList.toggle('act',b.dataset.go===id||(id==='peta'&&b.dataset.go==='topo')))};
$$('#drawer [data-go]').forEach(b=>b.onclick=()=>{if(b.dataset.go==='topo'){go('peta');$('.seg button[data-v="v2"]').click()}else go(b.dataset.go)});
$('#go').onclick=()=>{const ok=$('#usr').value.trim()&&$('#pwd').value;$('#lerr').style.display=ok?'none':'block';if(ok)go('dash')};
$('#bk').onclick=$('#bt').onclick=()=>go('list');
$('#sv').onclick=()=>{const bad=['#nm','#wa','#al'].find(s=>!$(s).value.trim());if(bad){$(bad).focus();toast('Lengkapi kolom bertanda *.');return}toast('Data pelanggan disimpan.');setTimeout(()=>go('list'),900)};
$('#det').onclick=()=>openDetail(L.find(c=>c.id===sel.id)||{n:sel.n,id:sel.id,a:sel.a,s:sel.s,t:250000});

}
