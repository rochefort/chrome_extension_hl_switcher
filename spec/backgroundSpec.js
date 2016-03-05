describe("background", function () {
  describe("#updateHlParameter", function () {

    function sharedBehaviorForUpdateHlParameter(inputs) {
      var parameterizedTest = function(expected, query, hl) {
        it(":updateHlParameter('" + query + "', '" + hl + "') == " + expected, function() {
            expect(updateHlParameter(query, hl)).toBe(expected);
        });
      };
      for (var i = 0; i < inputs.length; i++) {
        parameterizedTest.apply(this, inputs[i]);
      }
    }

    describe("has no parameters", function () {
      var inputs = [
        ['?hl=ja', '', 'ja'],
        ['?hl=en', '', 'en'],
      ];
      sharedBehaviorForUpdateHlParameter(inputs);
    });

    describe("has another parameter including 'hl'", function () {
      var inputs = [
        ['?ahl=aaa&hl=ja', '?ahl=aaa&hl=en', 'ja'],
        ['?hlz=aaa&hl=ja', '?hlz=aaa&hl=en', 'ja'],

        ['?ahl=aaa&hl=en', '?ahl=aaa&hl=en', 'en'],
        ['?hlz=aaa&hl=en', '?hlz=aaa&hl=ja', 'en'],
      ];
      sharedBehaviorForUpdateHlParameter(inputs);
    });

    describe("has another parameter before 'hl'", function () {
      var inputs = [
        ['?bef=aaa&hl=ja', '?bef=aaa', 'ja'],
        ['?bef=aaa&hl=en', '?bef=aaa&hl=ja', 'ja'],
        ['?bef=aaa&hl=ja', '?bef=aaa&hl=en', 'ja'],

        ['?bef=aaa&hl=en', '?bef=aaa', 'en'],
        ['?bef=aaa&hl=en', '?bef=aaa&hl=en', 'en'],
        ['?bef=aaa&hl=en', '?bef=aaa&hl=ja', 'en'],
      ];
      sharedBehaviorForUpdateHlParameter(inputs);
    });

    describe("has another parameter after 'hl'", function () {
      var inputs = [
        ['?hl=en&aft=aaa', '?hl=ja&aft=aaa', 'ja'],
        ['?hl=ja&aft=aaa', '?hl=en&aft=aaa', 'ja'],
        
        ['?hl=en&aft=aaa', '?hl=en&aft=aaa', 'en'],
        ['?hl=en&aft=aaa', '?hl=ja&aft=aaa', 'en'],
      ];
      sharedBehaviorForUpdateHlParameter(inputs);
    });

  });
});
