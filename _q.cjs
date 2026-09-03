const fs = require('fs')
const s = fs.readFileSync('src/data/site.js', 'utf8')
const re = /^  '([a-z0-9-]+)': \{/gm
let m, marks = []
while ((m = re.exec(s))) marks.push([m.index, m[1]])
for (const slug of ['ahinsa-office-firozabad', 'corporate-office-gwalior']) {
  const i = marks.findIndex((x) => x[1] === slug)
  const b = s.slice(marks[i][0], marks[i + 1] ? marks[i + 1][0] : s.length)
  const list = (k) => {
    const r = b.match(new RegExp(k + ': \[([\s\S]*?)\n    \]'))
    return r ? (r[1].trim() ? 'has items' : 'empty') : 'absent'
  }
  const field = (k) => (b.match(new RegExp(k + ': ([^,\n]*)')) || [, '(none)'])[1]
  console.log(slug.padEnd(26) +
    ' amenities=' + list('amenities').padEnd(10) +
    ' floorPlans=' + list('floorPlans').padEnd(10) +
    ' videoEmbed=' + field('videoEmbed').padEnd(45) +
    ' overviewVideo=' + field('overviewVideo'))
}
