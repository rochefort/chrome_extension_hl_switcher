describe("background", function () {

  describe("#switch", function () {
    beforeEach(function () {
      chrome.tabs = { update: function() {} };
      spyOn(chrome.tabs, 'update');
    });

    function sharedBehaviorForUpdateOnce(url) {
      beforeEach(function () {
        tab = {url: url};
      });
      it("update is called once", function () {
        hlSwitcher.switch(tab);
        expect(chrome.tabs.update.calls.count()).toBe(1);
      });
    }

    describe("when protocol is file", function () {
      beforeEach(function () {
        tab = {url: 'file:///tmp/some.txt'};
      });
      it("update is not called", function () {
        hlSwitcher.switch(tab);
        expect(chrome.tabs.update.calls.count()).toBe(0);
      });
    });

    describe("when protocol is http", function () {
      sharedBehaviorForUpdateOnce('http://example.com');
    });

    describe("when protocol is https", function () {
      sharedBehaviorForUpdateOnce('https://example.com');
    });

  });

  describe("#updateHlParameter", function () {

    function sharedBehaviorForUpdateHlParameter(inputs) {
      var parameterizedTest = function(expected, query, hl) {
        it(":updateHlParameter('" + query + "', '" + hl + "') == " + expected, function() {
            expect(hlSwitcher.updateHlParameter(query, hl)).toBe(expected);
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
