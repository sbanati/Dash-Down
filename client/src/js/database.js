import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('update the database');
  
  // Creates connection to the database and the version number
  const jateDb = await openDB('jate', 1); 
  // Creates a transaction to jate db, enables readwrite operations
  const tx = jateDb.transaction('jate', 'readwrite'); 
  // Access the object store 'jate' and run objectstore method on tx
  const store = tx.objectStore('jate'); 
  // create request to add or update data as an object with key value pair 'content'
  const request = store.put({ content }); 

 
  const result = await request.catch((error) => {
    console.error('Error while saving data', error);
    throw error;
  });
  console.log('Data saved to the database', result);
  return result;
};





// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('get all data from database');

  // Creates connection to the database and the version number
  const jateDb = await openDB('jate', 1);
  // Creates a transaction to jate db, enables readonly operations
  const tx = jateDb.transaction('jate', 'readonly');
  // Access the object store jate and run objectstore method on tx
  const store = tx.objectStore('jate');
  // create request to get all data 
  const request = store.getAll();

  const result = await request.catch((error) => {
    console.error('Eror while getting data', error);
    throw error;
});
console.log('result.value', result.value);
return result.value;
};

initdb();
