import {Stack} from "expo-router";
import {SQLiteDatabase, SQLiteProvider} from "expo-sqlite";

export default function RootLayout() {
    const createDB = async (db: SQLiteDatabase) => {

        // TODO REMOVE
        await db.execAsync(`DROP TABLE events`)
        await db.execAsync(`CREATE TABLE IF NOT EXISTS events
                            (
                                id
                                INTEGER
                                PRIMARY
                                KEY
                                AUTOINCREMENT,
                                name
                                TEXT
                                NOT
                                NULL
                            );`)

    }
    return (
        <SQLiteProvider databaseName="tokenrave.db" onInit={createDB}>
            <Stack screenOptions={{
                headerShown: false
            }}/>
        </SQLiteProvider>);
}
