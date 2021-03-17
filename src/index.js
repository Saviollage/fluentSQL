import data from './../database/data.json'
import FluentSQLBuilder from './fluentSQl.js'

/*
^ -> Inicio da String
$ -> Final da String
| -> OR
\ -> Scape Char
*/

const result = FluentSQLBuilder.for(data)
    .where({
        registered: /^(2020)/,
        category: /^(security|developer|quality assurance)$/,
        phone: /\((852|850|810)\)/
    })
    .select(['name', 'company', 'phone', 'category', 'registered'])
    .orderBy('category')
    .limit(2)
    .build()

console.table(result)