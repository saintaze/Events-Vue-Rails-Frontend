module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: [
    '/node_modules/(?!@fullcalendar/*).+\\.[t|j]s$'
  ]
}