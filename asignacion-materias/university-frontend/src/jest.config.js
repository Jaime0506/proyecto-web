module.exports = {
  coverageDirectory: "coverage",
  collectCoverage: true,
  reporters: [
    "default",
    ["jest-html-reporters", {
      pageTitle: "Test Report",
      outputPath: "reports/test-report.html"
    }]
  ]
};