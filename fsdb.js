const fs = require("fs");
const path = require("path");

// database path
const DB_FILE = path.join(__dirname, "data.json");

const fsdb = {
  // Read database records
  readAll: async () => {
    try {
      if (!fs.existsSync(DB_FILE)) {
        return []; 
      }
      const data = await fs.promises.readFile(DB_FILE, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading database file:", error);
      return [];
    }
  },

  write: async (record) => {
    try {
      const data = await fsdb.readAll();
      data.push(record); // Add the new record
      await fs.promises.writeFile(DB_FILE, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error("Error writing to database file:", error);
      return false;
    }
  },

// deleting method
  delete: async (ticketNumber) => {
    try {
      const data = await fsdb.readAll();
      const server = data.findIndex(
        (record) => record.ticketNumber === ticketNumber
      );
      if (server === -1) {
        return false; 
      }
      data.splice(server, 1); // remove record if its found
      await fs.promises.writeFile(DB_FILE, JSON.stringify(data, null, 2));
      return true;
    } 
  },
};

module.exports = fsdb;
