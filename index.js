// import jsonfile from "jsonfile";
// import moment from "moment";
// import simpleGit from "simple-git";
// import random from "random";

// const path = "./data.json";

// const markCommit = (x, y) => {
//   const date = moment()
//     .subtract(1, "y")
//     .add(1, "d")
//     .add(x, "w")
//     .add(y, "d")
//     .format();

//   const data = {
//     date: date,
//   };

//   jsonfile.writeFile(path, data, () => {
//     simpleGit().add([path]).commit(date, { "--date": date }).push();
//   });
// };

// const makeCommits = (n) => {
//   if(n===0) return simpleGit().push();
//   const x = random.int(0, 54);
//   const y = random.int(0, 6);
//   const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

//   const data = {
//     date: date,
//   };
//   console.log(date);
//   jsonfile.writeFile(path, data, () => {
//     simpleGit().add([path]).commit(date, { "--date": date },makeCommits.bind(this,--n));
//   });
// };

// makeCommits(100);
import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

// Helper function to get a random date in 2023
const getRandomDateIn2023 = () => {
  // Generate a random date in 2023 between Jan 1 and Dec 31
  const startOfYear = moment('2023-01-01');
  const endOfYear = moment('2023-12-31');

  const randomDate = moment(startOfYear).add(random.int(0, endOfYear.diff(startOfYear, 'days')), 'days');
  return randomDate.format();
};

// Commit function with a specific date
const markCommit = (x, y) => {
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

// Function to make multiple commits
const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  const date = getRandomDateIn2023(); // Get a random date in 2023

  const data = {
    date: date,
  };
  console.log(date); // Optionally log the date

  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(date, { "--date": date }, () => makeCommits(n - 1)); // Decrease n
  });
};

// Make 100 commits
makeCommits(100);
