export const permutation = {
  title: "Szép permutáció készítése",
  intro: "Adott egy n szám. Rendezd el az 1-től n-ig terjedő számokat úgy, hogy két szomszédos szám különbsége soha ne kevesebb 2-nél. Ha ez lehetetlen, a válasz „NO SOLUTION\". Haladj végig az öt lépésen; mindegyik egyetlen új részletet ad hozzá.",
  parts: [
    {
      name: "Szétválasztás párosakra és páratlanokra",
      idea: "Az egymástól 1-gyel különböző számok paritása mindig eltér. Az azonos paritású számok tehát sosem sértik a szabályt.",
      steps: ["Gyűjtsd az összes páros számot az egyik, az összes páratlant a másik csoportba.", "Egy csoporton belül a szomszédok különbsége legalább 2.", "Így mindkét csoport önmagában szép."],
      takeaway: "Mindkét csoport biztonságos. Az egyetlen veszélyes hely az, ahol a két csoport találkozik.",
      code: `function isBeautiful(arr) {
  for (let i = 0; i + 1 < arr.length; i++) {
    if (Math.abs(arr[i] - arr[i + 1]) === 1) return false;
  }
  return true;
}

const n = 10;
const evens = [];
const odds = [];
for (let i = 1; i <= n; i++) {
  if (i % 2 === 0) evens.push(i);
  else odds.push(i);
}

console.log(evens, isBeautiful(evens));
console.log(odds, isBeautiful(odds));`,
      checks: [
        { type: "choice", q: "Miért biztonságos egy csoporton belül a szomszédság?", options: ["Mert az azonos paritású számok különbsége páros, tehát legalább 2", "Mert a csoportok rendezettek", "Mert a csoport számai kisebbek, mint n"], answer: 0, why: "Két szám különbsége akkor páros, ha a paritásuk azonos. A 0 nem lehet (a számok különbözők), így a különbség legalább 2." },
        {
          type: "code",
          q: "Írd meg a szétválasztást: tedd az i számot a megfelelő csoportba.",
          before: `const n = 9;
const evens = [];
const odds = [];
for (let i = 1; i <= n; i++) {`,
          after: `}`,
          options: [
            `  if (i % 2 === 0) evens.push(i);
  else odds.push(i);`,
            `  if (i % 2 === 0) odds.push(i);
  else evens.push(i);`,
            `  if (i % 2 === 1) evens.push(i);
  else odds.push(i);`,
            `  evens.push(i);
  odds.push(i);`,
          ],
          answer: 0,
          hint: "Az i % 2 === 0 feltétel igaz a páros számokra.",
        },
      ],
    },
    {
      name: "A csoportok találkozási pontja",
      idea: "Amikor összeillesztjük a két csoportot, pontosan egy új szomszédos pár keletkezik. Ez a pár dönti el, hogy az egész tömb jó-e.",
      steps: ["Illeszd össze a párosakat és a páratlanokat, és nézd meg a középső párt.", "Ez a pár nem különbözhet 1-gyel, ezért nagy különbséget szeretnénk.", "n = 4-re a [2, 4, 1, 3] elrendezés találkozási pontján a különbség 3."],
      takeaway: "A [2, 4, 1, 3] működő alap. Ha a páratlanok jönnek előbb, mint az [1, 3, 2, 4]-ben, a találkozási pontnál hibázunk.",
      code: `function isBeautiful(arr) {
  for (let i = 0; i + 1 < arr.length; i++) {
    if (Math.abs(arr[i] - arr[i + 1]) === 1) return false;
  }
  return true;
}

console.log('párosak, majd páratlanok (n = 4):', isBeautiful([2, 4, 1, 3]));
console.log('páratlanok, majd párosak (n = 4):', isBeautiful([1, 3, 2, 4]));
console.log('párosak, majd páratlanok (n = 3):', isBeautiful([2, 1, 3]));
console.log('páratlanok, majd párosak (n = 3):', isBeautiful([1, 3, 2]));`,
      checks: [
        { type: "choice", q: "Miért nem szép az [1, 3, 2, 4]?", options: ["A 3 és a 2 szomszédos, a különbségük 1", "Az 1 és a 3 szomszédos", "A 2 és a 4 szomszédos"], answer: 0, why: "A páratlanok után következő párosoknál a találkozási pont a 3 és a 2, amelyek különbsége 1." },
        { type: "choice", q: "Mekkora a különbség a [2, 4, 1, 3] találkozási pontján?", options: ["1", "2", "3"], answer: 2, why: "A találkozási pontot a 4 és az 1 alkotja, a különbségük 3." },
      ],
    },
    {
      name: "Az alap bővítése",
      idea: "A [2, 4, 1, 3] érintetlenül marad középen, és egyesével adunk hozzá új számokat úgy, hogy a találkozási pontot nem bántjuk.",
      steps: ["Az új páratlan szám a végére kerül, az előző páratlan mellé (különbség: 2).", "Az új páros szám az elejére kerül, az előző páros mellé (különbség: 2).", "A 4, 1 találkozási pont sosem változik."],
      takeaway: "Minden új szám egy tőle 2-re lévő szám mellé kerül, így a tömb minden méretnél szép marad.",
      code: `const result = [2, 4, 1, 3];

for (let i = 5; i <= 9; i++) {
  if (i % 2 === 0) result.unshift(i);
  else result.push(i);
  console.log('hozzáadva: ' + i + ':', JSON.stringify(result));
}`,
      checks: [
        {
          type: "code",
          q: "Egészítsd ki a bővítést: a páros számot az elejére, a páratlant a végére tedd.",
          before: `const result = [2, 4, 1, 3];
for (let i = 5; i <= 9; i++) {`,
          after: `}`,
          options: [
            `  if (i % 2 === 0) result.push(i);
  else result.unshift(i);`,
            `  result.push(i);`,
            `  if (i % 2 === 0) result.unshift(i);
  else result.unshift(i);`,
            `  if (i % 2 === 0) result.unshift(i);
  else result.push(i);`,
          ],
          answer: 3,
          hint: "Az unshift az elejére, a push a végére tesz elemet.",
        },
        { type: "choice", q: "Miért marad a találkozási pont (4, 1) mindig érintetlen?", options: ["Mert az új számok csak a tömb két szélére kerülnek", "Mert a 4 és az 1 a legnagyobb számok", "Mert a tömb mindig rendezett marad"], answer: 0, why: "A bővítés a tömb két végén történik, a közepe nem változik." },
      ],
    },
    {
      name: "A teljes megoldás",
      idea: "Kezeljük a legkisebb eseteket, építsük fel a tömböt az alapból, és ellenőrizzük az eredményt.",
      steps: ["n = 1-re az eredmény [1].", "n = 2-re és n = 3-ra NO SOLUTION.", "n ≥ 4-re indulj a [2, 4, 1, 3]-ból, és add hozzá az 5..n számokat az elejére (párosak) vagy a végére (páratlanok).", "Ellenőrizd az összes n-t 4-től 200-ig."],
      takeaway: "Ez O(n) időben fut, és minden n-re működik.",
      conclusion: "Indulj a [2, 4, 1, 3] tömbből. Ezután menj végig az 5, 6, 7, … n számokon: minden páros számot tegyél a tömb elejére, minden páratlant pedig utána, a végére. n = 1-re a válasz [1]; n = 2-re és n = 3-ra nincs megoldás. Az algoritmus O(n) időben fut.",
      code: `function isBeautiful(arr) {
  for (let i = 0; i + 1 < arr.length; i++) {
    if (Math.abs(arr[i] - arr[i + 1]) === 1) return false;
  }
  return true;
}

function solve(n) {
  if (n === 1) return [1];
  if (n < 4) return 'NO SOLUTION';
  const result = [2, 4, 1, 3];
  for (let i = 5; i <= n; i++) {
    if (i % 2 === 0) result.unshift(i);
    else result.push(i);
  }
  return result;
}

console.log(solve(3));
console.log(solve(8));

let allGood = true;
for (let n = 4; n <= 200; n++) {
  if (!isBeautiful(solve(n))) allGood = false;
}
console.log('minden n szép 4-től 200-ig:', allGood);`,
      checks: [
        {
          type: "code",
          q: "Add meg a kis esetek kezelését: n = 1-re [1], n = 2-re és n = 3-ra a \"NO SOLUTION\" szöveg.",
          before: `function solve(n) {`,
          after: `  const result = [2, 4, 1, 3];
  for (let i = 5; i <= n; i++) {
    if (i % 2 === 0) result.unshift(i);
    else result.push(i);
  }
  return result;
}`,
          options: [
            `  if (n < 4) return 'NO SOLUTION';`,
            `  if (n === 1) return [1];
  if (n < 4) return 'NO SOLUTION';`,
            `  if (n === 1) return [1];
  if (n < 5) return 'NO SOLUTION';`,
            `  if (n === 1) return 'NO SOLUTION';
  if (n < 4) return [1];`,
          ],
          answer: 1,
          hint: "Két if kell: az egyik n === 1-re, a másik n < 4-re.",
        },
        { type: "choice", q: "Hány lépésben dönt az algoritmus arról, hová kerül egy új szám?", options: ["Állandó számú lépésben, a szám paritása alapján", "A már elhelyezett számok számával arányos lépésben", "Az összes permutációt végig kell néznie"], answer: 0, why: "Csak azt nézzük meg, hogy a szám páros vagy páratlan. Így összesen nagyjából n lépés kell. (JavaScript tömbnél az unshift lassabb lehet; ennek okát és a megoldást a feloldódó „Bónusz: optimalizálás” részben nézzük meg.)" },
      ],
    },
    {
      name: "Bónusz: optimalizálás",
      bonus: true,
      hidden: true,
      idea: "A teljes megoldásban a páros számokat az unshift függvénnyel tettük a tömb elejére. Ez működik, de nagy n-re lassú lehet, ezért versenyfeladatban érdemes optimalizálni.",
      steps: ["A push az új elemet a tömb végére teszi, az unshift az elejére.", "A tömb elemei egymás után vannak a memóriában, ezért az unshift-nél az összes meglévő elemnek egy hellyel arrébb kell csúsznia. n elemű tömbnél ez n mozgatás.", "Ha n elemet teszünk egymás után az elejére, összesen nagyjából n²/2 mozgatás lesz, a push-nál viszont csak n beszúrás. A JavaScript-motorok sok trükkel gyorsítanak ezen, de általános esetben a költség a tömb hosszával arányos marad.", "Megoldás: az elejére szánt párosakat egy külön listába gyűjtjük push-sal, a páratlanokat egy másikba, majd összefűzzük: az első lista, az alap [2, 4, 1, 3], a második lista. A párosak sorrendjén nem kell változtatni, mert két páros szám különbsége mindig legalább 2.", "A kód ellenőrzi, hogy mindkét megoldásban minden szomszédos pár különbsége nagyobb 1-nél, kiírja a kétféle eredményt n = 9-re, majd megméri az időt n = 100 000-re. Az idő géptől függ, de az unshift-es változat érezhetően lassabb."],
      takeaway: "A két listás megoldás is szép permutációt ad, de lineáris időben, ezért nagy n-re is gyors. A két megoldás tömbje nem egyforma, mégis mindkettő helyes.",
      conclusion: "Ha egy tömb elejére sokszor kell elemet tenni, ne az unshift-et használd. Gyűjtsd az elemeket push-sal külön tömbökbe, és a végén fűzd össze őket. Így n beszúrás O(n) időben fut O(n²) helyett.",
      code: `function solveUnshift(n) {
  if (n === 1) return [1];
  if (n < 4) return 'NO SOLUTION';
  const result = [2, 4, 1, 3];
  for (let i = 5; i <= n; i++) {
    if (i % 2 === 0) result.unshift(i);
    else result.push(i);
  }
  return result;
}

function solveTwoLists(n) {
  if (n === 1) return [1];
  if (n < 4) return 'NO SOLUTION';
  const front = [];
  const back = [];
  for (let i = 5; i <= n; i++) {
    if (i % 2 === 0) front.push(i);
    else back.push(i);
  }
  return [...front, 2, 4, 1, 3, ...back];
}

let ok = true;
for (let n = 4; n <= 200; n++) {
  for (const arr of [solveUnshift(n), solveTwoLists(n)]) {
    for (let i = 0; i + 1 < arr.length; i++) {
      ok = ok && Math.abs(arr[i] - arr[i + 1]) > 1;
    }
  }
}
console.log('mindkét megoldás szép n = 4..200-ra:', ok);
console.log(JSON.stringify(solveUnshift(9)));
console.log(JSON.stringify(solveTwoLists(9)));

const n = 100000;
let t = Date.now();
solveUnshift(n);
console.log('unshift-es megoldás: ' + (Date.now() - t) + ' ms');
t = Date.now();
solveTwoLists(n);
console.log('két listás megoldás: ' + (Date.now() - t) + ' ms');`,
      checks: [
        { type: "choice", q: "Hány elemet kell eltolni, ha egy 1000 elemű tömb elejére teszünk egy elemet?", options: ["1000", "1", "500 000"], answer: 0, why: "Mind az 1000 meglévő elem egy hellyel arrébb kerül." },
        { type: "choice", q: "Mi történik a különbséggel, ha n-t tízszeresére növeljük?", options: ["Az unshift ideje nagyjából százszorosára nő, a push-é tízszeresére", "Mindkét idő tízszeresére nő", "Egyik idő sem változik"], answer: 0, why: "A push összideje n-nel arányos, az unshift-é n²-tel, ezért tízszeres n-re 10, illetve 100-szoros idő jön ki." },
        { type: "choice", q: "Számít-e a páros számok sorrendje a front listában a végeredmény szempontjából?", options: ["Nem, mert két páros szám különbsége legalább 2, bármilyen sorrendben állnak", "Igen, a nagyobb számoknak kell előrébb állniuk", "Igen, csak a csökkenő sorrend jó"], answer: 0, why: "Egy csoporton belül minden szomszéd különbsége legalább 2. Csak a csoportok találkozási pontja számít, a belső sorrend nem, ezért a listát nem kell megfordítani." },
        {
          type: "code",
          q: "Fűzd össze a végeredményt a két listából és az alapból.",
          before: `const front = [6, 8];
const back = [5, 7, 9];`,
          after: `console.log(result);`,
          options: [
            `const result = [...front, 1, 2, 3, 4, ...back];`,
            `const result = [...front, 2, 4, 3, 1, ...back];`,
            `const result = [...front, 2, 4, 1, 3, ...back];`,
            `const result = [...front, ...back];`,
          ],
          answer: 2,
          hint: "Elöl a front áll, utána az alap [2, 4, 1, 3], a végén a back. Az alap számait ebben a sorrendben kell beírni.",
        },
      ],
    },
    {
      name: "Bónusz: optimalizálás – másik út",
      bonus: true,
      hidden: true,
      idea: "A megoldást úgy is felépíthetjük, hogy nem egy kész alapot bővítünk, hanem a tömb első részébe a páratlan, a második részébe a páros számokat írjuk. Így unshift-re és külön listákra sincs szükség.",
      steps: ["Írd ki először az összes páros számot növekvő sorrendben (2, 4, 6, ...), utána a páratlan számot növekvő sorrendben (1, 3, 5, …). Mindkét csoport szép önmagában, mert a szomszédok különbsége 2.", "Csak a találkozási pont számít: az utolsó páratlan és a 2 kerül egymás mellé. n ≥ 5-nél az utolsó páratlan legalább 5, így a különbség legalább 3, tehát a tömb szép.", "Kivételek: n = 1-re [1]; n = 2-re és n = 3-ra nincs megoldás; n = 4-nél az [1, 3, 2, 4] hibás (a 3 és a 2 szomszédos), ott a [2, 4, 1, 3] alapot használjuk.", "A tömböt csak push-sal építjük, két egyszerű ciklussal: nincs unshift, nincs külön lista. Ez O(n). (Ha n páratlan, a páratlanok száma eggyel több, mint a párosaké, tehát a „két fele” nem pontosan egyforma.)", "A kód ellenőrzi az eredményt n = 4-től 200-ig, majd megméri az unshift-es megoldással szemben n = 100 000-re."],
      takeaway: "Ez is helyes megoldás, és csak push-t használ, ezért lineáris idejű. Az unshift-es változatnál érezhetően gyorsabb, és közvetlenül a végleges tömböt építi, külön listák nélkül.",
      conclusion: "Szép permutációt többféleképpen is építhetünk: a [2, 4, 1, 3] alapot kétoldalt bővítve, vagy a párosakat a páratlanok elé írva. A lényeg, hogy az elemeket push-sal, a végleges sorrendben adjuk hozzá, így O(n) időben végzünk.",
      code: `function solveUnshift(n) {
  if (n === 1) return [1];
  if (n < 4) return 'NO SOLUTION';
  const result = [2, 4, 1, 3];
  for (let i = 4; i <= n; i++) {
    if (i % 2 === 0) result.unshift(i);
    else result.push(i);
  }
  return result;
}

function solveEvensOdds(n) {
  if (n === 1) return [1];
  if (n < 4) return 'NO SOLUTION';
  const result = [];
  for (let i = 2; i <= n; i += 2) result.push(i);
  for (let i = 1; i <= n; i += 2) result.push(i);
  return result;
}

let allGood = true;
for (let n = 4; n <= 200; n++) {
  const arr = solveEvensOdds(n);
  for (let i = 0; i + 1 < arr.length; i++) {
    allGood = allGood && Math.abs(arr[i] - arr[i + 1]) > 1;
  }
}
console.log('minden n szép 4-től 200-ig:', allGood);
console.log(JSON.stringify(solveOddsEvens(9)));

const n = 100000;
let t = Date.now();
solveUnshift(n);
console.log('unshift-es megoldás: ' + (Date.now() - t) + ' ms');
t = Date.now();
solveOddsEvens(n);
console.log('párosak, majd páratlanok: ' + (Date.now() - t) + ' ms');`,
      checks: [
        { type: "choice", q: "Mekkora a különbség a találkozási pontnál az [1, 3, 5, 2, 4] tömbben (n = 5)?", options: ["1", "3", "2"], answer: 1, why: "A találkozási pontot az 5 és a 2 alkotja, a különbségük 3, ezért a tömb szép." },
        {
          type: "code",
          q: "Építsd fel a tömböt n = 10-re: először a párosokat, utána a páratlanokat, mindkettőt push-sal.",
          before: `const n = 10;
const result = [];`,
          after: `console.log(result);`,
          options: [
            `for (let i = 1; i <= n; i += 2) result.push(i);
for (let i = 2; i < n; i += 2) result.push(i);`,
            `for (let i = 1; i <= n; i += 2) result.push(i);
for (let i = 2; i <= n; i += 2) result.push(i);`,
            `for (let i = 1; i <= n; i += 2) result.unshift(i);
for (let i = 2; i <= n; i += 2) result.push(i);`,
            `for (let i = 1; i <= n; i += 2) {
  result.push(i);
  result.push(i + 1);
}`,
          ],
          answer: 1,
          hint: "Az első ciklus 1-ről, a második 2-ről indul, mindkettő kettesével lép, és n-ig tart (n-et is beleértve).",
        },
      ],
    },
  ],
}

export const playlist = {
  title: "Lejátszási lista: leghosszabb ismétlés nélküli szakasz",
  intro: "Adott egy n dalból álló lejátszási lista, minden dalnak van egy azonosítója (egy szám). Keressük a leghosszabb olyan egymás utáni szakaszt, amelyben nincs két egyforma dal.",
  parts: [
    {
      name: "Brute force: minden kezdőpontról",
      idea: "Próbáljuk ki minden dalt kezdőpontnak, és menjünk jobbra addig, amíg egy dal másodszor is elő nem fordul.",
      steps: ["Válassz egy i kezdőpontot, és indíts egy üres halmazt (Set).", "Haladj jobbra a j helyen lévő dalokkal. Ha a dal már a halmazban van, állj meg.", "Különben tedd a dalt a halmazba, és a szakasz hossza j − i + 1.", "Vedd a legnagyobb hosszt az összes kezdőpontra."],
      takeaway: "Ez helyes, de ha nincs ismétlés, minden kezdőpontnál végig kell menni a lista hátralévő részén. Ez O(n²) lépés, n = 200 000-re kb. 2 · 10^10, ami túl sok.",
      code: `function longestBrute(songs) {
  let best = 0;
  for (let i = 0; i < songs.length; i++) {
    const seen = new Set();
    for (let j = i; j < songs.length; j++) {
      if (seen.has(songs[j])) break;
      seen.add(songs[j]);
      best = Math.max(best, j - i + 1);
    }
  }
  return best;
}

console.log(longestBrute([1, 2, 1, 3, 2, 7, 4, 2]));`,
      checks: [
        { type: "choice", q: "Nagyjából hány lépést tesz a brute force n = 200 000-re, ha a listában nincs ismétlés?", options: ["kb. 2 · 10^10", "kb. 200 000", "kb. 450"], answer: 0, why: "Az i. kezdőpontból még n − i dalt vizsgálunk, így összesen n(n + 1) / 2, ami n = 200 000-re kb. 2 · 10^10." },
        {
          type: "code",
          q: "Egészítsd ki a belső ciklus törzsét.",
          before: `function longestBrute(songs) {
  let best = 0;
  for (let i = 0; i < songs.length; i++) {
    const seen = new Set();
    for (let j = i; j < songs.length; j++) {`,
          after: `    }
  }
  return best;
}`,
          options: [
            `      seen.add(songs[j]);
      if (seen.has(songs[j])) break;
      best = Math.max(best, j - i + 1);`,
            `      if (seen.has(songs[j])) continue;
      seen.add(songs[j]);
      best = Math.max(best, j - i + 1);`,
            `      if (seen.has(songs[j])) break;
      seen.add(songs[j]);
      best = Math.max(best, j - i + 1);`,
            `      if (seen.has(songs[j])) break;
      seen.add(songs[j]);
      best = j - i + 1;`,
          ],
          answer: 2,
          hint: "Előbb nézd meg, hogy a dal szerepelt-e (és állj meg, ha igen), csak utána add a halmazhoz, és a legjobb hosszt a maximummal frissítsd.",
        },
      ],
    },
    {
      name: "Két mutató",
      idea: "Ne kezdjünk újra minden kezdőpontról. Tartsunk egy ablakot, amelyben nincs ismétlés. A jobb szélét mindig egyet jobbra toljuk, és ha ismétlődés keletkezik, a bal szélet toljuk addig, amíg újra ismétlés nélküli lesz az ablak.",
      steps: ["Az ablak a bal és a jobb mutató közötti szakasz, a benne lévő dalokat egy halmazban tároljuk.", "Toljuk a jobb mutatót egyet jobbra: az új dal be akar kerülni az ablakba.", "Ha az új dal már benne van az ablakban, tegyük a bal mutatót jobbra, és vegyük ki a halmazból az elhagyott dalokat, amíg az ismétlődés meg nem szűnik.", "Minden lépésben frissítsük a legjobb hosszt az ablak méretével."],
      takeaway: "Mindkét mutató csak előre mozog, és legfeljebb n lépést tehet, ezért az egész O(n). Ez már gyors, de a bal mutató még egyesével lépked.",
      code: `function longestWindow(songs) {
  const inWindow = new Set();
  let left = 0;
  let best = 0;
  for (let right = 0; right < songs.length; right++) {
    while (inWindow.has(songs[right])) {
      inWindow.delete(songs[left]);
      left++;
    }
    inWindow.add(songs[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

console.log(longestWindow([1, 2, 1, 3, 2, 7, 4, 2]));`,
      checks: [
        { type: "choice", q: "Miért O(n) ez a megoldás, pedig van egy ciklus a cikluson belül?", options: ["Mert a bal mutató összesen legfeljebb n-szer léphet előre, hiszen csak előre mozog", "Mert a belső ciklus mindig csak egyszer fut le", "Mert a halmaz műveletei nem kerülnek időbe"], answer: 0, why: "Minden dal legfeljebb egyszer kerül be az ablakba, és legfeljebb egyszer kerül ki belőle, ezért a belső ciklus összes lépése is legfeljebb n." },
        {
          type: "code",
          q: "Mozgasd a bal szélet, amíg az új dal ismétlődést okoz.",
          before: `function longestWindow(songs) {
  const inWindow = new Set();
  let left = 0;
  let best = 0;
  for (let right = 0; right < songs.length; right++) {`,
          after: `    inWindow.add(songs[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
          options: [
            `    if (inWindow.has(songs[right])) {
      inWindow.delete(songs[left]);
      left++;
    }`,
            `    while (inWindow.has(songs[right])) {
      inWindow.delete(songs[right]);
      left++;
    }`,
            `    while (inWindow.has(songs[right])) {
      inWindow.delete(songs[left]);
      left++;
    }`,
            `    if (inWindow.has(songs[right])) {
      inWindow.clear();
      left = right;
    }`,
          ],
          answer: 2,
          hint: "A ciklus addig fusson, amíg az új dal ismétlődést okoz. Minden lépésben a bal szélen álló dalt kell kivenni a halmazból, és a bal szélet eggyel jobbra tenni.",
        },
      ],
    },
    {
      name: "Map: hol láttuk utoljára",
      idea: "Ahelyett, hogy a bal szélet egyesével léptetnénk, jegyezzük fel egy térképben (Map), hogy minden dalt hol láttunk utoljára. Így ismétlődésnél azonnal tudjuk, hová kell ugrani.",
      steps: ["A Map kulcsa a dal azonosítója, az értéke az a hely (index), ahol a dalt utoljára láttuk.", "Minden dalnál a has(...) hívással megnézzük, szerepelt-e már.", "Ha igen, a get(...) megadja az előző helyét.", "A dal megnézése után a set(dal, i) felülírja a régi helyet az újjal."],
      takeaway: "A Map az azonosító alapján átlagosan állandó idő alatt keres és ír. Ez azért jó, mert az azonosítók 10^9-ig terjedhetnek, és ekkora tömböt nem tudnánk létrehozni.",
      code: `const songs = [1, 2, 1, 3, 2, 7, 4, 2];
const last = new Map();

for (let i = 0; i < songs.length; i++) {
  if (last.has(songs[i])) {
    console.log('a ' + songs[i] + ' korábban a ' + last.get(songs[i]) + '. helyen volt, most a ' + i + '. helyen van');
  }
  last.set(songs[i], i);
}`,
      checks: [
        { type: "choice", q: "Miért Map, és miért nem egy 10^9 elemű tömb?", options: ["Mert az azonosítók 10^9-ig terjedhetnek, és ekkora tömb túl sok memóriát kérne", "Mert a Map mindig gyorsabb, mint a tömb", "Mert a tömb nem tud számokat tárolni"], answer: 0, why: "A Map csak a ténylegesen előforduló azonosítókat tárolja, legfeljebb n darabot, a tömbnek viszont az összes lehetséges azonosítóhoz helyet kellene foglalnia." },
        { type: "choice", q: "Mi lesz a last.get(2) értéke az [1, 2, 1, 3, 2] lista feldolgozása után?", options: ["4", "1", "2"], answer: 0, why: "A 2 az 1. és a 4. helyen szerepel, és a set mindig a legutóbbi helyet írja be, így az érték 4." },
        {
          type: "code",
          q: "Írd meg a Map frissítését a ciklusban.",
          before: `const last = new Map();
const songs = [4, 7, 4, 9];
for (let i = 0; i < songs.length; i++) {`,
          after: `}
console.log(last.get(4));`,
          options: [
            `  last.set(i, songs[i]);`,
            `  last.add(songs[i], i);`,
            `  last.set(songs[i], i);`,
            `  last.get(songs[i], i);`,
          ],
          answer: 2,
          hint: "A kulcs a dal azonosítója, az érték a helye, és a Map-be a set függvénnyel kell írni.",
        },
      ],
    },
    {
      name: "A bal szél ugrása",
      idea: "Ha egy dal már szerepelt, a bal szélnek közvetlenül a dal előző helye mögé kell ugrania. De csak akkor, ha ez előrefelé mozgatás: ha az előző hely már az ablakon kívül van, a bal szél marad.",
      steps: ["A jobb szél az i. helyen áll, a dal x.", "Ha x szerepel a Map-ben, a bal szél új értéke az előző hely + 1.", "Ez nem lehet kisebb a mostani bal szélnél, mert az ablak bal széle sosem mozdulhat visszafelé. Ezért: left = max(left, előző hely + 1).", "Ezután frissítjük a Map-et, és az ablak hossza right − left + 1."],
      takeaway: "A max nélkül a bal szél visszalépne egy régi előfordulásra, és az ablak újra tartalmazna ismétlődést. A kód mindkét változatot kipróbálja a [1, 2, 3, 2, 1] listán.",
      code: `function longest(songs, safe) {
  const last = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < songs.length; right++) {
    const x = songs[right];
    if (last.has(x)) {
      left = safe ? Math.max(left, last.get(x) + 1) : last.get(x) + 1;
    }
    last.set(x, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

console.log('max nélkül:', longest([1, 2, 3, 2, 1], false));
console.log('max-szal:', longest([1, 2, 3, 2, 1], true));`,
      checks: [
        { type: "choice", q: "Mennyi lesz a bal szél, ha most 2, és a jobb szélen lévő dal előző helye 0?", options: ["2", "1", "0"], answer: 0, why: "Az új bal szél max(2, 0 + 1) = 2: az előző hely az ablakon kívül van, ezért nem ugrunk vissza." },
        {
          type: "code",
          q: "Add meg a bal szél frissítését ismétlődés esetén.",
          before: `function longest(songs) {
  const last = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < songs.length; right++) {
    const x = songs[right];
    if (last.has(x)) {`,
          after: `    }
    last.set(x, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
          options: [
            `        left = last.get(x) + 1;`,
            `        left = last.get(x);`,
            `        left = Math.min(left, last.get(x) + 1);`,
            `        left = Math.max(left, last.get(x) + 1);`,
          ],
          answer: 3,
          hint: "A bal szél az előző hely mögé ugorjon (előző hely + 1), de sose lépjen vissza: használd a Math.max-ot.",
        },
      ],
    },
    {
      name: "A teljes megoldás",
      idea: "Összerakjuk a részeket: egy ciklus a listán, egy Map az utolsó helyekkel, és a bal szél ugrása a max szabállyal.",
      steps: ["Indítsd a bal szélt 0-ról, a legjobb hosszt 0-ról, és egy üres Map-et.", "Minden jobb szélre (a lista minden helyére) nézd meg, szerepelt-e már a dal; ha igen, ugorj a bal széllel a max szabály szerint.", "Jegyezd fel a dal helyét a Map-ben.", "Frissítsd a legjobb hosszt az ablak méretével."],
      takeaway: "A jobb szél egyszer megy végig a listán, és dalonként állandó számú Map-művelet történik (átlagosan állandó idejű), ezért az egész megoldás O(n).",
      conclusion: "Menj végig a listán egyszer. Egy Map-ben tartsd számon, hol láttad utoljára az egyes dalokat. Ha az aktuális dal már szerepelt, a bal szél legyen max(bal szél, előző hely + 1). Frissítsd a Map-et, és a legjobb hosszt az ablak méretével (jobb szél − bal szél + 1). Így a megoldás O(n) idő alatt fut, a 10^9-ig terjedő azonosítók ellenére.",
      code: `function longestPlaylist(songs) {
  const last = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < songs.length; right++) {
    const x = songs[right];
    if (last.has(x)) left = Math.max(left, last.get(x) + 1);
    last.set(x, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

function longestBrute(songs) {
  let best = 0;
  for (let i = 0; i < songs.length; i++) {
    const seen = new Set();
    for (let j = i; j < songs.length; j++) {
      if (seen.has(songs[j])) break;
      seen.add(songs[j]);
      best = Math.max(best, j - i + 1);
    }
  }
  return best;
}

console.log(longestPlaylist([1, 2, 1, 3, 2, 7, 4, 2]));

let same = true;
for (let r = 0; r < 300; r++) {
  const len = 1 + Math.floor(Math.random() * 30);
  const songs = Array.from({ length: len }, () => 1 + Math.floor(Math.random() * 8));
  if (longestPlaylist(songs) !== longestBrute(songs)) same = false;
}
console.log('egyezik a bruteforce-al:', same);

const big = Array.from({ length: 200000 }, () => 1 + Math.floor(Math.random() * 1000000000));
const t = Date.now();
const answer = longestPlaylist(big);
console.log('n = 200 000: ' + answer + ' (' + (Date.now() - t) + ' ms)');`,
      checks: [
        { type: "choice", q: "Mennyi a megoldás időigénye (átlagosan)?", options: ["O(n)", "O(n²)", "O(n log² n)"], answer: 0, why: "A jobb szél egyszer végigmegy a listán, és minden dalnál állandó számú Map-művelet történik, amelyek átlagosan állandó idejűek." },
        {
          type: "code",
          q: "Frissítsd a legjobb hosszt.",
          before: `function longestPlaylist(songs) {
  const last = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < songs.length; right++) {
    const x = songs[right];
    if (last.has(x)) left = Math.max(left, last.get(x) + 1);
    last.set(x, right);`,
          after: `  }
  return best;
}`,
          options: [
            `    best = Math.max(best, right - left);`,
            `    best = right - left + 1;`,
            `    best = Math.max(best, last.size);`,
            `    best = Math.max(best, right - left + 1);`,
          ],
          answer: 3,
          hint: "Az ablak hossza right − left + 1, és a legjobb hossz a korábbiak maximuma.",
        },
      ],
    },
  ],
}
