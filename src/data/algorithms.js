export const permutation = {
  title: "Szép permutáció készítése",
  intro: "Adott egy n szám. Rendezd el az 1-től n-ig terjedő számokat úgy, hogy két szomszédos szám különbsége soha ne legyen kevesebb 2-nél. Ha ez lehetetlen, a válasz legyen „NO SOLUTION\".",
  parts: [
    {
      name: "Kis esetek és az alap",
      idea: "Először azt kell megtudnunk, mikor létezik egyáltalán szép permutáció. Írunk egy ellenőrzőt, és kis n-re kipróbáljuk az összes permutációt.",
      steps: ["Az ellenőrző végigmegy a szomszédos párokon, és ha egy pár különbsége pontosan 1, a tömb nem szép.", "Állítsd elő az 1..n összes permutációját, és tartsd meg azokat, amelyeket az ellenőrző elfogad.", "Írd ki, hány szép permutáció van n = 1-től 5-ig, és sorold fel őket n = 4-re.", "n = 1-re van megoldás, n = 2-re és n = 3-ra nincs, n = 4-re pontosan kettő van: [2, 4, 1, 3] és [3, 1, 4, 2]."],
      takeaway: "n = 4-nél jelenik meg először megoldás, és csak két szép permutáció van: [2, 4, 1, 3] és [3, 1, 4, 2]. Ezek közül bármelyiket választhatjuk alapnak, és a nagyobb n-eket erre építjük.",
      code: `function isBeautiful(arr) {
  for (let i = 0; i + 1 < arr.length; i++) {
    if (Math.abs(arr[i] - arr[i + 1]) === 1) return false;
  }
  return true;
}

function permutations(items) {
  if (items.length <= 1) return [items];
  const result = [];
  items.forEach((x, i) => {
    const rest = [...items.slice(0, i), ...items.slice(i + 1)];
    for (const p of permutations(rest)) result.push([x, ...p]);
  });
  return result;
}

for (let n = 1; n <= 5; n++) {
  const items = Array.from({ length: n }, (_, i) => i + 1);
  const good = permutations(items).filter(isBeautiful);
  console.log('n = ' + n + ': ' + good.length + ' szép permutáció');
  if (n === 4) good.forEach((p) => console.log('  ' + JSON.stringify(p)));
}`,
      checks: [
        {
          type: "code",
          q: "Egészítsd ki az ellenőrzőt: a ciklusban térj vissza false értékkel, ha két szomszéd különbsége pontosan 1.",
          before: `function isBeautiful(arr) {
  for (let i = 0; i + 1 < arr.length; i++) {`,
          after: `  }
  return true;
}`,
          options: [
            `    if (arr[i] - arr[i + 1] === 1) return false;`,
            `    if (Math.abs(arr[i] - arr[i + 1]) === 1) return true;`,
            `    if (Math.abs(arr[i] - arr[i + 1]) === 1) return false;`,
            `    if (Math.abs(arr[i] - arr[i + 1]) > 1) return false;`,
          ],
          answer: 2,
          hint: "Használd a Math.abs függvényt, hogy a sorrend ne számítson, és térj vissza false értékkel, ha a különbség 1.",
        },
        { type: "choice", q: "Hány szép permutációja van az 1, 2, 3 számoknak?", options: ["0", "2", "6"], answer: 0, why: "Mind a 6 permutációban van két szomszédos szám, amelyek különbsége 1: például a [1, 3, 2]-ben a 3 és a 2, a [2, 1, 3]-ban a 2 és az 1." },
        { type: "choice", q: "Melyik állítás igaz n = 4-re?", options: ["Pontosan két szép permutáció van: [2, 4, 1, 3] és [3, 1, 4, 2]", "Nincs szép permutáció", "Mind a 24 permutáció szép"], answer: 0, why: "A kipróbálás pontosan két szép permutációt talál. Ezek egymás tükörképei (minden x helyett 5 − x), és mindkettő jó alap a nagyobb n-ekhez." },
      ],
    },
    {
      name: "Az 5-ös és a 6-os hozzáadása",
      idea: "Az alapból indulunk, és egyesével adjuk hozzá a következő számot. Ha az új szám a tömb valamelyik végére kerül, csak egy új szomszédos pár keletkezik, a többi változatlan marad.",
      steps: ["Vedd az alapot, [2, 4, 1, 3]; a következő szám az 5.", "Próbáld ki az 5-öt az elejére és a végére is: mindkét új pár különbsége nagyobb 1-nél, tehát mindkettő jó.", "Folytasd a 6-tal a [2, 4, 1, 3, 5] tömbön: a végére téve az 5 mellé kerülne, de a különbségük 1, ezért csak az elejére jó.", "Az új szám tehát nem kerülhet az előző szám (i − 1) mellé."],
      takeaway: "Egy új szám a tömb valamelyik végére kerülhet, de nem az i − 1 mellé. A 6-nál már csak az egyik vég jó.",
      code: `function isBeautiful(arr) {
  for (let i = 0; i + 1 < arr.length; i++) {
    if (Math.abs(arr[i] - arr[i + 1]) === 1) return false;
  }
  return true;
}

function tryAdd(arr, x) {
  const front = [x, ...arr];
  const back = [...arr, x];
  console.log(x + ' az elejére: ' + JSON.stringify(front) + ' szép? ' + isBeautiful(front));
  console.log(x + ' a végére:   ' + JSON.stringify(back) + ' szép? ' + isBeautiful(back));
}

tryAdd([2, 4, 1, 3], 5);
tryAdd([2, 4, 1, 3, 5], 6);`,
      checks: [
        { type: "choice", q: "Hova tehető a 6 a [2, 4, 1, 3, 5] tömbhöz?", options: ["Csak az elejére", "Csak a végére", "Mindkét végére"], answer: 0, why: "A végére téve a 6 az 5 mellé kerülne, a különbségük 1. Az elejére téve a 2 mellé kerül, a különbségük 4." },
        {
          type: "code",
          q: "Írd meg a függvényt, amely az x számot a tömb végére teszi (az eredeti tömb másolatával).",
          before: `function addToEnd(arr, x) {`,
          after: `}`,
          options: [
            `  return [x, ...arr];`,
            `  return arr.push(x);`,
            `  return [...arr, x];`,
            `  return [...arr, ...x];`,
          ],
          answer: 2,
          hint: "A [...arr, x] egy új tömb, amelynek végén az x áll.",
        },
      ],
    },
    {
      name: "A bővítés szabálya",
      idea: "Általánosítsuk: az i szám mindig azon a végen jó, amelyiken nem az i − 1 áll. Az i − 1 éppen az előbb került az egyik végre, ezért elég az utolsó elemet megnézni.",
      steps: ["Ha a tömb utolsó eleme i − 1, akkor az i-t az elejére tesszük.", "Különben az i-t a végére tesszük.", "Futtasd a szabályt 5-től 10-ig, és nézd meg a tömböt minden lépés után.", "Figyeld meg: az 5, 7, 9 a végére, a 6, 8, 10 az elejére kerül."],
      takeaway: "A szabály egyszerű, és közben magától kialakul, hogy a páros számok előre, a páratlanok hátra kerülnek, anélkül hogy külön csoportokba osztottuk volna őket.",
      code: `const arr = [2, 4, 1, 3];

for (let i = 5; i <= 10; i++) {
  if (arr[arr.length - 1] === i - 1) arr.unshift(i);
  else arr.push(i);
  console.log(i + ' után: ' + JSON.stringify(arr));
}`,
      checks: [
        { type: "choice", q: "Hova kerül a 8 a [6, 2, 4, 1, 3, 5, 7] tömbben?", options: ["Az elejére", "A végére", "Bárhova"], answer: 0, why: "A végén a 7 áll, a 8 mellé nem kerülhet (a különbségük 1). Az elején a 6 van, a különbségük 2." },
        {
          type: "code",
          q: "Írd meg a szabályt: hova kerüljön az i szám a tömbben?",
          before: `function addNext(arr, i) {`,
          after: `  return arr;
}`,
          options: [
            `  if (arr[0] === i - 1) arr.unshift(i);
  else arr.push(i);`,
            `  arr.push(i);`,
            `  if (arr[arr.length - 1] === i - 1) arr.push(i);
  else arr.unshift(i);`,
            `  if (arr[arr.length - 1] === i - 1) arr.unshift(i);
  else arr.push(i);`,
          ],
          answer: 3,
          hint: "Ha a tömb utolsó eleme i − 1, az i az elejére kerül, különben a végére.",
        },
      ],
    },
    {
      name: "Miért marad szép mindig?",
      idea: "Azt is meg kell értenünk, miért nem romlik el a tömb egyik lépésben sem: az új szám mindig olyan szám mellé kerül, amelytől legalább 2-vel különbözik.",
      steps: ["Az 5 a 3 mellé kerül (különbség 2), a 6 a 2 mellé (különbség 4).", "A 7-től kezdve a tömb két végén mindig az i − 1 és az i − 2 áll.", "Az i az i − 2 mellé kerül, a különbségük 2, tehát nem 1.", "A többi szomszédos pár nem változik, ezért a tömb minden lépésben szép marad."],
      takeaway: "Az új szomszédos pár különbsége mindig legalább 2, ezért a bővítés sosem ronthatja el a tömböt.",
      code: `const arr = [2, 4, 1, 3];
let smallest = Infinity;

for (let i = 5; i <= 30; i++) {
  let neighbour;
  if (arr[arr.length - 1] === i - 1) {
    neighbour = arr[0];
    arr.unshift(i);
  } else {
    neighbour = arr[arr.length - 1];
    arr.push(i);
  }
  smallest = Math.min(smallest, Math.abs(i - neighbour));
  if (i <= 9) console.log(i + ' szomszédja: ' + neighbour + ', különbség: ' + Math.abs(i - neighbour));
}
console.log('a legkisebb különbség 5-től 30-ig:', smallest);`,
      checks: [
        { type: "choice", q: "Mi áll a [8, 6, 2, 4, 1, 3, 5, 7] tömb két végén a 9 hozzáadása előtt?", options: ["A 8 és a 7", "A 6 és a 8", "A 2 és a 3"], answer: 0, why: "Az elején a 8 (i − 1), a végén a 7 (i − 2) áll. A 9 a 7 mellé kerül, a különbségük 2." },
        { type: "choice", q: "Miért nem keletkezhet 1 különbségű pár a bővítésnél?", options: ["Mert az új szám sosem kerül az i − 1 mellé, hanem az i − 2 vagy egy távoli szám mellé", "Mert az új szám mindig a tömb közepére kerül", "Mert a tömb rendezett marad"], answer: 0, why: "Az i − 1 az egyik végen áll, az i-t a másik végre tesszük, ahol az i − 2 vagy egy tőle legalább 2-vel különböző szám van." },
      ],
    },
    {
      name: "A teljes megoldás",
      idea: "Kezeljük a legkisebb eseteket, indítsunk az alapból, és alkalmazzuk a szabályt az 5..n számokra.",
      steps: ["n = 1-re az eredmény [1].", "n = 2-re és n = 3-ra NO SOLUTION.", "n ≥ 4-re indulj a [2, 4, 1, 3] alapból (a [3, 1, 4, 2] is jó), és add hozzá az 5..n számokat a szabály szerint.", "Ellenőrizd mindkét alappal az összes n-t 4-től 200-ig."],
      takeaway: "Mindkét alappal működik, és minden n-re szép permutációt ad. A döntések száma n-nel arányos.",
      conclusion: "n = 4-nél jelenik meg először megoldás, és csak két szép permutáció van: [2, 4, 1, 3] és [3, 1, 4, 2]. Ezek bármelyike jó alap. Ezután az 5, 6, 7, … n számokat egyesével adjuk hozzá: ha a tömb utolsó eleme i − 1, az i az elejére kerül, különben a végére. n = 1-re a válasz [1]; n = 2-re és n = 3-ra nincs megoldás.",
      code: `function isBeautiful(arr) {
  for (let i = 0; i + 1 < arr.length; i++) {
    if (Math.abs(arr[i] - arr[i + 1]) === 1) return false;
  }
  return true;
}

function solve(n, base = [2, 4, 1, 3]) {
  if (n === 1) return [1];
  if (n < 4) return 'NO SOLUTION';
  const arr = [...base];
  for (let i = 5; i <= n; i++) {
    if (arr[arr.length - 1] === i - 1) arr.unshift(i);
    else arr.push(i);
  }
  return arr;
}

console.log(solve(3));
console.log(JSON.stringify(solve(8)));
console.log(JSON.stringify(solve(8, [3, 1, 4, 2])));

let allGood = true;
for (let n = 4; n <= 200; n++) {
  for (const base of [[2, 4, 1, 3], [3, 1, 4, 2]]) {
    if (!isBeautiful(solve(n, base))) allGood = false;
  }
}
console.log('mindkét alappal szép minden n 4-től 200-ig:', allGood);`,
      checks: [
        {
          type: "code",
          q: "Add meg a kis esetek kezelését: n = 1-re [1], n = 2-re és n = 3-ra a \"NO SOLUTION\" szöveg.",
          before: `function solve(n) {`,
          after: `  const arr = [2, 4, 1, 3];
  for (let i = 5; i <= n; i++) {
    if (arr[arr.length - 1] === i - 1) arr.unshift(i);
    else arr.push(i);
  }
  return arr;
}`,
          options: [
            `  if (n < 4) return 'NO SOLUTION';`,
            `  if (n === 1) return [1];
  if (n < 5) return 'NO SOLUTION';`,
            `  if (n === 1) return [1];
  if (n < 4) return 'NO SOLUTION';`,
            `  if (n === 1) return 'NO SOLUTION';
  if (n < 4) return [1];`,
          ],
          answer: 2,
          hint: "Két if kell: az egyik n === 1-re, a másik n < 4-re.",
        },
        { type: "choice", q: "Hány lépésben dönt az algoritmus arról, hová kerül egy új szám?", options: ["Állandó számú lépésben: csak az utolsó elemet kell megnézni", "A már elhelyezett számok számával arányos lépésben", "Az összes permutációt végig kell néznie"], answer: 0, why: "Csak az utolsó elemet hasonlítjuk össze i − 1-gyel, így összesen nagyjából n döntés kell. (JavaScript tömbnél az unshift lassabb lehet; ennek okát és a megoldást a feloldódó „Bónusz: optimalizálás” részben nézzük meg.)" },
      ],
    },
    {
      name: "Bónusz: optimalizálás",
      bonus: true,
      hidden: true,
      idea: "A teljes megoldásban a 6, 8, 10, … számokat az unshift függvénnyel tettük a tömb elejére. Ez működik, de nagy n-re lassú lehet, ezért versenyfeladatban érdemes optimalizálni.",
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
      idea: "A megoldást úgy is felépíthetjük, hogy nem egy kész alapot bővítünk, hanem a tömb első részébe a páros, a második részébe a páratlan számokat írjuk. Így unshift-re és külön listákra sincs szükség.",
      steps: ["Írd ki először az összes páros számot növekvő sorrendben (2, 4, 6, …), utána az összes páratlant (1, 3, 5, …). Mindkét csoport szép önmagában, mert a szomszédok különbsége 2.", "Csak a találkozási pont számít: az utolsó páros és az 1 kerül egymás mellé. n ≥ 4-nél az utolsó páros legalább 4, így a különbség legalább 3, tehát a tömb szép.", "Kivételek: n = 1-re [1]; n = 2-re és n = 3-ra nincs megoldás. n = 4-nél már működik ez a sorrend ([2, 4, 1, 3]), a páratlanokkal kezdődő [1, 3, 2, 4]-gyel ellentétben (abban a 3 és a 2 szomszédos).", "A tömböt csak push-sal építjük, két egyszerű ciklussal: nincs unshift, nincs külön lista. Ez O(n). (Ha n páratlan, a páratlanok száma eggyel több, mint a párosaké, tehát a „két fele” nem pontosan egyforma.)", "A kód ellenőrzi az eredményt n = 4-től 200-ig, majd megméri az unshift-es megoldással szemben n = 100 000-re."],
      takeaway: "Ez is helyes megoldás, és csak push-t használ, ezért lineáris idejű. Az unshift-es változatnál érezhetően gyorsabb, és közvetlenül a végleges tömböt építi, külön listák nélkül.",
      conclusion: "Szép permutációt többféleképpen is építhetünk: a [2, 4, 1, 3] alapot kétoldalt bővítve, vagy a párosakat a páratlanok elé írva (n ≥ 4-re). A lényeg, hogy az elemeket push-sal, a végleges sorrendben adjuk hozzá, így O(n) időben végzünk.",
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
console.log('a találkozási pont (4, 1) különbsége n = 4-re:', Math.abs(4 - 1));
console.log(JSON.stringify(solveEvensOdds(9)));

const n = 100000;
let t = Date.now();
solveUnshift(n);
console.log('unshift-es megoldás: ' + (Date.now() - t) + ' ms');
t = Date.now();
solveEvensOdds(n);
console.log('párosak, majd páratlanok: ' + (Date.now() - t) + ' ms');`,
      checks: [
        { type: "choice", q: "Mekkora a különbség a találkozási pontnál a [2, 4, 1, 3, 5] tömbben (n = 5)?", options: ["1", "3", "2"], answer: 1, why: "A találkozási pontot a 4 és az 1 alkotja, a különbségük 3, ezért a tömb szép." },
        { type: "choice", q: "Melyik n-re nem működik a párosak-majd-páratlanok sorrend?", options: ["n = 2 és n = 3", "n = 4", "n = 5-től kezdve minden n-re"], answer: 0, why: "n = 2-nél a [2, 1], n = 3-nál a [2, 1, 3] hibás, mert a 2 és az 1 szomszédos. n ≥ 4-nél az utolsó páros legalább 4, így a találkozási pont különbsége legalább 3." },
        {
          type: "code",
          q: "Építsd fel a tömböt n = 10-re: először a párosakat, utána a páratlanokat, mindkettőt push-sal.",
          before: `const n = 10;
const result = [];`,
          after: `console.log(result);`,
          options: [
            `for (let i = 2; i < n; i += 2) result.push(i);
for (let i = 1; i <= n; i += 2) result.push(i);`,
            `for (let i = 2; i <= n; i += 2) result.push(i);
for (let i = 1; i <= n; i += 2) result.push(i);`,
            `for (let i = 2; i <= n; i += 2) result.push(i);
for (let i = 1; i <= n; i += 2) result.unshift(i);`,
            `for (let i = 2; i <= n; i += 2) {
  result.push(i);
  result.push(i - 1);
}`,
          ],
          answer: 1,
          hint: "Az első ciklus 2-ről, a második 1-ről indul, mindkettő kettesével lép, és n-ig tart (n-et is beleértve).",
        },
      ],
    },
  ],
}

export const distinct = {
  title: "Különböző számok megszámolása",
  intro: "Adott n szám. Számold meg, hány különböző érték van közöttük.",
  note: "A listában minden szám pozitív egész szám: nincs köztük nulla, negatív szám vagy tört.",
  parts: [
    {
      name: "Brute force: minden számot az előzőkkel hasonlítunk",
      idea: "Menjünk végig a számokon, és mindegyiknél nézzük meg, szerepelt-e már korábban. Ha nem, akkor új szám, és eggyel nő a számláló.",
      steps: ["Vegyük sorra a számokat az i. helyen.", "Hasonlítsuk össze az i. számot az előtte lévő összes számmal.", "Ha egyikkel sem egyenlő, akkor még nem láttuk, tehát növeljük a számlálót.", "A számláló a végén a különböző számok száma."],
      takeaway: "Ez helyes, de minden számot az összes előzővel összehasonlít. Ez O(n²) lépés, n = 200 000-re kb. 2 · 10^10, ami túl sok.",
      code: `function countBrute(nums) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let seenBefore = false;
    for (let j = 0; j < i; j++) {
      if (nums[j] === nums[i]) seenBefore = true;
    }
    if (!seenBefore) count++;
  }
  return count;
}

console.log(countBrute([2, 3, 2, 2, 3]));`,
      checks: [
        { type: "choice", q: "Nagyjából hány összehasonlítást végez a brute force n = 200 000-re, ha minden szám különböző?", options: ["kb. 2 · 10^10", "kb. 200 000", "kb. 450"], answer: 0, why: "Az i. számot az előtte lévő i darabbal hasonlítjuk össze, így összesen n(n − 1) / 2, ami n = 200 000-re kb. 2 · 10^10." },
        {
          type: "code",
          q: "Egészítsd ki a belső ciklus törzsét: jelezd, ha az i. szám már szerepelt korábban.",
          before: `function countBrute(nums) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let seenBefore = false;
    for (let j = 0; j < i; j++) {`,
          after: `    }
    if (!seenBefore) count++;
  }
  return count;
}`,
          options: [
            `      if (nums[j] !== nums[i]) seenBefore = true;`,
            `      if (nums[j] === nums[i]) seenBefore = true;`,
            `      if (nums[j] < nums[i]) seenBefore = true;`,
            `      if (nums[j] === nums[i]) seenBefore = false;`,
          ],
          answer: 1,
          hint: "A szám akkor szerepelt már, ha valamelyik korábbi szám egyenlő vele.",
        },
      ],
    },
    {
      name: "Látott számok listája",
      idea: "Ne hasonlítsunk minden számot az összes előzővel, hanem jegyezzük fel egy listában azokat a számokat, amelyekkel már találkoztunk. A végén a lista hossza a válasz.",
      steps: ["Indíts egy üres listát (seen).", "Minden számnál nézd meg, szerepel-e már a listában (includes).", "Ha nem szerepel, tedd bele.", "A végén a lista hossza a különböző számok száma."],
      takeaway: "Ez már a jó ötlet: számon tartjuk, mit láttunk, és a végén megszámoljuk a bejegyzéseket. Csakhogy az includes minden számnál végigmegy a listán, ezért legrosszabb esetben ez is O(n²).",
      code: `function countWithArray(nums) {
  const seen = [];
  for (const x of nums) {
    if (!seen.includes(x)) seen.push(x);
  }
  return seen.length;
}

console.log(countWithArray([2, 3, 2, 2, 3]));`,
      checks: [
        { type: "choice", q: "Miért lassú még mindig a listás megoldás?", options: ["Mert az includes végigmegy a lista elemein, és ez minden számnál akár n lépés", "Mert a push lassú", "Mert a lista nem tud számokat tárolni"], answer: 0, why: "Ha sok különböző szám van, a lista hosszú, és az includes minden számnál végig kell hogy nézze." },
        {
          type: "code",
          q: "Egészítsd ki a ciklust: csak az új számot tedd a listába.",
          before: `function countWithArray(nums) {
  const seen = [];
  for (const x of nums) {`,
          after: `  }
  return seen.length;
}`,
          options: [
            `    if (seen.includes(x)) seen.push(x);`,
            `    seen.push(x);`,
            `    if (!seen.includes(x)) seen.push(x);`,
            `    if (!seen.includes(x)) seen.length++;`,
          ],
          answer: 2,
          hint: "Csak akkor tedd a listába, ha még nincs benne (a !seen.includes(x) feltétellel).",
        },
      ],
    },
    {
      name: "A halmaz (Set)",
      idea: "A JavaScript halmaza (Set) pontosan erre való: nem tárol kétszer ugyanazt az értéket, és gyorsan megmondja, hogy egy érték benne van-e.",
      steps: ["A new Set() egy üres halmazt készít.", "Az add(x) betesz egy értéket; ha már benne van, nem történik semmi.", "A has(x) megmondja, hogy az érték benne van-e, átlagosan állandó idő alatt.", "A size a halmaz bejegyzéseinek száma."],
      takeaway: "A halmaz a „láttam már?” kérdésre átlagosan állandó idő alatt válaszol, és a size mindig a különböző értékek számát adja.",
      code: `const seen = new Set();
seen.add(2);
seen.add(3);
seen.add(2);

console.log('a 3 benne van?', seen.has(3));
console.log('a 7 benne van?', seen.has(7));
console.log('a halmaz mérete:', seen.size);`,
      checks: [
        { type: "choice", q: "Mekkora a halmaz mérete, ha egymás után hozzáadjuk a 4, 4, 9, 4 számokat?", options: ["2", "4", "3"], answer: 0, why: "A halmaz csak a 4-et és a 9-et tartalmazza, a további 4-esek nem kerülnek be újra." },
        { type: "choice", q: "Mi történik, ha olyan számot adunk a halmazhoz, amely már benne van?", options: ["Nem történik semmi, a halmaz nem változik", "A halmazban két példány lesz", "Hibát kapunk"], answer: 0, why: "A halmaz minden értéket legfeljebb egyszer tárol, ezért az ismételt add hatástalan." },
        {
          type: "code",
          q: "Töltsd fel a halmazt a számokkal.",
          before: `const seen = new Set();
const nums = [5, 1, 5, 9];
for (const x of nums) {`,
          after: `}
console.log(seen.size);`,
          options: [
            `  seen.push(x);`,
            `  seen.has(x);`,
            `  seen.add(x);`,
            `  seen.set(x);`,
          ],
          answer: 2,
          hint: "A halmazba az add függvénnyel kell értéket tenni.",
        },
      ],
    },
    {
      name: "Számolás a halmaz méretéből",
      idea: "Most összerakjuk: végigmegyünk a számokon, mindegyiket betesszük a halmazba, és a válasz a halmaz mérete. Nem kell külön megnézni a has-szal, hogy benne van-e, mert az add maga kiszűri az ismétlődést.",
      steps: ["Készíts egy üres halmazt.", "Menj végig a számokon, és tedd mindet a halmazba az add-dal.", "A halmaz mérete a különböző számok száma."],
      takeaway: "A has ellenőrzés fölösleges, az add magától kezeli az ismétlődést. Egy sor a ciklusban és egy a visszatérésnél elég.",
      code: `function countDistinct(nums) {
  const seen = new Set();
  for (const x of nums) seen.add(x);
  return seen.size;
}

console.log(countDistinct([2, 3, 2, 2, 3]));
console.log(countDistinct([1, 2, 3, 4]));
console.log(countDistinct([7, 7, 7]));`,
      checks: [
        { type: "choice", q: "Mi a válasz az [1, 1, 2, 3, 3, 3] listára?", options: ["3", "6", "2"], answer: 0, why: "A különböző számok az 1, 2 és 3, tehát a halmaz mérete 3." },
        {
          type: "code",
          q: "Add meg a függvény visszatérési értékét.",
          before: `function countDistinct(nums) {
  const seen = new Set();
  for (const x of nums) seen.add(x);`,
          after: `}`,
          options: [
            `  return seen.length;`,
            `  return nums.length;`,
            `  return seen;`,
            `  return seen.size;`,
          ],
          answer: 3,
          hint: "A halmaz bejegyzéseinek számát a size adja meg (nem a length).",
        },
      ],
    },
    {
      name: "A teljes megoldás",
      idea: "Ellenőrizzük a halmazos megoldást a brute force-al kis listákon, majd próbáljuk ki egy nagy listán.",
      steps: ["A halmazos megoldás: üres halmaz, az összes szám hozzáadása, a válasz a méret.", "Vesd össze a brute force-al 300 véletlen kis listán.", "Próbáld ki n = 200 000 számra, az értékek 10^9-ig terjedhetnek.", "A brute force ugyanehhez kb. 2 · 10^10 összehasonlítást igényelne."],
      takeaway: "A halmaz minden számnál átlagosan állandó számú lépést végez, ezért az egész megoldás O(n), és n = 200 000-re a másodperc töredéke alatt lefut.",
      conclusion: "Használj egy halmazt (Set), amelybe sorban betesszük a beolvasott számokat: így számon tartjuk, mely számokkal találkoztunk már. A halmaz nem tárol kétszer ugyanazt a számot, ezért a végén a bejegyzéseinek száma (a size) pontosan a különböző számok száma. Egy szám betétele átlagosan állandó idejű, így az egész megoldás O(n).",
      code: `function countDistinct(nums) {
  const seen = new Set();
  for (const x of nums) seen.add(x);
  return seen.size;
}

function countBrute(nums) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let seenBefore = false;
    for (let j = 0; j < i; j++) {
      if (nums[j] === nums[i]) seenBefore = true;
    }
    if (!seenBefore) count++;
  }
  return count;
}

console.log(countDistinct([2, 3, 2, 2, 3]));

let same = true;
for (let r = 0; r < 300; r++) {
  const len = 1 + Math.floor(Math.random() * 30);
  const nums = Array.from({ length: len }, () => 1 + Math.floor(Math.random() * 10));
  if (countDistinct(nums) !== countBrute(nums)) same = false;
}
console.log('egyezik a brute force-al:', same);

const big = Array.from({ length: 200000 }, () => 1 + Math.floor(Math.random() * 1000000000));
const t = Date.now();
const answer = countDistinct(big);
console.log('n = 200 000: ' + answer + ' különböző szám (' + (Date.now() - t) + ' ms)');`,
      checks: [
        { type: "choice", q: "Mennyi a halmazos megoldás időigénye (átlagosan)?", options: ["O(n)", "O(n²)", "O(2^n)"], answer: 0, why: "Minden szám egyszer kerül a halmazba, és az add átlagosan állandó idejű, így összesen n ilyen lépés kell." },
        { type: "choice", q: "Miért elég a halmaz mérete a válaszhoz?", options: ["Mert a halmaz minden értéket csak egyszer tárol, így a bejegyzései éppen a különböző számok", "Mert a halmaz rendezi a számokat", "Mert a halmaz mindig kisebb, mint a lista"], answer: 0, why: "Ha egy szám többször szerepel a listában, a halmazban akkor is csak egy bejegyzése lesz." },
      ],
    },
    {
      name: "Bónusz: tömb halmaz helyett",
      bonus: true,
      hidden: true,
      idea: "Mivel a számok pozitív egészek, a 0-s index sosem egy szám helye. Ezért egy sima tömb is elég: a seen[x] jelzi, láttuk-e már az x számot, a seen[0] pedig a különböző számok számát tárolja.",
      steps: ["Indítsd a tömböt így: seen = [0]. A seen[0] a számláló, a többi hely a „láttam már?” jelzőké.", "Minden x számnál nézd meg a seen[x] értékét. Ha nem 1, akkor az x-et még nem láttuk.", "Ilyenkor írd be, hogy seen[x] = 1, és növeld a seen[0] értékét eggyel.", "A végén a seen[0] a válasz. Ez azért működik, mert minden x ≥ 1, így sosem írunk a 0. indexre, és minden x érvényes tömbindex.", "Nem kell 10^9 elemű tömböt lefoglalni: a JavaScript tömb valójában objektum, és a motorok (például a V8) távoli indexnél ritka, szótár-szerű tárolásra váltanak. A tömb hossza (length) ilyenkor nagy, de csak a ténylegesen beírt bejegyzések foglalnak helyet."],
      takeaway: "Pozitív egészeknél a számláló és a „láttam már?” jelzők egy tömbben elférnek. A tömb valójában objektum, ezért a távoli indexek nem foglalnak le felesleges memóriát. A halmaz általában gyorsabb, de ez a megoldás is lineáris idejű, és nem kell hozzá külön adatszerkezet.",
      conclusion: "Ha a számok pozitív egészek, egyetlen tömb elég: a seen[x] = 1 jelzi, hogy már láttuk az x-et, a seen[0] pedig a különböző számok számát tárolja. Minden lépésben megnézzük a seen[i]-t; ha nem 1, beírjuk az 1-et, és eggyel növeljük a seen[0]-t. Mivel a JavaScript tömb valójában objektum, nagy indexeknél sem foglal le 10^9 elemnyi memóriát, így semmit nem veszítünk a halmazhoz képest memóriában.",
      code: `function countWithArray(nums) {
  const seen = [0];
  for (const x of nums) {
    if (seen[x] !== 1) {
      seen[x] = 1;
      seen[0]++;
    }
  }
  return seen[0];
}

console.log(countWithArray([2, 3, 2, 2, 3]));

const sparse = [0];
sparse[900000000] = 1;
sparse[5] = 1;
console.log('a tömb hossza:', sparse.length);
console.log('ténylegesen tárolt bejegyzések:', Object.keys(sparse).length);

const big = Array.from({ length: 200000 }, () => 1 + Math.floor(Math.random() * 1000000000));
let t = Date.now();
const a = countWithArray(big);
console.log('tömbbel: ' + a + ' (' + (Date.now() - t) + ' ms)');
t = Date.now();
const b = new Set(big).size;
console.log('halmazzal: ' + b + ' (' + (Date.now() - t) + ' ms)');`,
      checks: [
        { type: "choice", q: "Miért használhatjuk a 0-s indexet számlálónak?", options: ["Mert a számok pozitívak, így egyik szám sem kerül a 0. indexre", "Mert a 0-s index mindig gyorsabb", "Mert a tömb első eleme speciális a JavaScriptben"], answer: 0, why: "Minden szám legalább 1, ezért a seen[x] sosem a seen[0]. A számláló nem ütközik egyetlen számmal sem. Ha a 0 is előfordulhatna, a számlálót felülírhatná." },
        { type: "choice", q: "Mi történik, ha egy [0] tömbbe beírjuk, hogy seen[900000000] = 1?", options: ["A tömb hossza nagy lesz, de csak a tényleges bejegyzések foglalnak helyet", "A JavaScript lefoglal 900 000 000 elemet", "Hibát kapunk, mert az index túl nagy"], answer: 0, why: "A JavaScript tömb valójában objektum, és a motorok távoli indexnél ritka, szótár-szerű tárolásra váltanak, ezért csak a beírt bejegyzések foglalnak memóriát." },
        {
          type: "code",
          q: "Egészítsd ki a ciklus törzsét: számolj minden új számot egyszer.",
          before: `function countWithArray(nums) {
  const seen = [0];
  for (const x of nums) {`,
          after: `  }
  return seen[0];
}`,
          options: [
            `    if (seen[x] === 1) {
      seen[x] = 1;
      seen[0]++;
    }`,
            `    if (seen[x] !== 1) {
      seen[0] = 1;
      seen[x]++;
    }`,
            `    if (seen[x] !== 1) {
      seen[x] = 1;
      seen[0]++;
    }`,
            `    seen[x] = 1;
    seen[0]++;`,
          ],
          answer: 2,
          hint: "Ha a seen[x] még nem 1, írd be az 1-et, és növeld a seen[0] értékét eggyel.",
        },
      ],
    },
  ],
}
