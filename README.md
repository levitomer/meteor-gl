<h1 align="center">
  <br>

 <img src="https://raw.githubusercontent.com/levitomer/meteor-gl/master/src/assets/meteor.png" alt="Meteor" width="200">
  <br>
  Meteor
  <br>
</h1>

<h4 align="center">Meteor exploration app</h4>

## Clone

To clone and run this application, you'll need [Git](https://git-scm.com).

```bash
# Clone this repository
$ git clone https://github.com/levitomer/meteor-gl.git

# Go into the repository
$ cd meteor-gl
```

## Development

To run the app you'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Install dependencies
$ npm install

# Run the app
$ npm start
```

## Docker

Build & run the app via docker.
Install [docker](https://docs.docker.com/get-docker/), and run the following commands from your command line:

```bash
# Build the docker image
$ docker build . -t meteor

# Run the app
$ docker run -p 3000:80 -d meteor
```

## Preview

Open http://localhost:3000 in your browser

## Credits

This software uses the following open source packages:

-   [Deck.gl](https://deck.gl/)
-   [Mapbox](https://www.mapbox.com/)
-   [React](https://reactjs.org/)
-   [react-hot-toast](https://react-hot-toast.com/)

## License

MIT

---

> GitHub [@levitomer](https://github.com/levitomer) &nbsp;&middot;&nbsp;
> Stack Overflow [@tomer](https://stackoverflow.com/users/4490712/tomer)
