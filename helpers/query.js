import { connection } from "./createConnection.js";

export const executeQuery = (() => {
    
    const fetchTerminal = async (serialNumber) => {
        const [rows] = await connection.execute(`
            SELECT id, is_enabled, serial_num, terminal_id, status, merchant_name
            FROM terminal 
            WHERE serial_num = ${serialNumber}`, [1]);  

        let terminal = {
            id: rows[0].id,
            serialNumber: rows[0].serial_num,
            terminalId: rows[0].terminal_id,
            status: rows[0].status,
            merchant: rows[0].merchant_name,
            isEnabled: rows[0].is_enabled,
        }

        if (rows.length > 0) {
            const isActiveBuffer = rows[0].is_enabled;
            terminal.isEnabled = isActiveBuffer && isActiveBuffer.length > 0 && isActiveBuffer[0] === 1;
        }
        return terminal  
    }

    const enableTerminal = async (id, isEnabled, serial) => {
        try {
            const [rows] = await connection.execute(
            `UPDATE  terminal t 
                SET t.is_enabled = ${isEnabled}
                WHERE t.id = ${id} AND t.serial_num = '${serial}'`,
                [id, isEnabled, serial]
            );
            // console.log(`Rows affected: ${rows.affectedRows}`);
            // console.log(`Terminal [${serial}] is disabled.`);
            return rows.affectedRows;
        } catch (err) {
            console.error('Error updating terminal:', err);
            throw err;
        }
    }

    const fetchMerchant = async (id, merchantName) => {
        const [rows] = await connection.execute(`
            SELECT id, name, merchant_address, last_updated, enabled
            FROM merchant 
            WHERE id = ${id} AND name LIKE '%${merchantName}%'`);  

        let merchant = {
            id: rows[0].id,
            merchantName: rows[0].name,
            address: rows[0].merchant_address,
            last_updated: rows[0].last_updated,
            isEnabled: rows[0].enabled,
        }

        if (rows.length > 0) {
            const isActiveBuffer = rows[0].enabled;
            merchant.isEnabled = isActiveBuffer && isActiveBuffer.length > 0 && isActiveBuffer[0] === 1;
        }
        return merchant 
    }

    const enableMerchant = async (id, isEnabled, merchantName) => {
        try {
            const [rows] = await connection.execute(
                `UPDATE  merchant m
                SET  m.enabled = ${isEnabled}
                WHERE m.id = ${id} AND m.name LIKE '%${merchantName}%'`, [id, isEnabled, merchantName] );

            return rows.affectedRows;
        } catch (err) {
            console.error('Error updating merchant:', err);
            throw err;
        }
    }

    const endConnection = async () => {
        connection.end((error) => {
            if (error) {
                console.error('Error closing connection:', error.message);
                return;
            }
            console.log('Connection terminated gracefully.');
        });
    }

    return { fetchTerminal, enableTerminal, fetchMerchant, enableMerchant, endConnection }
})();

