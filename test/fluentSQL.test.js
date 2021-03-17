import { expect, describe, test } from "@jest/globals"
import FluentSQLBuilder from "../src/fluentSQl"

const data = [
    {
        id: 0,
        name: 'Sávio Lage',
        category: 'developer'
    },
    {
        id: 1,
        name: 'Henrique Miranda',
        category: 'developer'
    }
]

describe('Teste Suite for FluentSQL Builder', () => {
    test('#for should return a FluentSQlBuilder instance', () => {
        const result = FluentSQLBuilder.for(data)
        const expected = new FluentSQLBuilder({ database: data })
        expect(result).toStrictEqual(expected)
    })

    test('#build should return the empty object', () => {
        const result = FluentSQLBuilder.for(data).build()

        const expected = data
        expect(result).toStrictEqual(expected)
    })

    test('#limit given a collection it should limit results', () => {
        const result = FluentSQLBuilder.for(data)
            .limit(1)
            .build()

        const expected = [data[0]]
        expect(result).toStrictEqual(expected)
    })

    test('#where given a collecion it should filter data', () => {
        const result = FluentSQLBuilder.for(data)
            .where({
                category: /^dev/
            })
            .build()

        const expected = data.filter(({ category }) => category.slice(0, 3) === 'dev')
        expect(result).toStrictEqual(expected)
    })

    test('#select given a collecion it should return only specific fields', () => {
        const result = FluentSQLBuilder.for(data)
            .select(['name', 'category'])
            .build()

        const expected = data.map(({ name, category }) => ({ name, category }))
        expect(result).toStrictEqual(expected)
    })

    test('#orderBy given a collecion it should order results by fields', () => {
        const result = FluentSQLBuilder.for(data)
            .orderBy('name')
            .build()

        const expected = [
            {
                id: 1,
                name: 'Henrique Miranda',
                category: 'developer'
            },
            {
                id: 0,
                name: 'Sávio Lage',
                category: 'developer'
            }
        ]
        expect(result).toStrictEqual(expected)
    })

    test('pipeline', () => {
        const result = FluentSQLBuilder.for(data)
            .limit(3)
            .where({ category: "developer" })
            .where({ name: /H/ })
            .select(['name', 'id'])
            .orderBy('id')
            .build()

        const expected = data.filter(({ id }) => id === 1).map(({ name, id }) => ({ name, id }))

        expect(result).toStrictEqual(expected)
    })
})