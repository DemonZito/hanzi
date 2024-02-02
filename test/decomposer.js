const assert = require('assert');
const hanzi = require('../index.js');

hanzi.start();

describe('hanzidecomposer', function() {
  it('checks if component exists', function() {
    assert(hanzi.ifComponentExists('爱'));
  });
  it("checks if component don't exist", function() {
    assert(!hanzi.ifComponentExists('$'));
  });

  it('detects invalid input', function() {
    assert.deepEqual(hanzi.decompose('a'), {
      character: 'a',
      components1: ['a'],
      components2: ['a'],
      components3: ['a']
    });
  });

  it("gets a character's pinyin", function() {
    assert.deepEqual(hanzi.getPinyin('的'), ['de5', 'di2', 'di4']);
  });

  it("gets a radical's meaning", function() {
    assert(hanzi.getRadicalMeaning('氵'), 'water');
    assert(hanzi.getRadicalMeaning('爫'), 'claw/talon');
    assert(hanzi.getRadicalMeaning('冖'), 'cover');
    assert(hanzi.getRadicalMeaning('𠂇'), 'left hand');
    assert(hanzi.getRadicalMeaning('又'), 'right hand');
    assert(hanzi.getRadicalMeaning('心'), 'heart');
    assert(hanzi.getRadicalMeaning('夂'), 'go');
  });

  it('gets character frequency data for simplified character', function() {
    assert.deepEqual(hanzi.getCharacterFrequency('热'), {
      number: '606',
      character: '热',
      count: '67051',
      percentage: '79.8453694124',
      pinyin: 're4',
      meaning: 'heat/to heat up/fervent/hot (of weather)/warm up'
    });
    assert.deepEqual(hanzi.getCharacterFrequency('⺙'), 'Character not found');
    assert.deepEqual(hanzi.getCharacterFrequency('好'), {
      number: '82',
      character: '好',
      count: '411866',
      percentage: '38.1712637099',
      pinyin: 'hao3/hao4',
      meaning: 'good/well, be fond of'
    });
  });

  it('gets character frequency data for traditional character', function() {
    assert.deepEqual(hanzi.getCharacterFrequency('熱'), {
      number: '606',
      character: '热',
      count: '67051',
      percentage: '79.8453694124',
      pinyin: 're4',
      meaning: 'heat/to heat up/fervent/hot (of weather)/warm up'
    });
  });

  it('gets character frequency data for simplified character with a previously different traditional frequency count', function() {
    assert.deepEqual(hanzi.getCharacterFrequency('认'), {
      number: '213',
      character: '认',
      count: '191866',
      percentage: '57.0890429779',
      pinyin: 'ren4',
      meaning: 'to recognize/to know/to admit'
    });
  });

  it('gets character frequency data for traditional character with a previously different traditional frequency count', function() {
    assert.deepEqual(hanzi.getCharacterFrequency('認'), {
      number: '213',
      character: '认',
      count: '191866',
      percentage: '57.0890429779',
      pinyin: 'ren4',
      meaning: 'to recognize/to know/to admit'
    });
  });

  it('gets character by position in frequency list', function() {
    assert.deepEqual(hanzi.getCharacterInFrequencyListByPosition(111), {
      number: '111',
      character: '机',
      count: '339823',
      percentage: '43.7756134862',
      pinyin: 'ji1',
      meaning: 'machine/opportunity/secret'
    });
  });

  it("gets a traditional character by position in frequency list that doesn't have a simplified variant", function() {
    assert.deepEqual(hanzi.getCharacterInFrequencyListByPosition(6649), {
      number: '6649',
      character: '貙',
      count: '13',
      percentage: '99.9947045027',
      pinyin: 'chu1',
      meaning: ''
    });
  });

  it('gets all characters with a given component', function() {
    assert.deepEqual(hanzi.getCharactersWithComponent('鼎'), [
      '鼎',
      '鼐',
      '鼏',
      '鐤',
      '鼑'
    ]);
  });

  it('determines phonetic regularity', function() {
    var expected = {
      di1: {
        character: '低',
        component: [
          '亻',
          '氐',
          '氐',
          '亻',
          '㇒',
          '丨',
          '丨',
          '氏',
          '氏',
          '㇗',
          '㇂',
          '一',
          '丶',
          '丶'
        ],
        phoneticpinyin: [
          'ren2',
          'di1',
          'di3',
          'ren2',
          '_stroke',
          'gun3',
          'shu4',
          'shi4',
          'zhi1',
          '_stroke',
          '_stroke',
          'yi1',
          'dian3',
          'zhu3'
        ],
        regularity: [0, 1, 2, 0, 0, 0, 0, 4, 4, 0, 0, 4, 3, 0]
      }
    };
    assert.deepEqual(hanzi.determinePhoneticRegularity('低'), expected);
  });

  it('should decompose correctly', function() {
    assert.deepEqual(hanzi.decompose('琰').components1, ['王', '炎']);
    assert.deepEqual(hanzi.decompose('琰').components2, [
      '王',
      '一',
      '土',
      '十',
      '丨',
      '火'
    ]);
    assert.deepEqual(hanzi.decompose('琰').components3, ['一', '丨', '火']);

    assert.deepEqual(hanzi.decompose('焱').components1, ['火']);
    assert.deepEqual(hanzi.decompose('焱').components2, ['火']);
    assert.deepEqual(hanzi.decompose('焱').components3, ['火']);

    assert.deepEqual(hanzi.decompose('标').components1, ['木', '示']);
    assert.deepEqual(hanzi.decompose('标').components2, [
      '木',
      '十',
      '一',
      '丨',
      '八',
      '㇒',
      '示',
      '二',
      '小',
      '亅'
    ]);
    assert.deepEqual(hanzi.decompose('标').components3, [
      '一',
      '丨',
      '㇒',
      '亅'
    ]);
  });

  it('should once decompose simplified character', function() {
    assert.deepEqual(hanzi.decompose('爱').components1, [
      'No glyph available',
      '友'
    ]);
  });
  it('should radical decompose simplified character', function() {
    assert.deepEqual(hanzi.decompose('爱').components2, [
      '爫',
      '冖',
      '冂',
      '𠂇',
      '十',
      '又',
      '㇇',
      '㇏'
    ]);
  });
  it('should graphical decompose simplified character', function() {
    assert.deepEqual(hanzi.decompose('爱').components3, [
      '爫',
      '冂',
      '十',
      '㇇',
      '㇏'
    ]);
  });

  it('should once decompose traditional character', function() {
    assert.deepEqual(hanzi.decompose('愛').components1, [
      'No glyph available',
      '夂'
    ]);
  });
  it('should radical decompose traditional character', function() {
    assert.deepEqual(hanzi.decompose('愛').components2, [
      '爫',
      '冖',
      '冂',
      '心',
      '丶',
      '㇃',
      '夂',
      '又',
      '㇇',
      '㇏',
      '㇒'
    ]);
  });
  it('should graphical decompose traditional character', function() {
    assert.deepEqual(hanzi.decompose('愛').components3, [
      '爫',
      '冂',
      '丶',
      '㇃',
      '㇇',
      '㇏',
      '㇒'
    ]);
  });
});

describe('decomposeMany', () => {
  it('returns three characters', () => {
    console.log(hanzi.decompose('弱'));

    assert.deepEqual(hanzi.decomposeMany('和挂爱'), {
      和: {
        character: '和',
        components1: ['禾', '口'],
        components2: ['禾', '㇒', '木', '十', '一', '丨', '八', '口', '冂'],
        components3: ['㇒', '一', '丨', '冂']
      },
      挂: {
        character: '挂',
        components1: ['扌', '圭'],
        components2: ['扌', '亅', '二', '一', '土'],
        components3: ['亅', '一', '土']
      },
      爱: {
        character: '爱',
        components1: ['No glyph available', '友'],
        components2: ['爫', '冖', '冂', '𠂇', '十', '又', '㇇', '㇏'],
        components3: ['爫', '冂', '十', '㇇', '㇏']
      }
    });
  });
});
