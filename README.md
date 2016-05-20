# zpzMdCalendar
zpzMdCalendar is a calendar module designed for use with 
Angular Material which allows for date selection and event 
previewing.

Documentation is not complete yet but it's enough to get you up with your first
instance of it. See the `/demo` folder to check out how to create events and display
them.


## Installation
Use either Bower or NPM to install zpzMdCalendar as follows:
### Bower
`bower install zpz-md-calendar`
### NPM
`npm install zpz-md-calendar`



## Usage

### Include Files
`<script src="/path/to/bower_components/zpz-md-calendar/dist/zpz-md-calendar.min.js"></script>`

`<link rel="stylesheet" href="/path/to/bower_components/zpz-md-calendar/dist/zpz-md-calendar.min.css" />`

### Add Angular Dependencies
Add the `zpzMdCalendar` module to your own app like this:
```javascript
angular.module('YourApp', [
	/*other modules...*/
	'zpzMdCalendar'
	/*other modules...*/
]);
```



### Creating a View-Only Calendar
In your HTML, use the `<zpz-md-calendar>` directive to add
a calendar view there.

```html
<zpz-md-calendar></zpz-md-calendar>
```
See /demo/eg1.viewonly.html.



### Creating a Calendar with a Model
Use the `ng-model` attribute to assign a local variable
to collect information from the `<zpz-md-calendar>` directive

```html
<zpz-md-calendar
	ng-model='model'
></zpz-md-calendar>
```

Add a `$scope.model` to your controller.
```javscript
angular.module('YourApp').controller('yourController', [
	/// other dependencies ...
	'zpzMdCalendarSvc',
	/// other dependencies ...
	function(
		/// other dependencies ...
		zpzMdCalendarSvc
		/// other dependencies ...
	) {
		$scope.model = null;
	}
]);
```

You will be able to use `$scope.model` after `<zpz-md-calendar>` has 
been initialised.



### Initializing Calendar with Data
Add a `ng-model` attribute to the `<zpz-md-calendar>` directive.
```html
<zpz-md-calendar
	ng-model='model'
></zpz-md-calendar>
```

Add a `$scope.model` to your controller.
```javscript
angular.module('YourApp').controller('yourController', [
	/// other dependencies ...
	'zpzMdCalendarSvc',
	/// other dependencies ...
	function(
		/// other dependencies ...
		zpzMdCalendarSvc
		/// other dependencies ...
	) {
		$scope.model = [
			zpzMdCalendarSvc.createEvent(
				'Event Title',
				'Event Description',
				// start timing
				new Date(),
				// end timing (optional)
				new Date((new Date()).getTime() + (1000*60*60*24)),
				// options (optional)
				null,
				// other data (optional)
				{
					address: '...'
					contactPerson: 'John Doe',
					contactNumber: '123456789'
				}
			)
		];
	}
]);
```



### Initializing Calendar with Default Configuration
The `ng-config` attribute takes in a configuration which will be merged with the
default configuration. To use the default configuration, leaving `ng-config` empty
will result in the user of the default configuration.


#### Without `ng-config` specification
```html
<zpz-md-calendar
	ng-model='model'
></zpz-md-calendar>
```

```javascript
angular.module('YourApp').controller('yourController', [
	/// other dependencies ...
	'zpzMdCalendarSvc',
	/// other dependencies ...
	function(
		/// other dependencies ...
		zpzMdCalendarSvc
		/// other dependencies ...
	) {
		/// other code ...
	}
]);
```


#### With `ng-config` specification
```html
<zpz-md-calendar
	ng-config="config"
	ng-model='model'
></zpz-md-calendar>
```

```javascript
angular.module('YourApp').controller('yourController', [
	/// other dependencies ...
	'zpzMdCalendarSvc',
	/// other dependencies ...
	function(
		/// other dependencies ...
		zpzMdCalendarSvc
		/// other dependencies ...
	) {
		/// use defaults
		$scope.config = zpzMdCalendarSvc.constant.config.default;
		
		/// other code ...
		
	}
]);
```



### Initializing Calendar with a Custom Configuration
[since v1.0.2]

The `ng-config` variable if specified with an object merges the object properties
with the default configuration. Specify only the options you use.

```html
<zpz-md-calendar
	ng-config='config'
	ng-model='model'
></zpz-md-calendar>
```

```javascript
angular.module('YourApp').controller('yourController', [
	/// other dependencies ...
	'zpzMdCalendarSvc',
	/// other dependencies ...
	function(
		/// other dependencies ...
		zpzMdCalendarSvc
		/// other dependencies ...
	) {
		/// use a custom Configuration
		/// this sets the year navigation buttons to not show
		$scope.config = {
			view: {
				display: {
					navigation: {
						year: false
					}
				}
			}
		};
		
		/// other code ...
	}
]);
```

## Demo
See the /demo folder for an example of how to initialize
zpzMdCalendar. The files are as follows:
```
demo
  -> development
    - config.js
	- index.html
  -> production
    - config.js
	- index.html
  - data.js
  - index.html
  - index.js 
```

## Changelog
### v1
#### v1.0
##### v1.0.2
Enhancement to allow for partial ngConfig specification such that the provided code
in the partial configuration will be merged with the default configuration on 
view load.

##### v1.0.1
Bug fix to allow for optional ngModel and ngConfig
 
##### v1.0.0
Initial release

## Development
This section is for developers who wish to contribute to this 
project. Fork this repository, add your changes including test
cases, make sure all existing/new test cases are passing, do a 
Gulp build and then submit a pull request.   

### Installation
Install the development dependencies via the following two commands:

`npm install --dev`

`bower install --dev`

### Structure

#### Modules
##### zpzMdCalendar
This module contains all components concerning the logic
behind zpzMdCalendar.

##### zpzMdCalendarTemplates
This module contains directives and the HTML templates.



#### Constants
##### zpzMdCalendarConst
Contains all constants used in zpzMdCalendar.



#### Services
##### zpzMdCalendarSvc
Facade class which contains methods so plugin users cam
avoid accessing component internals directly.

##### zpzMdCalendarUtilitySvc
Utility functions used in zpzMdCalendar.



#### Factories
##### zpzMdCalendarDataRowObject
This component stores a single event and it's associated title,
description, start time, end time, options and any other data
you might want to store.

##### zpzMdCalendarDataSetObject
This component stores an array of events and handles retrieval
and storage of information.

##### zpzMdCalendarModelObject
This component represents the ngModel of a `<zpz-md-calendar>` 
directive and allows the data to interact with the view.

##### zpzMdCalendarViewObject
This component represents the calendar view and is used by
zpzMdCalendarModelObject to display items on the calendar.



#### Controllers
##### zpzMdCalendarCtrl
This component is the controller for the `<zpz-md-calendar>`
directive.



#### Directives
##### `<zpz-md-calendar>`
Main component.

##### `<zpz-md-calendar-button-options>`
Component for the options button.

##### `<zpz-md-calendar-element-date>`
Component that displays the date in each calendar cell.

##### `<zpz-md-calendar-element-events>`
Component that displays the event indicators in each calendar cell.

##### `<zpz-md-calendar-toolbar-controller>`
Component that displays the navigation controllers.

##### `<zpz-md-calendar-toolbar-days>`
Component that displays the days of the week.


### Testing
Karma is used for testing. All functions asides from getters and
setters should have their own unit tests. After installation
of `npm` and `bower` development dependencies, run the following
command to start Karma: 

```
karma start karma.conf.js
```

### Building
We use Gulp to build the component. Building consists of
placing all HTML files into the `run()` segment of the module
zpzMdCalendar Templates via $templateCache, and concatenating 
and minifying all CSS and JS files.  

Run the following command to do a build:

```
gulp build
```
