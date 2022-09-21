const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file'); // reject returns error
      resolve(data); // resolve returns 200 OK
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePromise('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: READY';
};

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: done getting dog pics!');
  } catch (err) {
    console.log('ERROR');
  }
})();

// console.log('1: Will get dog pics!');
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('3: done getting dog pics!');
//   })
//   .catch((err) => {
//     console.log('ERROR');
//   });
// Async function returns a promise automatically
// instead of logging ready to the console at this point it just tells
// us that x is a promise which at this point is still running and so it's still pending

// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePromise('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to file!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
