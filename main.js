const puppeteer = require("puppeteer");
const { answers } = require("./codes");

//create headless browser
let browserStartPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized", "--disable notifications"],
});

let page;
browserStartPromise
  .then((browserObject) => {
    console.log("Browser opened");
    let browserTabOpenPromise = browserObject.newPage();
    return browserTabOpenPromise;
  })
  .then((newTab) => {
    page = newTab;
    let gPageOpenPromise = newTab.goto("https://www.hackerrank.com/auth/login");
    return gPageOpenPromise;
  })
  .then(() => {
    console.log("Wait for the sign in page to open");
    let waitForSignUpPromise = page.waitForSelector("#input-1", {
      visible: true,
    });
    return waitForSignUpPromise;
  })
  .then(() => {
    console.log("Enter Details");
    let userNamePromise = page.type(
      "#input-1",
      "molakore@livinginsurance.co.uk",
      { delay: 50 }
    );
    return userNamePromise;
  })
  .then(() => {
    let userMailPromise = page.type("#input-2", "repiko@123", { delay: 50 });
    return userMailPromise;
  })
  .then(() => {
    console.log("Sign up");
    let signInPromise = page.keyboard.press("Enter", { delay: 100 });
    return signInPromise;
  })
  .then(() => {
    console.log("wait for login");
    let waitAlgorithmPromise = waitAndClick(".topics-list > .topic-card", page);
    return waitAlgorithmPromise;
  })
  .then(() => {
    let waitFilterPromise = waitAndClick("input[value='warmup']", page);
    return waitFilterPromise;
  })
  .then(() => {
    let waitFor3SecPromise = page.waitFor(3000);
    return waitFor3SecPromise;
  })

  .then(() => {
    let allChallengesArrPromise = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
    );
    return allChallengesArrPromise;
  })
  .then((questionArr) => {
    console.log("Number of questions", questionArr.length);
    let qWillBeSolvedPromise = questionSolver(page, questionArr[0], answers[0]);
    return qWillBeSolvedPromise;
  });

function waitAndClick(selector, cPage) {
  return new Promise((resolve, reject) => {
    //wait for element to be visible on page
    let waitForTheElementPromise = cPage.waitForSelector(selector, {
      visible: true,
    });
    waitForTheElementPromise
      .then(() => {
        let elementClickPromise = cPage.click(selector);
        return elementClickPromise;
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

//return a promise -> that will solve the given question
function questionSolver(page, question, answer) {
  return new Promise(function (resolve, reject) {
    let qWillBeCLickedPromise = question.click();

    qWillBeCLickedPromise
      //click
      // code type
      // ctrl A+ ctrl x
      // click on editor
      // ctrl A+ctrl v
      //  reached to editor
      .then(function () {
        // focus
        let waitFOrEditorToBeInFocus = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return waitFOrEditorToBeInFocus;
      })
      // click
      .then(function () {
        return waitAndClick(".checkbox-input", page);
      })
      .then(function () {
        return page.waitForSelector("textarea.custominput", { visible: true });
      })
      .then(function () {
        return page.type("textarea.custominput", answer, { delay: 10 });
      })
      .then(function () {
        let ctrlIsPressedP = page.keyboard.down("Control");
        return ctrlIsPressedP;
      })
      .then(function () {
        let AIsPressedP = page.keyboard.press("A", { delay: 100 });
        return AIsPressedP;
      })
      .then(function () {
        return page.keyboard.press("X", { delay: 100 });
      })
      .then(function () {
        let ctrlIsPressedP = page.keyboard.up("Control");
        return ctrlIsPressedP;
      })
      .then(function () {
        // focus
        let waitFOrEditorToBeInFocus = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return waitFOrEditorToBeInFocus;
      })
      .then(function () {
        let ctrlIsPressedP = page.keyboard.down("Control");
        return ctrlIsPressedP;
      })
      .then(function () {
        let AIsPressedP = page.keyboard.press("A", { delay: 100 });
        return AIsPressedP;
      })
      .then(function () {
        let AIsPressedP = page.keyboard.press("V", { delay: 100 });
        return AIsPressedP;
      })
      .then(function () {
        let ctrlIsPressedP = page.keyboard.up("Control");
        return ctrlIsPressedP;
      })
      .then(function () {
        return page.click(".hr-monaco__run-code", { delay: 50 });
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        console.log(err);
        reject(err);
      });
  });
}
