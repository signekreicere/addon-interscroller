# Installation
- Either download project manually OR
- Install with npm OR
  `npm i addon-interscroller`
- Add hosted code link in <head>
  `https://cdn.jsdelivr.net/npm/addon-interscroller@1.0.2/dist/interscroller.js`
# Usage
Addon interscroller wraps element into scrollable box.
- configure parameters / call function
```javascript
    <script>
        window.stpdInterscroller = window.stpdInterscroller || {que:[]}
        stpdInterscroller.que.push(function() {
            stpdInterscroller.setConfig({
                container: 'img[id="adElementId"]',     // element + it's id or class
                height: 250,                            // container height (px); will override to max element height if set bigger than element
                width: 0,                               // container width (px) / 0 - for 100%; will override to 100% if screen smaller than setting
                showTitle: true,                        // show Ad title (true/false)
                titleText: 'Advertisement',             // title name
                titleBackground: '#1AB6C5',             // title block color (in HEX)
                titleColor: '#FFF',                     // title block text color (in HEX)
                overrideParentWidth: true               // for overriding parent margins (true/false)
            });
            stpdInterscroller.run();
        });
    </script>
```