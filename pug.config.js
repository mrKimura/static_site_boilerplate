module.exports = {
  locals: {
    readFileSync: require('fs').readFileSync,
  },
  filters: {
    hyphen: text => hyphenAndTypo(text),
    typo: text => typograf(text),
  },
}

function hyphenAndTypo(text) {
  const normalizedText = typograf(text)

  return hyphenate(normalizedText)
}

function typograf(text) {
  return (
    text
      // Minus
      .replace(/\u0020-(\d)/g, '\u0020−$1')

      // Dash
      .replace(/(^|\n|\s|>)-(\s)/g, '$1—$2')

      // Double hyphen
      .replace(/-{2} /g, '— ')

      // Multiple nbsp
      .replace(/\u00a0{2,}|\u00a0\u0020|\u0020\u00a0/g, '\u00a0')

      // Numerical interval
      .replace(/(\d)(\u0020)?[-—](\u0020)?(\d)/g, '$1' + '–' + '$4')

      // Copyright
      .replace(/\([cс]\)/gi, '©')

      // Registered trademark
      .replace(/\(r\)/gi, '®')

      // Trademark
      .replace(/\(tm\)/gi, '™')

      // Rouble
      .replace(/\([рp]\)/gi, '₽')

      // Three dots
      .replace(/\.{3}/g, '…')

      // Sizes
      .replace(/(\d)[xх](\d)/gi, '$1×$2')

      // Open quote
      .replace(/"([a-z0-9\u0410-\u042f\u0401…])/gi, '&laquo;' + '$1')

      // Close quote
      .replace(/([a-z0-9\u0410-\u042f\u0401…?!])"/gi, '$1' + '&raquo;')

      // Open quote
      .replace(new RegExp('"(' + '&laquo;' + '[a-z0-9\u0410-\u042f\u0401…])', 'ig'), '&laquo;' + '$1')

      // Close quote
      .replace(new RegExp('([a-z0-9\u0410-\u042f\u0401…?!]' + '&raquo;' + ')"', 'ig'), '$1' + '&raquo;')

      // Fix HTML open quotes
      .replace(
        new RegExp('([-a-z0-9]+=)' + '[' + '&laquo;' + '&raquo;' + ']' + '([^' + '&laquo;' + '&raquo;' + ']*?)', 'ig'),
        '$1"$2',
      )

      // Fix HTML close quotes
      .replace(
        new RegExp(
          '([-a-z0-9]+=)["]' + '([^>' + '&laquo;' + '&raquo;' + ']*?)' + '[' + '&laquo;' + '&raquo;' + ']',
          'ig',
        ),
        '$1"$2"',
      )

      // Degree
      .replace(new RegExp("([0-6]?[0-9])['′]([0-6]?[0-9])?(\\d+)" + '[' + '&raquo;' + '"]', 'g'), '$1′$2$3″')

      // Prepositions
      .replace(new RegExp('((?:^|\n|\t|[\u00a0\u0020]|>)[A-Z\u0410-\u042f\u0401]{1,2})\u0020', 'ig'), '$1\u00a0')

      .replace(/-(то|ка)\u00a0/gi, '-$1\u0020')

      .replace(new RegExp('(?:s|\t|[\u00a0\u0020])(же?|л[иь]|бы?|ка)([.,!?:])?\u00a0', 'ig'), '\u00a0$1$2\u0020')
  )
}

function hyphenate(input) {
  const RusA = '[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]'
  const RusV = '[аеёиоуыэюя]'
  const RusN = '[бвгджзклмнпрстфхцчшщ]'
  const RusX = '[йъь]'
  const Hyphen = '\xAD'

  const re1 = new RegExp(`(${RusX})(${RusA}${RusA})`, 'ig')
  const re2 = new RegExp(`(${RusV})(${RusV}${RusA})`, 'ig')
  const re3 = new RegExp(`(${RusV}${RusN})(${RusN}${RusV})`, 'ig')
  const re4 = new RegExp(`(${RusN}${RusV})(${RusN}${RusV})`, 'ig')
  const re5 = new RegExp(`(${RusV}${RusN})(${RusN}${RusN}${RusV})`, 'ig')
  const re6 = new RegExp(`(${RusV}${RusN}${RusN})(${RusN}${RusN}${RusV})`, 'ig')

  return input
    .replace(re1, `$1${Hyphen}$2`)
    .replace(re2, `$1${Hyphen}$2`)
    .replace(re3, `$1${Hyphen}$2`)
    .replace(re4, `$1${Hyphen}$2`)
    .replace(re5, `$1${Hyphen}$2`)
    .replace(re6, `$1${Hyphen}$2`)
}
