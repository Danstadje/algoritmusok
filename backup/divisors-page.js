// Backup of the removed "sum of divisors" subpage (not imported anywhere).
export const divisors = {
  title: "Egy szám osztóinak összege",
  intro: "Adott egy n szám. Add össze az összes olyan számot, amely osztója n-nek. n = 12-re az osztók 1, 2, 3, 4, 6 és 12, az összegük tehát 28 (a CSES 1082 feladat ötletének egy része). A cél, hogy ezt gyorsan kiszámoljuk, még nagy n-re is. Az első öt lépés egyetlen számmal foglalkozik; a bónusz rész után az összeget számoljuk ki az összes, n-ig terjedő számra. Minden lépés egyetlen új részletet ad hozzá.",
  parts: [
    {
      name: "Az egyenes út",
      idea: "Próbáljuk ki az 1-től n-ig minden számot, és adjuk hozzá az összeghez, ha osztója n-nek.",
      steps: ["Futtass egy ciklust i-vel 1-től n-ig.", "Ha n % i értéke 0, akkor i osztó.", "Add hozzá az összeghez az összes osztót."],
      takeaway: "Ez helyes, de n lépés kell hozzá. n = 1 000 000 000 000-ra ez túl sokáig tartana.",
      code: `function sumDivisorsSlow(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) sum += i;
  }
  return sum;
}

console.log(sumDivisorsSlow(12));
console.log(sumDivisorsSlow(13));`,
      checks: [
        { type: "choice", q: "Nagyjából hány lépést kér az egyenes út n = 1000-re?", options: ["kb. 1000", "kb. 32", "kb. 500 000"], answer: 0, why: "A ciklus 1-től n-ig fut, tehát n lépés kell." },
        {
          type: "code",
          q: "Egészítsd ki az egyenes utat: add hozzá i-t, ha osztója n-nek.",
          before: `function sumDivisorsSlow(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {`,
          after: `  }
  return sum;
}`,
          options: [
            `    if (n / i === 0) sum += i;`,
            `    if (i % n === 0) sum += i;`,
            `    if (n % i === 0) sum += i;`,
            `    sum += n % i;`,
          ],
          answer: 2,
          hint: "Az i akkor osztó, ha n % i === 0.",
        },
      ],
    },
    {
      name: "Az osztók párokban járnak",
      idea: "Ha i osztja n-et, akkor n / i is osztja n-et, és i × (n / i) = n. Minden osztónak van párja.",
      steps: ["Írd ki minden osztót a párjával együtt.", "Nézd meg a listát n = 36-ra.", "Vedd észre, hogy a párok fordított sorrendben megismétlődnek."],
      takeaway: "Egy osztó megtalálásával a párját ingyen megkapjuk, és minden pár kétszer szerepel.",
      code: `const n = 36;

for (let i = 1; i <= n; i++) {
  if (n % i === 0) {
    console.log(i + ' x ' + (n / i) + ' = ' + n);
  }
}`,
      checks: [
        { type: "choice", q: "Mi a 4 párja a 28 osztói között?", options: ["7", "14", "24"], answer: 0, why: "28 / 4 = 7, és 4 × 7 = 28." },
      ],
    },
    {
      name: "Minden pár egyik tagja kicsi",
      idea: "Minden párban a kisebb szám legfeljebb n négyzetgyöke. Ha mindkettő nagyobb lenne √n-nél, a szorzatuk nagyobb lenne n-nél.",
      steps: ["Több n értékre vedd minden pár kisebbik számát.", "Hasonlítsd össze a Math.sqrt(n) értékkel.", "Sosem lépi túl."],
      takeaway: "Minden párnak van egy tagja 1 és √n között, így a √n-ig tartó keresés minden párt megtalál.",
      code: `for (const n of [12, 36, 97, 100]) {
  let ok = true;
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      const smaller = Math.min(i, n / i);
      if (smaller > Math.sqrt(n)) ok = false;
    }
  }
  console.log(n + ': minden pár kisebbik tagja <= sqrt(n)? ' + ok);
}`,
      checks: [
        { type: "choice", q: "Miért nem lehet mindkét osztó nagyobb √n-nél?", options: ["Mert akkor a szorzatuk nagyobb lenne n-nél", "Mert az osztók mindig kisebbek n felénél", "Mert a négyzetgyök mindig egész szám"], answer: 0, why: "Ha i > √n és n / i > √n, akkor i × (n / i) > n, de a szorzatuk éppen n." },
      ],
    },
    {
      name: "Ciklus csak a négyzetgyökig",
      idea: "Futtasd i-t 1-től addig, amíg i × i ≤ n, és ha i osztója n-nek, gyűjtsd össze i-t és n / i-t is.",
      steps: ["Az i * i <= n feltétel nagyjából √n-nél állítja meg a ciklust.", "Add hozzá i-t és a párját, n / i-t.", "Hasonlítsd össze a 12 és a 36 listáját."],
      takeaway: "Csak nagyjából √n lépés kell, de 36-nál a 6 kétszer szerepel. A négyzetszám önmagával alkot párt.",
      code: `function collect(n) {
  const found = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) found.push(i, n / i);
  }
  return found;
}

console.log(collect(12));
console.log(collect(36));`,
      checks: [
        {
          type: "code",
          q: "Írd meg a gyűjtést: a ciklus csak a négyzetgyökig fusson, és mindkét osztót tedd a listába.",
          before: `function collect(n) {
  const found = [];`,
          after: `  return found;
}`,
          options: [
            `  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) found.push(i, n / i);
  }`,
            `  for (let i = 1; i <= n; i++) {
    if (n % i === 0) found.push(i, n / i);
  }`,
            `  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) found.push(i);
  }`,
            `  for (let i = 1; i * i < n; i++) {
    if (n % i === 0) found.push(i, n / i);
  }`,
          ],
          answer: 0,
          hint: "A ciklusfeltétel: i * i <= n. A push két értéket is fogad.",
        },
        { type: "choice", q: "Hányszor szerepel a 6 a collect(36) eredményében?", options: ["egyszer", "kétszer", "egyszer sem"], answer: 1, why: "Ha i = 6, akkor n / i is 6, így mindkettőt hozzáadjuk." },
      ],
    },
    {
      name: "Összeadás",
      idea: "Add hozzá i-t és n / i-t egy futó összeghez, a párt kihagyva, ha egyenlő i-vel. Ezután hasonlítsd össze a lassú változattal.",
      steps: ["Indítsd az összeget 0-ról.", "Minden √n-ig tartó i osztóra add hozzá i-t.", "Add hozzá n / i-t is, kivéve, ha ugyanaz a szám.", "Ellenőrizd a lassú változattal n = 1-től 2000-ig, majd próbálj ki egy hatalmas n-et."],
      takeaway: "A gyors változat egyezik a lassúval, és az n = 1 000 000 000 000 esetet azonnal kezeli.",
      conclusion: "Elég az i-t 1-től addig futtatni, amíg i × i ≤ n. Ha i osztja n-et, add hozzá az összeghez i-t és n / i-t is. Ha i és n / i ugyanaz a szám, csak egyszer add hozzá. Ez nagyjából √n lépés n helyett.",
      code: `function sumDivisorsSlow(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) sum += i;
  }
  return sum;
}

function sumDivisors(n) {
  let sum = 0;
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      sum += i;
      if (i !== n / i) sum += n / i;
    }
  }
  return sum;
}

let same = true;
for (let n = 1; n <= 2000; n++) {
  if (sumDivisors(n) !== sumDivisorsSlow(n)) same = false;
}
console.log('a gyors egyezik a lassúval n = 1..2000-re:', same);
console.log(sumDivisors(1000000000000));`,
      checks: [
        {
          type: "code",
          q: "Egészítsd ki az összeadást úgy, hogy a négyzetgyök ne számítson kétszer.",
          before: `function sumDivisors(n) {
  let sum = 0;
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {`,
          after: `    }
  }
  return sum;
}`,
          options: [
            `      sum += i + n / i;`,
            `      sum += i;`,
            `      sum += i;
      if (i !== n) sum += n / i;`,
            `      sum += i;
      if (i !== n / i) sum += n / i;`,
          ],
          answer: 3,
          hint: "Add hozzá i-t, majd n / i-t is, de csak ha a kettő különbözik.",
        },
        { type: "choice", q: "Mi történne n = 36-ra, ha elhagynánk az i !== n / i feltételt?", options: ["A 6-ot kétszer adnánk hozzá, az eredmény 97 lenne", "Az eredmény 91 maradna", "A program végtelen ciklusba kerülne"], answer: 0, why: "A helyes összeg 91, és a 6 többletként még egyszer bekerülne: 91 + 6 = 97." },
      ],
    },
    {
      name: "Bónusz: versenyfeladat",
      bonus: true,
      hidden: true,
      idea: "Versenyfeladatokban (például a CSES-en) az eredmény gyakran túl nagy lenne ahhoz, hogy elférjen egy számban. Ilyenkor azt kérik, hogy csak az eredmény 1 000 000 007-tel vett maradékát add meg. A szabályok egyszerűek, de van néhány csapda.",
      steps: ["Miért éppen 1 000 000 007? Ez egy prímszám, és épp akkora, hogy két maradék szorzata (kb. 10^18) még belefér egy 64 bites előjeles egész számba. Prímmodulusnál az osztás is megoldható.", "Összeadás és szorzás: a maradékot a számolás közben is bármikor vehetjük. (a + b) % m = ((a % m) + (b % m)) % m, és ugyanez igaz a szorzásra is. Így a számok sosem nőnek m fölé.", "Kivonás: JavaScriptben a % negatív számra negatív maradékot ad. Ezért (a − b) helyett ((a − b) % m + m) % m kell, hogy az eredmény 0 és m − 1 között legyen.", "Osztás: nem lehet egyszerűen osztani. Prím m esetén b-vel osztani annyi, mint b^(m−2)-vel szorozni (ez a „modulo inverz”). Például a 2-vel osztás az 500 000 004-gyel való szorzással egyenértékű.", "JavaScriptben a Number csak 2^53-ig pontos. Két maradék szorzata ennél nagyobb lehet, ezért a szorzásokhoz BigInt kell."],
      takeaway: "A maradékos számolás ugyanazt a maradékot adja, mint a teljes szám kiszámítása és utólagos maradékképzés, de a számok végig kicsik maradnak. Kivonásnál és osztásnál kell különösen vigyázni.",
      code: `const MOD = 1000000007n;

// Összeadás és szorzás: a maradékokból is ugyanaz jön ki
const a = 123456789012345678901234567890n;
const b = 987654321098765432109876543210n;
console.log(String((a + b) % MOD), String(((a % MOD) + (b % MOD)) % MOD));
console.log(String((a * b) % MOD), String(((a % MOD) * (b % MOD)) % MOD));

// Kivonás: a % negatív is lehet
console.log(String((5n - 8n) % MOD));
console.log(String((((5n - 8n) % MOD) + MOD) % MOD));

// Osztás: szorzás a modulo inverzzel (MOD prím)
function modPow(base, exp, mod) {
  let result = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    base = (base * base) % mod;
    exp /= 2n;
  }
  return result;
}
const inv2 = modPow(2n, MOD - 2n, MOD);
console.log('a 2 inverze:', String(inv2), '| 2 * inverz maradéka:', String((2n * inv2) % MOD));

// Number és BigInt: a helyes válasz 1
console.log('Number:', (1000000006 * 1000000006) % 1000000007);
console.log('BigInt:', String((1000000006n * 1000000006n) % 1000000007n));`,
      checks: [
        { type: "choice", q: "Mennyi (7 + 1 000 000 006) maradéka 1 000 000 007-tel osztva?", options: ["6", "13", "1 000 000 013"], answer: 0, why: "7 + 1 000 000 006 = 1 000 000 013, és ennek 1 000 000 007-tel vett maradéka 6." },
        {
          type: "code",
          q: "Egészítsd ki a modulo kivonást úgy, hogy az eredmény sosem legyen negatív.",
          before: `const MOD = 1000000007n;
function subMod(a, b) {`,
          after: `}`,
          options: [
            `  return (a - b) % MOD;`,
            `  return ((a - b) % MOD + MOD) % MOD;`,
            `  return (a % MOD - b % MOD);`,
            `  return (a + b) % MOD;`,
          ],
          answer: 1,
          hint: "A % negatív számra negatív maradékot adhat. Adj hozzá MOD-ot, majd vegyél még egy maradékot.",
        },
        { type: "choice", q: "Miért kell a maradékos szorzásokhoz BigInt JavaScriptben?", options: ["Mert két maradék szorzata meghaladhatja a Number pontos tartományát (2^53)", "Mert a BigInt gyorsabb", "Mert a Number nem tud osztani"], answer: 0, why: "Két maradék szorzata akár 10^18 körüli, a Number viszont csak 2^53 ≈ 9·10^15-ig pontos." },
      ],
    },
    {
      name: "Nagy számok: sok szám egyszerre",
      idea: "Most egy nehezebb kérdés: add össze az 1-től n-ig minden szám osztóösszegét. n = 10-re ez 1 + 3 + 4 + 7 + 6 + 12 + 8 + 15 + 13 + 18 = 87.",
      steps: ["Használd újra a négyzetgyökös függvényt minden k-ra 1-től n-ig.", "Add össze az eredményeket.", "Írd ki a válaszokat n = 10-re és n = 1000-re."],
      takeaway: "Ez működik, de nagyjából n × √n lépés kell hozzá. n = 1 000 000 000 000-ra ez lehetetlen.",
      code: `function sumDivisors(n) {
  let sum = 0;
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      sum += i;
      if (i !== n / i) sum += n / i;
    }
  }
  return sum;
}

function sumUpTo(n) {
  let total = 0;
  for (let k = 1; k <= n; k++) total += sumDivisors(k);
  return total;
}

console.log(sumUpTo(10));
console.log(sumUpTo(1000));`,
      checks: [
        { type: "choice", q: "Nagyjából hány lépés kell a sumUpTo függvénynek n = 1 000 000-ra?", options: ["kb. 10^9", "kb. 10^6", "kb. 10^3"], answer: 0, why: "n × √n = 10^6 × 10^3 = 10^9 lépés." },
      ],
    },
    {
      name: "Nagy számok: fordítsuk meg az összeget",
      idea: "Ahelyett, hogy azt kérdeznénk, milyen osztói vannak egy számnak, kérdezzük meg, hány számot oszt a d. A d a saját többszöröseit, d, 2d, 3d, … n-ig osztja, ez floor(n / d) számot jelent.",
      steps: ["Minden d egyszer hozzáadja d-t az összeghez d minden n-ig tartó többszöröséért.", "Az összeg tehát a d × floor(n / d) értékek összege d = 1-től n-ig.", "Hasonlítsd össze az előző lépéssel."],
      takeaway: "Egyetlen, n lépéses ciklus váltja ki a beágyazott munkát: minden d-t annyiszor számolunk, ahány többszöröse van n-ig. Nagy n-re (például 10^12) ez még lassú.",
      code: `function sumUpToFlipped(n) {
  let total = 0;
  for (let d = 1; d <= n; d++) {
    total += d * Math.floor(n / d);
  }
  return total;
}

console.log(sumUpToFlipped(10));
console.log(sumUpToFlipped(1000));`,
      checks: [
        { type: "choice", q: "Hányszor járul hozzá a d = 3 az összeghez n = 10 esetén?", options: ["3", "10", "1"], answer: 0, why: "A 3 a 3, 6 és 9 osztója, tehát háromszor szerepel (floor(10 / 3) = 3)." },
        {
          type: "code",
          q: "Egészítsd ki a megfordított összeget.",
          before: `function sumUpToFlipped(n) {
  let total = 0;
  for (let d = 1; d <= n; d++) {`,
          after: `  }
  return total;
}`,
          options: [
            `    total += Math.floor(n / d);`,
            `    total += d * Math.floor(n / d);`,
            `    total += d * (n % d);`,
            `    total += d * Math.ceil(n / d);`,
          ],
          answer: 1,
          hint: "A d annyiszor számít, ahány többszöröse van n-ig: Math.floor(n / d).",
        },
      ],
    },
  ],
}
