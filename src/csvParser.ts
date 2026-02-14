import * as fs from 'fs'
import csvParser from 'csv-parser'
import { EnrollementCsvRow } from './types'

export async function loadAndParseCsv (filePath:String) {
    const csvData : EnrollementCsvRow[] = []
   return new Promise<EnrollementCsvRow[]>((resolve, reject) => {
    fs.createReadStream(`./${filePath}`)
        .pipe(csvParser())
        .on('data', (row) => {
            csvData.push(row)
        })
        .on('end', () => {
            resolve(csvData)
        })
        .on('error', (error) => {
            reject(error)
        })
   })
}
