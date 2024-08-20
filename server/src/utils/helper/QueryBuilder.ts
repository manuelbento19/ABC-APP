export abstract class QueryBuilder {
    static toCreate(data: any){
        const keys = Object.keys(data);
        const values = Object.values(data);

        return {
            columns: keys.join(', '),
            signals: keys.map(() => '?').join(', '),
            values
        }
    }
    static toUpdate(data: any) {
        const columns = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const values = Object.values(data)

        return {
            columns,
            values
        }
    }
}