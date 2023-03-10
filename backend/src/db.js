const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();
const collection = firestore.collection('CHARACTERS');

function extractData(snapshot) {
  const dataArray = [];
  snapshot.forEach((d) => {
    dataArray.push(d.data());
  });

  return dataArray;
}

async function loadAllPublicPCs(req) {
  const snapshot = await collection.where('_IS_PUBLIC', '==', true).get();
  const data = extractData(snapshot);

  if (data == undefined) {
    return { success: false, status: 500 };
  }

  return { pcs: data };
}

module.exports = {
  collection,
  extractData,
  loadAllPublicPCs,
};
