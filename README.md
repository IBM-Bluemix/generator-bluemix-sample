# Bluemix Sample App Generator

> Yeoman generator for Bluemix sample application - lets you quickly set up a Cloud Foundry sample app with proper formatting and necessary files.


## Usage

Install the [Yeoman][yeoman_url] scaffolding tool `yo`:

```
npm install -g yo
```

Install the `generator-bluemix-sample` generator: 
 
```
npm install -g generator-bluemix-sample
```

Make a new director and `cd` into it: 
 
```
mkdir my-new-project && cd $_
```

Run `yo bluemix sample` to initiate the generator:

```
yo bluemix-sample
```

## Inputs

The generator will ask you for several inputs while creating the scaffolding of your project they are as follows:

* **App Name** - The name you want to give your Bluemix app.
* **Host Name** - The subdomain where your app can be reached. This value must be unique to the `mybluemix.net` domain.
* **Memory** - The amount of memory to be allocated for a single instance of your app.
* **Runtime** - Essentially, the language of your app.
* **License** - The IBM supported licenses for open-sourcing your sample app.
* **Type** - Each Bluemix sample app should fall into one of the four following types:
	* Hello World
	* Sample App
	* Demo
	* Reference Architecture App

## License

[Apache 2.0][apache_url]

[yeoman_url]: http://yeoman.io
[apache_url]: http://www.apache.org/licenses/LICENSE-2.0