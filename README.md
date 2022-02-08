# Assignment

The task is to build a simple podcast player.
Please create a new repository that contains your player and use this server, but don't modify it.

## Assessment

When assessing the assignment, we will look at the code to see how well it is structured, how easy it is to read, and how simple it would be to maintain.

We expect that you'll be able to motivate and discuss the benefits and drawbacks of the choices in your solution.

We understand that there isn't a lot of time for implementation, and we keep that in mind. We expect that the code will have both strong and weak areas, and we'll be looking to bring those up when we meet to discuss your solution.

Basically, we want to see your version of "clean code," and then discuss it.

Also, please list what you left out. For example, things that you would have spent more time on if you had more time, and what things you did not spend time on at all.

## Requirements

To reflect what we use at Acast, we prefer if you build the client code using React or vanilla JavaScript.

## Provided Materials

Contained within this package is a simple server with the following endpoints:

`/episodes` returns episodes list.

`/episodes/:episode_id` returns info about one episode.

Install the dependencies by running `npm install`.
Run the server with `npm start`.
Then the server listens at port 1337, so, for example, the list of all episodes is at `http://localhost:1337/episodes`.

Static assets are in `/audio` and `/images`.

### Basic playback

The player allows the user to play, pause, seek forward/back (jump ahead or back five seconds), and to jump to a user-chosen point in the timeline.

### Markers

The player also features "markers." A marker is a text, an image or an advertisement that is shown to the user when the current playback time is within the markers start and end time. At most, one marker is displayed at any point in time.

#### Text Link Marker

Displays text.

#### Image Link Marker

Displays an image.

#### Advertisement (Ad) Marker

Displays text that links to an external URL.

##### Optional

If you have the time and desire, after making a solid foundation with the features mentioned above, you can make the ad markers a little bit special. If an ad is playing, the user shall not be able to skip past it. Playing and pausing is OK. If the user attempts to skip past an entire ad marker, then the skipped over ad marker shall play before continuing to the position the user skipped to.
