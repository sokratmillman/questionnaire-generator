const db = require("../models");
const multer = require("multer");
const path = require("path");
const EasyYandexS3 = require("easy-yandex-s3");
const md5 = require("md5");
const DataFrame = require("dataframe-js").DataFrame;
require("dotenv").config();
const Survey = db.surveys;
const Op = db.Sequelize.Op;

const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  Bucket: "questionnaire-generator",
  debug: false,
});

function return_n_by_m(
  res,
  filename,
  n,
  m,
  questionDescription,
  filtering = null
) {
  let result = [];
  DataFrame.fromCSV(filename).then((df) => {
    if (filtering) {
      filtering.unshift(df.listColumns()[0]);
      df = df.select(...filtering);
    }

    result = df.toArray();
    result.unshift(df.listColumns());
    let allArrays = [];
    let i = 1;
    while (i < result.length) {
      let j = 1;
      while (j < result[0].length) {
        let newitem = [result[0]].concat(result.slice(i, i + n));
        allArrays.push(newitem.map((d) => [d[0]].concat(d.slice(j, j + m))));
        j = Math.min(j + m, result[0].length);
      }
      i = Math.min(i + n, result.length);
    }
    res.send({
      description: questionDescription,
      data: allArrays,
    });
  });
}

function putInCell(value, currValue) {
  let options = currValue.split("\n");
  let separated = options.map((item) => item.split("\t—\t"));
  for (let i = 0; i < separated.length; i++) {
    if (separated[i][0] == value) {
      separated[i][1] = +separated[i][1] + 1;
      break;
    }
  }
  let res = separated.map((item) => item.join("\t—\t"));
  return res.join("\n");
}

exports.create = async (req, res, next) => {
  if (!req.body.title || !req.body.filtering || !req.files[0]) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //6b59ee54b69c969b7af340485c7231bd
  //8c1c0e86477b77883ef9a1c646d0a636

  //console.log("NAME ", md5(Date.now() + "_" + req.files[0].originalname)+".csv");
  let buffer = req.files[0].buffer;
  const responseForDefault = await s3.Upload(
    {
      buffer,
      name: md5(Date.now() + "_" + req.files[0].originalname) + ".csv",
    },
    "/default"
  );
  let responseForResults;
  let resultBuffer;
  DataFrame.fromCSV(responseForDefault.Location)
    .then(async (df) => {
      let arrayed = df.toArray();
      let cols = df.listColumns();
      for (let row of arrayed) {
        for (let i = 1; i < row.length; i++) {
          let options = row[i]
            .split("\n")
            .map((item) => (item += "\t—\t0"))
            .join("\n");
          row[i] = options;
        }
      }
      let newdf = new DataFrame(arrayed).renameAll(cols);
      let resultBuffer = newdf.toCSV(true);
      responseForResults = await s3.Upload(
        {
          buffer: resultBuffer,

          name: md5(Date.now() + "_" + req.files[0].originalname) + ".csv",
        },
        "/results"
      );
    })
    .then((data) => {
      const survey = {
        title: req.body.title,
        questionDescription: req.body.questionDescription,
        filepath: responseForDefault.Location,
        resultFilepath: responseForResults.Location,
        author: Number(req.query.authorId),
        filtering: req.body.filtering === "true" ? true : false,
        filteringQuestion: req.body.filteringQuestion,
        windowWidth: Number(req.body.width),
        windowHeight: Number(req.body.height),
      };
      Survey.create(survey)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the survey.",
          });
        });
    });
};

exports.getForAuthor = (req, res) => {
  Survey.findAll({
    where: {
      author: Number(req.query.id),
    },
  })
    .then((data) => {
      res.send(data.map((x) => x.dataValues));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getById = (req, res) => {
  Survey.findByPk(Number(req.params.id))
    .then((data) => {
      let filepath = data.filepath;
      let m = data.windowWidth;
      let n = data.windowHeight;
      let result = [];
      let filtering = null;
      let desc = data.questionDescription;
      return_n_by_m(res, filepath, n, m, desc);
    })
    .catch((err) => {
      res.status(404).send(`Error happened`);
    });
};

exports.postById = (req, res) => {
  Survey.findByPk(Number(req.params.id)).then((data) => {
    let resultFilepath = data.resultFilepath;
    let answer = JSON.parse(req.body.data);
    DataFrame.fromCSV(resultFilepath).then(async (df) => {
      const arrayed = df.toArray();
      const cols = df.listColumns();
      const metrics = arrayed.map((item) => item[0]);
      for (let frame of answer) {
        for (let i = 1; i < frame.length; i++) {
          for (let j = 1; j < frame[i].length; j++) {
            let colIndex = cols.indexOf(frame[0][j]);
            let rowIndex = metrics.indexOf(frame[i][0]);
            arrayed[rowIndex][colIndex] = putInCell(
              frame[i][j],
              arrayed[rowIndex][colIndex]
            );
          }
        }
      }
      let result = new DataFrame(arrayed, (columns = cols));
      const resultStr = result.toCSV(true);
      let newResultFilepath = await s3.Upload(
        {
          buffer: resultStr,
          name: path.basename(resultFilepath),
        },
        "/results"
      );
      res.send(newResultFilepath);
    });
  });
};
