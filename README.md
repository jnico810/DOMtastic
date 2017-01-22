DOMtastic - Faster Document Manipulation
==================================================

What is DOMtastic?
--------------------------------------------------
DOMTastic is a lean and concise JavaScript Library designed to simplify HTML document traversing, event handling and Ajax interactions. At less than 300 lines of code, DOMtastic is a smaller alternative to similar JavaScript libraries.

How to Import
--------------------------------------------
To import DOMtastic:
```bash
import dT from './DOMTastic/main.js'
```

Demo DOMtastic
--------------------------------------------
I have created a Google Chrome Extension that utilizes DOMtastic and allows users to change CSS on the spot!
Download my extension [here](https://chrome.google.com/webstore/detail/css-domtastic/ijnmbepagbhjkdpoklekanbkcgdlghcj)  and try changing CSS on any page!

How to Use
--------------------------------------------

To find all document elements of a given HTML selector:

```bash
dT('selector');
```

Similarly, to wrap an HTMLElement in order to create a dynamic DOMtastic element:
```bash
dT(<h1>Hello World!</h1>);
```

Lastly, DOMtastic can be used to run scripts after the document has loaded. To do so, pass a function like so:
```bash
dT(()=> {
  console.log("PAGE HAS LOADED")
});
```

The elements are stored in a property called 'doms':

```bash
dT('ul').doms[0] //Returns the first element;
```

API
--------------------------------------------
## Class Methods

#### .ajax(options)
To create an ajax request pass options:

```bash
dT.ajax({
  type: 'GET',
  url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=6f2bde3f2607e6ee081c27f201a288f6",
  success(data) {
    console.log("We have your weather!")
    console.log(data);
  },
  error() {
    console.error("An error occurred.");
  }
});
```


## Instance Methods

#### .addClass(newClass)

To add a class to all matched elements:
```bash
dT('ul').addClass('big-list');
```

#### .append(child)

To append an HTMLElement, dT Collection or string to each matched element:
```bash
dT('ul').append('<h1>New child</h1>')
```

#### .attr(attribute, value)

To change an attribute of all matched elements:
```bash
dT('ul').attr('class', 'newClass')
```

Alternatively, to retrieve the attribute from the first matched element:
```bash
dT('ul').attr('class')
dT('a').attr('href')
```

#### .children()

To retrieve the children of all matched elements as an array:
```bash
dT('ul').children();
```

#### .empty()

To clear the innerHTML of all matched elements:
```bash
dT('ul').empty();
```

#### .find(selector)
To retrieve the descendants of each element in the current set of matched elements filtered by a selector:
```bash
dT('ul').find('li')
```

#### .first
To retrieve the first element of all matched elements:
```bash
dT('ul').first
```

#### .html(newHTML)

To change the innerHTML of each matched element:
```bash
dT('ul').html('NEW HTML');
```
To find the innerHTML of the first element, do not supply a parameter:
```bash
dT('ul').html();
```

#### .last
To retrieve the last element of all matched elements:
```bash
dT('ul').last
```

#### .parent()
To retrieve the parents of all matched elements as an array:
```bash
dT('ul').parent();
```

#### .prepend()
To prepend an HTMLElement, dT Collection or string to each matched element:
```bash
dT('ul').prepend('<h1>New child</h1>')
```

#### .remove()
To remove all matched elements from the document:
```bash
dT('ul').remove()
```

#### .removeFirst()
To remove first matched element from the document:
```bash
dT('ul').removeFirst()
```

#### .removeClass(oldClass)
To remove a class from all matched elements:
```bash
dT('ul').removeClass('big-list');
```

### Event Listeners

#### .click()

To run callback function when a 'click' action is triggered:
```bash
dT('ul').click)(() => console.log('ul clicked!'));
```

#### .on(action, callback)
To run callback function when a given 'action' is triggered:

```bash
dT('ul').on('click', () => console.log('ul clicked!'));
```

#### .off(action, callback)
To remove callback function that is being listened to:

```bash
dT('ul').off('click', callback);
```
